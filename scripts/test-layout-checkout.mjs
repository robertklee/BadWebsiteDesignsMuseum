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
      for (const route of mode === "fixed" ? ["fixed"] : ["add", "refuse", "reconsider"]) {
        const page = await browser.newPage({ viewport: { width, height: 900 }, hasTouch: width < 500, isMobile: width < 500, reducedMotion: "reduce" });
        page.on("pageerror", error => errors.push(error.message));
        const activate = async locator => width < 500 ? locator.tap() : locator.press("Enter");
        await page.goto(`${origin}/exhibit/layout-checkout?mode=${mode}`);
        const checkout = page.locator("#checkout-confirm");
        await checkout.waitFor();
        assert.equal(await page.locator("#checkout-progress").count(), 0);
        assert.doesNotMatch(await page.locator(".checkout-exhibit").innerText(), /Arrivals:|Demo total|Imaginary delivery/);
        assert.equal(await page.locator("#checkout-no-cushion-option").isVisible(), false);
        await page.evaluate(() => {
          window.completions = 0;
          document.querySelector("#stage").addEventListener("exhibit-complete", () => window.completions++);
        });
        await activate(checkout);
        if (mode !== "fixed") {
          const offer = page.locator("#checkout-cushion-offer");
          assert.equal(await offer.isVisible(), true);
          assert.equal(await offer.getByRole("button").count(), 2);
          assert.equal(await page.locator("#checkout-cushion-title").textContent(), "Most customers buy this add-on.");
          assert.equal(await page.locator("#checkout-document").evaluate(element => element.inert), true);
          assert.equal(await page.locator("#checkout-total").textContent(), "$24.00");
          await page.locator("#stage").screenshot({ path: `${output}/popup-${mode}-${route}-${width}.png` });
          const add = page.locator("#checkout-add-cushion");
          const refuse = page.locator("#checkout-refuse-cushion");
          if (route !== "add") {
            for (let step = 0; step < (route === "refuse" ? 4 : 1); step++) {
              await activate(refuse);
              assert.equal(await page.locator("#checkout-total").textContent(), "$24.00");
              assert.equal(await page.locator("#checkout-no-cushion-option").isVisible(), false);
              assert.equal(await page.evaluate(() => window.completions), 0);
              assert.equal(await page.locator("#checkout-basket-count").textContent(), "1 item");
            }
          }
          const statusBefore = await page.locator("#extra-status").textContent();
          if (route === "refuse") {
            assert.equal(await refuse.textContent(), "Not today");
            assert.doesNotMatch(await offer.textContent(), /refusal fee|feelings fee/i);
            await page.locator("#stage").screenshot({ path: `${output}/not-today-${mode}-${width}.png` });
            await activate(refuse);
          } else await activate(add);
          assert.equal(await offer.isVisible(), false);
          assert.equal(await page.locator("#checkout-document").evaluate(element => element.inert), false);
          assert.equal(await page.locator("#checkout-total").textContent(), "$30.00");
          assert.equal(await page.locator("#checkout-basket-count").textContent(), route === "refuse" ? "1 item" : "2 items");
          assert.equal(await page.locator("#checkout-cushion").isVisible(), route !== "refuse");
          assert.equal(await page.locator(".checkout-product #checkout-no-cushion-option").isVisible(), route === "refuse");
          assert.equal(await page.locator("#checkout-no-cushion-option").textContent(), "No cushion added, cost $6");
          assert.equal(await page.locator("#checkout-document").getAttribute("data-dave-feelings-refusal-fee"), route === "refuse" ? "600" : "0");
          if (route === "refuse") {
            assert.equal(await page.locator("#extra-status").textContent(), statusBefore);
            assert.equal(await page.locator("#checkout-cart-change").textContent(), "");
          }
          for (let arrival = 0; arrival < (mode === "hard" ? 5 : 4); arrival++) {
            await activate(checkout);
            assert.equal(await checkout.isVisible(), false);
            const deliveryNotice = page.locator(".checkout-delivery-change");
            const deliveryUpgraded = mode === "hard" && (arrival === 0 || arrival === 3);
            assert.equal(await deliveryNotice.count(), deliveryUpgraded ? 1 : 0);
            if (deliveryUpgraded) {
              assert.match(await deliveryNotice.textContent(), /Standard: FREE → Dave: \$12.00/);
              assert.match(await deliveryNotice.textContent(), /Order total: \$30.00 → \$42.00/);
              assert.equal(await deliveryNotice.evaluate(element => {
                const bounds = element.getBoundingClientRect();
                const viewport = document.querySelector("#checkout-viewport").getBoundingClientRect();
                return bounds.top >= viewport.top && bounds.bottom <= viewport.bottom;
              }), true, "Delivery price change is visible without scrolling to the receipt");
              await page.locator("#stage").screenshot({ path: `${output}/delivery-${arrival}-${route}-${width}.png` });
            }
            assert.equal(await page.locator("#checkout-action").evaluate(element => {
              const summary = document.querySelector("#checkout-summary");
              return Boolean(element.compareDocumentPosition(summary) & Node.DOCUMENT_POSITION_FOLLOWING);
            }), arrival % 2 === 0, "Checkout alternates around the receipt in both difficulties");
            assert.equal(await page.evaluate(() => window.completions), 0);
            await activate(page.locator(".checkout-decline"));
            assert.equal(await checkout.isVisible(), true);
            if (mode === "hard") {
              const upgraded = arrival === 0 || arrival === 3;
              assert.equal(await page.locator("#checkout-delivery").inputValue(), upgraded ? "dave" : "standard");
              assert.equal(await page.locator("#checkout-total").textContent(), upgraded ? "$42.00" : "$30.00");
              await page.locator("#checkout-delivery").selectOption("standard");
            }
            assert.equal(await page.locator("#checkout-total").textContent(), "$30.00");
          }
          await activate(checkout);
        }
        assert.equal(await checkout.isDisabled(), true);
        if (mode === "fixed") {
          assert.equal(await page.locator("#checkout-coupon").count(), 0);
          assert.equal(await page.locator("#checkout-delivery").count(), 0);
        }
        assert.equal(await page.evaluate(() => window.completions), 1);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        assert.equal(await page.locator("#checkout-viewport").evaluate(element => element.scrollWidth <= element.clientWidth), true);
        if (mode === "fixed") assert.equal(await page.locator("#checkout-total").textContent(), "$24.00");
        await page.close();
        console.log(`Passed ${mode}/${route} at ${width}px: popup, totals, fee, chase, completion.`);
      }
    }
  }
  for (const width of [1280, 320]) {
    for (const mode of ["easy", "hard"]) {
      for (const route of ["add", "refuse"]) {
        const page = await browser.newPage({ viewport: { width, height: 900 }, hasTouch: width < 500, isMobile: width < 500, reducedMotion: "reduce" });
        page.on("pageerror", error => errors.push(error.message));
        const activate = async locator => width < 500 ? locator.tap() : locator.press("Enter");
        await page.goto(`${origin}/exhibit/layout-checkout?mode=${mode}`);
        const total = page.locator("#checkout-total");
        const checkout = page.locator("#checkout-confirm");
        const coupon = page.locator("#checkout-coupon-code");
        const apply = page.locator("#checkout-coupon-apply");
        const remove = page.locator("#checkout-coupon-remove");
        assert.equal(await coupon.isVisible(), false, "Coupon is optional and initially tucked away");
        await activate(page.locator("#checkout-coupon summary"));
        await coupon.fill("NOTDAVE");
        await activate(apply);
        assert.match(await page.locator("#checkout-coupon-status").textContent(), /not recognised/);
        assert.equal(await total.textContent(), "$24.00");
        await coupon.fill("  sorrydave  ");
        await activate(apply);
        assert.equal(await total.textContent(), "$25.00");
        assert.equal(await coupon.isDisabled(), true);
        assert.equal(await page.locator("#checkout-coupon-charges").isVisible(), true);
        await page.locator("#checkout-coupon-form").dispatchEvent("submit");
        assert.equal(await total.textContent(), "$25.00", "Repeated application cannot stack charges");
        await activate(remove);
        assert.equal(await total.textContent(), "$24.00");
        assert.equal(await page.locator("#checkout-coupon-charges").isVisible(), false);
        await activate(apply);
        assert.equal(await total.textContent(), "$25.00");
        if (mode === "hard") {
          await page.locator("#checkout-delivery").selectOption("dave");
          assert.equal(await total.textContent(), "$37.00");
          await page.locator("#checkout-delivery").selectOption("standard");
          assert.equal(await total.textContent(), "$25.00");
        }
        await activate(checkout);
        if (route === "refuse") {
          for (let step = 0; step < 5; step++) await activate(page.locator("#checkout-refuse-cushion"));
        } else await activate(page.locator("#checkout-add-cushion"));
        assert.equal(await total.textContent(), "$31.00", "Coupon composes with either cushion outcome");
        let appeals = 0;
        for (let arrival = 0; arrival < (mode === "hard" ? 5 : 4); arrival++) {
          await activate(checkout);
          if ((await page.locator("#checkout-recommendations").textContent()).includes("reopened your case")) appeals++;
          await activate(page.locator(".checkout-decline"));
          assert.equal(await total.textContent(), mode === "hard" ? "$43.00" : "$31.00");
        }
        assert.equal(appeals, mode === "hard" ? 1 : 0, "Dave appeals exactly one refusal in Hard only");
        if (mode === "hard") {
          await page.locator("#checkout-delivery").selectOption("standard");
          assert.equal(await total.textContent(), "$31.00");
        }
        await activate(remove);
        assert.equal(await total.textContent(), "$30.00", "Removing coupon also removes processing fee");
        await activate(apply);
        assert.equal(await total.textContent(), "$31.00");
        await page.locator("#checkout-coupon").scrollIntoViewIfNeeded();
        await page.locator("#stage").screenshot({ path: `${output}/coupon-${mode}-${route}-${width}.png` });
        assert.equal(await page.locator("#checkout-viewport").evaluate(element => element.scrollWidth <= element.clientWidth), true);
        await activate(checkout);
        assert.equal(await checkout.isDisabled(), true, "Hard becomes finishable after two upgrades and one appeal");
        assert.equal(await total.textContent(), "$31.00");
        assert.equal(await remove.isDisabled(), true);
        if (mode === "hard") assert.equal(await page.locator("#checkout-delivery").isDisabled(), true);
        await page.locator('[data-mode="fixed"]').click();
        assert.equal(await total.textContent(), "$24.00");
        await page.close();
        console.log(`Passed coupon ${mode}/${route} at ${width}px: validation, reapply, totals, appeal, delivery, completion.`);
      }
    }
  }
  for (const touch of [false, true]) {
    for (const route of ["add", "refuse"]) {
      const page = await browser.newPage({ viewport: { width: touch ? 390 : 1280, height: 844 }, hasTouch: touch, isMobile: touch });
      page.on("pageerror", error => errors.push(error.message));
      const activate = async locator => touch ? locator.tap() : locator.click();
      await page.goto(`${origin}/exhibit/layout-checkout?mode=hard`);
      const checkout = page.locator("#checkout-confirm");
      await activate(checkout);
      const add = page.locator("#checkout-add-cushion");
      const refuse = page.locator("#checkout-refuse-cushion");
      await add.focus();
      await page.keyboard.press("Tab");
      assert.equal(await refuse.evaluate(element => element === document.activeElement), true);
      await page.keyboard.press("Tab");
      assert.equal(await add.evaluate(element => element === document.activeElement), true);
      if (route === "refuse") {
        for (let step = 0; step < 5; step++) await activate(refuse);
      } else await activate(add);
      await checkout.scrollIntoViewIfNeeded();
      const bounds = await checkout.boundingBox();
      if (touch) {
        await page.touchscreen.tap(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
        for (let repeat = 0; repeat < 3; repeat++) await page.touchscreen.tap(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
      } else {
        await checkout.evaluate(element => element.blur());
        await page.waitForFunction(() => performance.now() > 700);
        await page.mouse.move(0, 0);
        await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
      }
      assert.equal(await page.locator("#checkout-recommendations").isVisible(), true, "The chase starts after either upsell branch");
      assert.equal(await checkout.isVisible(), false);
      await page.locator('[data-mode="fixed"]').click();
      assert.equal(await page.locator("#checkout-total").textContent(), "$24.00");
      assert.equal(await page.locator("#checkout-document").evaluate(element => element.inert), false);
      await activate(checkout);
      assert.equal(await checkout.isDisabled(), true);
      await page.goto(`${origin}/exhibit/layout-checkout?mode=hard`);
      await activate(checkout);
      await page.locator('[data-mode="fixed"]').click();
      assert.equal(await page.locator("#checkout-cushion-offer").isVisible(), false);
      assert.equal(await page.locator("#checkout-document").evaluate(element => element.inert), false);
      await page.close();
      console.log(`Passed ${touch ? "touch" : "mouse"}/${route}: focus, automatic chase, reset, popup escape.`);
    }
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}