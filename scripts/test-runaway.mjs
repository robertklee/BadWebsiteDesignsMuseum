import assert from "node:assert/strict";
import { chromium } from "playwright";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
const errors = [];
const behaviors = ["reaction", "exhaustion", "sneak", "corner"];
const target = page => page.locator(".runaway-button");
const arena = page => page.locator(".chase-arena");
const state = page => target(page).getAttribute("data-state");
const position = page => target(page).evaluate(button => ({ x: button.offsetLeft, y: button.offsetTop }));
const status = page => page.locator("#demo-status").textContent();

async function open(behavior, mode = "easy", options = {}) {
  const { hitRoll = 0.3, nativeTransitions = false, warmup = false, ...contextOptions } = options;
  const page = await browser.newPage({ viewport: { width: 1280, height: 1100 }, ...contextOptions });
  page.on("pageerror", error => errors.push(error.message));
  await page.clock.install();
  await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
  await page.addInitScript(({ choice, hitRoll }) => {
    window.randomDraws = [choice, hitRoll];
    let seed = 123456;
    Math.random = () => {
      if (window.randomDraws.length) return window.randomDraws.shift();
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 2 ** 32;
    };
  }, { choice: (behaviors.indexOf(behavior) + 0.5) / behaviors.length, hitRoll });
  await page.goto(`${origin}/exhibit/runaway?mode=${mode}`);
  await target(page).waitFor();
  // Timing assertions test JS deadlines independently of CSS interpolation.
  if (!nativeTransitions) await page.addStyleTag({ content: ".runaway-button { transition: none !important; }" });
  await arena(page).evaluate(element => element.scrollIntoView({ block: "center", behavior: "instant" }));
  await page.evaluate(() => {
    window.completions = 0;
    document.querySelector("#stage").addEventListener("exhibit-complete", () => { window.completions++; });
  });
  assert.equal(await arena(page).getAttribute("data-behavior"), mode === "fixed" ? "fixed" : behavior);
  if (!warmup && mode !== "fixed" && contextOptions.reducedMotion !== "reduce" && !contextOptions.isMobile) {
    await unlock(page, mode, nativeTransitions);
  }
  return page;
}

async function unlock(page, mode, nativeTransitions = false) {
  for (let index = 0; index < (mode === "hard" ? 20 : 10); index++) {
    await page.clock.runFor(101);
    await approach(page);
    if (nativeTransitions) await page.waitForTimeout(100);
  }
  await page.mouse.move(0, 0);
  await page.clock.runFor(101);
  assert.equal(await arena(page).getAttribute("data-phase"), "challenge");
}

async function point(page, edge = false) {
  const bounds = await target(page).boundingBox();
  return { x: bounds.x + (edge ? 2 : bounds.width / 2), y: bounds.y + (edge ? 2 : bounds.height / 2) };
}

async function approach(page, edge = false) {
  const { x, y } = await point(page, edge);
  await page.mouse.move(x, y);
}

async function assertWon(page, method) {
  assert.equal(await target(page).isDisabled(), true);
  assert.equal(await page.locator("body").evaluate(body => body.classList.contains("runaway-won")), true);
  assert.match(await status(page), new RegExp(method));
  assert.equal(await page.evaluate(() => window.completions), 1);
  if (await page.locator("#difficulty-progress").isVisible()) {
    await page.locator('[data-difficulty-action="stay"]').dispatchEvent("click");
  }
  const settled = await position(page);
  await page.clock.runFor(5000);
  assert.deepEqual(await position(page), settled, "Winning cancels all evasion");
  assert.equal(await page.evaluate(() => window.completions), 1);
}

async function exhaust(page, escapes) {
  for (let index = 0; index < escapes; index++) {
    await page.clock.runFor(101);
    const before = await position(page);
    await approach(page);
    assert.notDeepEqual(await position(page), before, `Escape ${index + 1} relocates the button`);
    assert.equal(await state(page) === "resting", index === escapes - 1, "Rest begins at the configured escape count");
  }
}

