import assert from "node:assert/strict";
import { chromium } from "playwright";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
  : {});
const errors = [];

async function open(id, mode, width) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    hasTouch: width === 320,
    isMobile: width === 320,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("pageerror", error => errors.push(error.message));
  await page.addInitScript(() => {
    window.completions = 0;
    document.addEventListener("exhibit-complete", () => { window.completions++; });
  });
  await page.goto(`${origin}/exhibit/${id}?mode=${mode}`);
  await page.locator("#stage").waitFor();
  return { page, context };
}

async function completionCount(page, expected) {
  assert.equal(await page.evaluate(() => window.completions), expected);
}

async function store(mode, width) {
  const { page, context } = await open("ai-store", mode, width);
  const product = id => page.locator(`[data-ai-product="${id}"]`);
  const prompt = page.locator("#ai-prompt");
  const response = page.locator("#ai-response");
  const generate = page.getByRole("button", { name: "Generate unnecessary intelligence" });
  const activate = page.locator("#ai-activate");
  const required = mode === "hard" ? 3 : 1;
  const status = page.locator("#extra-status");
  const choose = locator => width === 320 ? locator.tap() : locator.click();
  const setupRounds = async rounds => {
    for (let round = 0; round < rounds; round++) await choose(generate);
  };
  try {
    await choose(product("spoon"));
    if (mode !== "fixed") {
      assert.match(await page.locator("#ai-setup").innerText(), /letters “soup”.*inside another word/);
      await prompt.fill("This object needs no intelligence.");
      await choose(generate);
      assert.match(await response.textContent(), /Not accepted.*letters soup.*inside another word/);
      assert.equal(await activate.isDisabled(), true);
      await completionCount(page, 0);
      await prompt.fill("I want this for soup.");
      await setupRounds(required);
      assert.equal(await prompt.getAttribute("readonly"), "");
      assert.equal(await generate.isDisabled(), true);
      await choose(activate);
    }
    assert.match(await status.textContent(), /still need an umbrella/);
    await completionCount(page, 0);

    await choose(product("umbrella"));
    if (mode !== "fixed") {
      assert.match(await page.locator("#ai-setup").innerText(), /letters “rain”.*inside another word/);
      await prompt.fill("");
      await prompt.pressSequentially("rain");
      await choose(generate);
      assert.equal(await activate.isDisabled(), true, "Short matching text cannot activate a plan");
      assert.match(await response.textContent(), /Setup: 0/);
      await prompt.fill("Keep my head completely dry.");
      await choose(generate);
      assert.match(await response.textContent(), /Not accepted.*letters rain/);
      await prompt.fill("Protect me from RAIN.");
      await choose(generate);
      const savedResponse = await response.textContent();
      assert.match(savedResponse, new RegExp(`Setup: 1 / ${required}`));
      await choose(product("umbrella"));
      assert.equal(await prompt.inputValue(), "Protect me from RAIN.");
      assert.equal(await response.textContent(), savedResponse, "Reopening retains accepted rounds");

      await choose(product("rock"));
      assert.equal(await prompt.inputValue(), "", "Another product has its own draft");
      assert.match(await response.textContent(), /Setup: 0/);
      await prompt.fill("Hold the door securely.");
      await choose(generate);
      const rockResponse = await response.textContent();
      await choose(product("umbrella"));
      assert.equal(await prompt.inputValue(), "Protect me from RAIN.");
      assert.equal(await response.textContent(), savedResponse);
      await choose(product("rock"));
      assert.equal(await prompt.inputValue(), "Hold the door securely.");
      assert.equal(await response.textContent(), rockResponse);
      await choose(product("umbrella"));
      await setupRounds(required - 1);
      assert.equal(await activate.isDisabled(), false);
      assert.equal(await prompt.getAttribute("readonly"), "");
      assert.equal(await generate.isDisabled(), true);
      await choose(activate);
      assert.equal(await page.locator("#ai-setup").isVisible(), false);
    }
    await completionCount(page, 1);
    assert.equal(await page.locator("#stage").getAttribute("data-outcome"), "success");
    assert.match(await status.textContent(), /Umbrella added/);
    assert.equal(await page.locator("#ai-basket-items li").count(), 2);

    await choose(product("spoon"));
    if (mode !== "fixed") {
      assert.equal(await prompt.inputValue(), "", "A purchased plan never resurrects its accepted setup");
      assert.match(await response.textContent(), /Setup: 0/);
      assert.equal(await activate.isDisabled(), true);
      await prompt.fill("I want this for soup.");
      await setupRounds(required);
      await choose(activate);
    }
    assert.match(await status.textContent(), /umbrella is already in the basket.*task remains complete/);
    assert.doesNotMatch(await status.textContent(), /still need/);
    await completionCount(page, 1);

    await choose(product("rock"));
    if (mode !== "fixed") {
      assert.equal(await prompt.inputValue(), "Hold the door securely.", "Purchasing another object retains this unfinished plan");
      assert.match(await response.textContent(), new RegExp(`Setup: 1 / ${required}`));
      await setupRounds(required - 1);
      await choose(activate);
    }
    assert.match(await status.textContent(), /umbrella is already in the basket.*task remains complete/);
    await completionCount(page, 1);

    await choose(product("umbrella"));
    if (mode !== "fixed") {
      assert.equal(await prompt.inputValue(), "");
      assert.match(await response.textContent(), /Setup: 0/);
      assert.equal(await activate.isDisabled(), true);
      await prompt.fill("I enjoy brain puzzles.");
      await setupRounds(required);
      assert.match(await response.textContent(), /Ready to activate/);
      await choose(activate);
    }
    await completionCount(page, 1);
    assert.equal(await page.locator("#ai-basket-items li").count(), 5);
    assert.equal(await page.locator("#stage").getAttribute("data-outcome"), "success");
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    console.log(`Passed AI ${mode} at ${width}px: keyword rules, independent drafts, plan locking, optional shopping.`);
  } finally {
    await context.close();
  }
}

