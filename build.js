const fs = require("node:fs");
const path = require("node:path");

const publicFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "additional-exhibits.js",
  "arcade-exhibits.js",
  "arcade-exhibits.css",
  "puzzle-exhibits.js",
  "puzzle-exhibits.css",
];
const metadataFiles = [
  "app.js",
  "additional-exhibits.js",
  "arcade-exhibits.js",
  "puzzle-exhibits.js",
];

const outputDirectory = path.join(__dirname, "dist");
const shareDirectory = path.join(__dirname, "share");

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function shareMetadata(exhibit) {
  const title = `${exhibit.name} — Really Bad Design Museum`;
  const description = `${exhibit.tagline} ${exhibit.description}`;
  const url = `__SITE_ORIGIN__/exhibit/${exhibit.id}`;
  const image = `__SITE_ORIGIN__/share/${exhibit.id}.png`;
  const alt = `${exhibit.name}: ${exhibit.tagline}`;
  return `<!-- SHARE_META_START -->
  <meta name="description" content="${escapeAttribute(description)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Really Bad Design Museum">
  <meta property="og:title" content="${escapeAttribute(title)}">
  <meta property="og:description" content="${escapeAttribute(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:secure_url" content="${image}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeAttribute(alt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttribute(title)}">
  <meta name="twitter:description" content="${escapeAttribute(description)}">
  <meta name="twitter:image" content="${image}">
  <link rel="canonical" href="${url}">
  <title>${escapeAttribute(title)}</title>
  <!-- SHARE_META_END -->`;
}

function readExhibits() {
  const entries = [];
  for (const file of metadataFiles) {
    const source = fs.readFileSync(path.join(__dirname, file), "utf8");
    for (const match of source.matchAll(/\{ id: "[^"\n]+"[^\n]*\},/g)) {
      try {
        const entry = Function(`"use strict"; return (${match[0].slice(0, -1)});`)();
        if (entry.name && entry.tagline && entry.description && entry.color) entries.push(entry);
      } catch {
        // Non-metadata object literals are ignored.
      }
    }
  }
  const appSource = fs.readFileSync(path.join(__dirname, "app.js"), "utf8");
  const orderSource = appSource.match(/const exhibitOrder = (\[[\s\S]*?\]);/)?.[1];
  if (!orderSource) throw new Error("Unable to find exhibitOrder in app.js");
  const order = Function(`"use strict"; return (${orderSource});`)();
  const byId = new Map(entries.map(entry => [entry.id, entry]));
  if (byId.size !== order.length) throw new Error(`Expected ${order.length} unique exhibit metadata records, found ${byId.size}`);
  return order.map((id, index) => {
    const exhibit = byId.get(id);
    if (!exhibit) throw new Error(`Missing share metadata for ${id}`);
    return { ...exhibit, number: String(index + 1).padStart(2, "0") };
  });
}

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory);

for (const file of publicFiles) {
  fs.copyFileSync(path.join(__dirname, file), path.join(outputDirectory, file));
}

if (!fs.existsSync(shareDirectory)) throw new Error("Missing share image directory");
fs.cpSync(shareDirectory, path.join(outputDirectory, "share"), { recursive: true });

const template = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const metadataPattern = /<!-- SHARE_META_START -->[\s\S]*?<!-- SHARE_META_END -->/;
for (const exhibit of readExhibits()) {
  const routeDirectory = path.join(outputDirectory, "exhibit", exhibit.id);
  fs.mkdirSync(routeDirectory, { recursive: true });
  fs.writeFileSync(path.join(routeDirectory, "index.html"), template.replace(metadataPattern, shareMetadata(exhibit)));
}
