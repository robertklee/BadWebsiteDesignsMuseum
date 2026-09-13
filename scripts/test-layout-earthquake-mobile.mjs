import assert from "node:assert/strict";
import { chromium } from "playwright";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3003";
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
const errors = [];

try {
  for (const width of [320, 390, 700]) {
    for (const mode of ["easy", "hard", "fixed"]) {
      const mobile = await browser.newPage({ viewport: { width, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: "reduce" });
      mobile.on("pageerror", error => errors.push(error.message));
      await mobile.goto(`${origin}/exhibit/layout-earthquake?mode=${mode}`);
      await mobile.evaluate(() => {
        window.completions = 0;
        document.querySelector("#stage").addEventListener("exhibit-complete", () => { window.completions++; });
      });
      await mobile.waitForFunction(() => [...document.querySelectorAll(".news-photo img")].every(image => image.complete && image.naturalWidth > 0));
      await mobile.locator(".news-viewport").focus();
      const stageHeight = await mobile.locator("#stage").evaluate(element => element.offsetHeight);
      const viewportHeight = await mobile.locator(".news-viewport").evaluate(element => element.clientHeight);
      for (const selector of ['[data-article="library"]', ".news-story-copy>h3", "#news-bookmark"]) {
        if (selector === ".news-story-copy>h3") {
          for (let attempt = 0; attempt <= (mode === "fixed" ? 0 : mode === "hard" ? 4 : 2); attempt++) {
            await mobile.locator('[data-article="library"]').click();
          }
          assert.equal(await mobile.locator("#news-story").isVisible(), true);
        }
        const target = mobile.locator(selector);
        for (let update = 0; update < (mode === "fixed" ? 6 : mode === "hard" ? 20 : 12); update++) {
          await target.scrollIntoViewIfNeeded();
          const before = await target.boundingBox();
          const scrollBefore = await mobile.locator(".news-viewport").evaluate(element => element.scrollTop);
          // Do not let Playwright scroll the toolbar into view and mask the reader's movement.
          await mobile.locator("#edition-step").evaluate(button => button.click());
          await mobile.evaluate(() => new Promise(requestAnimationFrame));
          const after = await target.boundingBox();
          const distance = Math.abs(after.y - before.y);
          if (mode === "fixed") assert(distance < 1, "Fixed mobile content stays in place");
          else {
            assert(distance >= viewportHeight * (mode === "hard" ? .55 : .4), `${mode} ${width}px ${selector} update ${update}: visible shift is ${distance}px`);
            assert.equal(await mobile.locator(".news-viewport").evaluate(element => element.scrollTop), scrollBefore, "Ad collapse does not clamp the reader's scroll position");
          }
        }
      }
      if (mode !== "fixed") {
        await mobile.locator("#edition-step").evaluate(button => button.click());
        await mobile.locator('#news-story [data-dismiss="0"]').click();
        const sponsor = mobile.locator('[data-story-slot="0"]');
        assert.equal(await sponsor.evaluate(element => element.clientHeight), 0);
        await mobile.locator("#edition-step").evaluate(button => { button.click(); button.click(); });
        assert.equal((await sponsor.evaluate(element => element.clientHeight)) > 0, mode === "hard", "Only hard mode brings dismissed ads back");
      }
      await mobile.locator("#news-bookmark").click();
      assert.equal(await mobile.evaluate(() => window.completions), 1);
      assert.equal(await mobile.locator("#edition-state").textContent(), "Edition settled");
      assert.equal(await mobile.locator("#stage").evaluate(element => element.offsetHeight), stageHeight);
      assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await mobile.setViewportSize({ width: 900, height: 844 });
      await mobile.waitForFunction(() => [...document.querySelectorAll("#news-feed, #news-story")].every(element => !element.style.minHeight));
      await mobile.close();
      console.log(`Passed measured mobile displacement at ${width}px in ${mode}, including collapse, repeat cycles, and desktop resize.`);
    }
  }
  for (const mode of ["easy", "hard"]) {
    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: "reduce" });
    mobile.on("pageerror", error => errors.push(error.message));
    await mobile.clock.install();
    await mobile.goto(`${origin}/exhibit/layout-earthquake?mode=${mode}`);
    await mobile.clock.pauseAt(await mobile.evaluate(() => Date.now() + 1000));
    await mobile.locator(".news-viewport").focus();
    const target = mobile.locator('[data-article="library"]');
    await target.scrollIntoViewIfNeeded();
    const before = await target.boundingBox();
    await mobile.clock.runFor(5000);
    assert.deepEqual(await target.boundingBox(), before, "Reduced motion does not shift mobile content automatically");
    await mobile.emulateMedia({ reducedMotion: "no-preference" });
    await mobile.waitForFunction(() => document.querySelector("#edition-step").hidden);
    const interval = mode === "hard" ? 1100 : 1800;
    await mobile.clock.runFor(interval);
    assert(Math.abs((await target.boundingBox()).y - before.y) >= 230, "Automatic mobile loading visibly displaces the article");
    await mobile.locator("#edition-pause").evaluate(button => button.click());
    const paused = await target.boundingBox();
    await mobile.clock.runFor(interval * 3);
    assert.deepEqual(await target.boundingBox(), paused, "Pause stops mobile displacement");
    await mobile.locator("#edition-pause").evaluate(button => button.click());
    await mobile.clock.runFor(interval);
    assert(Math.abs((await target.boundingBox()).y - paused.y) >= 230, "Resuming visibly collapses the mobile placements");
    await mobile.close();
  }
  assert.deepEqual(errors, []);
  console.log("Passed automatic mobile loading, reduced motion, and pause/resume.");
} finally {
  await browser.close();
}
