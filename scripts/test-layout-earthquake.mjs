import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3003";
const output = process.env.SCREENSHOT_DIR || "/tmp/layout-earthquake";
await mkdir(output, { recursive: true });
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
const errors = [];
async function openLibrary(page, mode, capture = false) {
  const target = page.locator('[data-article="library"]');
  for (let attempt = 0; attempt < (mode === "fixed" ? 0 : mode === "hard" ? 4 : 2); attempt++) {
    await target.scrollIntoViewIfNeeded();
    const bounds = await target.boundingBox();
    const point = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
    await target.click();
    assert.equal(await page.locator("#news-story").isVisible(), false);
    assert.equal(await page.locator(".news-click-intrusion").count(), attempt + 1);
    assert.equal(await page.evaluate(({ x, y }) => Boolean(document.elementFromPoint(x, y)?.closest(".news-click-intrusion")), point), true, "Intrusion covers the activated link position");
    assert.equal(await page.evaluate(() => window.completions), 0);
    if (capture && attempt === 0) await page.locator("#stage").screenshot({ path: `${output}/intercept-${mode}-${page.viewportSize().width}.png` });
  }
  await target.click();
  assert.equal(await page.locator("#news-story").isVisible(), true);
}
try {
  for (const width of [320, 390, 720, 1280, 1760]) {
    for (const mode of ["easy", "hard", "fixed"]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(`${origin}/exhibit/layout-earthquake?mode=${mode}`);
      await page.locator(".news-front").waitFor();
      const stageBounds = await page.locator("#stage").boundingBox();
      assert(stageBounds.width >= width * .94, "Exhibit uses nearly the full page width");
      if (width <= 720) {
        assert(stageBounds.y < 450, "Mobile exhibit starts without excessive museum chrome");
        const toolbar = await page.locator(".exhibit-toolbar").boundingBox();
        assert(toolbar.height <= 100, "Mobile toolbar stays compact");
        for (const control of await page.locator(".exhibit-toolbar button, .toolbar-exit").all()) {
          const bounds = await control.boundingBox();
          assert(bounds.height >= 44, "Mobile controls retain touch-friendly heights");
          assert(bounds.x >= 0 && bounds.x + bounds.width <= width, "Mobile controls remain on screen");
        }
      }
      await page.screenshot({ path: `${output}/layout-${mode}-${width}.png` });
      await page.close();
    }
    console.log(`Passed exhibit layout at ${width}px in easy, hard and fixed modes.`);
  }
  for (const width of [1280, 390, 320]) {
    for (const mode of ["easy", "hard", "fixed"]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(`${origin}/exhibit/layout-earthquake?mode=${mode}`);
      await page.locator(".news-front").waitFor();
      if (mode !== "fixed") {
        const geometry = await page.evaluate(() => ({
          headline: document.querySelector(".news-lead>h3").getBoundingClientRect().top,
          bottom: document.querySelector(".news-viewport").getBoundingClientRect().bottom,
          count: document.querySelectorAll(".news-briefs article").length,
        }));
        assert(geometry.headline >= geometry.bottom, "Library headline begins below the newspaper viewport");
        assert.equal(geometry.count, mode === "hard" ? 4 : 2);
      }
      await page.evaluate(() => {
        window.completions = 0;
        document.querySelector("#stage").addEventListener("exhibit-complete", () => { window.completions++; });
      });
      await page.waitForFunction(() => [...document.querySelectorAll(".news-photo img")].every(image => image.complete && image.naturalWidth > 0));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.locator("#stage").screenshot({ path: `${output}/front-${mode}-${width}.png` });
      const position = selector => page.locator(selector).evaluate(element => element.offsetTop);
      const before = await position('[data-article="library"]');
      const stageHeight = await page.locator("#stage").evaluate(element => element.offsetHeight);
      await page.locator(".news-viewport").focus();
      assert.equal(await page.locator("#edition-open").isDisabled(), true);
      await page.locator("#edition-step").click();
      assert.equal((await position('[data-article="library"]')) === before, mode === "fixed");
      await page.locator('#news-feed [data-dismiss="0"]').click();
      const dismissed = await page.locator('[data-slot="0"]').evaluate(element => element.clientHeight);
      assert.equal(dismissed > 0, mode === "fixed");
      await page.locator("#edition-step").click();
      assert.equal(await page.locator('#news-feed [data-dismiss="0"]').count(), mode === "hard" ? 1 : 0);
      await openLibrary(page, mode, true);
      const bookmarkBefore = await position("#news-bookmark");
      for (let index = 2; index < 5; index++) await page.locator("#edition-step").click();
      assert.equal((await position("#news-bookmark")) === bookmarkBefore, mode === "fixed");
      await page.locator("#edition-pause").click();
      assert.equal(await page.locator("#edition-step").isDisabled(), true);
      await page.locator("#edition-pause").click();
      for (let index = 5; index < (mode === "hard" ? 10 : 6); index++) await page.locator("#edition-step").click();
      if (mode === "fixed") {
        assert.equal(await page.locator("#edition-state").textContent(), "All sections loaded");
        assert.equal(await page.locator("#edition-step").isDisabled(), true);
      } else {
        for (let index = 0; index < 12; index++) await page.locator("#edition-step").click();
        assert.equal(await page.locator("#edition-state").textContent(), `Live update ${mode === "hard" ? 22 : 18}`);
        assert.equal(await page.locator("#edition-step").isDisabled(), false);
      }
      assert.equal(await page.locator("#news-feed [data-slot]").count(), mode === "hard" ? 6 : 3);
      assert.equal(await page.locator("#news-story [data-story-slot]").count(), mode === "hard" ? 5 : 2);
      if (mode === "hard") {
        assert.equal(await page.locator(".news-squeezed").count(), 1);
        assert((await page.locator('[data-story-slot="4"]').evaluate(element => element.clientHeight)) > 0);
      }
      assert.equal(await page.locator("#stage").evaluate(element => element.offsetHeight), stageHeight);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.locator(".news-viewport").evaluate(element => { element.scrollTop = 200; });
      await page.locator("#stage").screenshot({ path: `${output}/article-${mode}-${width}.png` });
      await page.locator("#news-bookmark").click();
      assert.equal(await page.evaluate(() => window.completions), 1);
      if (mode === "easy") await page.locator("#difficulty-progress button").click();
      await page.close();
      console.log(`Passed ${mode} at ${width}px: auto-start, repeated cycles, extra placements, completion, stable outer layout.`);
    }
  }
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  page.on("pageerror", error => errors.push(error.message));
  await page.clock.install();
  await page.goto(`${origin}/exhibit/layout-earthquake?mode=hard`);
  await page.evaluate(() => { window.completions = 0; });
  await openLibrary(page, "hard");
  assert.equal(await page.locator("#edition-open").isDisabled(), true);
  await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
  const initialUpdate = Number((await page.locator("#edition-state").textContent()).match(/\d+/)?.[0] || 0);
  await page.clock.runFor(1100);
  assert.equal(await page.locator("#edition-state").textContent(), `Live update ${initialUpdate + 1}`);
  assert((await page.locator('[data-story-slot]').evaluateAll(elements => elements.reduce((total, element) => total + element.clientHeight, 0))) > 0);
  await page.locator("#edition-pause").click();
  await page.clock.runFor(5000);
  assert.equal(await page.locator("#edition-state").textContent(), `Live update ${initialUpdate + 1}`);
  await page.locator("#edition-pause").click();
  await page.clock.runFor(1100);
  assert.equal(await page.locator("#edition-state").textContent(), `Live update ${initialUpdate + 2}`);
  await page.clock.runFor(23000);
  assert.equal(await page.locator("#edition-state").textContent(), `Live update ${initialUpdate + 22}`);
  await page.locator('[data-mode="fixed"]').click();
  await page.clock.runFor(5000);
  assert.equal(await page.locator("#edition-state").textContent(), "Edition ready");
  await page.close();
  const touch = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: "reduce" });
  await touch.goto(`${origin}/exhibit/layout-earthquake`);
  for (let attempt = 0; attempt < 2; attempt++) {
    const target = touch.locator('[data-article="library"]');
    await target.scrollIntoViewIfNeeded();
    const bounds = await target.boundingBox();
    const point = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
    await target.tap();
    assert.equal(await touch.locator("#news-story").isVisible(), false);
    assert.equal(await touch.evaluate(({ x, y }) => Boolean(document.elementFromPoint(x, y)?.closest(".news-click-intrusion")), point), true);
    await touch.locator(".news-click-dismiss").click();
  }
  await touch.locator('[data-article="library"]').tap();
  assert.equal(await touch.locator("#news-story").isVisible(), true);
  await touch.locator(".reset-button").click();
  await touch.locator('[data-article="library"]').focus();
  await touch.keyboard.press("Enter");
  assert.equal(await touch.locator(".news-click-intrusion").count(), 1);
  assert.equal(await touch.locator("#news-story").isVisible(), false);
  await touch.close();
  for (const event of ["pointerenter", "pointerdown", "wheel", "scroll", "keydown"]) {
    const interactionPage = await browser.newPage({ reducedMotion: "reduce" });
    await interactionPage.goto(`${origin}/exhibit/layout-earthquake`);
    await interactionPage.locator(".news-viewport").dispatchEvent(event, event === "pointerdown" ? { pointerType: "touch" } : {});
    assert.equal(await interactionPage.locator("#edition-open").isDisabled(), true, `${event} starts loading`);
    await interactionPage.close();
  }
  assert.deepEqual(errors, []);
  console.log(`Passed live article loading, pause/resume, and mode cleanup. Screenshots: ${output}`);
} finally {
  await browser.close();
}