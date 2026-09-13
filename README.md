# Really Bad Design Museum

A playful, interactive museum of 37 terrible website ideas, built with plain HTML, CSS, and JavaScript and no runtime dependencies.

**Live site:** https://badwebsitedesignsmuseum.robert-k-lee.workers.dev

## Run locally

Requires Node.js 18 or later.

```sh
npm start
```

Open **http://localhost:3000**. Set `PORT` to use a different port.

## Project structure

`app.js` handles routing and shared page controls. `exhibits/registry.js` validates and orders the collection, and the remaining files in `exhibits/` contain implementations grouped by behavior. `build.js` creates the deployable site in `dist/`.

## Documentation

- [Exhibit catalog](docs/exhibits.md) — what each exhibit does and how its modes work.
- [Exhibit development](docs/exhibit-development.md) — registry, rendering, completion, cleanup, and accessibility conventions.
- [Deployment](docs/deployment.md) — builds, Cloudflare Workers, and branch previews.
- [Share images](docs/share-images.md) — social-image generation and validation.
- [Testing](docs/testing.md) — syntax and browser-based checks.

## Common commands

```sh
npm run check
npm run build
npm run preview
npm run deploy
```

All exhibit interactions are local and ephemeral. Purchases, subscriptions, messages, credentials, and personal details are simulations and are not submitted or stored. The collection supports keyboard and touch input, reduced-motion preferences, and stable **Fix it** alternatives.
