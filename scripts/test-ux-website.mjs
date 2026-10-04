import assert from "node:assert/strict";
import { chromium } from "playwright";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
  : {});
const errors = [];
const modes = ["easy", "hard", "fixed"];
const widths = [1280, 320];
const answers = { name: "Alex Example", email: "alex@example.test", reference: "EVT-2048", seats: "2" };
const otherAnswers = { name: "Robin Guest", email: "robin@fiction.test", reference: "EVT-7310", seats: "4" };
const invalidAnswers = { name: "Alex", email: "alex@example.com", reference: "DEMO123", seats: "5" };

async function open(id, mode, width, reducedMotion = "reduce", clock = false) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    hasTouch: width === 320,
    isMobile: width === 320,
    reducedMotion,
  });
  const page = await context.newPage();
  page.on("pageerror", error => errors.push(`${id}/${mode}/${width}: ${error.message}`));
  await page.addInitScript(() => {
    window.uxCompletions = 0;
    document.addEventListener("exhibit-complete", () => { window.uxCompletions++; });
  });
  if (clock) {
    await page.clock.install();
    await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
  }
  await page.goto(`${origin}/exhibit/${id}?mode=${mode}`);
  await page.locator("#stage").waitFor();
  if (await page.locator(".guide-dismiss").isVisible()) await activate(page, page.locator(".guide-dismiss"));
  return { page, context };
}

async function activate(page, locator) {
  if (page.viewportSize().width === 320) await locator.tap();
  else await locator.click();
}

async function tabTo(page, selector) {
  const target = page.locator(selector);
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await target.evaluate(element => element === document.activeElement)) return;
    await page.keyboard.press("Tab");
  }
  assert.fail(`Tab traversal did not reach ${selector}`);
}

async function enter(page, selector) {
  await tabTo(page, selector);
  await page.keyboard.press("Enter");
}

async function scrollRange(page, selector) {
  const range = page.locator(selector);
  if (page.viewportSize().width === 320) await range.tap();
  await tabTo(page, selector);
  await page.keyboard.press("End");
  assert.equal(await range.inputValue(), "100", `${selector} retains keyboard scroll recovery`);
}

async function unfinished(page, completions = 0) {
  assert.equal(await page.evaluate(() => window.uxCompletions), completions);
  assert.equal(await page.locator("#stage").getAttribute("data-outcome"), null);
  assert.equal(await page.locator("#difficulty-progress").isVisible(), false);
  assert.equal(await page.locator("#exhibit-outcome").isVisible(), false);
}

async function finished(page, completions = 1) {
  assert.equal(await page.evaluate(() => window.uxCompletions), completions, "One completion per accepted attempt");
  assert.equal(await page.locator("#stage").getAttribute("data-outcome"), "success");
  assert.equal(await page.locator("#completion-title").textContent(), "Task complete");
  assert.equal(await page.locator("#difficulty-progress").isVisible(), true);
  assert.equal(await page.locator("#exhibit-outcome").isVisible(), true);
}

async function dismissResult(page) {
  await activate(page, page.getByRole("button", { name: "Hide result notification", exact: true }));
  await activate(page, page.locator('[data-difficulty-action="stay"]'));
}

async function remainsInExhibit(page, id) {
  assert.equal(new URL(page.url()).pathname, `/exhibit/${id}`, "Local Escape must not trigger museum Exit");
  assert.equal(await page.locator("#stage").count(), 1);
}

