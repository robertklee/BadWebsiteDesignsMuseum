import assert from "node:assert/strict";
import { chromium } from "playwright";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
const errors = [];
const modes = ["easy", "hard", "fixed"];
const selected = new Set(process.argv.slice(2));
const gymSolution = "Rain sorry VII monday please #c0ffee 2026 moon cat () !!! banana robot tea [] + _ ? left right I agree 69 !!! !";
const addressPieces = ["42", "Waffle", "Lane,", "Apt", "7B,", "Cloud", "City,", "CA", "90210"];
// Legal routes through the unchanged, deterministic chase; every move uses a visitor control.
const catRoutes = {
  easy: "R U U U L L U U R R R D D L D D D R R D R U R R R D",
  hard: "R R R R L D L U L L L D U U U U U U R R R D D D R R U U U R R R D D L L D D D R R D L U L L L L L L L U U U U U R R R R R R R R",
};

async function visit(id, mode, run, width = 1280) {
  if (selected.size && !selected.has(id)) return;
  const context = await browser.newContext({
    viewport: { width, height: width === 320 ? 740 : 900 },
    reducedMotion: "reduce",
    ...(width === 320 ? { isMobile: true, hasTouch: true } : {}),
  });
  const page = await context.newPage();
  page.on("pageerror", error => errors.push(`${id}/${mode}: ${error.message}`));
  await page.addInitScript(() => {
    window.formEvents = { completed: 0, reset: 0 };
    document.addEventListener("exhibit-complete", () => { window.formEvents.completed++; });
    document.addEventListener("exhibit-reset", () => { window.formEvents.reset++; });
  });
  try {
    await page.goto(`${origin}/exhibit/${id}?mode=${mode}`);
    await page.locator("#stage").waitFor();
    if (await page.locator(".guide-dismiss").isVisible()) await page.locator(".guide-dismiss").click();
    await run(page);
    console.log(`Passed ${id}/${mode} at ${width}px.`);
  } finally {
    await context.close();
  }
}

async function pending(page, previousWins = 0) {
  assert.equal(await page.evaluate(() => window.formEvents.completed), previousWins);
  assert.equal(await page.locator("#stage").getAttribute("data-outcome"), null);
  assert.equal(await page.locator("#difficulty-progress").isVisible(), false);
  assert.equal(await page.locator("#exhibit-outcome").isVisible(), false);
  assert.equal(await page.locator("#exhibit-task > span").textContent(), "YOUR TASK");
  assert.equal(await page.locator(".exhibit-frame-footer > span").first().textContent(), "SIMULATION ONLY");
}

async function finished(page, message, count = 1, outcome = "success") {
  assert.equal(await page.evaluate(() => window.formEvents.completed), count, "One completion per accepted attempt");
  assert.equal(await page.locator("#stage").getAttribute("data-outcome"), outcome);
  assert.equal(await page.locator("#completion-title").textContent(), outcome === "blocked" ? "Demo complete — goal blocked" : "Task complete");
  assert.match(await page.locator("#difficulty-progress p").textContent(), message);
  assert.equal(await page.locator("#difficulty-progress").isVisible(), true);
  assert.equal(await page.locator("#exhibit-outcome").isVisible(), true);
}

async function frozen(page, container, exclude = "") {
  const controls = page.locator(container).locator("button, input, select, textarea");
  const states = await controls.evaluateAll((items, exclude) => items
    .filter(item => !exclude || !item.matches(exclude))
    .map(item => ({ name: item.id || item.textContent, locked: item.disabled || item.readOnly })), exclude);
  assert(states.length > 0);
  assert.deepEqual(states.filter(item => !item.locked), [], "Accepted values and editing controls are locked");
}

async function repeatWins(page, win, reset, message) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    await win(attempt);
    await finished(page, message, attempt);
    if (attempt === 3) break;
    if (attempt === 1) {
      await page.getByRole("button", { name: "Hide result notification", exact: true }).click();
      await page.locator('[data-difficulty-action="stay"]').click();
      assert.equal(await page.locator("#stage").getAttribute("data-outcome"), "success");
    }
    assert.equal(await page.locator(reset).isEnabled(), true, "Explicit retry stays available");
    await page.locator(reset).click();
    assert.equal(await page.evaluate(() => window.formEvents.reset), attempt);
    await pending(page, attempt);
  }
}

