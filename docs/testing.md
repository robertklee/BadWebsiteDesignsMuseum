# Testing

## Syntax

```sh
npm run check
```

This checks the application, exhibit modules, build and server files, Worker, and primary browser-test scripts, including the six UX regression suites.

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

Run the shared exhibit experience suite with:

```sh
npm run test:exhibit-experience
```

Run `npm run test:goals` for realistic missions and outcomes in all three modes. It covers supplied messages, drafts and birthdays; wrong-answer rejection; search corrections; submitting support requests with alerts still present; volume target boundaries and reachable block/weight solutions; accidental versus intentional cart checkout; blocked onboarding/password endpoints; immediate recipe availability; declining terms; real downloads of fictional tickets and receipts; the umbrella mission; visible mobile results; explicit result navigation; and restart cleanup.

This checks the first-visit guide, dismissal across exhibit visits, reopening, blocked-storage behavior, keyboard entry, manual completion actions, mode-preserving restart, direct and legacy routes, and museum control bounds at desktop and narrow mobile widths. It also opens every exhibit in all three modes to check framing, mode-specific tasks, and recognizable task context in the introductions. CAPTCHA checks cover the familiar checkbox/picture-check explanation, the correct cheese count in each game mode, and completion of the checkbox version. Review screenshots are written under `/tmp/museum-exhibit-experience`.

Set `MUSEUM_URL` to test another running origin:

```sh
MUSEUM_URL=http://127.0.0.1:3019 npm run test:runaway
```

## UX regression blocks

Run `npm run test:ux` for the six logical blocks, or select one with `test:ux:shell`, `test:ux:forms`, `test:ux:interaction`, `test:ux:content`, `test:ux:commerce`, or `test:ux:website`.

These cover mission visibility and scoped Escape; locked accepted forms and repeated explicit retries; formatted phone entry, touch birthday precision, explicit password acceptance, and consistent preference goals; reduced-motion recovery and volume boundaries; stable unlocked recipes and fictional receipt downloads; basket-aware shopping feedback and modal museum access; delivery summaries, registration locking, and delayed hover-help disclosure. Desktop and narrow mobile checks use browser emulation, not physical devices or screen-reader verification.

The UX, goals, and shared experience suites support an existing Chromium-compatible executable when Playwright's bundled browser is unavailable:

```sh
MUSEUM_URL=http://127.0.0.1:3000 \
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH="/path/to/chromium-or-chrome" \
npm run test:ux
```

On macOS, an installed Chrome executable is typically `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. Without the override, these suites use Playwright's bundled Chromium. UX screenshots, when enabled, belong outside the repository; `test:ux:content` accepts `MUSEUM_CONTENT_ARTIFACTS` for its artifacts.

## Focused scripts

Run `npm run test:earthquake` for the library-visit scenario, including finding the story, viewing its opening hours, unrelated-story navigation, completion and restart, keyboard/touch controls, and live loading. Run `npm run test:earthquake:mobile` for mobile earthquake displacement checks. These measure on-screen movement of the article and opening-hours control across repeated updates at 320, 390, and 700 pixels, including ad collapse near the bottom, stable Fix it mode, desktop resizing, reduced motion, and automatic pause/resume.

Additional direct Playwright scripts live in `scripts/`:

- `test-unresponsive-buttons.mjs` (or `npm run test:unresponsive-buttons`): partial hit areas, delayed overshoot and recovery, completion, cleanup, keyboard, touch, and responsive screenshots.
- `test-layout-checkout.mjs`
- `test-checkout-thumbnail.mjs`
- `test-layout-earthquake.mjs`
- `test-hover-dependency.mjs`

Run a focused script with Node and set `MUSEUM_URL` when its default origin does not match the running server:

```sh
MUSEUM_URL=http://127.0.0.1:3000 node scripts/test-hover-dependency.mjs
```

Prefer the smallest test that covers a change. Run the broad thumbnail suites when shared preview behavior, responsive styling, motion behavior, or collection-level interaction changes.