async function checkDelivery(mode, width) {
  const { page, context } = await open("scroll-modal", mode, width);
  try {
    const trigger = page.locator("#delivery-open");
    const overlay = page.locator(".delivery-overlay");
    const body = page.locator(".delivery-dialog > .delivery-scroll-layout > .delivery-body");
    await activate(page, trigger);
    if (mode !== "fixed") await scrollRange(page, "#delivery-scroll");
    await enter(page, "#delivery-details");
    if (mode === "hard") assert.equal(await page.locator(".delivery-notice").isVisible(), true);
    else assert.equal(await page.locator("#delivery-heading").textContent(), "Delivery details");
    await page.keyboard.press("Escape");
    await remainsInExhibit(page, "scroll-modal");
    assert.equal(await overlay.isVisible(), true, "Nested Escape only closes the nested view");
    assert.equal(await page.locator(".delivery-notice").isVisible(), false);
    assert.equal(await page.locator("#delivery-heading").textContent(), "Delivery options");
    if (mode === "hard") {
      assert.equal(await page.locator("#delivery-details").evaluate(element => element === document.activeElement), true);
    }
    await page.keyboard.press("Escape");
    await remainsInExhibit(page, "scroll-modal");
    assert.equal(await overlay.isVisible(), false);
    assert.equal(await trigger.evaluate(element => element === document.activeElement), true);
    await unfinished(page);

    await page.keyboard.press("Enter");
    assert.equal(await overlay.isVisible(), true);
    if (width === 1280 && mode !== "hard") {
      const backgroundBefore = await page.locator(".delivery-background").evaluate(element => element.scrollTop);
      const dialogBefore = await body.evaluate(element => element.scrollTop);
      await body.hover();
      await page.mouse.wheel(0, mode === "fixed" ? 120 : -120);
      await page.waitForTimeout(200);
      const backgroundAfter = await page.locator(".delivery-background").evaluate(element => element.scrollTop);
      const dialogAfter = await body.evaluate(element => element.scrollTop);
      if (mode === "fixed") {
        assert.equal(backgroundAfter, backgroundBefore, "Fixed wheel leaves checkout still");
        assert(dialogAfter > dialogBefore, "Fixed wheel scrolls delivery information");
      } else {
        assert(backgroundAfter < backgroundBefore, "Easy still scrolls the wrong layer");
        assert.equal(dialogAfter, dialogBefore, "Easy wheel does not fix the deliberate obstacle");
      }
    }
    if (mode !== "fixed") await scrollRange(page, "#delivery-scroll");
    if (mode === "hard") {
      await enter(page, "#delivery-details");
      await scrollRange(page, "#delivery-notice-scroll");
    }
    const express = page.getByRole("radio", { name: /Fastest.*2 days.*\$5,000/ });
    const standard = page.getByRole("radio", { name: /Standard delivery.*3 days.*Free/ });
    assert.equal(await standard.count(), 1, "Task and free option share the Standard name");
    if (mode !== "fixed") assert.match(await standard.locator("..").textContent(), /I'm OK waiting an extra day/);
    await activate(page, express);
    if (mode === "hard") await enter(page, "#delivery-notice-done");
    await enter(page, "#delivery-confirm");
    await unfinished(page);
    assert.match(await page.locator("#extra-status").textContent(), /free three-day delivery.*\$5,000/);
    assert.equal(await page.locator("#delivery-selection").textContent(), "Not selected");

    if (mode === "hard") {
      await enter(page, "#delivery-details");
      await scrollRange(page, "#delivery-notice-scroll");
    }
    const expressSelector = mode === "hard"
      ? '.delivery-notice input[value="express"]'
      : '.delivery-dialog input[value="express"]';
    await tabTo(page, expressSelector);
    await page.keyboard.press("ArrowDown");
    assert.equal(await standard.isChecked(), true, "Actual radio keyboard selection reaches Standard");
    if (mode === "hard") {
      await enter(page, "#delivery-notice-done");
      assert.match(await page.locator("#delivery-speed-summary").textContent(), /^Standard delivery.*3 days.*Free/);
    }
    await enter(page, "#delivery-confirm");
    await finished(page);
    assert.equal(await overlay.isVisible(), false);
    assert.equal(await page.locator("#delivery-selection").textContent(), "Standard — Free / 3 days");
    assert.match(await page.locator("#delivery-order-summary").textContent(), /Standard delivery confirmed.*Free.*3 days/);
    assert.equal(await trigger.textContent(), "Standard delivery confirmed");
    assert.equal(await trigger.isDisabled(), true, "Completed chooser truthfully names the locked service");
    assert.doesNotMatch(await page.locator(".delivery-background").textContent(), /Not selected|not yet selected/i);
    await dismissResult(page);
    assert.equal(await page.locator("#delivery-selection").textContent(), "Standard — Free / 3 days", "Summary outlives museum result surfaces");
    assert.equal(await page.evaluate(() => window.uxCompletions), 1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await activate(page, page.locator(".reset-button"));
    await unfinished(page, 1);
    assert.equal(await page.locator("#delivery-selection").textContent(), "Not selected");
    assert.equal(await page.locator("#delivery-open").isEnabled(), true);
  } finally {
    await context.close();
  }
}

async function writeForm(page, values, keyboard = false) {
  for (const [id, value] of Object.entries(values)) {
    const selector = `#registration-${id}`;
    if (keyboard) {
      await tabTo(page, selector);
      await page.keyboard.press("ControlOrMeta+A");
      await page.keyboard.type(value);
    } else await page.locator(selector).fill(value);
  }
}

async function checkRejectedForm(page, mode, id, value, completions = 0) {
  await writeForm(page, { ...answers, [id]: value });
  await enter(page, "#afterthought-form button");
  await unfinished(page, completions);
  for (const [field, validValue] of Object.entries(answers)) {
    assert.equal(await page.locator(`#registration-${field}`).inputValue(),
      field === id ? value : mode === "fixed" ? validValue : "",
      `${mode} preserves the rejected answer and only Fixed preserves other answers`);
  }
  if (mode === "fixed") {
    assert.equal(await page.locator(`#registration-${id}`).getAttribute("aria-invalid"), "true");
    assert.equal(await page.locator("#registration-error").isVisible(), false);
  } else {
    const banner = await page.locator("#registration-error").textContent();
    assert.match(banner, /Other answers have been cleared/);
    assert.match(banner, mode === "hard" ? /^Registration unsuccessful\./ : /rejected\./);
    if (mode === "hard") assert.doesNotMatch(banner, /Guest name|Email address|Booking reference|Seats rejected/);
  }
}

async function checkLockedForm(page, values, completions) {
  await finished(page, completions);
  const submit = page.locator("#afterthought-form button");
  assert.equal(await submit.isDisabled(), true);
  assert.equal(await submit.textContent(), "Place reserved");
  assert.equal(await page.locator("#registration-error").isVisible(), false);
  const status = await page.locator("#extra-status").textContent();
  assert.match(status, /place is reserved.*answers are locked.*Restart/);
  for (const [id, value] of Object.entries(values)) {
    const input = page.locator(`#registration-${id}`);
    assert.equal(await input.getAttribute("readonly"), "", "All four accepted answers are locked");
    await tabTo(page, `#registration-${id}`);
    await page.keyboard.press("ControlOrMeta+A");
    await page.keyboard.press("Backspace");
    await page.keyboard.type(invalidAnswers[id]);
    assert.equal(await input.inputValue(), value, "Typing cannot mutate the accepted reservation");
    assert.notEqual(await input.getAttribute("aria-invalid"), "true");
    assert.equal(await page.locator(`#error-${id}`).textContent(), "");
  }
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => window.uxCompletions), completions, "Implicit resubmission cannot repeat completion");
  assert.equal(await page.locator("#extra-status").textContent(), status, "Accepted registration stays visibly stable");
}

