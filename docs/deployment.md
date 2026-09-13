# Deployment

## Production build

```sh
npm run build
```

The build recreates the ignored `dist/` directory with browser assets, copied share images, and one clean share page per exhibit. Each exhibit page includes its own title, description, canonical URL, and Open Graph/Twitter metadata. The Worker replaces the build-time origin placeholder with the active workers.dev or custom-domain origin.

Do not commit `dist/`. A fresh build should always be sufficient to recreate it.

## Cloudflare Workers

```sh
npm run preview
npm run deploy
```

`wrangler.jsonc` configures a build hook, so Wrangler runs `npm run build` before local previews, production deploys, and version uploads.

This project uses **Workers Builds**, not Cloudflare Pages. For a connected repository, use:

- Root directory: `/`
- Production deploy command: `npx wrangler deploy`
- Non-production deploy command: `npx wrangler versions upload`
- Separate build command: none

Enable builds for any branches that should receive preview versions. The deployed branch must contain the current `wrangler.jsonc`; without its build hook, uploads fail when the configured `dist/` asset directory does not exist.

## Routes

Clean routes use `/exhibit/<id>`. Legacy hash routes are upgraded in the browser. The Worker serves clean pages with deployment-specific social URLs while the application handles client-side navigation and mode query parameters.
