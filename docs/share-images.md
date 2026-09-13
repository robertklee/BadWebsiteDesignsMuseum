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

Show the absurd task and its consequence. Keep the exhibit recognizable, the punchline brief, and the joke aimed at the interface rather than the visitor. Fictional money, purchases, and subscriptions must be clearly fictional. A strong existing visual joke does not need to be replaced merely to make the collection uniform.
