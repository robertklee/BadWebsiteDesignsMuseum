import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
const url = process.env.MUSEUM_URL || "http://127.0.0.1:3019";
await mkdir("/tmp/checkout-thumbnail", { recursive: true });
try {
  for (const width of [1440, 768, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const card = page.locator('.exhibit-card[href="/exhibit/layout-checkout"]');
    await card.locator("img").evaluate(image => image.decode());
    for (const trigger of ["hover", "focus"]) {
      await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.mouse.move(0, 0);
      await page.evaluate(() => document.activeElement?.blur());
      if (trigger === "hover") await card.hover();
      else {
        await page.keyboard.press("Tab");
        await card.focus();
      }
      const result = await card.evaluate(element => {
        const animations = element.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("thumb-checkout-"));
        if (animations.length !== 3) return ["Missing checkout animation"];
        const failures = [];
        const art = element.querySelector(".card-art").getBoundingClientRect();
        const button = element.querySelector(".checkout-thumb-button");
        const positions = [];
        for (const progress of [0, .25, .5, .75, 1]) {
          for (const animation of animations) {
            animation.pause();
            animation.currentTime = 1700 * progress;
          }
          positions.push(button.getBoundingClientRect().top);
          for (const child of element.querySelectorAll(".checkout-thumbnail, .checkout-thumbnail *")) {
            const rect = child.getBoundingClientRect();
            if (rect.left < art.left || rect.right > art.right + 1 || rect.top < art.top || rect.bottom > art.bottom + 1) failures.push(`${child.className} leaves artwork at ${progress}`);
            if (child.childElementCount === 0 && child.clientWidth && child.scrollWidth > child.clientWidth + 1) failures.push(`${child.className} text overflows`);
          }
        }
        if (positions.at(-1) - positions[0] < 30) failures.push("Checkout must visibly move down");
        return failures;
      });
      assert.deepEqual(result, [], `${width}px ${trigger}`);
      await card.screenshot({ path: `/tmp/checkout-thumbnail/${width}-${trigger}.png` });
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(url, { waitUntil: "networkidle" });
    await card.hover();
    await page.waitForFunction(() => getComputedStyle(document.querySelector(".checkout-thumb-button")).animationName === "none");
    assert.equal(await card.evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("thumb-checkout-")).length), 0);
    await page.close();
  }
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await mobile.goto(url, { waitUntil: "networkidle" });
  await mobile.evaluate(() => document.fonts.ready);
  const mobileCard = mobile.locator('.exhibit-card[href="/exhibit/layout-checkout"]');
  await mobileCard.locator(".card-art").evaluate(element => {
    const bounds = element.getBoundingClientRect();
    scrollBy({ top: bounds.top + bounds.height / 2 - innerHeight / 2, behavior: "instant" });
  });
  await mobile.waitForFunction(() => document.querySelector('.exhibit-card[href="/exhibit/layout-checkout"]').classList.contains("thumb-scroll-active"));
  assert.equal(await mobileCard.evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("thumb-checkout-")).length), 3);
  await mobileCard.evaluate(element => {
    for (const animation of element.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("thumb-checkout-"))) animation.finish();
  });
  await mobile.waitForFunction(() => !document.querySelector('.exhibit-card[href="/exhibit/layout-checkout"]').classList.contains("thumb-scroll-active"));
  await mobileCard.screenshot({ path: "/tmp/checkout-thumbnail/mobile-autoplay.png" });
  await mobile.close();
  console.log("Checkout thumbnail: responsive fit, moving button, hover, focus, mobile autoplay/completion, image loading, and reduced motion passed.");
} finally {
  await browser.close();
}