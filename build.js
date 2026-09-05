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

const outputDirectory = path.join(__dirname, "dist");

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory);

for (const file of publicFiles) {
  fs.copyFileSync(path.join(__dirname, file), path.join(outputDirectory, file));
}
