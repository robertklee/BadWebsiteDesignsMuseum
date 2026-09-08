import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3002";
const screenshots = "/tmp/museum-hover-dependency";
await mkdir(screenshots, { recursive: true });
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.clock.install();
  for (const mode of ["bad", "hard"]) {
    await page.goto(`${origin}/exhibit/hover-menu?mode=${mode}`);
    assert.equal(await page.locator("#menu-hold").isVisible(), false, "Help starts hidden");
    await page.locator('[data-depth="0"]').hover();
    const bridge = page.locator('[data-level="1"] .hover-bridge');
    assert.equal(await bridge.locator("span").count(), mode === "hard" ? 5 : 1);
    const bounds = await bridge.boundingBox();
    const center = bounds.x + bounds.width / 2;
    const points = mode === "hard"
      ? [[center, 0], [center, 19], [center + 39, 19], [center + 39, 45], [center, 45], [center, 64]]
      : [[center, 0], [center, 28], [center, 56]];
    assert.equal(await bridge.locator("span").first().evaluate(element => element.getBoundingClientRect().width), 6);
    await page.mouse.move(center, bounds.y - 3);
    for (const [horizontal, vertical] of points) {
      await page.mouse.move(horizontal, bounds.y + vertical, { steps: 6 });
      await page.clock.runFor(150);
      assert.equal(await page.locator('[data-depth="1"]').isVisible(), true, `${mode} corridor must remain open`);
    }
    await page.mouse.move(center - 40, bounds.y + 10);
    await page.clock.runFor(60);
    assert.equal(await page.locator('[data-depth="1"]').isVisible(), false, `${mode} off-path must close`);
    assert.equal(await page.locator("#menu-hold").isVisible(), false, "One failure must not reveal help");
    await page.locator('[data-depth="0"]').focus();
    await page.keyboard.press("Enter");
    await page.clock.runFor(6000);
    assert.equal(await page.locator('[data-depth="1"]').isVisible(), true, "Keyboard must not expire");
    await page.keyboard.press("Escape");
    assert.equal(await page.locator('[data-depth="1"]').isVisible(), false);
    assert.equal(await page.locator("#menu-hold").isVisible(), false, "Escape must not count as a failure");
    await page.mouse.move(0, 0);
    await page.locator('[data-depth="0"]').hover();
    await page.clock.runFor(mode === "hard" ? 2250 : 2850);
    assert.equal(await page.locator('[data-depth="1"]').isVisible(), false, `${mode} idle mouse menu must expire`);
    assert.equal(await page.locator("#menu-hold").isVisible(), true, "Two mouse failures reveal help");
  }
  await page.close();
  for (const width of [1280, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, hasTouch: true, isMobile: width < 500 });
    const touch = await context.newPage();
    touch.on("pageerror", error => errors.push(error.message));
    await touch.clock.install();
    await touch.clock.pauseAt(await touch.evaluate(() => Date.now() + 1000));
    for (const mode of ["easy", "hard"]) {
      await touch.goto(`${origin}/exhibit/hover-menu?mode=${mode}`);
      await touch.evaluate(() => {
        window.hoverCompletions = 0;
        document.querySelector("#stage").addEventListener("exhibit-complete", () => { window.hoverCompletions++; });
      });
      assert.equal(await touch.locator("#hover-product").isVisible(), true, "Product is visible before playing");
      assert.equal(await touch.locator(".hover-merch").count(), 0, "Old teaser is removed");
      assert.match(await touch.locator("#hover-product-attempts").textContent(), /menu has other plans/);
      await touch.locator("#hover-lamp-switch").uncheck();
      await touch.locator("#hover-lamp-switch").check();
      assert.equal(await touch.evaluate(() => window.hoverCompletions), 0, "Product interaction must not complete the challenge");
      assert.equal(await touch.locator(".hover-navigation").isVisible(), true);
      assert.equal(await touch.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      if (mode === "easy") await touch.locator(".hover-shop").screenshot({ path: `${screenshots}/initial-product-${width}.png` });
      const duration = mode === "hard" ? 420 : 650;
      await touch.locator('[data-depth="0"]').tap();
      await touch.clock.runFor(duration - 50);
      assert.equal(await touch.locator('[data-depth="1"]').isVisible(), true, `${mode} touch deadline must allow time to advance`);
      await touch.locator('[data-depth="1"]').dispatchEvent("pointerdown", { pointerType: "touch" });
      await touch.clock.runFor(60);
      assert.equal(await touch.locator('[data-depth="1"]').isVisible(), false, `${mode} touch must expire, even with a finger held down`);
      assert.equal(await touch.locator("#menu-hold").isVisible(), false, "One touch failure must not reveal help");
      await touch.locator('[data-depth="0"]').tap();
      await touch.locator('[data-other="1"]').tap();
      assert.equal(await touch.locator("#menu-hold").isVisible(), true, "A wrong department counts as the second failure");
      assert.equal(await touch.locator("#menu-hold").isChecked(), false, "Revealing help must not automatically enable it");
      for (let depth = 0; depth < (mode === "hard" ? 5 : 4); depth++) {
        await touch.locator(`[data-depth="${depth}"]`).tap();
        await touch.clock.runFor(200);
      }
      assert.equal(await touch.locator("#hover-product").isVisible(), true, `${mode} touch must be completable`);
      assert.equal(await touch.evaluate(() => window.hoverCompletions), 1, "Only reaching the final menu completes the challenge");
      await touch.goto(`${origin}/exhibit/hover-menu?mode=${mode}`);
      const lastMenu = mode === "hard" ? 3 : 2;
      for (let depth = 0; depth <= lastMenu; depth++) {
        await touch.locator(`[data-depth="${depth}"]`).tap();
        const window = duration - depth * (mode === "hard" ? 70 : 100);
        await touch.clock.runFor(window - 20);
        assert.equal(await touch.locator(`[data-depth="${depth + 1}"]`).isVisible(), true, `${mode} depth ${depth} remains reachable before deadline`);
      }
      await touch.clock.runFor(30);
      assert.equal(await touch.locator('[data-depth="1"]').isVisible(), false, `${mode} deeper menus must expire sooner`);
    }
    await touch.goto(`${origin}/exhibit/hover-menu?mode=fixed`);
    assert.equal(await touch.locator("#hover-product").isVisible(), true, "Fixed mode also shows the product immediately");
    await touch.locator('[data-depth="0"]').tap();
    await touch.clock.runFor(6000);
    assert.equal(await touch.locator('[data-depth="1"]').isVisible(), true, "Fixed touch must not expire");
    await touch.goto(`${origin}/exhibit/hover-menu?mode=hard`);
    assert.equal(await touch.locator("#menu-hold").isVisible(), false, "A new run resets help");
    await touch.locator('[data-depth="0"]').tap();
    await touch.locator("#menu-close").tap();
    for (let attempt = 0; attempt < 2; attempt++) {
      await touch.locator('[data-depth="0"]').tap();
      await touch.clock.runFor(700);
      assert.equal(await touch.locator("#menu-hold").isVisible(), attempt === 1, "Only failed tries count toward help");
    }
    await touch.locator("#menu-hold").check();
    for (let depth = 0; depth < 4; depth++) {
      await touch.locator(`[data-depth="${depth}"]`).tap();
      await touch.clock.runFor(6000);
      assert.equal(await touch.locator(`[data-depth="${depth + 1}"]`).isVisible(), true, "Hold menu open must bypass touch deadlines");
    }
    assert.equal(await touch.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await touch.locator("#stage").screenshot({ path: `${screenshots}/hard-${width}.png` });
    await touch.locator('[data-depth="4"]').tap();
    assert.equal(await touch.locator("#hover-product").isVisible(), true);
    assert.equal(await touch.locator(".hover-navigation").isVisible(), false);
    assert.equal(await touch.locator("#hover-product-attempts").textContent(), "2 menu meltdowns.");
    assert.equal(await touch.locator("#hover-product").evaluate(element => element.contains(document.activeElement)), true);
    assert.equal(await touch.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Product page fits at ${width}`);
    assert.equal(await touch.locator("#hover-product").evaluate(element => element.getBoundingClientRect().top >= document.querySelector(".exhibit-toolbar").getBoundingClientRect().bottom), true, "Product starts below the sticky toolbar");
    await touch.screenshot({ path: `${screenshots}/product-${width}.png` });
    await touch.locator("#hover-lamp-switch").uncheck();
    assert.equal(await touch.locator("#hover-product .web-lamp b").evaluate(element => getComputedStyle(element).opacity), "0");
    await touch.locator("#hover-lamp-switch").check();
    assert.equal(await touch.locator("#hover-product .web-lamp b").evaluate(element => getComputedStyle(element).opacity), "0.3");
    await touch.emulateMedia({ reducedMotion: "reduce" });
    await touch.goto(`${origin}/exhibit/hover-menu?mode=hard`);
    assert.equal(await touch.locator("#menu-hold").isChecked(), true);
    assert.equal(await touch.locator("#menu-hold").isVisible(), false, "Reduced motion keeps the bypass but not the control visible");
    await touch.locator('[data-depth="0"]').tap();
    await touch.clock.runFor(6000);
    assert.equal(await touch.locator('[data-depth="1"]').isVisible(), true, "Reduced motion must bypass the touch timer by default");
    await touch.goto(origin);
    assert.equal(await touch.locator(".preview-hover-tightrope").evaluate(preview => {
      const card = preview.closest(".card-art").getBoundingClientRect();
      return [...preview.querySelectorAll("strong, .hover-preview-kicker, .hover-preview-verdict")].every(element => {
        const bounds = element.getBoundingClientRect();
        return bounds.top >= card.top + 30 && bounds.bottom <= card.bottom && bounds.left >= card.left && bounds.right <= card.right;
      });
    }), true, `Thumbnail copy must fit at ${width}`);
    await touch.locator('.card-art:has(.preview-hover-tightrope)').screenshot({ path: `${screenshots}/thumbnail-${width}.png` });
    await context.close();
  }
  assert.deepEqual(errors, []);
  console.log(`Hover corridors, mouse/touch deadlines, touch completion, keyboard/fixed/hold/reduced-motion bypasses, and responsive screenshots passed: ${screenshots}`);
} finally {
  await browser.close();
}