# Verification

This repo has no test runner. These are the gates, in order. All must pass before a finish review or a production deploy.

## 1. Static gates

```bash
npm run check          # typecheck + eslint + confidentiality guard
npm run build:local    # production build with a 2 GB heap (CI/Vercel is authoritative if this OOMs)
grep -l "FINISH:" .next/server/app/index.html   # the direction contract survived the build
```

## 2. Browser round (dev server on :3100)

The Playwright MCP in this environment needs system Chrome, so screenshots run from a scratchpad Playwright with the cached Chromium and a local libasound shim (see the shot script pattern below). Capture into `.impeccable/review/`:

| Capture | URL | Viewport | Checks |
|---|---|---|---|
| desktop | `/` | 1440 x 900, full page | canvas present, h1 present, zero console errors |
| mobile | `/` | 390 x 844 | lite tier, no horizontal overflow, targets >= 44 px |
| poster tier | `/?tier=poster` | 1440 x 900 | no canvas, `role="img"` poster present, page still complete |
| reduced motion | `/?motion=reduce` with `reducedMotion: "reduce"` | 390 x 844 | every section in its final state, canvas static |
| keyboard | `/` | 1440 x 900 | Tab: skip link first, visible focus ring on every stop, no traps |

`?tier=` and `?motion=` are dev-only overrides (ignored in production builds).

Shot script pattern (scratchpad): `node shot.mjs <url> <out.png> <w> <h> [reduce] [full]` - launches Chromium, emulates reduced motion when asked, collects console errors and page errors, screenshots, prints a JSON summary.

Known benign console noise in headless runs: `THREE.Clock ... deprecated` (from fiber internals) and `GL Driver Message ... GPU stall due to ReadPixels` (headless screenshot readback). Anything else is a finding.

## 3. Design gates (impeccable)

```bash
node <impeccable>/scripts/detect.mjs --json src/ content/                          # mechanical tells
node <impeccable>/scripts/detect.mjs --json http://localhost:3100 --viewport 390x844
```

Then the finish reviewer runs once over the screenshots and the direction contract, one fix batch, one recapture, one verdict. The documenter writes `DESIGN.md` and `.impeccable/design.json`.

## 4. Deployed

- Lighthouse on the Vercel preview URL via PageSpeed Insights: mobile >= 90 / 100 / 100 / 100.
- `/robots.txt`, `/sitemap.xml`, `/cv/Johnson_Bolhayon_CV.pdf` respond.
- OG preview via the LinkedIn Post Inspector.
- Regenerate `public/posters/*` whenever the hero's resting phase changes.
