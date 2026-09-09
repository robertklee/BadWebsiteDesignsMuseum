import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3000";
const output = process.env.SCREENSHOT_DIR || "/tmp/layout-checkout";
await mkdir(output, { recursive: true });
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
const errors = [];
try {
  for (const width of [1280, 390, 320]) {
    for (const mode of ["easy", "hard", "fixed"]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(`${origin}/exhibit/layout-checkout?mode=${mode}`);
      const button = page.locator("#checkout-confirm");
      await button.waitFor();
      await page.waitForFunction(() => {
        const image = document.querySelector(".checkout-product-image");
        return image?.complete && image.naturalWidth > 0;
      });
      await page.locator("#stage").screenshot({ path: `${output}/front-${mode}-${width}.png` });
      await page.evaluate(() => {
        window.completions = 0;
        document.querySelector("#stage").addEventListener("exhibit-complete", () => { window.completions++; });
      });
      assert.equal(await button.textContent(), "Checkout");
      const position = () => button.evaluate(element => element.offsetTop);
      const initialPosition = await position();
      const arrivals = mode === "hard" ? 4 : 2;
      if (mode === "fixed") {
        for (let arrival = 0; arrival < arrivals; arrival++) {
          await page.locator("#checkout-arrival").click();
          assert.equal(await position(), initialPosition, "Fixed checkout stays in place");
        }
      }
      await button.scrollIntoViewIfNeeded();
      await button.focus();
      const geometry = await button.boundingBox();
      const status = await page.locator("#extra-status").textContent();
      const progress = await page.locator("#checkout-progress").textContent();
      await button.press("Enter");
      if (mode !== "fixed") {
        assert.equal(await button.textContent(), "Add to cart");
        assert.deepEqual(await button.boundingBox(), geometry, "Silent swap preserves button geometry");
        assert.equal(await page.locator("#extra-status").textContent(), status, "No announcement on first click");
        assert.equal(await page.locator("#checkout-progress").textContent(), progress, "No arrival on first click");
        assert.equal(await page.locator("#checkout-total").textContent(), "£24.00");
        assert.equal(await page.evaluate(() => window.completions), 0);
        await page.locator("#stage").screenshot({ path: `${output}/swap-${mode}-${width}.png` });
        await button.press("Space");
        assert.equal(await button.textContent(), "Checkout");
        assert.equal(await page.locator("#checkout-cushion").isVisible(), true);
        assert.equal(await page.locator("#checkout-total").textContent(), "£30.00");
        assert.equal(await page.locator("#checkout-basket-count").textContent(), "2 items");
        for (let arrival = 0; arrival < arrivals; arrival++) {
          await button.press("Enter");
          assert.equal(await page.evaluate(() => window.completions), 0);
          assert.equal(await button.evaluate(element => element === document.activeElement), true);
        }
        await button.scrollIntoViewIfNeeded();
        await page.locator("#stage").screenshot({ path: `${output}/offers-${mode}-${width}.png` });
        await button.press("Enter");
      } else {
        assert.equal(await page.locator("#checkout-cushion").isVisible(), false);
        assert.equal(await page.locator("#checkout-total").textContent(), "£24.00");
      }
      assert.equal(await button.isDisabled(), true);
      assert.equal(await page.locator("#checkout-document > :last-child").getAttribute("class"), "checkout-footer");
      assert.equal(await page.evaluate(() => window.completions), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      assert.equal(await page.locator("#checkout-viewport").evaluate(element => element.scrollWidth <= element.clientWidth), true);
      await page.close();
      console.log(`Passed ${mode} at ${width}px: silent swap, cart totals, bounded arrivals, completion, layout.`);
    }
  }
  for (const touch of [false, true]) {
    const page = await browser.newPage({ viewport: { width: touch ? 390 : 1280, height: 1000 }, hasTouch: touch, isMobile: touch });
    await page.goto(`${origin}/exhibit/layout-checkout?mode=hard`);
    for (let arrival = 0; arrival < 4; arrival++) await page.locator("#checkout-arrival").click();
    const button = page.locator("#checkout-confirm");
    if (touch) await button.tap();
    else await button.click();
    assert.equal(await button.textContent(), "Add to cart", "First click swaps even after all arrivals");
    if (touch) await button.tap();
    else await button.click();
    assert.equal(await page.locator("#checkout-total").textContent(), "£30.00");
    if (touch) await button.tap();
    else await button.click();
    assert.equal(await button.isDisabled(), true);
    await page.locator('[data-mode="fixed"]').click();
    assert.equal(await button.textContent(), "Checkout", "Mode switch resets checkout");
    assert.equal(await page.locator("#checkout-total").textContent(), "£24.00");
    await button.click();
    assert.equal(await button.isDisabled(), true);
    await page.close();
    console.log(`Passed ${touch ? "touch" : "mouse"} checkout and mode reset.`);
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}