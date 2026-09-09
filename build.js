const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const publicFiles = [
  "index.html",
  "styles.css",
  "exhibits.css",
  "app.js",
  "exhibits/consent.css",
  "exhibits/marketing.css",
];
const exhibitModules = [
  "exhibits/shared.js",
  "exhibits/registry.js",
  "exhibits/forms-and-inputs.js",
  "exhibits/interaction-and-simulation.js",
  "exhibits/content-and-navigation.js",
  "exhibits/commerce-and-messaging.js",
  "exhibits/website-behavior.js",
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

async function readExhibits() {
  // The registry is the single source of exhibit metadata and order; it already validates
  // uniqueness and completeness, so the build simply imports it instead of re-parsing source.
  const registryPath = path.join(__dirname, "exhibits", "registry.js");
  const { getCatalog } = await import(pathToFileURL(registryPath));
  return getCatalog();
}

async function main() {
  fs.rmSync(outputDirectory, { recursive: true, force: true });
  fs.mkdirSync(outputDirectory);
  fs.cpSync(path.join(__dirname, "assets"), path.join(outputDirectory, "assets"), { recursive: true });

  for (const file of publicFiles) {
    fs.mkdirSync(path.join(outputDirectory, path.dirname(file)), { recursive: true });
    fs.copyFileSync(path.join(__dirname, file), path.join(outputDirectory, file));
  }
  for (const file of exhibitModules) {
    fs.mkdirSync(path.join(outputDirectory, path.dirname(file)), { recursive: true });
    fs.copyFileSync(path.join(__dirname, file), path.join(outputDirectory, file));
  }

  if (!fs.existsSync(shareDirectory)) throw new Error("Missing share image directory");
  fs.cpSync(shareDirectory, path.join(outputDirectory, "share"), { recursive: true });

  const template = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
  const metadataPattern = /<!-- SHARE_META_START -->[\s\S]*?<!-- SHARE_META_END -->/;
  for (const exhibit of await readExhibits()) {
    const routeDirectory = path.join(outputDirectory, "exhibit", exhibit.id);
    fs.mkdirSync(routeDirectory, { recursive: true });
    fs.writeFileSync(path.join(routeDirectory, "index.html"), template.replace(metadataPattern, shareMetadata(exhibit)));
  }
}

main();
