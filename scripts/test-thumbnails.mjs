import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const museumUrl = process.env.MUSEUM_URL || "http://127.0.0.1:3000";
const outputDirectory = "/tmp/museum-thumbnails";
await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});

try {
  const page = await browser.newPage();
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(museumUrl, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator(".thumb-scene").count(), 32, "All thirty-two older previews must render");
    const issues = await page.evaluate(() => {
      const failures = [];
      for (const scene of document.querySelectorAll(".thumb-scene")) {
        const art = scene.closest(".card-art").getBoundingClientRect();
        const label = scene.closest(".card-art").querySelector(".exhibit-number").getBoundingClientRect();
        if (scene.querySelector(".thumb-kicker").getBoundingClientRect().top < label.bottom + 4) {
          failures.push(`${scene.className}: kicker crowds exhibit label`);
        }
        if (scene.matches(".thumb-runaway")) {
          const caption = scene.querySelector(".thumb-chase>small").getBoundingClientRect();
          for (const obstacle of scene.querySelectorAll(".thumb-fleeing-button,.thumb-chase-pointer")) {
            const bounds = obstacle.getBoundingClientRect();
            if (caption.left < bounds.right && caption.right > bounds.left && caption.top < bounds.bottom && caption.bottom > bounds.top) failures.push("Runaway caption is obscured");
          }
        }
        for (const element of [scene, ...scene.querySelectorAll("*")]) {
          const bounds = element.getBoundingClientRect();
          if (bounds.width && bounds.height && (bounds.left < art.left || bounds.right > art.right + 1 || bounds.top < art.top || bounds.bottom > art.bottom + 1)) {
            failures.push(`${scene.className}: ${element.className || element.tagName} leaves artwork`);
          }
          if (element.childElementCount === 0 && element.textContent.trim() && element.scrollWidth > element.clientWidth + 1 && getComputedStyle(element).display !== "inline") {
            failures.push(`${scene.className}: text overflow: ${element.textContent}`);
          }
        }
        const walker = document.createTreeWalker(scene, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const textNode = walker.currentNode;
          if (!textNode.textContent.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(textNode);
          for (const rect of range.getClientRects()) {
            for (let ancestor = textNode.parentElement; ancestor && ancestor !== scene.parentElement; ancestor = ancestor.parentElement) {
              const style = getComputedStyle(ancestor);
              const bounds = ancestor.getBoundingClientRect();
              const clipsHorizontally = /hidden|clip|auto|scroll/.test(style.overflowX);
              const clipsVertically = /hidden|clip|auto|scroll/.test(style.overflowY);
              if ((clipsHorizontally && (rect.left < bounds.left - 1 || rect.right > bounds.right + 1)) || (clipsVertically && (rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1))) {
                failures.push(`${scene.className}: internally clipped text: ${textNode.textContent}`);
              }
            }
          }
        }
      }
      if (document.documentElement.scrollWidth > innerWidth) failures.push("Page overflows viewport");
      return failures;
    });
    assert.deepEqual(issues, [], `Thumbnail fit at ${width}px`);
    await page.screenshot({ path: `${outputDirectory}/gallery-${width}.png`, fullPage: true });
    if (width === 320) {
      for (const id of ["terms-game", "expanding-form", "corporate", "phone", "word-editor", "cookies", "retro", "alphabet", "ai-store", "fonts"]) {
        await page.locator(`.exhibit-card[href="/exhibit/${id}"]`).screenshot({ path: `${outputDirectory}/mobile-${id}.png` });
      }
    }
  }
  const animatedIds = ["runaway", "phone", "cookies", "seismic-editor", "alphabet"];
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(museumUrl, { waitUntil: "networkidle" });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const trigger of ["hover", "focus"]) {
    for (const id of animatedIds) {
      await page.mouse.move(0, 0);
      await page.evaluate(() => document.activeElement?.blur());
      const card = page.locator(`.exhibit-card[href="/exhibit/${id}"]`);
      if (trigger === "hover") await card.hover();
      else await card.focus();
      const result = await card.evaluate(element => {
        const animations = element.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("thumb-"));
        if (!animations.length) return { error: "No preview animation" };
        const finite = animations.every(animation => animation.effect.getTiming().iterations === 1);
        const sample = [];
        for (const progress of [0, .5, 1]) {
          for (const animation of animations) {
            animation.pause();
            animation.currentTime = Number(animation.effect.getTiming().duration) * progress;
          }
          const art = element.querySelector(".card-art").getBoundingClientRect();
          for (const child of element.querySelectorAll(".thumb-scene *")) {
            const bounds = child.getBoundingClientRect();
            if (bounds.width && bounds.height && (bounds.left < art.left - 1 || bounds.right > art.right + 1 || bounds.top < art.top - 1 || bounds.bottom > art.bottom + 1)) {
              return { error: `Animation leaves artwork: ${child.className}` };
            }
          }
          sample.push(animations.map(animation => {
            const style = getComputedStyle(animation.effect.target, animation.effect.pseudoElement);
            return [style.translate, style.scale, style.rotate].join(";");
          }).join("|"));
        }
        return { finite, moves: sample[0] !== sample[2] };
      });
      assert.equal(result.error, undefined, `${id} ${trigger}: ${result.error}`);
      assert.ok(result.finite && result.moves, `${id} ${trigger} must visibly animate once`);
      await card.screenshot({ path: `${outputDirectory}/${trigger}-${id}.png` });
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(museumUrl, { waitUntil: "networkidle" });
  for (const id of animatedIds) {
    const card = page.locator(`.exhibit-card[href="/exhibit/${id}"]`);
    await card.hover();
    await card.focus();
    assert.equal(await card.evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("thumb-")).length), 0, `${id} must respect reduced motion`);
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const runawayCard = page.locator('.exhibit-card[href="/exhibit/runaway"]');
  await runawayCard.hover();
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(await runawayCard.evaluate(element => {
    getComputedStyle(element.querySelector(".thumb-fleeing-button")).animationName;
    return element.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("thumb-")).length;
  }), 0, "Enabling reduced motion must stop a live replay");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(museumUrl, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    const { exhibits } = await import("/app.js");
    const cards = [...document.querySelectorAll(".exhibit-card")];
    const olderIds = new Set(exhibits.filter(exhibit => !exhibit.new).map(exhibit => exhibit.id));
    const sheet = document.createElement("main");
    sheet.style.cssText = "display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;padding:20px";
    for (const card of cards) {
      const id = card.getAttribute("href").split("/").pop();
      if (!olderIds.has(id)) continue;
      card.querySelector(".card-meta")?.remove();
      card.querySelector("p")?.remove();
      sheet.append(card);
    }
    document.body.replaceChildren(sheet);
    if (sheet.children.length !== olderIds.size) throw new Error("Contact sheet is missing older exhibits");
    await document.fonts.ready;
  });
  await page.screenshot({ path: `${outputDirectory}/older-contact-sheet.png`, fullPage: true });
  await page.evaluate(async () => {
    const { exhibits } = await import("/app.js");
    const sheet = document.createElement("main");
    sheet.style.cssText = "display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;padding:16px";
    for (const exhibit of exhibits.filter(exhibit => !exhibit.new)) {
      const image = document.createElement("img");
      image.src = `/share/${exhibit.id}.png`;
      image.alt = exhibit.name;
      image.style.cssText = "display:block;width:100%;height:auto";
      sheet.append(image);
    }
    document.body.replaceChildren(sheet);
    await Promise.all([...sheet.children].map(async image => {
      await image.decode();
      if (image.naturalWidth !== 1200 || image.naturalHeight !== 630) throw new Error(`Invalid share image: ${image.alt}`);
    }));
  });
  await page.screenshot({ path: `${outputDirectory}/share-contact-sheet.png`, fullPage: true });
  console.log(`Thumbnail fit passed at desktop, tablet, and two mobile widths. Screenshots: ${outputDirectory}`);
} finally {
  await browser.close();
}