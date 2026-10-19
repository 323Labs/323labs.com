# 323 Labs agent instructions

## Deployment

- Deploy through GitHub: commit and push changes to `main`. Cloudflare Workers Builds automatically builds and deploys that branch; this Git integration is confirmed working.
- Run local build checks before pushing code changes. Use the Node version in `.nvmrc` (currently 26).
- Leave publishing to the Git integration. Run a manual Cloudflare deployment (`wrangler deploy`, `npm run deploy`, or equivalent) only when the user explicitly requests a manual deployment.
- When an automatic deployment is delayed or fails, inspect its build status and logs; keep deployment through Git.

## Cloudflare configuration

- Hosting uses Cloudflare Workers with static assets, matching meshware.net. It is not Cloudflare Pages or GitHub Pages.
- Preserve the existing Worker, Git connection, and build settings. Delete or recreate Cloudflare resources only when the user explicitly requests deletion or recreation.
- Keep the single custom domain route, `323labs.com`, in `wrangler.jsonc`. Add routes or development hostnames only when explicitly requested.