async function museumAccess(mode, width) {
  const { page, context } = await open("layout-checkout", mode, width);
  const checkout = page.locator("#checkout-confirm");
  const offer = page.locator("#checkout-cushion-offer");
  try {
    await checkout.press("Enter");
    assert.equal(await offer.isVisible(), true);
    assert.equal(await offer.getAttribute("aria-modal"), "true");
    assert.equal(await page.locator("#checkout-add-cushion").evaluate(button => button === document.activeElement), true);
    await page.keyboard.press("Shift+Tab");
    assert.equal(await page.locator("#checkout-museum-controls").evaluate(button => button === document.activeElement), true);
    await page.keyboard.press("Tab");
    assert.equal(await page.locator("#checkout-add-cushion").evaluate(button => button === document.activeElement), true);
    await page.keyboard.press("Tab");
    assert.equal(await page.locator("#checkout-refuse-cushion").evaluate(button => button === document.activeElement), true);
    await page.keyboard.press("Enter");
    const reply = await page.locator("#checkout-cushion-reply").textContent();
    assert.match(reply, /Are you sure/);
    await page.keyboard.press("Escape");
    assert.equal(await offer.isVisible(), false, "Escape dismisses locally, not the exhibit");
    assert.equal(await page.locator("#checkout-document").evaluate(element => element.inert), false);
    assert.equal(await checkout.evaluate(button => button === document.activeElement), true);
    assert.equal(new URL(page.url()).pathname, "/exhibit/layout-checkout");

    await page.keyboard.press("Enter");
    assert.equal(await offer.isVisible(), true, "Dismissal does not bypass the upsell negotiation");
    assert.equal(await page.locator("#checkout-cushion-reply").textContent(), reply);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    assert.equal(await page.locator("#checkout-museum-controls").evaluate(button => button === document.activeElement), true);
    await page.keyboard.press("Enter");
    assert.equal(await offer.isVisible(), false);
    assert.equal(await page.locator("#checkout-document").evaluate(element => element.inert), false);
    assert.equal(await page.evaluate(() => !!document.activeElement.closest(".exhibit-toolbar")), true);
    assert.equal(await page.locator("#checkout-total").textContent(), "$24.00");
    assert.equal(await page.locator("#checkout-basket-count").textContent(), "1 item");
    assert.equal(await page.locator("#checkout-cushion").isVisible(), false);
    await completionCount(page, 0);
    for (let step = 0; step < 5 && !await page.locator(".toolbar-exit").evaluate(link => link === document.activeElement); step++) {
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => !!document.activeElement.closest(".exhibit-toolbar")), true);
    }
    assert.equal(await page.locator(".toolbar-exit").evaluate(link => link === document.activeElement), true);
    await page.keyboard.press("Enter");
    await page.waitForURL(url => url.pathname === "/" && url.hash === "#collection");
    await page.locator("#stage").waitFor({ state: "detached" });
    await completionCount(page, 0);
    console.log(`Passed checkout ${mode} at ${width}px: local Escape, preserved offer, keyboard Museum controls and safe Exit.`);
  } finally {
    await context.close();
  }
}

async function checkoutOrder(mode, width, refuse = false) {
  const { page, context } = await open("layout-checkout", mode, width);
  const checkout = page.locator("#checkout-confirm");
  try {
    await checkout.press("Enter");
    if (mode !== "fixed") {
      if (refuse) {
        for (let refusal = 0; refusal < 5; refusal++) await page.locator("#checkout-refuse-cushion").press("Enter");
      } else await page.locator("#checkout-add-cushion").press("Enter");
      assert.equal(await page.locator("#checkout-total").textContent(), "$30.00");
      assert.equal(await page.locator("#checkout-basket-count").textContent(), refuse ? "1 item" : "2 items");
      assert.equal(await page.locator("#checkout-cushion").isVisible(), !refuse);
      assert.equal(await page.locator("#checkout-no-cushion-option").isVisible(), refuse);
      for (let arrival = 0; arrival < (mode === "hard" ? 5 : 4); arrival++) {
        await checkout.press("Enter");
        await completionCount(page, 0);
        await page.locator(".checkout-decline").press("Enter");
        if (mode === "hard") await page.locator("#checkout-delivery").selectOption("standard");
      }
      await checkout.press("Enter");
    }
    await completionCount(page, 1);
    assert.equal(await checkout.isDisabled(), true);
    assert.equal(await page.locator("#checkout-total").textContent(), mode === "fixed" ? "$24.00" : "$30.00");
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    console.log(`Passed checkout ${mode}/${refuse ? "refuse" : "add"} at ${width}px: negotiation, prices, one completion.`);
  } finally {
    await context.close();
  }
}

try {
  for (const width of [1280, 320]) {
    for (const mode of ["easy", "hard", "fixed"]) {
      await store(mode, width);
      await checkoutOrder(mode, width);
      if (mode !== "fixed") {
        await checkoutOrder(mode, width, true);
        await museumAccess(mode, width);
      }
    }
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}
