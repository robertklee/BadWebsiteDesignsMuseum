import assert from "node:assert/strict";
import { chromium } from "playwright";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
const errors = [];

async function hit(page, step, working = true, touch = false) {
  const button = page.locator(`[data-chair-step="${step}"]`);
  const point = await button.evaluate((element, active) => {
    const rect = element.getBoundingClientRect();
    const left = parseFloat(element.style.getPropertyValue("--working-left")) / 100;
    const width = parseFloat(element.style.getPropertyValue("--working-width")) / 100;
    const x = active ? left + width / 2 : left > .1 ? .05 : .95;
    return { x: rect.x + rect.width * x, y: rect.y + rect.height / 2 };
  }, working);
  if (touch) await page.touchscreen.tap(point.x, point.y);
  else await page.mouse.click(point.x, point.y);
}

try {
  for (const width of [1280, 390, 320]) {
    for (const mode of ["easy", "hard", "fixed"]) {
      const page = await browser.newPage({ viewport: { width, height: 1100 }, hasTouch: width < 500, reducedMotion: "reduce" });
      page.on("pageerror", error => errors.push(error.message));
      await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
      await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
      await page.goto(`${origin}/exhibit/unresponsive-buttons?mode=${mode}`);
      await page.locator(".sometimes-controls").scrollIntoViewIfNeeded();
      const quantity = () => page.locator(".sometimes-count").textContent();
      await page.evaluate(() => {
        window.completions = 0;
        document.querySelector("#stage").addEventListener("exhibit-complete", () => window.completions++);
      });
      assert.equal(await quantity(), "1");
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.locator("#sometimes-confirm").click();
      assert.match(await page.locator("#extra-status").textContent(), /exactly five/);
      if (mode === "fixed") {
        for (let index = 0; index < 4; index++) {
          await hit(page, 1, index % 2 === 0, width < 500);
          assert.equal(await quantity(), String(index + 2), "Every part responds immediately in Fix it");
        }
      } else {
        await page.locator("#sometimes-reveal").click();
        assert.equal(await page.locator("#sometimes-reveal").getAttribute("aria-pressed"), "true");
        await page.locator(".sometimes-controls").scrollIntoViewIfNeeded();
        await hit(page, 1, false, width < 500);
        await page.clock.runFor(1700);
        assert.equal(await quantity(), "1", "Dead area ignores clicks and taps");
        const initialLeft = await page.locator('[data-chair-step="1"]').evaluate(element => element.style.getPropertyValue("--working-left"));
        for (let index = 0; index < 7; index++) await hit(page, 1, true, width < 500);
        assert.equal(await quantity(), "1", "Accepted clicks initially appear unresponsive");
        await page.locator("#sometimes-confirm").click();
        assert.match(await page.locator("#extra-status").textContent(), /still on their way/);
        await page.clock.runFor(mode === "hard" ? 1599 : 899);
        assert.equal(await quantity(), "1", "Hard mode has a longer delay");
        await page.clock.runFor(1);
        assert.equal(await quantity(), "8", "Rapid clicks overshoot instead of being debounced");
        assert.notEqual(await page.locator('[data-chair-step="1"]').evaluate(element => element.style.getPropertyValue("--working-left")), initialLeft);
        assert.equal(await page.evaluate(() => window.completions), 0, "Passing through five is not completion");
        await page.locator(".sometimes-controls").scrollIntoViewIfNeeded();
        for (let index = 0; index < 3; index++) await hit(page, -1, true, width < 500);
        await page.clock.runFor(1700);
        assert.equal(await quantity(), "5", "Minus allows recovery from overshoot");
      }
      await page.locator("#sometimes-confirm").click();
      assert.equal(await page.evaluate(() => window.completions), 1);
      assert.equal(await page.locator('[data-chair-step="1"]').isDisabled(), true);
      if (mode === "easy") await page.locator('[data-difficulty-action="stay"]').click();
      await page.locator(".reset-button").click();
      assert.equal(await quantity(), "1");
      assert.equal(await page.locator('[data-mode="bad"]').getAttribute("aria-pressed"), "true");
      // Keyboard input bypasses spatial hit testing but still demonstrates the delay.
      await page.locator('[data-chair-step="1"]').focus();
      await page.keyboard.press("Enter");
      await page.keyboard.press("Space");
      await page.clock.runFor(900);
      assert.equal(await quantity(), "3");
      await page.locator('[data-chair-step="-1"]').focus();
      for (let index = 0; index < 6; index++) await page.keyboard.press("Enter");
      await page.clock.runFor(900);
      assert.equal(await quantity(), "0", "Quantity cannot become negative");
      await page.locator('[data-chair-step="1"]').press("Enter");
      await page.evaluate(() => { window.oldCount = document.querySelector(".sometimes-count"); });
      await page.locator('[data-mode="fixed"]').click();
      await page.clock.runFor(2000);
      assert.equal(await page.evaluate(() => window.oldCount.textContent), "0", "Mode switch cancels pending callbacks");
      assert.equal(await quantity(), "1");
      await page.locator('[data-mode="bad"]').click();
      await page.locator('[data-chair-step="1"]').press("Enter");
      await page.locator(".reset-button").click();
      await page.clock.runFor(2000);
      assert.equal(await quantity(), "1", "Reset discards the backlog");
      await page.locator('[data-chair-step="1"]').press("Enter");
      await page.evaluate(() => {
        window.oldCount = document.querySelector(".sometimes-count");
        history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
      });
      await page.clock.runFor(2000);
      assert.equal(await page.evaluate(() => window.oldCount.textContent), "1", "Leaving cancels pending callbacks");
      assert.equal(await page.locator('.exhibit-card[href="/exhibit/unresponsive-buttons"]').count(), 1);
      await page.close();
      console.log(`Passed ${mode} at ${width}px: hit areas, overshoot, recovery, completion, keyboard, and cleanup.`);
    }
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}
