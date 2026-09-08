import { createHash } from "node:crypto";
import { mkdir, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(repositoryRoot, "share");
const urlArgument = process.argv.indexOf("--url");
const museumUrl = urlArgument === -1 ? "http://127.0.0.1:3000" : process.argv[urlArgument + 1];
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

if (!museumUrl || (urlArgument !== -1 && museumUrl.startsWith("--"))) {
  throw new Error("Usage: npm run generate:share -- [--url http://127.0.0.1:3000]");
}

const shareStyles = `
  html, body { width:1200px; height:630px; overflow:hidden; }
  body { background:radial-gradient(ellipse at top left,#303126 0,transparent 55%),#171816; }
  *, *::before, *::after { animation:none!important; transition:none!important; }
  .share-sheet {
    width:1200px; height:630px; display:grid; grid-template-columns:540px 488px;
    gap:64px; padding:65px 54px; align-items:center;
  }
  .share-sheet .card-art { width:540px; height:500px; border-radius:8px; }
  .share-sheet .preview-scroll-checkout { inset:62px 30px 25px; max-width:none; }
  .share-sheet .scroll-preview-back { font-size:13px; padding:12px 16px; }
  .share-sheet .scroll-preview-front { inset:38px 0 35px 24px; padding:20px 32px 20px 20px; }
  .share-sheet .scroll-preview-title { font-size:14px; padding-bottom:12px; }
  .share-sheet .scroll-preview-offer { font-size:24px; margin-top:22px; }
  .share-sheet .scroll-preview-front strong { font-size:88px; }
  .share-sheet .scroll-preview-front small { font-size:18px; margin-top:12px; }
  .share-sheet .scroll-preview-free { font-size:16px; margin-top:24px; padding-top:12px; }
  .share-sheet .scroll-preview-punchline { font-size:14px; }
  .share-sheet .preview-validation-rejection { inset:65px 35px 35px; max-width:none; gap:18px; }
  .share-sheet .validation-preview-kicker { font-size:13px; padding-bottom:12px; }
  .share-sheet .validation-preview-verdict { font-size:80px; }
  .share-sheet .validation-preview-question { font-size:21px; }
  .share-sheet .validation-preview-answers { font-size:16px; padding:18px 0; gap:12px; }
  .share-sheet .validation-preview-answers>b { top:30px; font-size:20px; padding:8px 10px; border-width:3px; }
  .share-sheet .validation-preview-footer { font-size:20px; }
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

    const text = document.body.innerText;
    if (/\bexhibit\s*(?:#\s*)?\d+\b/i.test(text)) throw new Error(`Ordinal leaked: ${exhibitId}`);
    const bounds = copy.getBoundingClientRect();
    if (bounds.top < 40 || bounds.bottom > 565 || bounds.right > 1146) {
      throw new Error(`Copy overflows card: ${exhibitId}`);
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

  const ids = await page.evaluate(async () => {
    const { exhibits } = await import("/app.js");
    return exhibits.map(({ id }) => id).sort();
  });
  for (const id of ids) {
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

  console.log(`Rendered and validated ${ids.length} numberless 1200x630 share thumbnails.`);
} finally {
  await browser.close();
}
