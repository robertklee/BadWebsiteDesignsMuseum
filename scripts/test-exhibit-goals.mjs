import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { chromium } from "playwright";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
const errors = [];
const modes = ["easy", "hard", "fixed"];

async function open(id, mode, width = 1280, clock = false) {
  const page = await browser.newPage({ viewport: { width, height: 844 }, reducedMotion: "reduce" });
  page.on("pageerror", error => errors.push(error.message));
  await page.addInitScript(() => {
    window.completions = 0;
    document.addEventListener("exhibit-complete", () => { window.completions++; });
  });
  if (clock) {
    await page.clock.install();
    await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
  }
  await page.goto(`${origin}/exhibit/${id}?mode=${mode}`);
  await page.locator("#stage").waitFor();
  return page;
}

async function unfinished(page) {
  assert.equal(await page.evaluate(() => window.completions), 0);
  assert.equal(await page.locator("#difficulty-progress").isVisible(), false);
  assert.equal(await page.locator("#exhibit-outcome").isVisible(), false);
}

async function finished(page, message, outcome = "success") {
  assert.equal(await page.evaluate(() => window.completions), 1, "Completion fires once");
  assert.equal(await page.locator("#stage").getAttribute("data-outcome"), outcome);
  assert.equal(await page.locator("#completion-title").textContent(), outcome === "blocked" ? "Demo complete — goal blocked" : "Task complete");
  assert.match(await page.locator("#difficulty-progress p").textContent(), message);
  assert.equal(await page.locator("#exhibit-outcome").isVisible(), true);
  assert.equal(await page.evaluate(() => {
    const bounds = document.querySelector("#exhibit-outcome").getBoundingClientRect();
    return bounds.top >= 0 && bounds.bottom <= innerHeight && bounds.left >= 0 && bounds.right <= innerWidth;
  }), true, "Result notification fits the visible screen");
  assert.equal(await page.evaluate(() => !!document.activeElement.closest("#difficulty-progress, #exhibit-outcome")), false, "Completion does not steal focus");
}

