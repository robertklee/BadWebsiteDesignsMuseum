import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3002";
const screenshots = process.env.SCREENSHOT_DIR || "/tmp/museum-website-behavior";
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
const errors = [];
await mkdir(screenshots, { recursive: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 1000 }, reducedMotion: "reduce" });
await context.route("https://static.cloudflareinsights.com/**", route => route.abort());
let page = await context.newPage();
page.setDefaultTimeout(7000);
page.on("pageerror", error => errors.push(error.message));

async function open(id, mode = "bad") {
  const response = await page.goto(`${origin}/exhibit/${id}${mode === "bad" ? "" : `?mode=${mode === "worse" ? "hard" : "fixed"}`}`);
  assert.equal(response.status(), 200);
  await page.locator(".web-demo").waitFor();
  await page.evaluate(() => {
    window.completions = 0;
    document.querySelector("#stage").addEventListener("exhibit-complete", () => { window.completions++; });
  });
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `${origin}/exhibit/${id}`);
}

async function completed(mode) {
  assert.equal(await page.evaluate(() => window.completions), 1);
  if (mode === "bad") await page.locator("#difficulty-progress button").click();
}

async function fillRegistration(values) {
  for (const [field, value] of Object.entries(values)) await page.locator(`#registration-${field}`).fill(value);
}

