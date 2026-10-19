# 323 Labs

Static website hosted on Cloudflare Workers at https://323labs.com,
using the same static assets and custom domain setup as meshware.net.
The Worker has one custom domain: `323labs.com`.

## Deployment

Cloudflare Workers Builds builds and deploys pushes to `main`:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Node version: `26` (`.nvmrc`; builds require this major version)

The Worker is named `323labs-com`. Custom domains are managed by `wrangler.jsonc`;
Cloudflare provisions their DNS records and certificates. Workers development
and preview URLs are disabled.

To build the site locally:

```sh
npm ci
npm run build
```

Publish by committing and pushing to `main`; Cloudflare's Git integration handles deployment.

Only public site files are copied into `dist/` for upload. Source files,
repository metadata, and deployment configuration are excluded.
