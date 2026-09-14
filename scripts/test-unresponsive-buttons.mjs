import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3000";
const screenshots = "/tmp/museum-unresponsive-buttons";
await mkdir(screenshots, { recursive: true });
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
const errors = [];

async function open(page, mode) {
  await page.goto(`${origin}/exhibit/unresponsive-buttons?mode=${mode}`);
  await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
  await page.evaluate(() => {
    window.completions = 0;
    document.querySelector("#stage").addEventListener("exhibit-complete", () => { window.completions++; });
  });
}

async function pressPatch(page, delta, working = true, touch = false) {
  const button = page.locator(`[data-delta="${delta}"]`);
  await button.scrollIntoViewIfNeeded();
  const bounds = await button.boundingBox();
  const right = (await button.getAttribute("data-side") === "right") === working;
  const horizontal = bounds.width * (right ? 0.8 : 0.2);
  if (touch) await page.touchscreen.tap(bounds.x + horizontal, bounds.y + bounds.height / 2);
  else await button.click({ position: { x: horizontal, y: bounds.height / 2 } });
}

async function quantity(page, expected) {
  assert.equal(await page.locator(".eventually-count").textContent(), String(expected));
}

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  page.on("pageerror", error => errors.push(error.message));
  await page.clock.install();
  for (const mode of ["easy", "hard"]) {
    await open(page, mode);
    await page.locator(".eventually-reserve").click();
    assert.equal(await page.evaluate(() => window.completions), 0);
    await pressPatch(page, 1, false);
    await page.clock.runFor(3000);
    await quantity(page, 1);
    const originalSide = await page.locator('[data-delta="1"]').getAttribute("data-side");
    for (let click = 0; click < 5; click++) await pressPatch(page, 1);
    await quantity(page, 1);
    const delay = mode === "hard" ? 1800 : 1100;
    await page.clock.runFor(delay - 1);
    await quantity(page, 1);
    await page.clock.runFor(1);
    await quantity(page, 2);
    await page.locator(".eventually-reserve").click();
    assert.equal(await page.evaluate(() => window.completions), 0, "Transient target with queued clicks must not complete");
    await page.clock.runFor(1500);
    await quantity(page, 6);
    assert.match(await page.locator(".eventually-caption").textContent(), /committee/);
    const nextSide = await page.locator('[data-delta="1"]').getAttribute("data-side");
    assert.equal(nextSide === originalSide, mode === "easy", "Hard patch must switch sides");
    for (let click = 0; click < 4; click++) await pressPatch(page, -1);
    await page.clock.runFor(4000);
    await quantity(page, 2);
    assert.equal(await page.evaluate(() => window.completions), 0, "Quantity alone must not complete");
    await page.locator(".eventually-reserve").click();
    assert.equal(await page.evaluate(() => window.completions), 1);
    await page.clock.runFor(3000);
    assert.equal(await page.evaluate(() => window.completions), 1, "Completion must fire once");
  }

  await open(page, "hard");
  await page.locator('[data-delta="1"]').focus();
  await page.keyboard.press("Enter");
  await quantity(page, 1);
  await page.clock.runFor(2000);
  await quantity(page, 2);
  await page.locator('[data-delta="-1"]').focus();
  await page.keyboard.press("Space");
  await page.clock.runFor(2000);
  await quantity(page, 1);

  await pressPatch(page, 1);
  await page.locator(".reset-button").click();
  await page.clock.runFor(5000);
  await quantity(page, 1);
  await pressPatch(page, 1);
  await page.locator('[data-mode="fixed"]').click();
  await page.clock.runFor(5000);
  await quantity(page, 1);
  await pressPatch(page, 1, false);
  await quantity(page, 2);
  await pressPatch(page, -1, false);
  await quantity(page, 1);

  await open(page, "hard");
  await pressPatch(page, 1);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.clock.runFor(5000);
  await quantity(page, 1);
  await page.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.clock.runFor(5000);
  await quantity(page, 1);
  await pressPatch(page, 1);
  await page.clock.runFor(2000);
  await quantity(page, 2);
  await pressPatch(page, 1);
  await page.locator(".toolbar-exit").click();
  await page.clock.runFor(5000);
  assert.equal(await page.locator(".eventually-count").count(), 0);

  for (const width of [1280, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, hasTouch: true, isMobile: width < 500, reducedMotion: "reduce" });
    const touch = await context.newPage();
    touch.on("pageerror", error => errors.push(error.message));
    await touch.clock.install();
    for (const mode of ["easy", "hard", "fixed"]) {
      await open(touch, mode);
      await pressPatch(touch, 1, false, true);
      await touch.clock.runFor(3000);
      await quantity(touch, mode === "fixed" ? 2 : 1);
      if (mode !== "fixed") {
        await pressPatch(touch, 1, true, true);
        await touch.clock.runFor(2000);
        await quantity(touch, 2);
      }
      assert.equal(await touch.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${mode} must fit at ${width}px`);
      const controls = await touch.locator(".eventually-stepper").evaluate(element => [...element.children].map(child => {
        const bounds = child.getBoundingClientRect();
        return { left: bounds.left, right: bounds.right };
      }));
      assert.ok(controls[0].right < controls[1].left && controls[1].right < controls[2].left, "Controls must not overlap");
      await touch.locator("#stage").screenshot({ path: `${screenshots}/${mode}-${width}.png` });
      await touch.locator(".eventually-reserve").tap();
      assert.equal(await touch.evaluate(() => window.completions), 1);
    }
    await touch.goto(origin);
    const preview = touch.locator('[href="/exhibit/unresponsive-buttons"] .card-art');
    await preview.screenshot({ path: `${screenshots}/preview-${width}.png` });
    assert.equal(await preview.evaluate(element => {
      const bounds = element.getBoundingClientRect();
      return [...element.querySelectorAll(".thumb-scene, .thumb-scene *")].every(child => {
        const childBounds = child.getBoundingClientRect();
        return childBounds.left >= bounds.left && childBounds.right <= bounds.right
          && childBounds.top >= bounds.top && childBounds.bottom <= bounds.bottom
          && child.scrollWidth <= child.clientWidth && child.scrollHeight <= child.clientHeight;
      });
    }), true, `Preview artwork must fit at ${width}px`);
    await context.close();
  }
  assert.deepEqual(errors, []);
  console.log(`Unresponsive buttons passed: overshoot, recovery, modes, cleanup, keyboard, touch, responsive layouts. Screenshots: ${screenshots}`);
} finally {
  await browser.close();
}