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
    assert.equal(await page.locator(".thumb-scene").count(), 18, "All eighteen redesigned previews must render");
    const issues = await page.evaluate(() => {
      const failures = [];
      for (const scene of document.querySelectorAll(".thumb-scene")) {
        const art = scene.closest(".card-art").getBoundingClientRect();
        const label = scene.closest(".card-art").querySelector(".exhibit-number").getBoundingClientRect();
        if (scene.querySelector(".thumb-kicker").getBoundingClientRect().top < label.bottom + 4) {
          failures.push(`${scene.className}: kicker crowds exhibit label`);
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
      for (const id of ["terms-game", "expanding-form", "corporate"]) {
        await page.locator(`.exhibit-card[href="/exhibit/${id}"]`).screenshot({ path: `${outputDirectory}/mobile-${id}.png` });
      }
    }
  }
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