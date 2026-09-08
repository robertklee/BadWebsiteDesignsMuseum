import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const museumUrl = process.env.MUSEUM_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.goto(museumUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const advance = milliseconds => page.evaluate(duration => new Promise(resolve => setTimeout(resolve, duration)), milliseconds);
  const activeCount = () => page.locator(".thumb-scroll-active").count();
  const position = async (id, fraction = .36) => {
    await page.locator(`.exhibit-card[href="/exhibit/${id}"] .card-art`).evaluate((element, target) => {
      const bounds = element.getBoundingClientRect();
      window.scrollBy({ top: bounds.top + bounds.height / 2 - innerHeight * target, behavior: "instant" });
    }, fraction);
    await advance(32);
  };
  await position("runaway", .65);
  await advance(250);
  assert.equal(await activeCount(), 0, "Outside the activation band stays still");
  await position("runaway");
  await advance(100);
  assert.equal(await activeCount(), 0, "Wait for scrolling to settle");
  await advance(120);
  assert.equal(await activeCount(), 1);
  assert.equal(await page.locator('.exhibit-card[href="/exhibit/runaway"]').evaluate(element => element.classList.contains("thumb-scroll-active")), true);
  assert.equal(await page.evaluate(() => document.activeElement === document.body), true, "Scroll activation must not move focus");
  assert.ok(await page.locator(".thumb-scroll-active").evaluate(element => element.getAnimations({ subtree: true }).some(animation => animation.animationName === "thumb-dodge")), "Real CSS animation must start");
  await position("phone");
  assert.equal(await activeCount(), 0, "Scrolling cancels the previous replay");
  await advance(220);
  assert.equal(await activeCount(), 1, "Only the newly positioned card plays");
  await position("runaway");
  await advance(250);
  assert.equal(await activeCount(), 0, "Previously played cards do not replay");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await position("cookies");
  await advance(250);
  assert.equal(await activeCount(), 0, "Reduced motion disables scroll activation");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await advance(250);
  assert.equal(await activeCount(), 1, "Unplayed cards can activate when motion is enabled");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await advance(32);
  assert.equal(await activeCount(), 0, "A live preference change cancels the replay");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await position("wind-volume");
  await position("password-crane");
  await position("physics-cart");
  assert.equal(await activeCount(), 0, "Quick swipes must not start incidental replays");
  await advance(220);
  assert.equal(await page.locator('.thumb-scroll-active[href="/exhibit/physics-cart"]').count(), 1);
  await page.locator(".thumb-scroll-active").evaluate(element => {
    for (const animation of element.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("thumb-"))) animation.finish();
  });
  await advance(250);
  assert.equal(await activeCount(), 0, "A finished replay returns to the static artwork");

  await page.evaluate(() => document.dispatchEvent(new PointerEvent("pointerdown", { pointerType: "touch" })));
  await position("tetris-volume");
  await advance(250);
  assert.equal(await activeCount(), 0, "A held finger prevents activation even when scrolling has paused");
  await page.evaluate(() => document.dispatchEvent(new PointerEvent("pointerup", { pointerType: "touch" })));
  await advance(220);
  assert.equal(await activeCount(), 1, "Releasing the finger starts the settling delay");

  await page.locator('[data-filter="Interaction"]').evaluate(element => element.click());
  await position("runaway");
  await advance(250);
  assert.equal(await activeCount(), 0, "Filtering must retain played IDs");
  await position("wind-volume");
  await advance(220);
  assert.equal(await activeCount(), 1, "A card skipped during a swipe remains eligible after filtering");
  await page.locator('[data-filter="Forms"]').evaluate(element => element.click());
  assert.equal(await activeCount(), 0, "Replacing the grid cancels an active replay");
  await page.locator('[data-filter="All exhibits"]').evaluate(element => element.click());
  await position("password-crane");
  await page.evaluate(() => {
    document.dispatchEvent(new PointerEvent("pointerdown", { pointerType: "touch" }));
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await advance(250);
  assert.equal(await activeCount(), 0, "Hidden tabs cannot start pending replays");
  await page.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await advance(220);
  assert.equal(await activeCount(), 1, "Returning after a hidden touch gesture resumes eligibility");

  await position("loading");
  await page.locator('.exhibit-card[href="/exhibit/loading"]').tap();
  await page.waitForURL("**/exhibit/loading");
  await advance(300);
  assert.equal(await activeCount(), 0, "Navigation cancels pending gallery work");
  assert.ok(await page.locator("#stage").count(), "A tap opens the exhibit normally");
  await page.locator(".escape").tap();
  await page.waitForURL("**/#collection");
  await position("runaway");
  await advance(220);
  assert.equal(await activeCount(), 1, "A new collection visit permits a fresh replay");
  await mkdir("/tmp/museum-thumbnails", { recursive: true });
  await page.screenshot({ path: "/tmp/museum-thumbnails/mobile-scroll-activation.png" });

  await page.setViewportSize({ width: 768, height: 900 });
  await position("seismic-editor");
  const rowIds = new Set();
  for (let turn = 0; turn < 3; turn++) {
    await advance(220);
    assert.equal(await activeCount(), 1, "Touch tablet rows only animate one card at a time");
    rowIds.add(await page.locator(".thumb-scroll-active").getAttribute("href"));
    await page.locator(".thumb-scroll-active").evaluate(element => {
      for (const animation of element.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("thumb-"))) animation.finish();
    });
  }
  assert.equal(rowIds.size, 3, "Eligible neighboring cards take distinct turns");
  await advance(250);
  assert.equal(await activeCount(), 0, "The row stops after each card has played once");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(museumUrl, { waitUntil: "networkidle" });
  for (const id of ["correcting-search", "expanding-form", "corporate", "password-gym", "elevator-date", "email-auction", "word-editor", "terms-game", "fonts", "retro", "address-jigsaw", "ai-store"]) {
    await position(id);
    await advance(220);
    assert.equal(await page.locator(`.thumb-scroll-active[href="/exhibit/${id}"]`).count(), 1, `${id} must activate on mobile scroll`);
    await page.locator(".thumb-scroll-active").evaluate(element => {
      for (const animation of element.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("thumb-"))) animation.finish();
    });
    await advance(220);
    assert.equal(await activeCount(), 0, `${id} must settle after its complete sequence`);
  }
  await position("notification-swatter");
  await page.evaluate(() => {
    history.pushState(null, "", "/exhibit/loading");
    dispatchEvent(new PopStateEvent("popstate"));
  });
  await advance(250);
  assert.equal(await activeCount(), 0, "In-page routing disposes pending gallery activation");
  assert.equal(await page.locator("#exhibit-grid").count(), 0);

  const hybrid = await browser.newPage({ viewport: { width: 768, height: 900 } });
  await hybrid.goto(museumUrl, { waitUntil: "networkidle" });
  const hybridCard = hybrid.locator('.exhibit-card[href="/exhibit/runaway"]');
  await hybridCard.hover();
  assert.ok(await hybridCard.evaluate(element => element.getAnimations({ subtree: true }).some(animation => animation.animationName?.startsWith("thumb-"))), "Tablet cursor hover starts playback");
  await hybrid.evaluate(() => document.dispatchEvent(new PointerEvent("pointerdown", { pointerType: "touch" })));
  assert.equal(await hybridCard.evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("thumb-")).length), 0, "Switching to touch cancels stale cursor playback on a hover-capable tablet");
  await hybridCard.locator(".card-art").evaluate(element => {
    const bounds = element.getBoundingClientRect();
    scrollBy({ top: bounds.top + bounds.height / 2 - innerHeight * .36, behavior: "instant" });
  });
  await hybrid.evaluate(() => document.dispatchEvent(new PointerEvent("pointerup", { pointerType: "touch" })));
  await advance(250);
  assert.equal(await hybrid.locator(".thumb-scroll-active").count(), 1, "Touch scrolling works even when the primary pointer supports hover");
  assert.equal(await hybrid.locator(".exhibit-card:not(.thumb-scroll-active)").evaluateAll(elements => elements.flatMap(element => element.getAnimations({ subtree: true })).filter(animation => animation.animationName?.startsWith("thumb-")).length), 0, "Touch mode must not leave a second card playing through stale hover");
  await hybrid.mouse.move(1, 1);
  assert.equal(await hybrid.locator(".thumb-scroll-active").count(), 0, "Returning to the cursor cancels scroll playback");
  await hybridCard.hover();
  assert.ok(await hybridCard.evaluate(element => element.getAnimations({ subtree: true }).some(animation => animation.animationName?.startsWith("thumb-"))), "Cursor playback resumes after touch");
  await hybrid.evaluate(() => {
    document.dispatchEvent(new PointerEvent("pointerdown", { pointerType: "touch" }));
    document.dispatchEvent(new PointerEvent("pointerup", { pointerType: "touch" }));
  });
  await hybrid.mouse.wheel(0, 10);
  await advance(250);
  assert.equal(await hybrid.locator("#exhibit-grid").getAttribute("data-thumb-input"), "mouse", "Trackpad or wheel input restores cursor mode");
  assert.equal(await hybrid.locator(".thumb-scroll-active").count(), 0, "Wheel scrolling must not start touch playback");

  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto(museumUrl, { waitUntil: "networkidle" });
  assert.equal(await page.evaluate(() => matchMedia("(hover: none) and (pointer: coarse)").matches), true);
  const touchPrimaryCard = page.locator('.exhibit-card[href="/exhibit/runaway"]');
  await touchPrimaryCard.hover();
  assert.equal(await activeCount(), 0, "Mouse input cancels touch-primary tablet autoplay");
  assert.ok(await touchPrimaryCard.evaluate(element => element.getAnimations({ subtree: true }).some(animation => animation.animationName?.startsWith("thumb-"))), "A mouse can animate previews even when the tablet still reports a coarse primary pointer");

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await desktop.goto(museumUrl, { waitUntil: "networkidle" });
  await desktop.locator('.exhibit-card[href="/exhibit/runaway"] .card-art').evaluate(element => {
    const bounds = element.getBoundingClientRect();
    scrollBy({ top: bounds.top + bounds.height / 2 - innerHeight * .36, behavior: "instant" });
  });
  await advance(250);
  assert.equal(await desktop.locator(".thumb-scroll-active").count(), 0, "Desktop scrolling must not auto-play previews");
  console.log("Mobile scroll previews passed: band, debounce, touch gestures, one-at-a-time tablet rows, hybrid tablet input switching, once-per-visit, filtering, focus, reduced motion, visibility, routing, and desktop exclusion.");
} finally {
  await browser.close();
}