async function checkRegistration(mode, width) {
  const { page, context } = await open("validation-afterthought", mode, width);
  try {
    for (const id of Object.keys(answers)) assert.equal(await page.locator(`#rule-${id}`).isVisible(), mode === "fixed");
    for (const [id, value] of Object.entries(invalidAnswers)) await checkRejectedForm(page, mode, id, value);
    await writeForm(page, answers, true);
    await enter(page, "#afterthought-form button");
    await checkLockedForm(page, answers, 1);
    await dismissResult(page);
    assert.match(await page.locator("#extra-status").textContent(), /place is reserved/);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await activate(page, page.locator(".reset-button"));
    await unfinished(page, 1);
    assert.equal(await page.locator("#afterthought-form button").textContent(), "Reserve place");
    assert.equal(await page.locator("#afterthought-form button").isEnabled(), true);
    assert.equal(await page.locator("#extra-status").textContent(), "");
    assert.equal(await page.locator(`[data-mode="${mode === "easy" ? "bad" : mode === "hard" ? "worse" : "fixed"}"]`).getAttribute("aria-pressed"), "true");
    for (const id of Object.keys(answers)) {
      assert.equal(await page.locator(`#registration-${id}`).inputValue(), "");
      assert.equal(await page.locator(`#registration-${id}`).getAttribute("readonly"), null);
    }
    await checkRejectedForm(page, mode, "reference", invalidAnswers.reference, 1);
    await writeForm(page, otherAnswers, true);
    await enter(page, "#afterthought-form button");
    await checkLockedForm(page, otherAnswers, 2);
  } finally {
    await context.close();
  }
}