async function defendSearch(page, mode) {
  if (mode === "fixed") return;
  const rounds = mode === "hard" ? 5 : 3;
  for (let round = 0; round < rounds; round++) {
    await page.locator("#correcting-review").waitFor({ state: "visible" });
    assert.equal(await page.locator("#correcting-submit").isDisabled(), true);
    if (mode === "hard") {
      if (round === 0) {
        await page.locator("#correcting-reject").click();
        assert.match(await page.locator("#extra-status").textContent(), /at least 8 characters/);
        assert.equal(await page.locator("#correcting-original").textContent(), "quiet cafes");
      }
      await page.locator("#correcting-reason").fill("These are my intended words.");
    }
    await page.locator("#correcting-reject").click();
    assert.match(await page.locator("#correcting-progress").textContent(), new RegExp(`${round + 1} / ${rounds}`));
  }
  assert.equal(await page.locator("#correcting-input").inputValue(), "quiet cafes");
}

async function buildCranePhrase(page) {
  const cabinet = page.locator("#arcade-cabinet");
  for (const letter of "Claw_M00n!42") {
    const code = letter.charCodeAt(0);
    await page.locator("#arcade-bank").selectOption(String(Math.floor(code / 8)));
    await cabinet.press("Home");
    for (let lane = 0; lane < code % 8; lane++) await cabinet.press("ArrowRight");
    await cabinet.press("Space");
    if (!(await page.locator("#arcade-claw-state").textContent()).includes(`Holding: ${letter}.`)) {
      await page.locator("#arcade-return").click();
      await cabinet.press("Space");
    }
    assert.match(await page.locator("#arcade-claw-state").textContent(), new RegExp(`Holding: ${letter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.`));
    await cabinet.press("End");
    await cabinet.press("Space");
  }
  assert.equal(await page.locator("#arcade-password").textContent(), "Claw_M00n!42");
}