async function herd(page, mode) {
  const maxStep = mode === "hard" ? 140 : 90;
  let moves = 0;
  for (; moves < 40; moves++) {
    await page.clock.runFor(101);
    const before = await position(page);
    await approach(page, true);
    const after = await position(page);
    assert(Math.hypot(after.x - before.x, after.y - before.y) <= maxStep + 2, "Herding never teleports");
    if (await state(page) === "cornered") break;
  }
  assert(moves < 40, "A consistent top-left approach traps the button at the bottom-right");
  const pinned = await position(page);
  await page.clock.runFor(2000);
  await approach(page);
  assert.deepEqual(await position(page), pinned, "A cornered button remains catchable");
}

async function bounded(page) {
  assert.equal(await target(page).evaluate(button => {
    const arena = button.parentElement;
    return button.offsetLeft >= 0 && button.offsetTop >= 0
      && button.offsetLeft + button.offsetWidth <= arena.clientWidth + 1
      && button.offsetTop + button.offsetHeight <= arena.clientHeight + 1;
  }), true, "The entire target stays inside the arena");
}

try {
  for (const mode of ["easy", "hard"]) {
    const duration = mode === "hard" ? 20000 : 10000;
    const escapes = mode === "hard" ? 20 : 10;
    const page = await open("reaction", mode, { warmup: true, hasTouch: true });
    const initial = await position(page);
    await page.clock.runFor(duration * 2);
    assert.equal(await arena(page).getAttribute("data-phase"), "warmup", "Idle time before mouse play cannot unlock the weakness");
    await approach(page);
    assert.notDeepEqual(await position(page), initial, "The opening uses immediate original evasion, not a reaction delay");
    // Even a direct mouse press during the cooldown is not an early win.
    await target(page).dispatchEvent("pointerdown", { pointerType: "mouse", button: 0 });
    assert.equal(await target(page).isDisabled(), false);
    for (let index = 1; index < escapes; index++) {
      assert.equal(await arena(page).getAttribute("data-phase"), "warmup", `Fewer than ${escapes} escapes cannot unlock early`);
      await page.clock.runFor(101);
      await approach(page);
    }
    assert((escapes - 1) * 101 < duration);
    assert.equal(await arena(page).getAttribute("data-phase"), "challenge", `Escape ${escapes} unlocks without waiting for the timer`);
    assert.match(await status(page), /running out of excuses/);
    await approach(page);
    assert.equal(await state(page), "hesitating", "The chosen weakness becomes available after the opening");
    await page.close();

    const timed = await open("sneak", mode, { warmup: true });
    await approach(timed);
    await timed.mouse.move(0, 0);
    await timed.clock.runFor(duration - 1);
    assert.equal(await arena(timed).getAttribute("data-phase"), "warmup", "The time path cannot unlock before its deadline");
    await timed.clock.runFor(1);
    assert.equal(await arena(timed).getAttribute("data-phase"), "challenge", `${duration / 1000} seconds unlocks with only one escape`);
    await timed.close();

    const hybrid = await open("corner", mode, { warmup: true, hasTouch: true });
    await approach(hybrid);
    await hybrid.clock.runFor(1000);
    await hybrid.touchscreen.tap(10, 10);
    assert.equal(await arena(hybrid).getAttribute("data-input"), "touch");
    await hybrid.clock.runFor(duration * 2);
    assert.equal(await arena(hybrid).getAttribute("data-phase"), "warmup", "Touch play does not consume the mouse opening");
    const hits = mode === "hard" ? 20 : 8;
    for (let hit = 1; hit <= hits; hit++) {
      const next = await point(hybrid);
      await hybrid.touchscreen.tap(next.x, next.y);
      assert.equal(await target(hybrid).isDisabled(), hit === hits, "Touch wins do not depend on unlocking the mouse weakness");
    }
    await assertWon(hybrid, `${hits} direct hits`);
    await hybrid.close();
  }
  console.log("Passed original-evasion openings: time OR escapes (whichever comes first), protected mouse presses, and touch bypass.");

  for (const mode of ["easy", "hard"]) {
    const delay = mode === "hard" ? 180 : 250;
    const page = await open("reaction", mode);
    const initial = await position(page);
    await approach(page);
    assert.equal(await state(page), "hesitating");
    await page.clock.runFor(delay - 1);
    assert.deepEqual(await position(page), initial, "The full reaction window is usable");
    await page.clock.runFor(1);
    assert.notDeepEqual(await position(page), initial, "The button flees at the deadline");
    assert.equal(await page.locator(".runaway-decoy").count(), mode === "hard" ? 5 : 0);
    if (mode === "hard") assert.equal(await target(page).evaluate(button => button.offsetWidth), 100);
    await approach(page);
    const waiting = await position(page);
    await page.mouse.move(0, 0);
    await page.clock.runFor(delay);
    assert.deepEqual(await position(page), waiting, "Leaving cancels a pending escape");
    await approach(page);
    await page.clock.runFor(delay - 1);
    await page.mouse.down({ button: "right" });
    await page.mouse.up({ button: "right" });
    assert.equal(await target(page).isDisabled(), false, "Only the primary button catches");
    await page.mouse.down();
    assert.equal(await target(page).isDisabled(), true, "The catch is settled before mouse-up");
    await page.clock.runFor(1);
    await page.mouse.up();
    await assertWon(page, "pointer catch");
    await page.close();

    const rest = await open("exhaustion", mode);
    const escapes = mode === "hard" ? 8 : 5;
    const duration = mode === "hard" ? 600 : 900;
    await exhaust(rest, escapes);
    const resting = await position(rest);
    await rest.mouse.move(0, 0);
    await rest.clock.runFor(duration - 1);
    assert.equal(await state(rest), "resting");
    assert.deepEqual(await position(rest), resting);
    await rest.clock.runFor(1);
    assert.equal(await state(rest), "ready", "Rest ends at the difficulty-specific deadline");
    await exhaust(rest, escapes);
    assert((await rest.locator(".runaway-decoy").count()) <= 5);
    await approach(rest);
    await rest.mouse.down();
    await rest.mouse.up();
    await assertWon(rest, "pointer catch");
    await rest.close();

    const sneak = await open("sneak", mode);
    const before = await position(sneak);
    await sneak.mouse.move(0, 0);
    await sneak.clock.runFor(5000);
    await approach(sneak);
    assert.notDeepEqual(await position(sneak), before, "A fast jump after idle is not sneaking");
    const bounds = await target(sneak).boundingBox();
    const radius = mode === "hard" ? 65 : 0;
    const direction = bounds.x > radius + 20 ? 1 : -1;
    let x = direction === 1 ? bounds.x - radius - 10 : bounds.x + bounds.width + radius + 10;
    const y = bounds.y + bounds.height / 2;
    await sneak.mouse.move(x, y);
    const still = await position(sneak);
    const destination = bounds.x + bounds.width / 2;
    while (Math.abs(x - destination) > 3) {
      await sneak.clock.runFor(30);
      x += direction * 3;
      await sneak.mouse.move(x, y);
      assert.deepEqual(await position(sneak), still, "A 100 px/s approach does not trigger flight");
    }
    await sneak.mouse.down();
    await sneak.mouse.up();
    await assertWon(sneak, "pointer catch");
    await sneak.close();

    const corner = await open("corner", mode);
    await herd(corner, mode);
    await bounded(corner);
    await corner.mouse.down();
    await corner.mouse.up();
    await assertWon(corner, "pointer catch");
    await corner.close();
    console.log(`Passed ${mode}: reaction deadline, exhaustion cycle, sneaking, cornering, and mouse-down wins.`);
  }

  // Identical cursor speed must pass easy mode but scare the hard-mode button.
  for (const mode of ["easy", "hard"]) {
    const page = await open("sneak", mode);
    const bounds = await target(page).boundingBox();
    const radius = mode === "hard" ? 65 : 0;
    const fromRight = bounds.x < radius + 10;
    const edge = fromRight ? bounds.x + bounds.width + radius : bounds.x - radius;
    await page.mouse.move(edge + (fromRight ? 2 : -2), bounds.y + bounds.height / 2);
    const before = await position(page);
    await page.clock.runFor(20);
    await page.mouse.move(edge + (fromRight ? -2 : 2), bounds.y + bounds.height / 2);
    assert.equal(JSON.stringify(await position(page)) === JSON.stringify(before), mode === "easy", "200 px/s distinguishes the sneak difficulties");
    await page.close();
  }

  for (const behavior of behaviors) {
    for (const mode of ["easy", "hard"]) {
      const page = await open(behavior, mode, { hasTouch: true });
      await page.mouse.move(1, 1);
      assert.equal(await arena(page).getAttribute("data-input"), "mouse", "A mouse overrides a coarse primary pointer");
      if (behavior === "reaction") await approach(page);
      if (behavior === "exhaustion") await exhaust(page, mode === "hard" ? 8 : 5);
      if (behavior === "corner") await herd(page, mode);
      await page.touchscreen.tap(10, 10);
      assert.equal(await arena(page).getAttribute("data-input"), "touch", "Touch outside the arena switches paradigms");
      assert.equal(await state(page), "ready", "Mouse-only openings and pending reactions are cleared");
      const touchStart = await position(page);
      await target(page).dispatchEvent("pointerenter", { pointerType: "mouse" });
      const interval = mode === "hard" ? 900 : 1400;
      await page.clock.runFor(interval - 1);
      assert.deepEqual(await position(page), touchStart, "The mouse timer is cancelled and touch gets its full interval");
      await page.clock.runFor(1);
      assert.notDeepEqual(await position(page), touchStart, "Touch drift replaces every mouse strategy");

      // A touch hit must not finish even if the desktop strategy was resting or cornered.
      const first = await point(page);
      await page.touchscreen.tap(first.x, first.y);
      assert.equal(await target(page).isDisabled(), false);
      assert.match(await status(page), /Direct hits: 1/);
      const touchPosition = await position(page);
      await target(page).dispatchEvent("click", { detail: 1, pointerType: "touch" });
      assert.equal(await target(page).isDisabled(), false, "Compatibility clicks cannot bypass the hit requirement");

      await page.mouse.move(2, 2);
      assert.equal(await arena(page).getAttribute("data-input"), "mouse");
      assert.equal(await arena(page).getAttribute("data-behavior"), behavior, "Switching input does not reroll the behavior");
      await page.clock.runFor(interval * 2);
      assert.deepEqual(await position(page), touchPosition, "Mouse movement stops touch drift");
      const hits = mode === "hard" ? 20 : 8;
      for (let hit = 2; hit <= hits; hit++) {
        const next = await point(page);
        await page.touchscreen.tap(next.x, next.y);
        assert.equal(await target(page).isDisabled(), hit === hits, `Touch catch must happen exactly on hit ${hits}`);
        if (hit < hits) assert.match(await status(page), new RegExp(`Direct hits: ${hit}\\.`));
      }
      await assertWon(page, `${hits} direct hits`);
      await page.close();
    }
  }
  console.log("Passed all eight hybrid combinations: timer cancellation, stale hover, touch hits, and return to mouse.");

  for (const mode of ["easy", "hard"]) {
    for (const [hitRoll, extra] of [[0, -2], [0.999, 4]]) {
      const page = await open("reaction", mode, { hasTouch: true, isMobile: true, viewport: { width: 320, height: 900 }, hitRoll });
      assert.equal(await arena(page).getAttribute("data-input"), "touch");
      // Native mobile taps also exercise click snapping and target resizing on a narrow arena.
      const hits = (mode === "hard" ? 20 : 8) + extra;
      for (let hit = 1; hit <= hits; hit++) {
        await bounded(page);
        const next = await point(page);
        await page.touchscreen.tap(next.x, next.y);
        assert.equal(await target(page).isDisabled(), hit === hits);
      }
      await assertWon(page, `${hits} direct hits`);
      await page.close();
    }
  }

  const pen = await open("reaction", "hard", { hasTouch: true });
  await pen.mouse.move(1, 1);
  await approach(pen);
  await arena(pen).dispatchEvent("pointerdown", { pointerType: "pen", pointerId: 9, button: 0, buttons: 1, clientX: 0, clientY: 0 });
  assert.equal(await arena(pen).getAttribute("data-input"), "touch");
  await pen.mouse.move(2, 2);
  assert.equal(await arena(pen).getAttribute("data-input"), "touch", "An active contact wins over concurrent mouse motion");
  await arena(pen).dispatchEvent("pointercancel", { pointerType: "pen", pointerId: 9 });
  await pen.mouse.move(3, 3);
  assert.equal(await arena(pen).getAttribute("data-input"), "mouse", "Cancelled contacts no longer block mouse input");
  await pen.close();

  for (const behavior of behaviors) {
    const page = await open(behavior, "hard", { warmup: true });
    await approach(page);
    await target(page).focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    const focused = await position(page);
    await page.clock.runFor(5000);
    assert.deepEqual(await position(page), focused, "Keyboard focus pauses pending evasion");
    await page.keyboard.press("Enter");
    await assertWon(page, "keyboard catch");
    await page.close();
  }
  for (const options of [{ reducedMotion: "reduce", hasTouch: true }, { reducedMotion: "reduce" }]) {
    const page = await open("exhaustion", "hard", options);
    const before = await position(page);
    await approach(page);
    await page.clock.runFor(5000);
    assert.deepEqual(await position(page), before);
    if (options.hasTouch) {
      const next = await point(page);
      await page.touchscreen.tap(next.x, next.y);
    } else {
      const next = await point(page);
      await page.mouse.click(next.x, next.y);
    }
    await assertWon(page, "reduced-motion catch");
    await page.close();
  }
  const fixed = await open("reaction", "fixed");
  await target(fixed).click();
  await assertWon(fixed, "stable-button catch");
  await fixed.close();

  const live = await open("reaction", "hard");
  await approach(live);
  const waiting = await position(live);
  await live.emulateMedia({ reducedMotion: "reduce" });
  await live.clock.runFor(5000);
  assert.deepEqual(await position(live), waiting, "Live reduced-motion changes cancel reaction timers");
  await live.emulateMedia({ reducedMotion: "no-preference" });
  await live.mouse.move(0, 0);
  await approach(live);
  assert.equal(await state(live), "hesitating");
  await live.locator('[data-mode="fixed"]').dispatchEvent("click");
  await live.clock.runFor(5000);
  assert.equal(await status(live), "", "Difficulty changes remove stale callbacks");
  await live.evaluate(() => { window.randomDraws = [0.6, 0.3]; });
  await live.locator(".reset-button").dispatchEvent("click");
  assert.equal(await arena(live).getAttribute("data-behavior"), "sneak", "Reset selects a fresh behavior");
  assert.equal(await live.locator('[data-mode="bad"]').getAttribute("aria-pressed"), "true");
  await live.locator(".toolbar-exit").click();
  await live.clock.runFor(5000);
  await live.mouse.move(10, 10);
  assert.equal(await arena(live).count(), 0);
  await live.close();

  for (const width of [320, 768, 1280]) {
    const page = await open("corner", "hard", { viewport: { width, height: 1100 } });
    await herd(page, "hard");
    await bounded(page);
    await page.setViewportSize({ width: 320, height: 1100 });
    await page.clock.runFor(100);
    await page.waitForFunction(() => {
      const button = document.querySelector(".runaway-button");
      return button.offsetLeft + button.offsetWidth <= button.parentElement.clientWidth + 1;
    });
    await bounded(page);
    await page.close();
  }
  const animated = await open("reaction", "hard", { nativeTransitions: true });
  await approach(animated);
  await animated.mouse.down();
  await animated.mouse.up();
  await assertWon(animated, "pointer catch");
  await animated.close();

  assert.deepEqual(errors, []);
  console.log("Passed touch range endpoints, pen, accessibility, reset, cleanup, responsive bounds, and native CSS.");
} finally {
  await browser.close();
}
