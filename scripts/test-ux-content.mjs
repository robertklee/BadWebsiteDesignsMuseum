import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { chromium } from "playwright";

const origin = (process.env.MUSEUM_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const artifacts = process.env.MUSEUM_CONTENT_ARTIFACTS ? resolve(process.env.MUSEUM_CONTENT_ARTIFACTS) : null;
if (artifacts) await mkdir(artifacts, { recursive: true });
const browser = await chromium.launch({
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {}),
  ...(artifacts ? { downloadsPath: artifacts } : {}),
});
const errors = [];
const results = [];
const modes = ["easy", "hard", "fixed"];
const profiles = [
  { name: "desktop", viewport: { width: 1280, height: 900 }, reducedMotion: "no-preference" },
  { name: "mobile320", viewport: { width: 320, height: 740 }, hasTouch: true, isMobile: true, reducedMotion: "reduce" },
  { name: "keyboard", viewport: { width: 1280, height: 900 }, reducedMotion: "reduce", keyboard: true },
];
const chapters = [
  { answer: "A toaster", prose: /She owned a toaster/ },
  { answer: "Nobody could agree", prose: /It faced east\. Or perhaps west\..*debating this/ },
  { answer: "A spoon", prose: /almost bought a spoon/ },
  { answer: "A journey", prose: /I say it's a journey/ },
  { answer: "Butter", prose: /The butter was butter/ },
  { answer: "Butter on toast", prose: /just butter on toast/ },
];

async function tabTo(page, target) {
  assert.equal(await target.isVisible(), true, "Keyboard target is a visible control");
  for (let step = 0; step < 100; step++) {
    if (await target.evaluate(element => element === document.activeElement)) return;
    await page.keyboard.press("Tab");
  }
  assert.fail(`Tab could not reach ${target}`);
}

async function activate(page, target, profile) {
  if (profile.keyboard) {
    await tabTo(page, target);
    await page.keyboard.press("Enter");
  } else if (profile.hasTouch) {
    await target.tap();
  } else {
    await target.click();
  }
}

async function choose(page, answer, profile) {
  const select = page.locator("#reading-answer");
  if (profile.keyboard) {
    await tabTo(page, select);
    await page.keyboard.type(answer);
    await page.keyboard.press("Tab");
  } else {
    await select.selectOption({ label: answer });
  }
  assert.equal(await select.inputValue(), answer, "The public select committed the intended answer");
}

async function certify(page, profile) {
  const checkbox = page.getByRole("checkbox", { name: "I certify that this paragraph changed my relationship with toast." });
  assert.equal(await checkbox.isVisible(), true);
  assert.equal(await checkbox.getAttribute("required"), "");
  if (profile.keyboard) {
    await tabTo(page, checkbox);
    await page.keyboard.press("Space");
  } else if (profile.hasTouch) {
    await checkbox.tap();
  } else {
    await checkbox.check();
  }
  assert.equal(await checkbox.isChecked(), true);
}

async function completionCount(page) {
  return page.evaluate(() => window.uxContentCompletions);
}

async function unfinished(page, count = 0) {
  assert.equal(await completionCount(page), count, "Arrival or partial progress is not a win");
  assert.equal(await page.locator("#stage").getAttribute("data-outcome"), null);
  assert.equal(await page.locator("#exhibit-task > span").textContent(), "YOUR TASK");
  assert.equal(await page.locator("#difficulty-progress").isVisible(), false);
  assert.equal(await page.locator("#exhibit-outcome").isVisible(), false);
}

async function finished(page, count = 1) {
  assert.equal(await completionCount(page), count, "Exactly one completion per attempt");
  assert.equal(await page.locator("#stage").getAttribute("data-outcome"), "success");
  assert.equal(await page.locator("#exhibit-task > span").textContent(), "TASK COMPLETE");
  assert.equal(await page.locator(".exhibit-frame-footer > span").first().textContent(), "TASK COMPLETE");
  assert.equal(await page.locator("#completion-title").textContent(), "Task complete");
}

async function fits(page) {
  assert.equal(await page.evaluate(() => {
    const stage = document.querySelector("#stage");
    return document.documentElement.scrollWidth <= innerWidth + 1 && stage.scrollWidth <= stage.clientWidth + 1;
  }), true, "Page and exhibit fit without horizontal overflow");
}

async function approve(page, index, mode, profile, previousWins = 0) {
  assert.match(await page.locator("#story-gate .story-chapter").textContent(), chapters[index].prose, "Answer is available in the public story");
  await choose(page, chapters[index].answer, profile);
  if (mode === "hard") await certify(page, profile);
  await activate(page, page.locator(".reading-quiz button"), profile);
  if (index < chapters.length - 1) {
    assert.match(await page.locator(".reading-progress").textContent(), new RegExp(`${index + 1} / 6`));
    assert.equal(await page.locator("#reading-answer").evaluate(element => element === document.activeElement), true, "Next chapter receives focus");
    await unfinished(page, previousWins);
  } else {
    assert.equal(await page.locator("#actual-recipe").evaluate(element => element === document.activeElement), true, "The unlocked recipe receives focus");
  }
}

async function recipeAccessible(page) {
  const recipe = page.locator("#actual-recipe");
  assert.equal(await recipe.isVisible(), true);
  assert.equal(await recipe.getByRole("heading", { name: "Ingredients", exact: true }).isVisible(), true);
  assert.equal(await recipe.getByRole("heading", { name: "Method", exact: true }).isVisible(), true);
  assert.deepEqual(await recipe.locator("li").allTextContents(), [
    "1 slice of bread",
    "1 teaspoon of butter",
    "Toast the bread until golden.",
    "Spread the butter on it. Eat while warm.",
  ]);
  assert.equal(await page.locator(".reading-quiz, .reading-progress, #return-story").count(), 0, "Success cannot relock the recipe");
  assert.doesNotMatch(await page.locator("#stage").textContent(), /toast remains unavailable|SPONSORED SHORTCUT/);
}

async function shortcutTrap(page, mode, profile, expectedChapter, previousWins = 0) {
  await activate(page, page.getByRole("button", { name: "Jump to recipe ↓", exact: true }), profile);
  assert.match(await page.locator("#story-gate").textContent(), /You jumped! To an advertisement/);
  assert.equal(await page.locator("#actual-recipe").count(), 0);
  assert.equal(await page.locator("#return-story").evaluate(element => element === document.activeElement), true);
  await unfinished(page, previousWins);
  await activate(page, page.getByRole("button", { name: "Continue to the story you tried to skip" }), profile);
  assert.match(await page.locator(".reading-progress").textContent(), new RegExp(`${mode === "hard" ? 0 : expectedChapter} / 6`));
  assert.equal(await page.locator("#reading-answer").evaluate(element => element === document.activeElement), true);
  await unfinished(page, previousWins);
}

async function testRecipe(page, mode, profile) {
  await fits(page);
  if (profile.reducedMotion === "reduce") {
    assert.equal(await page.locator("#stage").evaluate(element => getComputedStyle(element).scrollBehavior), "auto", "Reduced motion keeps recipe scrolling non-animated");
  }
  if (mode !== "fixed") {
    await unfinished(page);
    assert.equal(await page.locator("#actual-recipe").count(), 0);
    await activate(page, page.locator(".reading-quiz button"), profile);
    assert.match(await page.locator(".reading-progress").textContent(), /0 \/ 6/);
    await unfinished(page);
    if (mode === "hard") {
      await choose(page, chapters[0].answer, profile);
      await activate(page, page.locator(".reading-quiz button"), profile);
      assert.match(await page.locator(".reading-progress").textContent(), /0 \/ 6/, "Certification remains required");
      await unfinished(page);
    }
    await approve(page, 0, mode, profile);
    await choose(page, "Due north", profile);
    if (mode === "hard") await certify(page, profile);
    await activate(page, page.locator(".reading-quiz button"), profile);
    assert.match(await page.locator(".reading-progress").textContent(), mode === "hard" ? /0 \/ 6/ : /1 \/ 6/);
    assert.match(await page.locator("#demo-status").textContent(), /Incorrect/);
    await unfinished(page);
    if (mode === "hard") await approve(page, 0, mode, profile);
    await shortcutTrap(page, mode, profile, 1);
    for (let index = mode === "hard" ? 0 : 1; index < chapters.length; index++) await approve(page, index, mode, profile);
  } else {
    assert.equal(await page.locator("#jump-recipe, .reading-quiz").count(), 0);
  }
  await finished(page);
  await recipeAccessible(page);
  if (artifacts) await page.screenshot({ path: join(artifacts, `recipe-${mode}-${profile.name}.png`) });
  await activate(page, page.getByRole("button", { name: "Hide result notification" }), profile);
  if (mode !== "fixed") {
    const originalRecipe = await page.locator("#actual-recipe").innerHTML();
    assert.match(await page.locator("#jump-recipe + small").textContent(), /Recipe unlocked/);
    for (let repeat = 0; repeat < 3; repeat++) {
      await activate(page, page.getByRole("button", { name: "Jump to recipe ↓", exact: true }), profile);
      assert.equal(await page.locator("#actual-recipe").evaluate(element => element === document.activeElement), true);
      assert.equal(await page.locator("#actual-recipe").innerHTML(), originalRecipe, "Shortcut retains the terminal recipe");
      await recipeAccessible(page);
      await finished(page);
      assert.equal(await page.locator("#exhibit-outcome").isVisible(), false, "Shortcut does not re-announce success");
    }
  }
  await activate(page, page.getByRole("button", { name: "Keep admiring this mess" }), profile);
  await recipeAccessible(page);
  await finished(page);
  if (mode !== "fixed") {
    await activate(page, page.getByRole("button", { name: "Jump to recipe ↓", exact: true }), profile);
    await recipeAccessible(page);
    await finished(page);
    assert.equal(await page.locator("#difficulty-progress").isVisible(), false);
  }
  await activate(page, page.getByRole("button", { name: "Restart in the current mode" }), profile);
  if (mode !== "fixed") {
    await unfinished(page, 1);
    assert.match(await page.locator(".reading-progress").textContent(), /0 \/ 6/);
    assert.match(await page.locator("#jump-recipe + small").textContent(), /museum's.*Fix it.*Exit controls always work/);
    assert.doesNotMatch(await page.locator("#jump-recipe + small").textContent(), /skip button lies/, "The museum reassures visitors without revealing the blog's shortcut trap");
    await shortcutTrap(page, mode, profile, 0, 1);
    for (let index = 0; index < chapters.length; index++) await approve(page, index, mode, profile, 1);
  }
  await finished(page, 2);
  await recipeAccessible(page);
  await fits(page);
}

async function findReceipt(page, mode, profile, previousWins = 0, requireShipping = false) {
  const links = page.locator("#mystery-nav button");
  assert.equal(await links.count(), 6);
  if (mode === "fixed") {
    if (requireShipping) {
      await activate(page, page.getByRole("button", { name: "Shipping policy", exact: true }), profile);
      assert.equal(await page.locator("#mystery-destination h3").textContent(), "Shipping policy");
      await unfinished(page, previousWins);
    }
    await activate(page, page.getByRole("button", { name: "Receipts", exact: true }), profile);
    return;
  }
  assert.deepEqual(await links.allTextContents(), ["⌘The other thing.", "◇The other thing.", "✳The other thing.", "◌The other thing.", "⧉The other thing.", "⌁The other thing."]);
  if (mode === "hard" && requireShipping) {
    const seen = new Set();
    for (let attempt = 0; attempt < 30 && seen.size < 2; attempt++) {
      await activate(page, links.first(), profile);
      seen.add(await page.locator("#mystery-destination h3").textContent());
      await unfinished(page, previousWins);
    }
    assert.ok(seen.size >= 2, "Hard reshuffling changes where the same public icon leads");
  }
  let shippingSeen = !requireShipping;
  for (let attempt = 0; attempt < 120; attempt++) {
    await activate(page, links.nth(attempt % 6), profile);
    const destination = await page.locator("#mystery-destination h3").textContent();
    if (destination === "Shipping policy") {
      shippingSeen = true;
      await unfinished(page, previousWins);
    }
    if (destination === "Receipts" && shippingSeen) return;
  }
  assert.fail("Visible icon exploration did not find Receipts within 120 clicks");
}

async function downloadReceipt(page, mode, profile, attempt) {
  const pending = page.waitForEvent("download");
  await activate(page, page.getByRole("button", { name: "Download receipt", exact: true }), profile);
  const download = await pending;
  assert.equal(download.suggestedFilename(), "museum-demo-receipt.txt");
  assert.equal(await download.failure(), null);
  const stream = await download.createReadStream();
  assert.ok(stream, "The actual downloaded file is readable");
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  const receipt = Buffer.concat(chunks).toString("utf8");
  assert.match(receipt, /^RECEIPT DEMO-0001\n1 imaginary delivery\nTotal: \$0\.00/);
  assert.match(receipt, /Not valid for a real expense claim\. No order was placed\./);
  assert.equal(await page.locator("#mystery-receipt-text").textContent(), receipt, "On-screen output matches the real download");
  if (artifacts) await writeFile(join(artifacts, `receipt-${mode}-${profile.name}-${attempt}.txt`), receipt);
}

async function testReceipt(page, mode, profile) {
  assert.match(await page.locator(".exhibit-heading p").textContent(), /receipt/i);
  assert.match(await page.locator("#exhibit-task p").textContent(), /receipt.*demo expense claim|demo expense claim.*receipt/i);
  assert.match(await page.locator("#exhibit-task p").textContent(), /Download receipt/);
  assert.match(await page.locator(".new-demo-intro").textContent(), /fictional receipt for a demo expense claim/);
  await activate(page, page.locator(".curator-note summary"), profile);
  assert.match(await page.locator(".curator-note p").textContent(), /receipt/);
  assert.doesNotMatch(await page.locator(".exhibit-heading p, #exhibit-task p, .new-demo-intro, .curator-note p").allTextContents().then(items => items.join("\n")), /shipping/i);
  await unfinished(page);
  await findReceipt(page, mode, profile, 0, true);
  assert.match(await page.locator("#mystery-destination").textContent(), /fictional receipt/);
  assert.match(await page.locator("#mystery-task").textContent(), /Receipt not yet downloaded/);
  await unfinished(page);
  await fits(page);
  await downloadReceipt(page, mode, profile, "first");
  await finished(page);
  assert.match(await page.locator("#mystery-task").textContent(), /^Receipt downloaded/);
  assert.match(await page.locator("#difficulty-progress p").textContent(), /Fictional receipt downloaded.*Not valid for a real expense claim/);
  if (artifacts) await page.screenshot({ path: join(artifacts, `mystery-menu-${mode}-${profile.name}.png`) });
  await activate(page, page.getByRole("button", { name: "Hide result notification" }), profile);
  await downloadReceipt(page, mode, profile, "repeat");
  await finished(page);
  assert.equal(await page.locator("#exhibit-outcome").isVisible(), false, "Downloading again does not re-announce success");
  await activate(page, page.getByRole("button", { name: "Keep admiring this mess" }), profile);
  await activate(page, page.getByRole("button", { name: "Restart in the current mode" }), profile);
  await unfinished(page, 1);
  assert.match(await page.locator("#mystery-task").textContent(), /^Receipt not yet downloaded/);
  await findReceipt(page, mode, profile, 1);
  await unfinished(page, 1);
  await downloadReceipt(page, mode, profile, "restart");
  await finished(page, 2);
  await fits(page);
}

try {
  for (const profile of profiles) {
    for (const mode of modes) {
      for (const id of ["recipe", "mystery-menu"]) {
        const { name, keyboard, ...options } = profile;
        const context = await browser.newContext({ ...options, acceptDownloads: true });
        const page = await context.newPage();
        page.on("pageerror", error => errors.push(`${id}/${mode}/${name}: ${error.message}`));
        await page.addInitScript(() => {
          window.uxContentCompletions = 0;
          document.addEventListener("exhibit-complete", () => { window.uxContentCompletions++; });
        });
        try {
          await page.goto(`${origin}/exhibit/${id}?mode=${mode}`);
          await page.locator("#stage").waitFor();
          if (await page.getByRole("button", { name: "Got it — let's try it" }).isVisible()) {
            await activate(page, page.getByRole("button", { name: "Got it — let's try it" }), profile);
          }
          if (id === "recipe") await testRecipe(page, mode, profile);
          else await testReceipt(page, mode, profile);
          results.push({ id, mode, profile: name, status: "passed", completions: await completionCount(page) });
          console.log(`PASS ${id} ${mode} ${name}`);
        } catch (error) {
          results.push({ id, mode, profile: name, status: "failed", error: error.message });
          if (artifacts) await page.screenshot({ path: join(artifacts, `failure-${id}-${mode}-${name}.png`) }).catch(() => {});
          throw error;
        } finally {
          await context.close();
        }
      }
    }
  }
  assert.deepEqual(errors, [], "No browser errors");
  console.log(`UX content: ${results.length} scenarios passed; public-control completions, terminal recipes, and fictional downloads verified.`);
} finally {
  await browser.close();
  if (artifacts) await writeFile(join(artifacts, "results.json"), JSON.stringify({ origin, results, errors }, null, 2));
}