try {
  for (const mode of modes) {
    await visit("word-editor", mode, async page => {
      await page.locator("#word-finish").click();
      await pending(page);
      assert.match(await page.locator("#word-status").textContent(), /Meet at six.*preserved/);
      if (mode === "fixed") await page.locator("#word-text").pressSequentially("Meet at six");
      else for (const [index, letter] of [..."Meet at six"].entries()) await page.locator(`[data-character="${index}"]`).selectOption(letter);
      await page.locator("#word-finish").click();
      await finished(page, /draft saved/i);
      await frozen(page, "#stage");
      if (mode === "fixed") {
        await page.locator("#word-text").pressSequentially("changed");
        assert.equal(await page.locator("#word-text").inputValue(), "Meet at six");
      }
    });

    await visit("cookies", mode, async page => {
      const summary = page.locator("#cookie-summary");
      assert.match(await summary.textContent(), /Current optional settings: Analytics: enabled/);
      if (mode !== "fixed") {
        await page.locator("#save-cookies").click();
        await pending(page);
      }
      await page.locator('[data-cookie="0"]').click();
      assert.match(await summary.textContent(), /Analytics: disabled/);
      if (mode === "fixed") {
        assert.match(await summary.textContent(), /Marketing: enabled/);
        await page.locator("#reject-all").click();
      } else {
        assert.match(await summary.textContent(), /Marketing: disabled/);
        if (mode === "easy") await page.locator('[data-cookie="2"]').click();
        else for (const index of [1, 2, 3]) await page.locator(`[data-cookie="${index}"]`).click();
        assert.equal((await summary.textContent()).match(/: disabled/g).length, 4);
        await page.locator("#save-cookies").click();
      }
      await finished(page, /All optional cookies rejected/);
      await frozen(page, "#stage");
      assert.equal((await summary.textContent()).match(/: disabled/g).length, 4);
    });

    await visit("unix-birthday", mode, async page => {
      const input = page.locator("#epoch-input");
      const confirm = page.getByRole("button", { name: "Confirm demo birthday", exact: true });
      if (mode === "fixed") {
        await input.fill("1899-12-31");
        await confirm.click();
        assert.match(await page.locator("#extra-status").textContent(), /1900 through today/);
        assert.doesNotMatch(await page.locator("#extra-status").textContent(), /millisecond|second/);
        await pending(page);
        await input.fill("1992-07-15");
        await confirm.click();
        await pending(page);
        await input.fill("1992-07-16");
      } else {
        if (mode === "hard") {
          for (const value of ["not a timestamp", "711244800000.5", "711244800", String(Date.UTC(1899, 11, 31))]) {
            await input.fill(value);
            await confirm.click();
            await pending(page);
          }
        }
        await input.fill(String(Date.UTC(1992, 6, 16, 1)));
        await confirm.click();
        await pending(page);
        assert.match(await page.locator("#extra-status").textContent(), /not midnight UTC/);
        if (mode === "easy") await page.locator("#epoch-align").click();
        else await input.fill(String(Date.UTC(1992, 6, 16)));
      }
      await confirm.click();
      await finished(page, /Alex.*1992-07-16/);
      await frozen(page, "#epoch-form");
    });

    await visit("password-gym", mode, async page => {
      const input = page.locator("#gym-phrase");
      if (mode === "fixed") {
        await input.fill(" 12345678901 ");
        assert.equal(await page.locator("#gym-create").isDisabled(), true);
        assert.match(await page.locator("#extra-status").textContent(), /at least 12 characters/);
        await pending(page);
        await input.fill("");
        await input.pressSequentially("rain dancing");
        await pending(page);
        assert.equal(await input.getAttribute("readonly"), null, "Minimum length is not automatic acceptance");
        assert.equal(await page.locator("#gym-create").isEnabled(), true);
        await input.pressSequentially(" on the moon");
        assert.equal(await input.inputValue(), "rain dancing on the moon");
        await pending(page);
        await page.locator("#gym-create").click();
      } else await input.fill(gymSolution);
      await finished(page, mode === "hard" ? /no password can satisfy/ : /phrase accepted/i, 1, mode === "hard" ? "blocked" : "success");
      await frozen(page, "#gym-form");
      if (mode === "hard") assert.match(await page.locator("#gym-rules").textContent(), /Use NO digits at all/);
    }, mode === "fixed" ? 320 : 1280);

    await visit("checkbox-ecosystem", mode, async page => {
      assert.match(await page.locator("#exhibit-task").textContent(), /Security alerts, Delivery updates, and Dark mode only/);
      if (mode !== "fixed") {
        await page.locator("#eco-pause").click();
        await page.locator("#eco-pause").click();
      }
      await page.getByRole("checkbox", { name: "Marketing emails", exact: true }).check();
      await page.locator("#eco-save").click();
      await pending(page);
      assert.match(await page.locator("#extra-status").textContent(), /Enable only Security alerts, Delivery updates, and Dark mode/);
      await page.getByRole("checkbox", { name: "Marketing emails", exact: true }).uncheck();
      for (const name of ["Security alerts", "Delivery updates", "Dark mode"]) await page.getByRole("checkbox", { name, exact: true }).check();
      if (mode === "hard") {
        await page.locator("#eco-save").click();
        await pending(page);
        const offspring = page.getByRole("checkbox", { name: /Offspring preference/ });
        for (let index = 0; index < await offspring.count(); index++) await offspring.nth(index).uncheck();
      }
      await page.locator("#eco-save").click();
      await finished(page, /saved: Security alerts, Delivery updates, Dark mode/);
      await frozen(page, ".eco-habitat");
    });

    await visit("elevator-date", mode, async page => {
      if (mode === "fixed") {
        await page.locator("#lift-date").fill("1992-07-15");
        await page.locator("#lift-form button").click();
        await pending(page);
        await page.locator("#lift-date").fill("1992-07-16");
        await page.locator("#lift-form button").click();
        await finished(page, /Alex.*July 16, 1992/);
        await frozen(page, "#lift-form");
        return;
      }
      await page.clock.install();
      await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
      await repeatWins(page, async attempt => {
        assert.equal(await page.locator("#lift-select").isEnabled(), true);
        await page.locator("#lift-select").click();
        await pending(page, attempt - 1);
        for (const target of [1992, 7, 16]) {
          while (Number(await page.locator("#lift-floor").textContent()) !== target) {
            const floor = Number(await page.locator("#lift-floor").textContent());
            await page.locator(floor > target ? "#lift-down" : "#lift-up").click();
            await page.locator("#lift-stop").click();
            await page.clock.runFor(mode === "hard" ? 350 : 650);
          }
          await page.locator("#lift-select").click();
        }
        await frozen(page, ".lift-machine", "#lift-restart");
      }, "#lift-restart", /Alex.*July 16, 1992/);
    });

    await visit("password-crane", mode, async page => {
      await repeatWins(page, async attempt => {
        if (mode === "fixed") {
          assert.equal(await page.locator("#arcade-phrase").getAttribute("readonly"), null);
          await page.locator("#arcade-phrase").fill("four");
          await page.locator("#arcade-phrase-form button").click();
          await pending(page, attempt - 1);
          await page.locator("#arcade-phrase").pressSequentially("wrong");
          await page.locator("#arcade-phrase").fill("Claw_M00n!42");
          await page.locator("#arcade-phrase-form button").click();
          await page.locator("#arcade-phrase").pressSequentially("wrong");
          assert.equal(await page.locator("#arcade-phrase").inputValue(), "Claw_M00n!42");
        } else {
          assert.equal(await page.locator("#arcade-password").textContent(), "(empty)");
          await page.locator("#arcade-check").click();
          await pending(page, attempt - 1);
          await buildCranePhrase(page);
          await page.locator("#arcade-check").click();
          await page.locator("#arcade-cabinet").press("Home");
          await page.locator("#arcade-cabinet").press("Space");
          assert.equal(await page.locator("#arcade-password").textContent(), "Claw_M00n!42");
        }
        await frozen(page, ".arcade-crane", "#arcade-crane-reset");
      }, "#arcade-crane-reset", mode === "fixed" ? /Test-account phrase accepted/ : /Success.*Claw_M00n!42/);
    });

    await visit("email-auction", mode, async page => {
      if (mode === "fixed") {
        await page.locator("#auction-email").fill("not-an-email");
        await page.locator("#auction-open").click();
        await pending(page);
        await page.locator("#auction-email").fill("mouse@example.test");
        await page.locator("#auction-open").click();
        await finished(page, /Email accepted.*mouse@example.test/);
        await frozen(page, "#auction-setup");
        return;
      }
      await repeatWins(page, async attempt => {
        assert.equal(await page.locator("#auction-address").textContent(), "(empty)");
        await page.locator("#auction-check").click();
        await pending(page, attempt - 1);
        for (const letter of "a@b.co") {
          await page.locator(`#auction-lots [data-character="${letter}"]`).click();
          for (let bid = 0; await page.locator("#auction-minimum").isEnabled(); bid++) {
            assert(bid < 5, "A bounded number of public bids wins a character");
            await page.locator("#auction-minimum").click();
          }
          await page.locator(`#auction-inventory [data-character="${letter}"]`).click();
        }
        await page.locator("#auction-check").click();
        await frozen(page, "#auction-market", "#auction-reset, #auction-filter");
      }, "#auction-reset", /Email assembled: a@b.co/);
    });

    await visit("address-jigsaw", mode, async page => {
      if (mode === "fixed") {
        await page.locator("#jigsaw-input").fill("24 Pancake Lane");
        await page.locator("#jigsaw-simple button").click();
        await pending(page);
        await page.locator("#jigsaw-input").fill(`  ${addressPieces.join("   ")}  `);
        await page.locator("#jigsaw-simple button").click();
        await finished(page, /Demo address accepted/);
        await frozen(page, "#jigsaw-simple");
        return;
      }
      await repeatWins(page, async attempt => {
        assert.equal(await page.locator("#jigsaw-output").textContent(), "(empty)");
        if (mode === "hard") {
          await page.getByRole("button", { name: "Address piece: 24", exact: true }).click();
          await page.locator("#jigsaw-check").click();
          await pending(page, attempt - 1);
          assert.match(await page.locator("#extra-status").textContent(), /Slot 1.*other pieces are preserved/);
          await page.locator('[data-slot="0"]').click();
        }
        for (const piece of addressPieces) await page.getByRole("button", { name: `Address piece: ${piece}`, exact: true }).click();
        await page.locator("#jigsaw-check").click();
        await frozen(page, ".jigsaw-table", "#jigsaw-reset");
      }, "#jigsaw-reset", /Address assembled: 42 Waffle Lane/);
    });

    await visit("expanding-form", mode, async page => {
      const send = async () => {
        if (mode !== "fixed") await page.locator("#expanding-compress").click();
        await page.locator("#expanding-submit").click();
      };
      for (const [index, value] of ["A", "not-an-email", "Q", "?"].entries()) await page.locator(`#expanding-field-${index}`).fill(value);
      await send();
      await pending(page);
      assert.match(await page.locator("#extra-status").textContent(), /valid demo email address.*other answers are preserved/);
      assert.equal(await page.locator("#expanding-field-2").inputValue(), "Q");
      assert.equal(await page.locator("#expanding-field-3").inputValue(), "?");
      await page.locator("#expanding-field-1").fill("a@example.test");
      await page.locator("#expanding-field-2").fill("   ");
      await send();
      await pending(page);
      assert.match(await page.locator("#extra-status").textContent(), /Enter subject.*other answers are preserved/);
      await page.locator("#expanding-field-2").fill(" Q ");
      await page.locator("#expanding-field-3").fill("");
      await send();
      await pending(page);
      assert.match(await page.locator("#extra-status").textContent(), /Enter message.*other answers are preserved/);
      await page.locator("#expanding-field-3").fill("?");
      await send();
      await finished(page, /Demo form complete/);
      await frozen(page, "#expanding-form");
    });

    await visit("correcting-search", mode, async page => {
      await page.locator("#correcting-input").fill("zzzzzzzzzzzzzzzzzzzz");
      await page.locator("#correcting-submit").click();
      await pending(page);
      assert.match(await page.locator("#correcting-results").textContent(), /No matching entries/);
      await page.locator("#correcting-input").fill("quiet cafes");
      await defendSearch(page, mode);
      await page.locator("#correcting-submit").click();
      await finished(page, /quiet cafes.*local demo results/);
      await frozen(page, ".correcting-machine");
      await page.locator("#correcting-input").pressSequentially(" weather");
      assert.equal(await page.locator("#correcting-input").inputValue(), "quiet cafes");
      assert.match(await page.locator("#correcting-results").textContent(), /Quiet cafes/);
    });

    await visit("cat-captcha", mode, async page => {
      if (mode === "fixed") {
        await page.locator("#cat-simple-check").check();
        await page.locator("#cat-simple-form button").click();
        await finished(page, /Demo verified/);
        await frozen(page, "#cat-simple-form");
        return;
      }
      await repeatWins(page, async () => {
        assert.equal(await page.locator("#cat-verdict").textContent(), "UNVERIFIED");
        const keys = { R: "ArrowRight", L: "ArrowLeft", U: "ArrowUp", D: "ArrowDown" };
        for (const step of catRoutes[mode].split(" ")) await page.locator("#cat-board").press(keys[step]);
        assert.equal(await page.locator("#cat-verdict").textContent(), "DEMO VERIFIED");
      }, "#cat-retry", /escaped with all the cheese/);
    });
  }

  for (const value of ["2025550107", "202 555 0107", "202-555-0107", "(202) 555-0107"]) {
    await visit("phone", "fixed", async page => {
      await page.locator("#phone-number").fill(value);
      assert.equal(await page.locator("#phone-number").inputValue(), value, "Visible formatting is not truncated");
      await page.locator("#phone-form button").click();
      await finished(page, /Number accepted/);
      await frozen(page, "#phone-form");
      await page.locator("#phone-number").pressSequentially("9");
      assert.equal(await page.locator("#phone-number").inputValue(), value);
    }, 320);
  }
  await visit("phone", "fixed", async page => {
    for (const value of ["", "202abc5550107", "202 555 010", "202 555 0108", "+1 (202) 555-0107", "202.555.0107"]) {
      await page.locator("#phone-number").fill(value);
      await page.locator("#phone-form button").click();
      await pending(page);
      assert.match(await page.locator("#extra-status").textContent(), /fictional demo number 2025550107/);
    }
  });
  for (const mode of ["easy", "hard"]) {
    await visit("phone", mode, async page => {
      assert.match(await page.locator("#exhibit-task").textContent(), /Locking digits is optional/);
      await page.locator("#confirm-phone").click();
      await pending(page);
      for (let index = 9; index >= 0; index--) {
        for (let roll = 0; (await page.locator(`#phone-digit-${index}`).textContent()) !== "2025550107"[index]; roll++) {
          assert(roll < 160, "Chance eventually supplies the requested digit");
          await page.locator(`[data-roll="${index}"]`).click();
        }
      }
      assert.equal(await page.locator('[data-lock][aria-pressed="true"]').count(), 0, "No mandatory locking condition was added");
      await page.locator("#confirm-phone").click();
      await finished(page, /Number accepted/);
      await frozen(page, "#stage");
    });
  }

  for (const query of ["quiet cafe", " QUIET   CAFES ", "Quiet Cafe"]) {
    await visit("correcting-search", "fixed", async page => {
      for (const unrelated of ["weather", "quiet weather", "quiet cages"]) {
        await page.locator("#correcting-input").fill(unrelated);
        await page.locator("#correcting-submit").click();
        await pending(page);
      }
      await page.locator("#correcting-input").fill(query);
      await page.locator("#correcting-submit").click();
      await finished(page, /local demo results/);
      assert.match(await page.locator("#correcting-results").textContent(), /Quiet cafes/);
      await frozen(page, ".correcting-machine");
    });
  }
  await visit("cookies", "fixed", async page => {
    await page.locator('[data-cookie="0"]').click();
    await page.locator("#save-cookies").click();
    await finished(page, /selected preferences/);
    await frozen(page, "#stage");
    assert.match(await page.locator("#cookie-summary").textContent(), /Analytics: disabled; Marketing: enabled/);
  });
  await visit("password-gym", "fixed", async page => {
    await page.locator("#gym-phrase").pressSequentially("123456789012");
    await pending(page);
    await page.locator("#gym-create").click();
    await finished(page, /phrase accepted/);
    assert.equal(await page.locator("#gym-phrase").inputValue(), "123456789012");
  });

  await visit("unix-birthday", "easy", async page => {
    const input = page.locator("#epoch-input");
    const target = Date.UTC(1992, 6, 16);
    const min = Number(await input.getAttribute("min"));
    const max = Number(await input.getAttribute("max"));
    await input.scrollIntoViewIfNeeded();
    const bounds = await input.boundingBox();
    const ratio = (target - min) / (max - min);
    await input.tap({ position: { x: 8 + (bounds.width - 16) * ratio, y: bounds.height / 2 } });
    await page.locator("#epoch-align").tap();
    let delta = (target - Number(await input.inputValue())) / 86400000;
    assert(Number.isInteger(delta) && Math.abs(delta) <= 90, "A coarse real touch tap gets near the prescribed date");
    while (delta !== 0) {
      await page.getByRole("button", { name: `${delta > 0 ? "Increase" : "Decrease"} timestamp by one day`, exact: true }).tap();
      delta = (target - Number(await input.inputValue())) / 86400000;
    }
    await page.getByRole("button", { name: "Increase timestamp by one hour", exact: true }).tap();
    assert.equal(Number(await input.inputValue()), target + 3600000);
    await page.getByRole("button", { name: "Confirm demo birthday", exact: true }).tap();
    await pending(page);
    assert.match(await page.locator("#extra-status").textContent(), /not midnight UTC/);
    await page.getByRole("button", { name: "Decrease timestamp by one hour", exact: true }).tap();
    await page.getByRole("button", { name: "Decrease timestamp by one day", exact: true }).tap();
    await page.getByRole("button", { name: "Increase timestamp by one day", exact: true }).tap();
    assert.equal(Number(await input.inputValue()), target);
    assert.match(await page.locator("#epoch-readout").textContent(), /1992-07-16 00:00:00.*Aligned to midnight/);
    await page.getByRole("button", { name: "Confirm demo birthday", exact: true }).tap();
    await finished(page, /Alex.*1992-07-16/);
    await frozen(page, "#epoch-form");
  }, 320);

  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}
console.log("Forms UX: accepted values stay locked; explicit retries re-arm results; all affected modes passed.");
