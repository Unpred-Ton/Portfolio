# Pipeline: GitHub and Vercel

## One-time setup (done 2026-09-03)

- `gh` 2.99 installed from the release tarball into `~/.local/bin` (no sudo on this WSL).
- SSH key `~/.ssh/id_ed25519_github` generated for the personal GitHub account; `~/.ssh/config` has a `Host github.com` block pointing at it.
- Repo-local git identity is the personal address (`git config user.email`); the global identity is a work address and must not author public commits. Check with `git log --format='%an <%ae>'` before pushing.

## Authenticate

```bash
gh auth login --hostname github.com --git-protocol ssh --web   # upload id_ed25519_github.pub when asked
ssh -T git@github.com                                         # expect: "Hi <user>! You've successfully authenticated"
```

## Create and push the repository

```bash
cd ~/dev/projects/Portfolio
gh repo create portfolio --public --source=. --remote=origin --push \
  --description "Personal portfolio - Next.js 15, React Three Fiber, GSAP"
```

CI (`.github/workflows/ci.yml`) runs typecheck, lint, the confidentiality guard and a production build on every push to `main` and on pull requests.

## Deploy on Vercel

1. vercel.com -> Add New Project -> import the GitHub repo. Framework is auto-detected; leave the defaults (Node 22 from `.nvmrc`).
2. No environment variables are required. `VERCEL_PROJECT_PRODUCTION_URL` is injected automatically and feeds `siteUrl`.
3. Every push to `main` deploys production; pull requests get preview URLs.

CLI alternative: `npx vercel@latest login && npx vercel link && npx vercel --prod` (`.vercel/` is gitignored).

## Custom domain (later)

Vercel project -> Settings -> Domains -> add the domain and follow the DNS instructions. Then set `NEXT_PUBLIC_SITE_URL=https://<domain>` in the Vercel environment and redeploy so metadata, sitemap and OG tags use the final host. Update `content/site.ts` `url` to match.

## Local build

`npm run build:local` runs `next build` with a 2 GB heap and `experimental.cpus: 1`. If the machine still runs out of memory, CI and Vercel are the authoritative build; keep local verification to `npm run check` plus the dev server.