try {
  for (const mode of modes) {
    for (const [id, input, action, target] of [
      ["fonts", "#type-input", "#type-approve", "Library open until 9 pm"],
      ["seismic-editor", "#quake-input", "#quake-finish", "Bring a notebook"],
      ["word-editor", "#word-text", "#word-finish", "Meet at six"],
    ]) {
      const page = await open(id, mode);
      const write = async text => {
        if (id !== "word-editor" || mode === "fixed") {
          await page.locator(input).fill(text);
          if (id === "seismic-editor" && await page.locator("#quake-rebuild").isVisible()) await page.locator("#quake-rebuild").click();
        }
        else for (const [index, letter] of [...text].entries()) await page.locator(`[data-character="${index}"]`).selectOption(letter);
      };
      await write("A");
      await page.locator(action).click();
      await unfinished(page);
      if (id === "word-editor" && mode !== "fixed") await page.locator('[data-character="0"]').selectOption(target[0]);
      if (id === "word-editor" && mode !== "fixed") {
        for (let index = 1; index < target.length; index++) await page.locator(`[data-character="${index}"]`).selectOption(target[index]);
      } else await write(target);
      await page.locator(action).click();
      await finished(page, /draft|notice saved/i);
      await page.close();
    }

    for (const id of ["dropdown", "alphabet"]) {
      const page = await open(id, mode);
      const radio = id === "dropdown";
      const target = radio ? "ON MY WAY" : "HELLO";
      const message = page.locator(radio ? "#message" : "#alphabet-message");
      const form = page.locator(radio ? "#message-form" : "#alphabet-form");
      if (mode === "fixed") {
        await message.fill("A");
        await form.locator('button[type="submit"], button:not([type])').click();
        await unfinished(page);
        await message.fill(target);
      } else {
        for (const letter of target) {
          if (radio) {
            const frequency = await page.locator(".frequency-directory span").evaluateAll((items, letter) => {
              const label = letter === " " ? "[space]" : letter;
              return Number(items.find(item => item.firstChild.textContent.trim() === label).querySelector("b").textContent.split(" ")[0]);
            }, letter);
            await page.locator("#letter-dial").fill(String(frequency));
            await page.locator("#receive-letter").click();
          } else {
            if (mode === "hard") await page.locator("#alphabet-slider").dispatchEvent("change");
            const index = await page.locator(".alphabet-order span").evaluateAll((items, letter) => items.findIndex(item => item.textContent === letter), letter);
            await page.locator("#alphabet-slider").evaluate((slider, index) => {
              slider.value = String(index);
              slider.dispatchEvent(new Event("input", { bubbles: true }));
            }, index);
            await page.locator("#append-character").click();
          }
          if ((await message.inputValue()).length === 1) {
            await form.locator('button[type="submit"], button:not([type])').click();
            await unfinished(page);
          }
        }
      }
      await form.locator('button[type="submit"], button:not([type])').click();
      await finished(page, /message sent/i);
      await page.close();
    }

    const search = await open("correcting-search", mode);
    await search.locator("#correcting-input").fill("unmatched nonsense");
    await search.locator("#correcting-submit").evaluate(button => button.click());
    await unfinished(search);
    await search.locator("#correcting-input").fill("quiet cafes");
    if (mode !== "fixed") {
      while (await search.locator("#correcting-submit").isDisabled()) {
        await search.locator("#correcting-review").waitFor({ state: "visible" });
        if (mode === "hard") await search.locator("#correcting-reason").fill("These are my intended words.");
        await search.locator("#correcting-reject").click();
      }
    }
    await search.locator("#correcting-submit").click();
    await finished(search, /quiet cafes.*local demo results/i);
    assert.match(await search.locator("#correcting-results").textContent(), /Quiet cafes/);
    await search.close();

    const birthday = await open("unix-birthday", mode);
    const epoch = birthday.locator("#epoch-input");
    await epoch.fill(mode === "fixed" ? "1990-01-01" : String(Date.UTC(1990, 0, 1)));
    await birthday.locator("#epoch-form button.demo-button").click();
    await unfinished(birthday);
    await epoch.fill(mode === "fixed" ? "1992-07-16" : String(Date.UTC(1992, 6, 16)));
    await unfinished(birthday);
    await birthday.locator("#epoch-form button.demo-button").click();
    await finished(birthday, /Alex.*1992-07-16/);
    await birthday.close();

    const elevator = await open("elevator-date", mode);
    if (mode === "fixed") {
      await elevator.locator("#lift-date").fill("1990-01-01");
      await elevator.locator("#lift-form button").click();
      await unfinished(elevator);
      await elevator.locator("#lift-date").fill("1992-07-16");
      await elevator.locator("#lift-form button").click();
    } else {
      await elevator.clock.install();
      await elevator.clock.pauseAt(await elevator.evaluate(() => Date.now() + 1000));
      await elevator.locator("#lift-select").click();
      await unfinished(elevator);
      assert.match(await elevator.locator("#lift-service").textContent(), /YEAR/);
      for (const target of [1992, 7, 16]) {
        while (Number(await elevator.locator("#lift-floor").textContent()) !== target) {
          const floor = Number(await elevator.locator("#lift-floor").textContent());
          await elevator.locator(floor > target ? "#lift-down" : "#lift-up").click();
          await elevator.locator("#lift-stop").click();
          await elevator.clock.runFor(mode === "hard" ? 350 : 650);
        }
        await elevator.locator("#lift-select").click();
      }
    }
    await finished(elevator, /Alex.*July 16, 1992/);
    await elevator.close();

    const notifications = await open("notification-swatter", mode, 390);
    assert.equal(await notifications.locator("#fly-code").count(), 0);
    assert.equal(await notifications.locator("#fly-company").getAttribute("required"), null);
    for (const [id, value] of Object.entries({ name: "Alex Example", email: "alex@example.test", subject: "Opening hours", message: "Please confirm the opening hours." })) await notifications.locator(`#fly-${id}`).fill(value);
    if (mode !== "fixed") assert((await notifications.locator(".fly-notification").count()) > 0);
    await notifications.locator("#fly-finish").focus();
    await notifications.keyboard.press("Enter");
    await finished(notifications, /Support request sent/i);
    assert.equal(await notifications.locator(".fly-notification").count(), 0);
    await notifications.close();

    const tetris = await open("tetris-volume", mode);
    if (mode === "fixed") {
      await tetris.locator("#tetris-volume").fill("100");
      await unfinished(tetris);
      await tetris.locator("#tetris-volume").fill("60");
    } else {
      await tetris.locator("#tetris-play").click();
      for (let piece = 0; piece < 12; piece++) {
        let swaps = 0;
        while (!(await tetris.locator("#tetris-piece-name").textContent()).startsWith("O block")) {
          assert(swaps++ < 14, "Two consecutive piece bags include an O block");
          await tetris.locator("#tetris-another").click();
        }
        const column = piece % 4 * 2;
        for (let step = 0; step < Math.abs(column - 3); step++) await tetris.locator(`[data-tetris-action="${column < 3 ? "left" : "right"}"]`).click();
        await tetris.locator('[data-tetris-action="drop"]').click();
        if (piece < 11) await unfinished(tetris);
      }
      assert.equal(await tetris.locator("#tetris-play").textContent(), "Resume game");
    }
    await finished(tetris, /volume set to 60%.*Target reached/i);
    await tetris.close();

    const seesaw = await open("volume-seesaw", mode);
    if (mode === "fixed") {
      await seesaw.locator("#seesaw-volume").fill("70");
      await unfinished(seesaw);
      await seesaw.locator("#seesaw-volume").fill("65");
    } else {
      await seesaw.locator("#seesaw-hold").click();
      await unfinished(seesaw);
      assert.match(await seesaw.locator("#extra-status").textContent(), /target is 65%/);
      await seesaw.locator("#seesaw-hold").click();
      await seesaw.locator("#seesaw-weight").selectOption("1");
      await seesaw.locator("#seesaw-add-right").click();
      await seesaw.locator("#seesaw-hold").click();
    }
    await finished(seesaw, /65%.*Target reached/);
    await seesaw.close();

    const cart = await open("physics-cart", mode);
    await cart.locator('[data-add="0"]').click();
    if (mode !== "fixed") {
      for (let steps = 0; !(await cart.locator("#arcade-cart-state").textContent()).includes("Accidental checkout"); steps++) {
        assert(steps < 100, "The cart reaches the accidental checkout zone");
        await cart.locator("#arcade-step").click();
      }
      await unfinished(cart);
      await cart.locator("#arcade-checkout").click();
      await unfinished(cart);
      await cart.locator("#arcade-park").click();
    }
    await cart.locator("#arcade-checkout").click();
    await finished(cart, /Intentional demo checkout confirmed/);
    await cart.close();

    const corporate = await open("corporate", mode);
    await corporate.locator(".corporate-content > button").click();
    if (mode !== "fixed") {
      for (let step = 0; step < 4; step++) {
        await corporate.locator("#paradigm").selectOption({ index: 1 });
        if (mode === "hard") await corporate.locator(".obstacle-check input").check();
        await corporate.locator(".obstacle-panel button.demo-button").click();
        if (step < 3) await unfinished(corporate);
      }
      assert.equal(await corporate.locator("#paradigm").count(), 0);
    }
    await finished(corporate, mode === "fixed" ? /task board opened/ : /onboarding blocked/, mode === "fixed" ? "success" : "blocked");
    await corporate.close();

    const gym = await open("password-gym", mode);
    await gym.locator("#gym-phrase").fill(mode === "fixed" ? "a throwaway phrase" : "Rain sorry VII monday please #c0ffee 2026 moon cat () !!! banana robot tea [] + _ ? left right I agree 69 !!! !");
    await finished(gym, mode === "hard" ? /no password can satisfy/ : /phrase accepted/i, mode === "hard" ? "blocked" : "success");
    assert.equal(await gym.locator("#gym-phrase").getAttribute("readonly"), "");
    await gym.close();

    const recipe = await open("recipe", mode);
    if (mode !== "fixed") {
      for (const answer of ["A toaster", "Nobody could agree", "A spoon", "A journey", "Butter", "Butter on toast"]) {
        await recipe.locator("#reading-answer").selectOption(answer);
        if (mode === "hard") await recipe.locator(".obstacle-check input").check();
        await recipe.locator(".reading-quiz button").click();
      }
    }
    await finished(recipe, mode === "fixed" ? /Recipe ready/ : /put butter on toast/);
    assert.equal(await recipe.locator("#actual-recipe").isVisible(), true);
    await recipe.close();

    const terms = await open("terms-game", mode);
    await terms.locator("#terms-decline").click();
    await finished(terms, /terms declined/);
    await terms.close();

    for (const id of ["runaway", "mystery-menu"]) {
      const downloadPage = await open(id, mode);
      if (id === "mystery-menu") {
        await downloadPage.locator('[data-mystery-destination="receipts"]').click();
        assert.equal(await downloadPage.locator("#mystery-shipping").count(), 0);
      }
      const downloading = downloadPage.waitForEvent("download");
      await downloadPage.locator(id === "runaway" ? ".runaway-button" : "#mystery-receipt").click();
      const download = await downloading;
      assert.equal(download.suggestedFilename(), id === "runaway" ? "museum-demo-ticket.txt" : "museum-demo-receipt.txt");
      assert.match(await readFile(await download.path(), "utf8"), /No (reservation|order)/);
      await finished(downloadPage, id === "runaway" ? /ticket downloaded/ : /Receipt downloaded/);
      await downloadPage.close();
    }

    const store = await open("ai-store", mode);
    for (const product of ["spoon", "umbrella"]) {
      await store.locator(`[data-ai-product="${product}"]`).click();
      if (mode !== "fixed") {
        await store.locator("#ai-prompt").fill(product === "spoon" ? "I want this for soup." : "I want this for rain.");
        for (let round = 0; round < (mode === "hard" ? 3 : 1); round++) await store.locator("#ai-prompt-form button").click();
        await store.locator("#ai-activate").click();
      }
      if (product === "spoon") await unfinished(store);
    }
    await finished(store, /Umbrella added/);
    await store.close();

    const loading = await open("loading", mode, 1280, true);
    await loading.locator("#loading-start").click();
    if (mode !== "fixed") {
      for (let step = 0; !(await loading.locator("#loaded-sentence").isVisible()); step++) {
        assert(step < 16, "The booking confirmation has a finite endpoint");
        if (await loading.locator("#loading-approve").isVisible()) await loading.locator("#loading-approve").click();
        await loading.clock.runFor(mode === "hard" ? 1200 : 800);
      }
    }
    await finished(loading, /Booking confirmation opened.*Saturday at 2 pm/);
    await loading.close();

    const expanding = await open("expanding-form", mode);
    for (const [index, value] of ["Alex Example", "alex@example.test", "Opening hours", "Please confirm the hours."].entries()) await expanding.locator(`#expanding-field-${index}`).fill(value);
    if (mode !== "fixed") await expanding.locator("#expanding-compress").click();
    await expanding.locator("#expanding-submit").click();
    await finished(expanding, /form complete/i);
    await expanding.close();

    const wind = await open("wind-volume", mode, 1280, true);
    await wind.locator("#wind-save").click();
    await unfinished(wind);
    await wind.locator("#wind-field").scrollIntoViewIfNeeded();
    const field = await wind.locator("#wind-field").boundingBox();
    await wind.mouse.click(field.x + field.width / 2, field.y + field.height / 2 + 13 * 1.8);
    await wind.locator("#wind-save").click();
    await finished(wind, /volume set to 37%.*Target reached/);
    await wind.close();

    if (mode === "fixed") {
      const crane = await open("password-crane", mode);
      await crane.locator("#arcade-phrase").fill("four");
      await crane.locator("#arcade-phrase-form button").click();
      await unfinished(crane);
      await crane.locator("#arcade-phrase").fill("Claw_M00n!42");
      await crane.locator("#arcade-phrase-form button").click();
      await finished(crane, /Test-account phrase accepted/);
      await crane.close();
    }
    console.log(`Passed realistic missions and explicit outcomes in ${mode} mode.`);
  }

  for (const [value, accepted] of [[57, false], [58, true], [62, true], [63, false]]) {
    const page = await open("tetris-volume", "fixed");
    await page.locator("#tetris-volume").fill(String(value));
    if (accepted) await finished(page, /Target reached/);
    else await unfinished(page);
    await page.close();
  }

  for (const width of [320, 390, 768, 1280]) {
    const page = await open("unresponsive-buttons", "fixed", width);
    await page.locator(".guide-dismiss").click();
    await page.locator(".start-exhibit").click();
    await page.locator('[data-delta="1"]').click();
    await page.locator(".eventually-reserve").click();
    await finished(page, /Two tickets reserved/);
    await page.locator("#exhibit-outcome a").click();
    assert.equal(await page.locator("#completion-title").evaluate(element => element === document.activeElement), true);
    await page.locator('[data-difficulty-action="stay"]').click();
    assert.equal(await page.locator("#stage").getAttribute("data-outcome"), "success", "Dismissing feedback preserves the completed state");
    await page.locator(".reset-button").click();
    await page.evaluate(() => { window.completions = 0; });
    await unfinished(page);
    assert.equal(await page.locator("#stage").getAttribute("data-outcome"), null);
    await page.close();
  }
  assert.deepEqual(errors, []);
  console.log("Passed target boundaries, visible mobile results, explicit result navigation, and restart cleanup.");
} finally {
  await browser.close();
}
