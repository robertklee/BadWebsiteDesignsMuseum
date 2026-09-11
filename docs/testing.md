# Testing

## Syntax

```sh
npm run check
```

This checks the application, exhibit modules, build and server files, Worker, and primary browser-test scripts.

## Browser checks

Install Chromium once and start the museum before running browser tests:

```sh
npx playwright install chromium
npm start
```

Run the broad preview checks:

```sh
npm run test:thumbnails
npm run test:thumbnails:mobile
```

These cover preview bounds, clipping, responsive layouts, animation states, reduced motion, and touch-oriented scroll activation. Generated review screenshots are written under `/tmp`.

Run the focused Runaway Button suite with:

```sh
npm run test:runaway
```

Run all website-behavior exhibits in Easy, Hard, and Fix it modes with:

```sh
npm run test:website
```

This suite covers completion events, canonical URLs, cleanup, keyboard and touch operation, and desktop and mobile layouts. Screenshots are written to `/tmp/museum-website-behavior`; set `SCREENSHOT_DIR` to override the location.

Set `MUSEUM_URL` to test another running origin:

```sh
MUSEUM_URL=http://127.0.0.1:3019 npm run test:runaway
```

## Focused scripts

Run `npm run test:earthquake:mobile` for mobile earthquake displacement checks. These measure on-screen movement across repeated updates at 320, 390, and 700 pixels, including ad collapse near the bottom, stable Fix it mode, desktop resizing, reduced motion, and automatic pause/resume.

Additional direct Playwright scripts live in `scripts/`:

- `test-layout-checkout.mjs`
- `test-checkout-thumbnail.mjs`
- `test-layout-earthquake.mjs`
- `test-hover-dependency.mjs`
- `test-website-behavior.mjs`

Run a focused script with Node and set `MUSEUM_URL` when its default origin does not match the running server:

```sh
MUSEUM_URL=http://127.0.0.1:3000 node scripts/test-hover-dependency.mjs
```

Prefer the smallest test that covers a change. Run the broad thumbnail suites when shared preview behavior, responsive styling, motion behavior, or collection-level interaction changes.
