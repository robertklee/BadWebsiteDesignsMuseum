import assert from "node:assert/strict";
import { chromium } from "playwright";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
const errors = [];

function luminance(color) {
  const values = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(value => {
    const channel = value / 255;
    return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
  });
  return values[0] * .2126 + values[1] * .7152 + values[2] * .0722;
}

function contrast(first, second) {
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
}

try {
  for (const width of [320, 390, 1280]) {
    for (const mode of ["easy", "hard", "fixed"]) {
      const context = await browser.newContext({
        viewport: { width, height: 740 },
        hasTouch: width < 500,
        isMobile: width < 500,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(`${origin}/exhibit/runaway?mode=${mode}`);
      assert.match(await page.locator(".guide-steps").innerText(), /Switching modes.*clears progress/);
      assert.match(await page.locator(".guide-steps").innerText(), /Escape exits only.*museum controls/);
      await page.getByRole("button", { name: "Got it — let's try it", exact: true }).click();
      await page.getByRole("button", { name: "Jump into exhibit ↓", exact: true }).click();
      const entry = await page.evaluate(() => ({
        task: document.querySelector("#exhibit-task").getBoundingClientRect().toJSON(),
        toolbar: document.querySelector(".exhibit-toolbar").getBoundingClientRect().toJSON(),
        focus: document.activeElement.id,
        viewport: innerHeight,
      }));
      assert.equal(entry.focus, "stage");
      assert(entry.task.top >= entry.toolbar.bottom + 10, `Mission clears toolbar at ${width}px`);
      assert(entry.task.top <= entry.toolbar.bottom + 14, "Mission has no excessive leading space");
      assert(entry.task.bottom <= entry.viewport, "Mission is visible before entering the challenge");
      await page.keyboard.press("Escape");
      assert.equal(new URL(page.url()).pathname, "/exhibit/runaway");
      await page.keyboard.press("Tab");
      assert.equal(await page.getByRole("button", { name: "Download ticket →", exact: true })
        .evaluate(element => element === document.activeElement), true);
      const download = page.waitForEvent("download");
      await page.keyboard.press("Enter");
      await download;
      await page.locator("#exhibit-outcome").waitFor({ state: "visible" });
      assert.equal(await page.locator("#exhibit-task > span").innerText(), "TASK COMPLETE");
      assert.equal(await page.locator("#stage").getAttribute("data-outcome"), "success");
      const resultBounds = await page.locator("#exhibit-outcome").boundingBox();
      assert(resultBounds.x >= 0 && resultBounds.x + resultBounds.width <= width);
      assert(resultBounds.y >= 0 && resultBounds.y + resultBounds.height <= 740);
      await page.getByRole("button", { name: "Hide result notification", exact: true }).click();
      assert.equal(await page.locator("#difficulty-progress").isVisible(), true);
      await page.getByRole("button", { name: "Keep admiring this mess", exact: true }).click();
      assert.equal(await page.locator("#difficulty-progress").isVisible(), false);
      assert.equal(await page.locator("#exhibit-task > span").innerText(), "TASK COMPLETE");
      await page.getByRole("button", { name: "Restart in the current mode", exact: true }).click();
      assert.equal(await page.locator("#exhibit-task > span").innerText(), "YOUR TASK");
      assert.equal(await page.locator("#stage").getAttribute("data-outcome"), null);
      assert.equal(await page.locator("#difficulty-progress").isVisible(), false);
      assert.equal(await page.locator("#exhibit-outcome").isVisible(), false);
      assert.equal(await page.locator(`[data-mode="${mode === "easy" ? "bad" : mode === "hard" ? "worse" : "fixed"}"]`)
        .getAttribute("aria-pressed"), "true");
      const secondDownload = page.waitForEvent("download");
      await page.getByRole("button", { name: "Download ticket →", exact: true }).press("Enter");
      await secondDownload;
      await page.getByRole("link", { name: /View result and next options/ }).click();
      assert.equal(await page.locator("#completion-title")
        .evaluate(element => element === document.activeElement), true);
      assert.equal(await page.locator("#exhibit-outcome").isVisible(), false);
      await page.getByRole("button", { name: "Restart in the current mode", exact: true }).press("Escape");
      await page.waitForURL("**/#collection");
      await context.close();
    }
  }

  const page = await browser.newPage({ viewport: { width: 320, height: 740 }, reducedMotion: "reduce" });
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(`${origin}/exhibit/validation-afterthought?mode=fixed`);
  await page.getByRole("textbox", { name: "Guest name", exact: true }).fill("Alex Example");
  await page.getByRole("textbox", { name: "Demo email", exact: true }).fill("alex@example.test");
  const reference = page.getByRole("textbox", { name: "Booking reference", exact: true });
  await reference.fill("EVT-2048");
  await reference.press("Escape");
  assert.equal(new URL(page.url()).pathname, "/exhibit/validation-afterthought");
  assert.equal(await reference.inputValue(), "EVT-2048");
  assert.equal(await page.getByRole("textbox", { name: "Guest name", exact: true }).inputValue(), "Alex Example");

  await page.goto(`${origin}/exhibit/expanding-form?mode=fixed`);
  await page.getByRole("button", { name: "Got it — let's try it", exact: true }).click();
  await page.getByRole("button", { name: "Jump into exhibit ↓", exact: true }).click();
  const name = page.getByRole("textbox", { name: /Full name/ });
  for (let step = 0; step < 5 && !await name.evaluate(element => element === document.activeElement); step++) {
    await page.keyboard.press("Tab");
  }
  const focus = await page.locator(":focus").evaluate(element => {
    const style = getComputedStyle(element);
    return { outline: style.outlineColor, shadow: style.boxShadow, tag: element.tagName };
  });
  assert.equal(focus.tag, "INPUT");
  assert(contrast(focus.outline, "rgb(255, 255, 255)") >= 3, "Light-surface focus has adequate outline contrast");
  assert.match(focus.shadow, /255, 255, 255/, "White halo preserves focus visibility on dark surfaces");
  await page.goto(`${origin}/exhibit/word-editor`);
  const index = await page.locator(".word-letter > span").first().evaluate(element => ({
    text: getComputedStyle(element).color,
    background: getComputedStyle(element.closest(".word-editor-page")).backgroundColor,
  }));
  assert(contrast(index.text, index.background) >= 4.5, "Character indices meet normal-text contrast");
  await page.close();
  assert.deepEqual(errors, []);
  console.log("Museum UX passed: visible missions, scoped Escape, truthful restart, persistent results, and focus contrast.");
} finally {
  await browser.close();
}
