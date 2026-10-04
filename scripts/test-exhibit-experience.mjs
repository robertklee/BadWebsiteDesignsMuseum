import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { getCatalog } from "../exhibits/registry.js";

const origin = process.env.MUSEUM_URL || "http://127.0.0.1:3000";
const screenshots = "/tmp/museum-exhibit-experience";
await mkdir(screenshots, { recursive: true });
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
const errors = [];
const observe = page => page.on("pageerror", error => errors.push(error.message));
const guideOpen = page => page.locator(".exhibit-guide").evaluate(element => element.open);
const familiarContext = {
  "cat-captcha": /CAPTCHA/,
  runaway: /normally you click a button/i,
  "password-gym": /password requirements/i,
  "correcting-search": /search/i,
  "layout-checkout": /checkout/i,
  "layout-earthquake": /ads?/i,
  "scroll-modal": /delivery/i,
  "validation-afterthought": /form|register/i,
  "hover-menu": /menus?/i,
  "notification-swatter": /form/i,
  "tetris-volume": /slider|Tetris/i,
  phone: /phone|number/i,
  "terms-game": /terms|agreement/i,
  fonts: /font/i,
  "unix-birthday": /birthday/i,
  cancel: /cancel/i,
  recipe: /recipe/i,
  "expanding-form": /contact/i,
  dropdown: /message/i,
  "unresponsive-buttons": /tickets/i,
  "seismic-editor": /editor|sentence/i,
  "volume-seesaw": /slider|sound/i,
  "wind-volume": /slider/i,
  "checkbox-ecosystem": /settings?/i,
  "password-crane": /password|phrase/i,
  "physics-cart": /basket/i,
  "email-auction": /email/i,
  "elevator-date": /calendar|date/i,
  "shrinking-unsubscribe": /subscription/i,
  "word-editor": /document|dropdown/i,
  cookies: /cookie/i,
  "address-jigsaw": /delivery|address/i,
  retro: /guestbook/i,
  "ai-store": /object|spoon/i,
  "mystery-menu": /delivery policy|receipt/i,
  alphabet: /message/i,
  corporate: /setup|product/i,
  loading: /progress|sentence/i,
};

async function completeTickets(page, mode) {
  await page.locator('[data-delta="1"]').focus();
  await page.keyboard.press("Enter");
  if (mode !== "fixed") await page.clock.runFor(mode === "hard" ? 1800 : 1100);
  assert.equal(await page.locator(".eventually-count").textContent(), "2");
  await page.locator(".eventually-reserve").click();
  assert.equal(await page.locator("#difficulty-progress").isVisible(), true);
  assert.equal(await page.evaluate(() => !!document.activeElement.closest("#difficulty-progress")), false, "Completion must not steal focus");
}

async function checkControls(page, width) {
  if (width <= 720) {
    const toolbar = await page.locator(".exhibit-toolbar").boundingBox();
    assert(toolbar.height <= 100, "The mobile museum toolbar stays compact");
  }
  const bounds = await page.locator(".exhibit-toolbar button, .exhibit-toolbar a").evaluateAll(elements => elements.map(element => {
    const rect = element.getBoundingClientRect();
    return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, height: rect.height };
  }));
  for (const control of bounds) {
    assert(control.left >= 0 && control.right <= width + 1, `Museum controls fit at ${width}px`);
    assert(control.height >= 44, "Museum controls retain 44px touch targets");
  }
  for (let index = 0; index < bounds.length; index++) {
    for (const other of bounds.slice(index + 1)) {
      const control = bounds[index];
      assert(control.right <= other.left || other.right <= control.left || control.bottom <= other.top || other.bottom <= control.top, "Museum controls must not overlap");
    }
  }
  const worse = await page.locator('[data-mode="worse"]').boundingBox();
  const fixed = await page.locator('[data-mode="fixed"]').boundingBox();
  assert(fixed.width < worse.width, "Fix it stays secondary to Make it even worse");
}

