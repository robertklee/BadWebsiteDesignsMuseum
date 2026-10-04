# Share images

The committed images in `share/` are 1200×630 social previews rendered from the gallery's real HTML and CSS.

## Generate

Install Chromium once:

```sh
npx playwright install chromium
```

Start the museum, then run in another terminal:

```sh
npm run generate:share
```

Useful selectors:

```sh
npm run generate:share -- --check
npm run generate:share -- --older
npm run generate:share -- --ids runaway,phone
npm run generate:share -- --url http://127.0.0.1:3019
```

`--check` writes to a temporary directory without modifying committed images. `--older` selects exhibits without the **New** badge. `--ids` accepts a comma-separated set of exhibit IDs. These options can be combined.

## Requirements

The generator validates image dimensions and rejects missing previews, overflowing text, exhibit numbers in artwork, and missing or stale image files. It waits for fonts and embedded images, disables animation and transitions, and renders the stable composition rather than a hover or scroll-activated frame.

Check-only mode validates that previews can be exported; it does not compare generated pixels with the committed PNGs.

## Visual direction

Show the familiar task and hint at the absurd obstacle, rather than revealing the full consequence. Keep the exhibit recognizable without assuming technical knowledge. Captions should invite exploration, not announce surprise charges, a failed group booking, a reversed progress bar, or a hidden final rule. Aim the joke at the interface rather than the visitor. Let the museum branding establish the satire instead of adding "fictional plan" or "pretend checkout" footnotes to sales pitches. A strong visual premise does not need to be replaced merely to make the collection uniform.
