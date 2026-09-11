import { createHash } from "node:crypto";
import { cp, mkdir, mkdtemp, readFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shareDirectory = path.join(repositoryRoot, "share");
const checkOnly = process.argv.includes("--check");
const urlArgument = process.argv.indexOf("--url");
const museumUrl = urlArgument === -1 ? "http://127.0.0.1:3000" : process.argv[urlArgument + 1];
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const olderOnly = process.argv.includes("--older");
const idsArgument = process.argv.indexOf("--ids");
const requestedIds = idsArgument === -1 ? null : process.argv[idsArgument + 1]?.split(",");

if (!museumUrl || (urlArgument !== -1 && museumUrl.startsWith("--")) || (idsArgument !== -1 && (!requestedIds || requestedIds.some(id => !/^[a-z0-9-]+$/.test(id))))) {
  throw new Error("Usage: npm run generate:share -- [--url http://127.0.0.1:3000] [--older] [--ids runaway,phone] [--check]");
}

const outputDirectory = checkOnly ? await mkdtemp(path.join(tmpdir(), "museum-share-check-")) : shareDirectory;
if (checkOnly) await cp(shareDirectory, outputDirectory, { recursive: true });

const shareStyles = `
  html, body { width:1200px; height:630px; overflow:hidden; }
  body { background:radial-gradient(ellipse at top left,#303126 0,transparent 55%),#171816; }
  *, *::before, *::after { animation:none!important; transition:none!important; }
  .share-sheet {
    width:1200px; height:630px; display:grid; grid-template-columns:540px 488px;
    gap:64px; padding:65px 54px; align-items:center;
  }
  .share-sheet .card-art { width:540px; height:500px; border-radius:8px; }
  .share-preview-scaled {
    position:absolute; inset:48px auto auto 0;
    width:calc(540px / 1.65); height:245px;
    transform:scale(1.65); transform-origin:top left;
  }
  .share-sheet .art-label {
    position:absolute; top:23px; left:25px; font:11px monospace;
    letter-spacing:1.3px; color:#23231f; z-index:2;
  }
  .share-copy { min-width:0; }
  .share-category {
    color:#ddf860; font:700 15px/1.6 var(--heading);
    letter-spacing:1.5px; margin:0 0 22px;
  }
  .share-title { font-size:58px; line-height:.98; margin:0 0 28px; }
  .share-description { color:#c1c0b6; font-size:22px; line-height:1.45; margin:0 0 32px; }
  .share-cta {
    display:inline-block; padding:9px 13px; background:#ddf860; color:#171816;
    font:700 12px/1.5 var(--heading); letter-spacing:.6px;
  }
  .share-brand {
    position:absolute; right:54px; bottom:33px; color:#aaa99e;
    font:700 14px/1.5 var(--heading); letter-spacing:1.4px;
  }
`;

function hash(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function pngDimensions(buffer) {
  const signature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== signature || buffer.toString("ascii", 12, 16) !== "IHDR") {
    throw new Error("Screenshot is not a valid PNG");
  }
  return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
}

async function renderShareSheet(page, id, reverse = false) {
  return page.evaluate(async ({ exhibitId, reverseCatalog }) => {
    const { exhibits, preview } = await import("/app.js");
    const catalog = reverseCatalog ? [...exhibits].reverse() : exhibits;
    const exhibit = catalog.find(item => item.id === exhibitId);
    if (!exhibit) throw new Error(`Unknown exhibit: ${exhibitId}`);

    document.body.replaceChildren();
    const sheet = document.createElement("main");
    sheet.className = "share-sheet";

    const art = document.createElement("div");
    art.className = `card-art ${exhibit.color}`;
    art.innerHTML = preview(exhibit.id);
    if (!art.firstElementChild) throw new Error(`Missing preview: ${exhibitId}`);
    if (!exhibit.new && !art.querySelector(".thumb-scene")) {
      const scaled = document.createElement("div");
      scaled.className = "share-preview-scaled";
      scaled.append(...art.childNodes);
      art.append(scaled);
    }

    const label = document.createElement("span");
    label.className = "art-label";
    label.textContent = "INTERACTIVE EXHIBIT";
    art.prepend(label);

    const copy = document.createElement("section");
    copy.className = "share-copy";
    for (const [tag, className, text] of [
      ["p", "share-category", exhibit.category.toUpperCase()],
      ["h1", "share-title", exhibit.name],
      ["p", "share-description", exhibit.description],
      ["span", "share-cta", "INTERACTIVE EXHIBIT ↗"],
    ]) {
      const element = document.createElement(tag);
      element.className = className;
      element.textContent = text;
      copy.append(element);
    }

    sheet.append(art, copy);
    const brand = document.createElement("div");
    brand.className = "share-brand";
    brand.textContent = "REALLY BAD DESIGN MUSEUM";
    document.body.append(sheet, brand);
    await document.fonts.ready;
    await Promise.all([...art.querySelectorAll("img")].map(image => image.decode()));
    if (document.getAnimations().length || document.querySelector(".thumb-scroll-active")) {
      throw new Error(`Share artwork must be static: ${exhibitId}`);
    }
    if (exhibitId === "runaway") {
      const caption = art.querySelector(".thumb-chase>small").getBoundingClientRect();
      for (const obstacle of art.querySelectorAll(".thumb-fleeing-button,.thumb-chase-pointer")) {
        const bounds = obstacle.getBoundingClientRect();
        if (caption.left < bounds.right && caption.right > bounds.left && caption.top < bounds.bottom && caption.bottom > bounds.top) throw new Error("Runaway share caption is obscured");
      }
    }

    const text = document.body.innerText;
    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (textNodes.nextNode()) {
      if (/\bexhibit\s*(?:#\s*)?\d+\b/i.test(textNodes.currentNode.textContent)) throw new Error(`Ordinal leaked: ${exhibitId}`);
    }
    const bounds = copy.getBoundingClientRect();
    if (bounds.top < 40 || bounds.bottom > 565 || bounds.right > 1146) {
      throw new Error(`Copy overflows card: ${exhibitId}`);
    }
    for (const container of [art, copy]) {
      const containerBounds = container.getBoundingClientRect();
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        if (!walker.currentNode.textContent.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(walker.currentNode);
        for (const rect of range.getClientRects()) {
          if (rect.left < containerBounds.left - 1 || rect.right > containerBounds.right + 1 || rect.top < containerBounds.top - 1 || rect.bottom > containerBounds.bottom + 1) {
            throw new Error(`Text clipped in ${exhibitId}: ${walker.currentNode.textContent}`);
          }
        }
      }
    }
    return { id: exhibitId, text, html: sheet.outerHTML };
  }, { exhibitId: id, reverseCatalog: reverse });
}

await mkdir(outputDirectory, { recursive: true });
const museumPath = path.join(outputDirectory, "museum.png");
const museumHash = hash(await readFile(museumPath));
const browser = await chromium.launch(executablePath ? { executablePath } : {});

try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(museumUrl, { waitUntil: "networkidle" });
  await page.waitForSelector(".exhibit-card");
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: shareStyles });

  const catalog = await page.evaluate(async () => {
    const { exhibits } = await import("/app.js");
    return exhibits.map(({ id, new: isNew }) => ({ id, isNew }));
  });
  const ids = catalog.map(({ id }) => id).sort();
  if (requestedIds?.some(id => !ids.includes(id))) throw new Error("Unknown exhibit in --ids");
  const selectedIds = catalog.filter(({ id, isNew }) => (!olderOnly || !isNew) && (!requestedIds || requestedIds.includes(id))).map(({ id }) => id).sort();
  if (!selectedIds.length) throw new Error("No exhibits match the requested selection");
  const untouchedHashes = new Map(await Promise.all(ids.filter(id => !selectedIds.includes(id)).map(async id => [id, hash(await readFile(path.join(outputDirectory, `${id}.png`)))])));
  for (const id of selectedIds) {
    const result = await renderShareSheet(page, id);
    const reordered = await renderShareSheet(page, id, true);
    if (JSON.stringify(result) !== JSON.stringify(reordered)) {
      throw new Error(`Order-dependent output: ${id}`);
    }

    const screenshot = await page.screenshot({
      path: path.join(outputDirectory, `${id}.png`),
      animations: "disabled",
    });
    const dimensions = pngDimensions(screenshot);
    if (dimensions[0] !== 1200 || dimensions[1] !== 630) {
      throw new Error(`Unexpected dimensions for ${id}: ${dimensions.join("x")}`);
    }
  }

  const generated = (await readdir(outputDirectory))
    .filter(file => file.endsWith(".png") && file !== "museum.png")
    .map(file => path.basename(file, ".png"))
    .sort();
  if (JSON.stringify(generated) !== JSON.stringify(ids)) {
    throw new Error("The share directory contains missing or stale exhibit thumbnails");
  }
  if (hash(await readFile(museumPath)) !== museumHash) {
    throw new Error("museum.png changed while generating exhibit thumbnails");
  }
  for (const [id, originalHash] of untouchedHashes) {
    if (hash(await readFile(path.join(outputDirectory, `${id}.png`))) !== originalHash) {
      throw new Error(`Unselected thumbnail changed: ${id}`);
    }
  }

  console.log(`Rendered and validated ${selectedIds.length} numberless 1200x630 share thumbnails. Preserved ${untouchedHashes.size} unselected thumbnails and museum.png.`);
  if (checkOnly) console.log(`Check-only output: ${outputDirectory}. Committed share images were not modified.`);
} finally {
  await browser.close();
}