try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  const page = await context.newPage();
  observe(page);
  await page.goto(origin);
  await page.locator(".hero .primary-link").click();
  assert.equal(new URL(page.url()).pathname, "/exhibit/cat-captcha");
  assert.equal(await guideOpen(page), true, "First exhibit opens the inline guide");
  assert.equal(await page.locator(".guide-steps li").count(), 3);
  assert.match(await page.locator(".guide-intro").textContent(), /simple tasks online/i);
  const catIntro = await page.locator(".new-demo-intro").textContent();
  assert.match(catIntro, /CAPTCHA.*prove you're human.*ticking a box or selecting pictures/i);
  assert.match(catIntro, /4 pieces of cheese/);
  assert.match(catIntro, /not while you think/);
  assert.equal(await page.locator("#stage .exhibit-toolbar").count(), 0);
  await page.locator(".guide-dismiss").click();
  assert.equal(await guideOpen(page), false);
  assert.equal(await page.evaluate(() => sessionStorage.getItem("museum-guide-dismissed")), "true");
  await page.reload();
  assert.equal(await guideOpen(page), false, "Dismissal survives a reload in the same tab");
  await page.locator(".exhibit-bottom a").last().click();
  assert.equal(await guideOpen(page), false, "The next exhibit does not repeat onboarding");
  await page.locator(".exhibit-guide summary").click();
  assert.equal(await guideOpen(page), true, "Help can always be reopened");
  await page.locator('[data-mode="worse"]').click();
  assert.equal(await guideOpen(page), true, "Mode changes preserve reopened help");
  await page.locator(".guide-dismiss").click();
  await page.locator(".start-exhibit").focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.locator("#stage").evaluate(element => element === document.activeElement), true);
  const placement = await page.evaluate(() => ({
    stageTop: document.querySelector("#stage").getBoundingClientRect().top,
    toolbarBottom: document.querySelector(".exhibit-toolbar").getBoundingClientRect().bottom,
  }));
  assert(placement.stageTop >= placement.toolbarBottom, "Jumping into the exhibit clears the sticky controls");
  assert(placement.stageTop <= placement.toolbarBottom + 24, "Jumping into the exhibit does not leave excessive empty space");
  await page.keyboard.press("Tab");
  assert.equal(await page.locator("#stage").evaluate(element => element.contains(document.activeElement)), true, "Keyboard entry reaches exhibit controls");
  await page.keyboard.press("Escape");
  await page.waitForURL("**/#collection");

  await page.goto(`${origin}/?mode=hard#exhibit/runaway`);
  assert.equal(new URL(page.url()).pathname, "/exhibit/runaway", "Legacy exhibit links still resolve");
  assert.equal(await page.locator('[data-mode="worse"]').getAttribute("aria-pressed"), "true");
  await page.goto(`${origin}/exhibit/runaway?mode=fixed`);
  assert.equal(await page.locator('[data-mode="fixed"]').getAttribute("aria-pressed"), "true");
  await page.goto(`${origin}/exhibit/runaway?mode=unknown`);
  assert.equal(await page.locator('[data-mode="bad"]').getAttribute("aria-pressed"), "true");
  await page.goto(`${origin}/#exhibit/not-a-real-exhibit`);
  assert.equal(await page.locator(".not-found").isVisible(), true);
  await context.close();

  const play = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  observe(play);
  await play.clock.install();
  await play.goto(`${origin}/exhibit/unresponsive-buttons`);
  await play.clock.pauseAt(await play.evaluate(() => Date.now() + 1000));
  await play.locator(".guide-dismiss").click();
  await completeTickets(play, "easy");
  await play.clock.runFor(10000);
  assert.equal(await play.locator('[data-mode="bad"]').getAttribute("aria-pressed"), "true", "Completion never advances automatically");
  assert.equal(await play.locator(".eventually-reserve").isDisabled(), true, "The successful result is preserved");
  assert.equal(new URL(play.url()).searchParams.has("mode"), false);
  await play.locator('[data-mode="bad"]').click();
  assert.equal(await play.locator(".eventually-count").textContent(), "2", "Selecting the active mode does not erase progress");
  await play.locator('[data-difficulty-action="stay"]').click();
  assert.equal(await play.locator("#difficulty-progress").isVisible(), false);
  await play.locator(".reset-button").click();
  assert.equal(await play.locator(".eventually-count").textContent(), "1");
  await completeTickets(play, "easy");
  await play.locator('[data-difficulty-action="advance"]').click();
  assert.equal(new URL(play.url()).searchParams.get("mode"), "hard");
  assert.equal(await play.locator('[data-mode="worse"]').getAttribute("aria-pressed"), "true");
  assert.equal(await play.locator(".eventually-count").textContent(), "1");
  await completeTickets(play, "hard");
  assert.equal(await play.locator("#difficulty-progress .completion-primary").getAttribute("href"), "/exhibit/seismic-editor");
  await play.locator('[data-difficulty-action="fix"]').click();
  assert.equal(new URL(play.url()).searchParams.get("mode"), "fixed");
  await completeTickets(play, "fixed");
  await play.locator(".reset-button").click();
  assert.equal(await play.locator('[data-mode="fixed"]').getAttribute("aria-pressed"), "true", "Restart preserves fixed mode");
  assert.equal(await play.locator(".eventually-count").textContent(), "1");
  await play.locator('[data-mode="worse"]').click();
  await play.locator('[data-delta="1"]').focus();
  await play.keyboard.press("Enter");
  await play.locator(".reset-button").click();
  await play.clock.runFor(5000);
  assert.equal(await play.locator(".eventually-count").textContent(), "1", "Restart cancels pending work");
  assert.equal(await play.locator('[data-mode="worse"]').getAttribute("aria-pressed"), "true", "Restart preserves hard mode");
  await play.close();

  const blocked = await browser.newContext();
  await blocked.addInitScript(() => {
    Object.defineProperty(window, "sessionStorage", {
      get() { throw new DOMException("Storage disabled for this check", "SecurityError"); },
    });
  });
  const fallback = await blocked.newPage();
  observe(fallback);
  const warnings = [];
  fallback.on("console", message => { if (message.type() === "warning") warnings.push(message.text()); });
  await fallback.goto(`${origin}/exhibit/runaway`);
  assert.equal(await guideOpen(fallback), true);
  await fallback.locator(".guide-dismiss").click();
  await fallback.locator('[data-mode="worse"]').click();
  assert.equal(await guideOpen(fallback), false, "Blocked storage retains in-memory dismissal for mode changes");
  assert(warnings.some(warning => warning.includes("guide preference")));
  assert(warnings.some(warning => warning.includes("guide dismissal")));
  await blocked.close();

  for (const width of [320, 390, 768, 1280]) {
    const responsive = await browser.newContext({
      viewport: { width, height: 1000 },
      hasTouch: width < 500,
      isMobile: width < 500,
      reducedMotion: "reduce",
    });
    const mobile = await responsive.newPage();
    observe(mobile);
    await mobile.goto(`${origin}/exhibit/unresponsive-buttons`);
    await checkControls(mobile, width);
    assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Guide fits at ${width}px`);
    await mobile.screenshot({ path: `${screenshots}/guide-${width}.png`, fullPage: true });
    if (width < 500) {
      await mobile.locator(".guide-dismiss").tap();
      await mobile.locator(".start-exhibit").tap();
    } else {
      await mobile.locator(".guide-dismiss").click();
      await mobile.locator(".start-exhibit").click();
    }
    await checkControls(mobile, width);
    const visibleStage = await mobile.evaluate(() => ({
      stage: document.querySelector("#stage").getBoundingClientRect().top,
      toolbar: document.querySelector(".exhibit-toolbar").getBoundingClientRect().bottom,
    }));
    assert(visibleStage.stage >= visibleStage.toolbar, `Exhibit entry clears toolbar at ${width}px`);
    assert(visibleStage.stage <= visibleStage.toolbar + 24, `Exhibit entry stays close to toolbar at ${width}px`);
    await mobile.screenshot({ path: `${screenshots}/playing-${width}.png` });
    await mobile.locator('[data-mode="fixed"]').click();
    await mobile.locator('[data-delta="1"]').click();
    await mobile.locator(".eventually-reserve").click();
    assert.equal(await mobile.locator("#difficulty-progress").isVisible(), true);
    assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Completion fits at ${width}px`);
    await mobile.locator("#difficulty-progress").screenshot({ path: `${screenshots}/completion-${width}.png` });
    await responsive.close();
  }

  const catalog = await browser.newPage({ viewport: { width: 1280, height: 1000 }, reducedMotion: "reduce" });
  observe(catalog);
  assert.equal(Object.keys(familiarContext).length, getCatalog().length, "Every exhibit has contextual-copy coverage");
  for (const exhibit of getCatalog()) {
    for (const mode of ["easy", "hard", "fixed"]) {
      await catalog.goto(`${origin}/exhibit/${exhibit.id}?mode=${mode}`);
      assert.equal(await catalog.locator("#stage").getAttribute("aria-describedby"), "exhibit-task");
      assert.equal(await catalog.locator("#exhibit-task p").textContent(), mode === "fixed" ? exhibit.fixedTask : exhibit.task);
      assert.equal(await catalog.locator("#stage").evaluate(element => element.children.length > 0), true, `${exhibit.id}/${mode} renders inside the frame`);
      const introduction = await catalog.locator("#stage .new-demo-intro, #stage .form-demo > p, #stage .word-editor-intro > p, #stage .demo-centered > p, #stage .recipe-intro > p, #stage .retro-subtitle, #stage .corporate-content > p").first().textContent();
      assert.match(introduction, familiarContext[exhibit.id], `${exhibit.id}/${mode} introduces the familiar task`);
      assert.doesNotMatch(introduction, /A fake website inside a real museum|Prove you're human\. Become a mouse/i);
      if (exhibit.id === "cat-captcha" && mode === "hard") assert.match(introduction, /6 pieces of cheese/);
      assert.equal(await catalog.locator(".curator-note").evaluate(element => element.open), false, "Curator commentary does not distract from play");
      assert.equal(await catalog.locator(".toolbar-exit").getAttribute("href"), "/#collection");
    }
    await catalog.goto(`${origin}/exhibit/cat-captcha?mode=fixed`);
    await catalog.locator("#cat-simple-check").check();
    await catalog.locator("#cat-simple-form button").click();
    assert.equal(await catalog.locator("#difficulty-progress").isVisible(), true, "The contextual human-check copy preserves the checkbox interaction");
  }
  await catalog.close();
  assert.deepEqual(errors, []);
  console.log(`Exhibit experience passed: guide, keyboard and touch entry, explicit progression, restart, storage fallback, routes, responsive controls, and all exhibit modes. Screenshots: ${screenshots}`);
} finally {
  await browser.close();
}
