import assert from "node:assert/strict";
import { chromium } from "playwright";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
  : {});
const errors = [];
let checks = 0;

async function withExhibit(id, mode, width, run, reducedMotion = "reduce") {
  const context = await browser.newContext({
    viewport: { width, height: 1000 },
    reducedMotion,
    hasTouch: width === 320,
    isMobile: width === 320,
  });
  try {
    const page = await context.newPage();
    page.on("pageerror", error => errors.push(`${id}/${mode}/${width}: ${error.message}`));
    await page.clock.install();
    await page.goto(`${origin}/exhibit/${id}?mode=${mode}`);
    await page.locator("#stage").waitFor();
    await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
    if (await page.locator(".guide-dismiss").isVisible()) await page.locator(".guide-dismiss").click();
    await run(page);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${id} fits at ${width}px`);
    checks++;
  } finally {
    await context.close();
  }
}

async function fresh(page) {
  assert.equal(await page.locator("#stage").getAttribute("data-outcome"), null, "Local retry clears outcome");
  assert.equal(await page.locator("#exhibit-task > span").textContent(), "YOUR TASK");
  assert.equal(await page.locator(".exhibit-frame-footer > span").first().textContent(), "SIMULATION ONLY");
  assert.equal(await page.locator("#difficulty-progress").isVisible(), false);
  assert.equal(await page.locator("#difficulty-progress p").textContent(), "");
  assert.equal(await page.locator("#exhibit-outcome").isVisible(), false);
  assert.equal(await page.locator("#exhibit-outcome strong").textContent(), "");
  assert.equal(await page.locator("#exhibit-outcome span").textContent(), "");
}

async function won(page, message) {
  assert.equal(await page.locator("#stage").getAttribute("data-outcome"), "success");
  assert.equal(await page.locator("#exhibit-task > span").textContent(), "TASK COMPLETE");
  assert.equal(await page.locator(".exhibit-frame-footer > span").first().textContent(), "TASK COMPLETE");
  assert.equal(await page.locator("#difficulty-progress").isVisible(), true, "Every successful attempt restores its result");
  assert.equal(await page.locator("#completion-title").textContent(), "Task complete");
  assert.match(await page.locator("#difficulty-progress p").textContent(), message);
  assert.equal(await page.locator("#exhibit-outcome").isVisible(), true);
  assert.match(await page.locator("#exhibit-outcome span").textContent(), message);
}

async function setRange(page, selector, target) {
  const slider = page.locator(selector);
  await slider.focus();
  const current = Number(await slider.inputValue());
  for (let step = 0; step < Math.abs(current - target); step++) {
    await slider.press(current < target ? "ArrowRight" : "ArrowLeft");
  }
  assert.equal(await slider.inputValue(), String(target));
}

async function finishLoading(page, mode) {
  if (mode !== "fixed") {
    for (let tick = 0; !(await page.locator("#loaded-sentence").isVisible()); tick++) {
      assert(tick < 16, "Ten stages and exactly three optional approvals finish loading");
      await page.clock.runFor(mode === "hard" ? 1200 : 800);
      if (await page.locator("#loading-approve").isVisible()) await page.locator("#loading-approve").click();
    }
  }
  await won(page, /Booking confirmation opened: Saturday at 2 pm/);
  assert.match(await page.locator("#loaded-sentence").textContent(), /confirmed for Saturday at 2 pm/);
}

async function rebuildIfNeeded(page) {
  if (await page.locator("#quake-rebuild").isVisible()) await page.locator("#quake-rebuild").click();
}

async function chooseO(page) {
  for (let swaps = 0; !(await page.locator("#tetris-piece-name").textContent()).startsWith("O block"); swaps++) {
    assert(swaps < 14, "The public block bags supply an O block");
    await page.locator("#tetris-another").click();
  }
}

async function dropO(page, column) {
  await chooseO(page);
  for (let step = 0; step < Math.abs(column - 3); step++) {
    await page.getByRole("button", { name: column < 3 ? "Move block left" : "Move block right", exact: true }).click();
  }
  await page.getByRole("button", { name: "Drop block", exact: true }).click();
}

async function buildTarget(page) {
  await page.locator("#tetris-play").click();
  for (let piece = 0; piece < 12; piece++) {
    await dropO(page, piece % 4 * 2);
    if (piece < 11) await fresh(page);
  }
  assert.equal(await page.locator("#tetris-value").textContent(), "60%");
  await won(page, /volume set to 60%.*Target reached/);
}

async function tetrisRetry(page) {
  assert.match(await page.locator(".new-demo-intro").textContent(), /60% \(58-62% counts\)/);
  await buildTarget(page);
  assert.equal(await page.locator("#tetris-play").textContent(), "Resume game");
  assert.equal(await page.locator('[data-tetris-action="drop"]').isDisabled(), true);
  await page.clock.runFor(6000);
  assert.equal(await page.locator("#tetris-value").textContent(), "60%", "Accepted stack stops falling");
  await page.locator("#tetris-empty").click();
  await fresh(page);
  assert.equal(await page.locator("#tetris-value").textContent(), "0%");
  assert.equal(await page.locator(".tetris-settled").count(), 0);
  assert.equal(await page.locator("#tetris-play").textContent(), "Start game");
  await buildTarget(page);
  await page.locator("#tetris-play").click();
  await fresh(page);
  assert.equal(await page.locator('[data-tetris-action="drop"]').isDisabled(), false, "Resume remains available for experimentation");
  await dropO(page, 0);
  assert.equal(await page.locator("#tetris-value").textContent(), "65%");
  await fresh(page);
  assert.doesNotMatch(await page.locator("#extra-status").textContent(), /Target reached/);
}

async function seesawWin(page) {
  await page.locator("#seesaw-weight").selectOption("1");
  await page.locator("#seesaw-add-right").click();
  await page.clock.runFor(6000);
  assert.equal(await page.locator("#seesaw-value").textContent(), "65%");
  await page.locator("#seesaw-hold").click();
  await won(page, /Volume held at 65%.*Target reached/);
  for (const control of ["#seesaw-weight", "#seesaw-add-left", "#seesaw-add-right", "#seesaw-remove-right"]) {
    assert.equal(await page.locator(control).isDisabled(), true, "Accepted weights are frozen");
  }
  await page.clock.runFor(6000);
  assert.equal(await page.locator("#seesaw-value").textContent(), "65%");
}

try {
  for (const width of [1280, 320]) {
    for (const mode of ["easy", "hard", "fixed"]) {
      await withExhibit("loading", mode, width, async page => {
        await page.locator("#loading-start").click();
        await finishLoading(page, mode);
        if (mode === "fixed") {
          await page.getByRole("button", { name: "Hide result notification", exact: true }).click();
          assert.equal(await page.locator("#exhibit-outcome").isVisible(), false);
        }
        await page.locator("#loading-start").click();
        if (mode !== "fixed") {
          await fresh(page);
          assert.equal(await page.locator("#loaded-sentence").isVisible(), false);
          assert.equal(await page.locator("#extra-status").textContent(), "", "New waiting does not retain old success");
          await page.locator("#loading-cancel").click();
          await fresh(page);
          await page.locator("#loading-start").click();
        }
        await finishLoading(page, mode);
      });

      await withExhibit("seismic-editor", mode, width, async page => {
        if (mode !== "fixed") assert.match(await page.locator(".new-demo-intro").textContent(), /Reduced-motion settings disable the shaking and collapse/);
        for (const wrong of ["Bring a notebook, please.", "Bring a notebook,"]) {
          await page.locator("#quake-input").fill(wrong);
          assert.equal(await page.locator("#quake-input").getAttribute("readonly"), null, "Reduced motion never collapses a longer reminder");
          assert.equal(await page.locator("#quake-finish").isDisabled(), false);
          await page.locator("#quake-finish").click();
          await fresh(page);
          assert.match(await page.locator("#extra-status").textContent(), /Write the reminder Bring a notebook/);
        }
        await page.locator("#quake-input").fill("x".repeat(80));
        assert.equal(await page.locator("#quake-stress-value").textContent(), "0%");
        assert.equal(await page.locator("#quake-risk").textContent(), "Collapse risk: none");
        assert.equal(await page.locator("#quake-rebuild").isVisible(), false);
        assert.equal(await page.locator("#quake-chamber").evaluate(element => element.classList.contains("collapsed")), false);
        assert.equal(await page.locator("#stage").evaluate(element => element.getAnimations({ subtree: true }).length), 0);
        await page.locator("#quake-input").fill("Bring a notebook.");
        await page.locator("#quake-finish").click();
        await won(page, /Draft saved in this demo: Bring a notebook/);
        assert.equal(await page.locator("#quake-input").getAttribute("readonly"), "");
        assert.equal(await page.locator("#quake-finish").isDisabled(), true);
        await page.emulateMedia({ reducedMotion: "no-preference" });
        if (mode !== "fixed") await page.locator("#quake-risk").filter({ hasText: /Last edit collapse risk/ }).waitFor();
        assert.equal(await page.locator("#quake-input").getAttribute("readonly"), "", "Preference changes do not unlock accepted text");
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.locator("#quake-risk").filter({ hasText: "Collapse risk: none" }).waitFor();
        await page.locator("#quake-clear").click();
        await fresh(page);
        assert.equal(await page.locator("#quake-input").inputValue(), "");
        assert.equal(await page.locator("#quake-finish").isDisabled(), false);
        await page.locator("#quake-input").fill("Bring a notebook!");
        await page.locator("#quake-finish").click();
        await won(page, /Draft saved in this demo: Bring a notebook/);
      });

      await withExhibit("notification-swatter", mode, width, async page => {
        assert.equal(await page.locator("#fly-form input, #fly-form textarea").count(), 5);
        assert.equal(await page.locator("#fly-company").getAttribute("required"), null);
        await page.locator("#fly-name").fill("Alex Example");
        if (mode !== "fixed") {
          const help = await page.locator("#extra-status").textContent();
          assert.match(help, /Complete the required fields; swat alerts that obstruct the form, or pause/);
          assert.match(help, /Organization is optional; you do not have to clear every alert to send/);
          assert.doesNotMatch(help, /six fields/);
          await page.locator("#fly-toggle").click();
          assert((await page.locator(".fly-notification").count()) > 0, "Paused swarm still has unswatted obstructions");
        }
        for (const [field, value] of Object.entries({ email: "alex@example.test", subject: "Opening hours", message: "Please confirm the opening hours." })) {
          await page.locator(`#fly-${field}`).fill(value);
        }
        assert.equal(await page.locator("#fly-company").inputValue(), "");
        await page.locator("#fly-finish").focus();
        await page.keyboard.press("Enter");
        await won(page, /Support request sent in the demo/);
        assert.equal(await page.locator(".fly-notification").count(), 0, "Submitting, not swatting every alert, ends the swarm");
        assert.equal(await page.locator("#fly-finish").isDisabled(), true);
        for (const field of ["name", "email", "company", "subject", "message"]) {
          assert.equal(await page.locator(`#fly-${field}`).getAttribute("readonly"), "", "Accepted form stays readable and locked");
        }
        await page.clock.runFor(6000);
        assert.equal(await page.locator(".fly-notification").count(), 0);
      });
    }

    for (const mode of ["easy", "hard"]) {
      await withExhibit("seismic-editor", mode, width, async page => {
        const wrong = "Bring a notebook, please.";
        await page.locator("#quake-input").fill(wrong);
        assert.equal(await page.locator("#quake-stress-value").textContent(), "100%");
        assert.equal(await page.locator("#quake-rebuild").isVisible(), true, "Ordinary earthquakes still collapse");
        assert.equal(await page.locator("#quake-finish").isDisabled(), true);
        assert.equal(await page.locator("#quake-input").getAttribute("readonly"), "");
        assert((await page.locator("#stage").evaluate(element => element.getAnimations({ subtree: true }).length)) > 0, "Ordinary earthquake animation still runs");
        await page.locator("#quake-rebuild").click();
        assert.equal(await page.locator("#quake-input").inputValue(), wrong, "Rebuild recovers the exact text");
        assert.equal(await page.locator("#quake-input").getAttribute("readonly"), null);
        assert.equal(await page.locator("#quake-stress-value").textContent(), "0%");
        await page.locator("#quake-input").fill("x".repeat(80));
        assert.equal(await page.locator("#quake-rebuild").isVisible(), true);
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.locator("#quake-input:not([readonly])").waitFor();
        assert.equal(await page.locator("#quake-input").inputValue(), "x".repeat(80));
        assert.equal(await page.locator("#quake-input").getAttribute("readonly"), null, "Runtime reduced motion restores a collapsed draft");
        assert.equal(await page.locator("#quake-rebuild").isVisible(), false);
        assert.equal(await page.locator("#quake-finish").isDisabled(), false);
        assert.equal(await page.locator("#quake-stress-value").textContent(), "0%");
        assert.equal(await page.locator("#stage").evaluate(element => element.getAnimations({ subtree: true }).length), 0);
        await page.emulateMedia({ reducedMotion: "no-preference" });
        await page.locator("#quake-risk").filter({ hasText: /Last edit collapse risk/ }).waitFor();
        await page.locator("#quake-clear").click();
        await page.locator("#quake-input").fill("Bring a notebook?");
        await rebuildIfNeeded(page);
        await page.locator("#quake-finish").click();
        await won(page, /Draft saved in this demo: Bring a notebook/);
      }, "no-preference");

      await withExhibit("tetris-volume", mode, width, tetrisRetry);

      await withExhibit("volume-seesaw", mode, width, async page => {
        assert.match(await page.locator(".new-demo-intro").textContent(), /required level is 65%/);
        await page.locator("#seesaw-hold").click();
        await fresh(page);
        assert.match(await page.locator("#extra-status").textContent(), /target is 65%/);
        await page.locator("#seesaw-hold").click();
        await seesawWin(page);
        await page.locator("#seesaw-reset").click();
        await fresh(page);
        assert.equal(await page.locator("#seesaw-value").textContent(), "50%");
        assert.equal(await page.locator("#seesaw-left span, #seesaw-right span").count(), 0);
        await seesawWin(page);
        await page.locator("#seesaw-hold").click();
        await fresh(page);
        assert.equal(await page.locator("#seesaw-add-left").isDisabled(), false, "Explicit Release permits a new attempt");
        await page.locator("#seesaw-hold").click();
        await won(page, /Volume held at 65%.*Target reached/);
      });
    }

    await withExhibit("volume-seesaw", "hard", width, async page => {
      assert.doesNotMatch(await page.locator(".new-demo-intro").textContent(), /Every third addition/);
      assert.equal(await page.locator(".seesaw-help").evaluate(element => element.open), false, "Detailed weight rules are optional rather than an opening spoiler");
      await page.locator(".seesaw-help summary").click();
      assert.match(await page.locator(".seesaw-help").textContent(), /Every third addition makes the oldest weight on that side roll across to the opposite side/);
      for (const weight of ["0", "1", "2"]) {
        await page.locator("#seesaw-weight").selectOption(weight);
        await page.locator("#seesaw-add-right").click();
      }
      assert.equal(await page.locator("#seesaw-left").getAttribute("aria-label"), "left tray: Pebble. Total 1.");
      assert.equal(await page.locator("#seesaw-right").getAttribute("aria-label"), "right tray: Brick, Anvil. Total 8.");
      assert.match(await page.locator("#extra-status").textContent(), /oldest weight on that side rolled across/);
      await fresh(page);
    });

    for (const [rejected, accepted] of [[57, 58], [63, 62]]) {
      await withExhibit("tetris-volume", "fixed", width, async page => {
        assert.match(await page.locator("#exhibit-task").textContent(), /60% \(58-62% counts\)/);
        if (rejected > 62) await page.locator("#tetris-volume").press("End");
        await setRange(page, "#tetris-volume", rejected);
        await fresh(page);
        await setRange(page, "#tetris-volume", accepted);
        await won(page, new RegExp(`volume set to ${accepted}%.*Target reached`));
        assert.equal(await page.locator("#tetris-volume").isDisabled(), true);
        await page.clock.runFor(6000);
        assert.equal(await page.locator("#tetris-value").textContent(), `${accepted}%`);
      });
    }

    for (const [rejected, accepted] of [[34, 35], [40, 39]]) {
      await withExhibit("wind-volume", "fixed", width, async page => {
        assert.match(await page.locator("#exhibit-task").textContent(), /37% \(35-39% counts\)/);
        const slider = page.locator("#wind-slider");
        await slider.focus();
        for (let step = 0; step < 50 - rejected; step++) await slider.press("ArrowDown");
        assert.equal(await slider.getAttribute("aria-valuenow"), String(rejected));
        await page.locator("#wind-save").click();
        await fresh(page);
        assert.match(await page.locator("#extra-status").textContent(), /Aim for 35-39%/);
        await slider.press(rejected < accepted ? "ArrowUp" : "ArrowDown");
        await page.locator("#wind-save").click();
        await won(page, new RegExp(`volume set to ${accepted}%.*Target reached`));
        assert.equal(await slider.getAttribute("aria-disabled"), "true");
        assert.equal(await page.locator("#wind-save").isDisabled(), true);
        await slider.press("End");
        await page.clock.runFor(6000);
        assert.equal(await page.locator("#wind-value").textContent(), `${accepted}%`, "Saved volume is frozen");
      });
    }

    await withExhibit("volume-seesaw", "fixed", width, async page => {
      assert.match(await page.locator("#exhibit-task").textContent(), /volume to 65%/);
      await setRange(page, "#seesaw-volume", 64);
      await fresh(page);
      await page.locator("#seesaw-volume").press("PageUp");
      await setRange(page, "#seesaw-volume", 66);
      await fresh(page);
      await setRange(page, "#seesaw-volume", 65);
      await won(page, /volume set to 65%.*Target reached/);
      assert.equal(await page.locator("#seesaw-volume").isDisabled(), true);
      await page.clock.runFor(6000);
      assert.equal(await page.locator("#seesaw-value").textContent(), "65%");
    });
  }

  for (const mode of ["easy", "hard"]) {
    await withExhibit("tetris-volume", mode, 1280, tetrisRetry, "no-preference");
    await withExhibit("volume-seesaw", mode, 1280, async page => {
      await seesawWin(page);
      await page.locator("#seesaw-reset").click();
      await fresh(page);
      await seesawWin(page);
    }, "no-preference");
  }

  assert.deepEqual(errors, [], "No browser errors");
  console.log(`Interaction UX regressions passed: ${checks} isolated desktop/mobile scenarios, normal/reduced motion, local retries and exact boundaries.`);
} finally {
  await browser.close();
}