async function checkHover(mode, width) {
  const { page, context } = await open("hover-menu", mode, width, "no-preference", true);
  try {
    const hold = page.locator("#menu-hold");
    assert.match(await page.locator(".new-demo-intro").textContent(), /After two failed tries, Hold menu open appears/);
    assert.equal(await hold.isVisible(), false);
    if (width === 1280) {
      await page.locator('[data-depth="0"]').hover();
      await page.clock.runFor(mode === "hard" ? 2300 : 2900);
      assert.equal(await page.locator('[data-depth="1"]').isVisible(), false, "Mouse deadline remains an obstacle");
    } else {
      await page.locator('[data-depth="0"]').tap();
      await page.clock.runFor(mode === "hard" ? 500 : 700);
      assert.equal(await page.locator('[data-depth="1"]').isVisible(), false, "Touch deadline remains an obstacle");
    }
    assert.equal(await hold.isVisible(), false, "One failure is not advertised as available help");
    assert.doesNotMatch(await page.locator("#extra-status").textContent(), /now available/);
    await enter(page, '[data-depth="0"]');
    await page.clock.runFor(6000);
    assert.equal(await page.locator('[data-depth="1"]').isVisible(), true, "Keyboard still bypasses deadlines");
    await page.keyboard.press("Escape");
    await remainsInExhibit(page, "hover-menu");
    assert.equal(await hold.isVisible(), false, "Manual Escape does not count as a failure");
    await enter(page, '[data-depth="0"]');
    await enter(page, '[data-other="1"]');
    assert.equal(await hold.isVisible(), true, "Exactly two failed tries reveal help");
    assert.equal(await hold.isChecked(), false);
    assert.match(await page.locator("#extra-status").textContent(), /doesn't contain.*Hold menu open is now available above the shop menus/);
    assert.equal(await page.locator("#extra-status").getAttribute("role"), "status", "Reveal uses the existing live status");
    await activate(page, hold);
    for (let depth = 0; depth < (mode === "hard" ? 5 : 4); depth++) {
      await activate(page, page.locator(`[data-depth="${depth}"]`));
      await page.clock.runFor(6000);
    }
    await finished(page);
    assert.match(await page.locator("#hover-product").textContent(), /Adjustable\. Unlike the menu/);
    assert.equal(await page.locator("#hover-product-attempts").textContent(), "2 menu meltdowns.");
    await activate(page, page.locator(".reset-button"));
    await unfinished(page, 1);
    assert.equal(await page.locator("#menu-hold").isVisible(), false);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await activate(page, page.locator(".reset-button"));
    assert.equal(await page.locator("#menu-hold").isChecked(), true, "Reduced motion still automatically holds menus");
    await activate(page, page.locator('[data-depth="0"]'));
    await page.clock.runFor(6000);
    assert.equal(await page.locator('[data-depth="1"]').isVisible(), true);
  } finally {
    await context.close();
  }
}

try {
  for (const width of widths) {
    for (const mode of modes) {
      await checkDelivery(mode, width);
      await checkRegistration(mode, width);
      if (mode !== "fixed") await checkHover(mode, width);
    }
  }
  assert.deepEqual(errors, []);
  console.log("Website UX passed: delivery summaries/paid rejection/local Escape, locked registration/restart, and announced hover help at desktop and 320px across all modes.");
} finally {
  await browser.close();
}