try {
  for (const mode of ["bad", "worse", "fixed"]) {
    await open("layout-earthquake", mode);
    await page.locator(".news-viewport").focus();
    const before = await page.locator('[data-article="library"]').evaluate(element => element.offsetTop);
    await page.locator("#edition-step").click();
    const after = await page.locator('[data-article="library"]').evaluate(element => element.offsetTop);
    assert.equal(after === before, mode === "fixed", `layout stability: ${mode}`);
    for (let index = 1; index < (mode === "worse" ? 10 : 6); index++) await page.locator("#edition-step").click();
    assert.equal(await page.locator("#edition-state").textContent(), mode === "fixed" ? "All sections loaded" : `Live update ${mode === "worse" ? 10 : 6}`);
    await page.waitForFunction(() => {
      const image = document.querySelector(".news-insert img");
      return image?.complete && image.naturalWidth > 0;
    });
    await page.locator('[data-article="transport"]').click();
    await page.locator("#news-bookmark").click();
    assert.equal(await page.evaluate(() => window.completions), 0);
    await page.locator("#news-back").click();
    for (let attempt = 0; attempt < (mode === "fixed" ? 1 : mode === "worse" ? 5 : 3); attempt++) await page.locator('[data-article="library"]').click();
    await page.locator("#news-bookmark").click();
    await completed(mode);

    await open("hover-menu", mode);
    assert.equal(await page.locator("#menu-hold").isVisible(), false);
    const depth = mode === "worse" ? 5 : 4;
    for (let index = 0; index < depth; index++) {
      await page.locator(`[data-depth="${index}"]`).focus();
      await page.keyboard.press("Enter");
    }
    assert.equal(await page.locator("#hover-product").isVisible(), true);
    await completed(mode);

    await open("back-amnesia", mode);
    await page.locator("#catalog-filter").selectOption("Lighting");
    await page.locator("#catalog-sort").selectOption("price");
    await page.locator('[data-inspect="9"]').scrollIntoViewIfNeeded();
    const previousScroll = await page.locator(".catalog-viewport").evaluate(element => element.scrollTop);
    assert(previousScroll > 0);
    await page.locator('[data-inspect="9"]').click();
    await page.locator("#catalog-choose").click();
    assert.equal(await page.evaluate(() => window.completions), 0);
    await page.locator("#catalog-product #catalog-return").click();
    assert.equal(await page.locator("#catalog-filter").inputValue(), mode === "fixed" ? "Lighting" : "All departments");
    assert.equal(await page.locator("#catalog-sort").inputValue(), mode === "fixed" ? "price" : "featured");
    assert.equal(await page.locator(".catalog-viewport").evaluate(element => element.scrollTop), mode === "fixed" ? previousScroll : 0);
    await page.locator("#catalog-filter").selectOption("Lighting");
    await page.locator('[data-preview="10"]').click();
    await page.locator("#catalog-preview #catalog-return").click();
    assert.equal(await page.locator("#catalog-filter").inputValue(), mode === "worse" ? "All departments" : "Lighting");
    await page.locator('[data-inspect="10"]').click();
    await page.locator("#catalog-choose").click();
    await completed(mode);

    await open("validation-afterthought", mode);
    await fillRegistration({ name: "Alex", email: "alex@example.test", reference: "EVT-2048", seats: "2" });
    await page.locator("#afterthought-form button").click();
    assert.equal(await page.evaluate(() => window.completions), 0);
    assert.equal(await page.locator("#registration-name").inputValue(), "Alex");
    assert.equal(await page.locator("#registration-email").inputValue(), mode === "fixed" ? "alex@example.test" : "");
    if (mode === "worse") assert.match(await page.locator("#registration-error").textContent(), /^Registration unsuccessful\./);
    if (mode === "fixed") assert.equal(await page.locator("#registration-name").getAttribute("aria-invalid"), "true");
    await fillRegistration({ name: "Alex Example", email: "alex@example.test", reference: "EVT-2048", seats: "2" });
    await page.locator("#afterthought-form button").click();
    await completed(mode);

    await open("scroll-modal", mode);
    assert.equal(await page.locator('#delivery-open').evaluate(element => element.closest('.delivery-checkout') !== null), true);
    assert.equal(await page.locator('.delivery-checkout-footer').evaluate(element => element.previousElementSibling.classList.contains('delivery-checkout')), true);
    await page.locator("#delivery-open").click();
    assert.equal(await page.locator(".delivery-scroll-feedback, #delivery-background").count(), 0);
    if (mode === "worse") {
      assert.equal(await page.locator('.delivery-notice').isVisible(), false);
      assert.equal(await page.locator('#delivery-confirm').isDisabled(), true);
      assert.equal(await page.locator('.delivery-body input[type="radio"]').count(), 0);
      await page.locator('#delivery-scroll').fill('100');
      await page.locator('#delivery-details').click();
      assert.equal(await page.locator('.delivery-notice').isVisible(), true);
      assert.equal(await page.locator('#delivery-notice-done').isDisabled(), true);
      assert.equal(await page.locator('.delivery-overlay>.delivery-dialog').first().evaluate(element => element.inert), true);
      const combinations = [];
      for (const background of [-1, 0, 1]) for (const dialog of [-1, 0, 1]) for (const notice of [-1, 0, 1]) {
        if (background || dialog || notice) combinations.push([background, dialog, notice]);
      }
      await page.evaluate(() => { window.originalRandom = Math.random; });
      await page.locator('.delivery-notice-body').focus();
      for (const [index, directions] of combinations.entries()) {
        await page.evaluate(index => {
          Math.random = () => (index + 0.5) / 26;
          for (const selector of ['.delivery-background', '.delivery-body', '.delivery-notice-body']) document.querySelector(selector).scrollTop = 200;
        }, index);
        await page.keyboard.press('PageDown');
        const positions = await page.evaluate(() => ['.delivery-background', '.delivery-body', '.delivery-notice-body'].map(selector => document.querySelector(selector).scrollTop));
        assert.deepEqual(positions, directions.map(direction => 200 + direction * 180));
      }
      await page.evaluate(() => { Math.random = window.originalRandom; });
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.delivery-notice').isVisible(), false);
      assert.equal(await page.locator('.delivery-overlay').isVisible(), true);
    } else {
      await page.locator('.delivery-background').evaluate(element => { element.scrollTop = 200; });
      await page.locator(".delivery-body").hover();
      await page.mouse.wheel(0, 260);
      await page.waitForFunction(fixed => document.querySelector(fixed ? ".delivery-body" : ".delivery-background").scrollTop > (fixed ? 0 : 200), mode === "fixed");
      assert.equal(await page.locator(mode === "fixed" ? ".delivery-background" : ".delivery-body").evaluate(element => element.scrollTop), mode === "fixed" ? 200 : 0);
    }
    if (mode !== "fixed") {
      await page.locator("#delivery-scroll").focus();
      await page.keyboard.press("End");
      assert((await page.locator(".delivery-body").evaluate(element => element.scrollTop)) > 0);
    }
    await page.locator("#delivery-details").scrollIntoViewIfNeeded();
    const saved = await page.locator(".delivery-body").evaluate(element => element.scrollTop);
    await page.locator("#delivery-details").click();
    await page.locator(mode === 'worse' ? '#delivery-notice-close' : "#delivery-return").click();
    assert.equal(await page.locator(".delivery-body").evaluate(element => element.scrollTop), saved);
    if (mode === 'worse') {
      assert.equal(await page.locator('#delivery-confirm').isDisabled(), true);
      await page.locator('#delivery-details').click();
    }
    const pricing = await page.locator('.delivery-speeds').innerText();
    assert.match(pricing, /Fastest \/ 2 days \/ \$5,000/);
    assert.match(pricing, /3 days \/ Free/);
    if (mode !== 'fixed') assert.match(pricing, /I'm OK waiting an extra day/);
    await page.locator('input[value="express"]').check();
    if (mode === 'worse') await page.locator('#delivery-notice-done').click();
    await page.locator('#delivery-confirm').click();
    assert.equal(await page.evaluate(() => window.completions), 0);
    if (mode === 'worse') {
      await page.locator('#delivery-details').click();
      await page.locator('input[value="standard"]').check();
      await page.locator('#delivery-notice-close').click();
      assert.match(await page.locator('#delivery-speed-summary').innerText(), /\$5,000/);
      await page.locator('#delivery-details').click();
      assert.equal(await page.locator('input[value="express"]').isChecked(), true);
    }
    await page.locator('input[value="standard"]').check();
    if (mode === 'worse') await page.locator('#delivery-notice-done').click();
    await page.locator("#delivery-confirm").click();
    await completed(mode);
    assert.equal(await page.locator(".delivery-overlay").isVisible(), false);
    console.log(`Passed all five workflows in ${mode} mode.`);
  }

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install();
  await open("scroll-modal");
  await page.locator("#delivery-open").click();
  await page.locator('.delivery-background').evaluate(element => { element.scrollTop = 0; });
  await page.locator(".delivery-overlay").dispatchEvent("wheel", { deltaY: 120 });
  assert.equal(await page.locator(".delivery-background").evaluate(element => element.getAnimations().length), 0);
  await page.locator(".delivery-overlay").dispatchEvent("wheel", { deltaY: -500 });
  const bounce = await page.locator(".delivery-background").evaluate(element => {
    const animation = element.getAnimations()[0];
    animation.pause();
    animation.currentTime = 105;
    return { transform: getComputedStyle(element).transform, position: element.scrollTop };
  });
  assert.notEqual(bounce.transform, "none");
  assert.equal(bounce.position, 0);
  await page.locator("#delivery-close").click();
  assert.equal(await page.locator(".delivery-background").evaluate(element => element.getAnimations().length), 0);
  await open("scroll-modal", "worse");
  await page.locator("#delivery-open").click();
  await page.locator('#delivery-details').click();
  await page.evaluate(() => {
    window.randomCalls = 0;
    Math.random = () => { window.randomCalls++; return 0.999; };
    for (const selector of ['.delivery-background', '.delivery-body', '.delivery-notice-body']) document.querySelector(selector).scrollTop = 200;
  });
  await page.locator('.delivery-notice-body').dispatchEvent('wheel', { deltaY: 30 });
  await page.clock.runFor(100);
  await page.locator('.delivery-notice-body').dispatchEvent('wheel', { deltaY: 30 });
  assert.equal(await page.evaluate(() => window.randomCalls), 1);
  await page.clock.runFor(300);
  await page.locator('.delivery-notice-body').dispatchEvent('wheel', { deltaY: 30 });
  assert.equal(await page.evaluate(() => window.randomCalls), 2);
  await page.evaluate(() => { Math.random = () => 0.999; });
  await page.locator(".delivery-notice-body").focus();
  await page.locator(".delivery-notice-body").evaluate(element => { element.scrollTop = element.scrollHeight; });
  await page.keyboard.press("PageDown");
  assert.equal(await page.locator(".delivery-notice-body").evaluate(element => element.getAnimations().length), 1);
  await page.locator('[data-mode="fixed"]').click();
  assert.equal(await page.locator(".delivery-body").evaluate(element => element.getAnimations().length), 0);
  console.log("Passed overscroll bounce, ordinary scrolling, reduced motion, and animation cleanup.");
  await open("layout-earthquake");
  await page.locator(".news-viewport").focus();
  await page.clock.runFor(1900);
  assert.equal(await page.locator("#edition-state").textContent(), "Live update 1");
  await page.locator("#edition-pause").click();
  await page.clock.runFor(4000);
  assert.equal(await page.locator("#edition-state").textContent(), "Live update 1");
  await page.locator('[data-mode="fixed"]').click();
  await page.clock.runFor(4000);
  assert.equal(await page.locator("#edition-state").textContent(), "Edition ready");
  await open("hover-menu", "worse");
  await page.locator('[data-depth="0"]').hover();
  await page.clock.runFor(2300);
  assert.equal(await page.locator('[data-depth="1"]').isVisible(), false);
  await page.locator('[data-depth="0"]').hover();
  await page.mouse.move(0, 0);
  await page.clock.runFor(150);
  assert.equal(await page.locator('[data-depth="1"]').isVisible(), false);
  await open("hover-menu", "fixed");
  await page.locator('[data-depth="0"]').click();
  await page.mouse.move(0, 0);
  await page.clock.runFor(5000);
  assert.equal(await page.locator('[data-depth="1"]').isVisible(), true);
  console.log("Passed loading pause/cleanup, hover-gap timeout, and stable fixed menus.");

  await page.close();
  page = await context.newPage();
  page.setDefaultTimeout(7000);
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const id of ["layout-earthquake", "hover-menu", "back-amnesia", "validation-afterthought", "scroll-modal"]) {
      await open(id, "worse");
      if (id === "layout-earthquake") { await page.locator(".news-viewport").focus(); await page.locator("#edition-step").click(); }
      if (id === "hover-menu") {
        for (let index = 0; index < 4; index++) { await page.locator(`[data-depth="${index}"]`).focus(); await page.keyboard.press("Enter"); }
      }
      if (id === "scroll-modal") {
        await page.locator("#delivery-open").click();
        await page.locator('#delivery-details').click();
        await page.locator('#delivery-notice-scroll').fill('100');
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${id} overflows at ${width}`);
      await page.locator("#stage").screenshot({ path: `${screenshots}/${id}-${width}.png` });
    }
  }
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const touchPage = await mobile.newPage();
  touchPage.on("pageerror", error => errors.push(error.message));
  await touchPage.goto(`${origin}/exhibit/hover-menu?mode=hard`);
  for (let index = 0; index < 5; index++) await touchPage.locator(`[data-depth="${index}"]`).tap();
  assert.equal(await touchPage.locator("#hover-product").isVisible(), true);
  await touchPage.goto(`${origin}/exhibit/scroll-modal?mode=hard`);
  await touchPage.locator("#delivery-open").tap();
  await touchPage.locator('#delivery-scroll').fill('100');
  await touchPage.locator('#delivery-details').tap();
  await touchPage.evaluate(() => { Math.random = () => 0.999; });
  await touchPage.locator(".delivery-notice-body").dispatchEvent("pointerdown", { pointerType: "touch", clientY: 300 });
  await touchPage.locator(".delivery-notice-body").dispatchEvent("pointermove", { pointerType: "touch", clientY: 100 });
  await touchPage.locator(".delivery-notice-body").dispatchEvent("pointerup", { pointerType: "touch" });
  assert((await touchPage.locator(".delivery-notice-body").evaluate(element => element.scrollTop)) > 0);
  await touchPage.locator('#delivery-notice-scroll').fill('100');
  await touchPage.locator('input[value="standard"]').tap();
  await touchPage.locator('#delivery-notice-done').tap();
  await touchPage.locator("#delivery-scroll").fill("100");
  await touchPage.locator("#delivery-confirm").tap();
  assert.match(await touchPage.locator("#extra-status").textContent(), /Standard delivery selected/);
  await mobile.close();
  assert.deepEqual(errors, []);
  console.log(`Passed desktop/mobile layouts, touch, keyboard, and runtime checks. Screenshots: ${screenshots}`);
} finally {
  await browser.close();
}