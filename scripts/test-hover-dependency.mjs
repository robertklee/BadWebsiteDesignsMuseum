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
    await page.locator('[data-depth="0"]').hover();
    const bridge = page.locator('[data-level="1"] .hover-bridge');
    assert.equal(await bridge.locator("span").count(), mode === "hard" ? 5 : 1);
    const bounds = await bridge.boundingBox();
    const center = bounds.x + bounds.width / 2;
    const points = mode === "hard"
      ? [[center, 0], [center, 19], [center + 39, 19], [center + 39, 45], [center, 45], [center, 64]]
      : [[center, 0], [center, 16], [center, 32]];
    await page.mouse.move(center, bounds.y - 3);
    for (const [horizontal, vertical] of points) {
      await page.mouse.move(horizontal, bounds.y + vertical, { steps: 6 });
      await page.clock.runFor(150);
      assert.equal(await page.locator('[data-depth="1"]').isVisible(), true, `${mode} corridor must remain open`);
    }
    await page.mouse.move(center - 40, bounds.y + 10);
    await page.clock.runFor(160);
    assert.equal(await page.locator('[data-depth="1"]').isVisible(), false, `${mode} off-path must close`);
    await page.locator('[data-depth="0"]').focus();
    await page.keyboard.press("Enter");
    await page.clock.runFor(6000);
    assert.equal(await page.locator('[data-depth="1"]').isVisible(), true, "Keyboard must not expire");
    await page.keyboard.press("Escape");
    assert.equal(await page.locator('[data-depth="1"]').isVisible(), false);
  }
  await page.close();
  for (const width of [1280, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, hasTouch: true, isMobile: width < 500 });
    const touch = await context.newPage();
    touch.on("pageerror", error => errors.push(error.message));
    await touch.clock.install();
    await touch.goto(`${origin}/exhibit/hover-menu?mode=hard`);
    for (let depth = 0; depth < 4; depth++) {
      await touch.locator(`[data-depth="${depth}"]`).tap();
      await touch.clock.runFor(6000);
      assert.equal(await touch.locator(`[data-depth="${depth + 1}"]`).isVisible(), true, "Touch must not expire");
    }
    assert.equal(await touch.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await touch.locator("#stage").screenshot({ path: `${screenshots}/hard-${width}.png` });
    await touch.locator('[data-depth="4"]').tap();
    assert.equal(await touch.locator("#hover-product").isVisible(), true);
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
  console.log(`Hover corridors, off-path failure, keyboard, touch, and responsive screenshots passed: ${screenshots}`);
} finally {
  await browser.close();
}