# Portfolio website for Johnson Bolhayon

## Context

Johnson wants a public, open-source personal portfolio aimed at recruiters and hiring managers. It must lead with the flagship build (PWX Tool Trackers) while telling the arc that got him there: Excel VBA (IQVIA, 2018) → Google Apps Script + C# data migration (Kreloses / Poolwerx, 2022-2025) → sole full-stack developer of a Next.js + Supabase + GCP platform (2025-present). He asked for a "supreme" design with real motion and 3D, built with the `impeccable` and `ui-ux-pro-max` skills, pushed to his personal GitHub, hosted so he can attach a custom domain later.

Everything lives in `/home/johnsonb/dev/projects/Portfolio` (empty today, not a git repo). Nothing is written into `pwx-tool-trackers`; that repo is read-only source material. All docs and .md files live in Portfolio.

## Decisions already made with the user

| Decision | Choice |
|---|---|
| Stack / hosting | Next.js 15 App Router + TypeScript + Tailwind + React Three Fiber + GSAP ScrollTrigger, deployed on Vercel free tier (custom domain later) |
| GitHub | Install `gh` CLI, user runs `gh auth login`, then create public repo + push. Repo-local `user.email` = `johnsondbolhayon@gmail.com` (global git email is the work address) |
| Flagship imagery | Stylised animated recreations of key screens with synthetic data. No real screenshots, no confidential data |
| Legacy VBA / Apps Script work | Case-study cards written from the CV. No code shown (none exists locally) |

Assumptions I'm making (flag if wrong): contact section shows email, LinkedIn, GitHub, "Philippines (Remote)" and **no phone number** in web copy; the CV PDF ships as provided (it contains the phone, which is normal for a CV). Evo Platform Toolkit / Evo Tooling Standards cards are drafted from their READMEs for the user to review. Design mode = impeccable **Experience** (its rule for portfolios) with a clear hire-me CTA.

## Findings from exploration

- **CV** (`pwx-tool-trackers/dump/Johnson_Bolhayon_CV_Updated.pdf`) is the copy source of truth. Copy it to `public/cv/`.
- **Flagship numbers verified in the repo** (quotable): 78 API routes, ~55k lines TS/TSX across 224 files, 20 migrations, 12 tools, 20 runtime deps (no test runner / UI kit / ORM / state lib), 149 franchises connected with per-store tokens, ~130k tickets mirrored for Team Analytics, 3 years of monthly POS exports in "a minute or two", export engines verified cell-for-cell (Xero COGS 0 diffs), in production on Cloud Run since July 2026.
- **Flagship architecture stories** to diagram/recreate: metadata-driven no-code tracker builder (JSONB rows, no runtime DDL); security posture (domain-restricted Google OAuth + approval allowlist, RLS default-deny, all reads through server routes, secrets never in the browser); 5-node integration fan-out (Lightspeed, Drive/Sheets, Apps Script webhooks, Jira/Freshdesk/Confluence, Gemini); audit log with before/after snapshots + one-click undo; NDJSON-streamed tools with HMAC scan receipts and dry-run-by-default pushes; the Tool Isolation Rule.
- **The product's own DESIGN.md** ("The Control Room": Action Blue `#003DA5`, navy table chrome `#0D3B6E`, Enter-Only motion, Flat-at-Rest) is safe to reference and seeds the recreations, which should look like *that product*, not like the portfolio.
- **Other repos** are employer-owned on private Bitbucket/GitLab → described case studies only, no links: Evo Platform Toolkit (FastAPI + React/Vite/MUI, AWS Parameter Store, multi-env Docker, 116 commits), Evo Tooling Standards (engineering standards, onboarding, AI-agent workflow docs, scaffolds). Skip `evo-atlassian-sync` (unfinished scaffold); `evop-tools-playground` folds into one "data plumbing" bullet.
- **No Apps Script / VBA / C# source exists on this machine**. Origin story is narrative.
- **Machine**: 2.8 GiB RAM visible, 2 CPUs, Node 22.22, npm 10.9, no `gh`, no passwordless sudo, no GitHub SSH key (only a Bitbucket one), no image converters. `~/.local/bin` is on PATH. Playwright MCP available.
- **Registry today**: next 15.5.x (16.3 exists; staying on 15 per the user's choice and eslint-config-next compatibility), react 19.2.8, three 0.185.1, @react-three/fiber 9.7 (peer react ≥19 <19.3), @react-three/drei 10.7, gsap 3.15 ("Standard no-charge" licence, all plugins incl. SplitText free), @gsap/react 2.1, zustand 5. Pin typescript ^5.9 and eslint ^9 (latest TS 7 / ESLint 10 break eslint-config-next@15).
- **3D skills vetted** on skills.sh: install `freshtechbro/claudedesignskills@react-three-fiber` (2.6K installs, 820★, audits pass). Add `enzed/r3f-skills@r3f-shaders` only if the chosen direction needs GLSL. Skip the generic `3d-web-experience`.
- **ui-ux-pro-max design-system query** (portfolio, variance 8 / motion 9 / density 3): pattern = Scroll-Triggered Storytelling (hook → chapters → climax CTA), style = motion-driven. Anti-patterns to honour: no emoji-as-icons, no single duration for all transitions, never animate width/height, reduced-motion path mandatory, no corporate template layout. GSAP presets: SplitText headline reveal (expo.out), ≤1-2 pinned scrub sections, scoped staggers ≤8 children.
- **impeccable** state: no PRODUCT.md/DESIGN.md → `init` (PRODUCT.md) → `new-work` direction round (concept-seed roll + decision page with the user) before any UI code; direction contract = HTML comment as first child of `<body>` in the root layout, must survive the production build; craft-floor loaded right before UI edits; one batched screenshot round + finish reviewer + documenter writes DESIGN.md. A newer impeccable (v4.1.3) exists - mention once to the user, don't update mid-session.

## Confidentiality rules (hard, enforced by a CI guard script)

- Never on the site or in the repo: internal URLs (`tool-trackers.poolwerx.net`, run.app), the auth email domain, franchise store codes or names, the secret-naming scheme, webhook URLs, Confluence space keys, `.env` contents, the internal ticket-volume PDF, real screenshots, the work email.
- "Poolwerx" and "PWX Tool Trackers" are already public on the CV and may be used.
- Recreations use only `content/recreations/synthetic.ts` (fake store names, SKUs, ticket subjects).

## Architecture (locked; visual direction stays open for the impeccable round)

- **One route** `/` + `not-found`, `sitemap.ts`, `robots.ts`, `icon.svg`. Default Next output (no static export), `images.unoptimized: true`, security headers in `next.config.ts`, `experimental.cpus: 1` + `webpackMemoryOptimizations` for the small VM, lint excluded from build (own CI step).
- **Content model**: all copy in `content/*.ts` typed objects (`types.ts`: `TimelineEntry`, `CaseStudy` with `confidentiality: 'described-only' | 'public-repo'` and optional `recreation` key, `FlagshipTool`, `Integration`, `SecurityLayer`, `ArchitectureNode`, `SkillGroup`, `Principle`, `Site`). Components only read from `@content/*`. No CMS/MDX.
- **3D**: one persistent fixed full-viewport `<Canvas frameloop="demand" dpr={[1,1.5]}>` behind the DOM, loaded via `dynamic(() => import('./Scene'), { ssr: false, loading: Poster })` from `SceneRoot`. `capability.ts` picks tier `full | lite | poster` (no WebGL / prefers-reduced-data → poster; <768px or ≤4 cores/GB → lite). Wrapper `role="img"` + `aria-label`, canvas `aria-hidden`. Dev-only `?tier=` and `?motion=reduce` overrides for testing.
- **GSAP ↔ R3F bridge**: `lib/store.ts` (zustand) holds per-section scroll progress + `reducedMotion` + `tier` + fiber's `invalidate`. `useSectionProgress(ref, id)` (ScrollTrigger inside `useGSAP`) writes progress; `Scene.tsx`'s `useFrame` reads it non-reactively, damps camera/scene toward `phases.ts` targets, calls `invalidate()` only while moving. No GSAP inside the canvas. `motion/gsap.ts` registers plugins once and exports duration tiers (0.12 / 0.22 / 0.4 / 0.7 s) and `EASE = 'expo.out'`.
- **Reduced motion**: `MotionProvider` sets the store flag from `matchMedia`; every animation lives in `gsap.matchMedia()` with the reduced branch doing `gsap.set(final state)`. Canvas renders resting phase once then stops, or shows the poster.
- **Recreations** = pure DOM/CSS/SVG client components animated with GSAP (crisp, accessible, cheap, work in poster tier; may sit in CSS `perspective` for depth). `aria-hidden` with an adjacent caption naming the screen + "synthetic data". Rejected: canvas textures (blurry, heavy), drei `<Html>` (only if the direction demands one in-scene screen).
- **Fonts**: `next/font/local` with committed woff2 chosen in the direction round (≤3 files). **OG image**: static 1200×630 PNG screenshotted from `docs/og/og.html` with Playwright. **Posters**: Playwright screenshots of the real scene's resting phase at 1440 and 390.
- **A11y baseline**: skip link, landmarks, one h1, `:focus-visible` ring never removed, contrast ≥4.5:1, targets ≥44px, JSON-LD `Person`.
- **Perf budget**: mobile Lighthouse ≥90 perf / 100 a11y / 100 BP / 100 SEO; initial JS ≤150 KB gz + lazy three chunk ≤250 KB gz; LCP element is hero text or poster, never the canvas; CLS <0.05 (canvas fixed, fixed-aspect recreation boxes).

## Repo scaffold

```
Portfolio/
├── .github/workflows/ci.yml        # npm ci → typecheck → lint → guard → build
├── .claude/skills/                 # gitignored symlinks → sibling impeccable + ui-ux-pro-max
├── .impeccable/                    # commit config.json + design.json only
├── content/                        # types.ts, site.ts, profile.ts, timeline.ts, flagship.ts, skills.ts,
│   ├── case-studies/               #   principles.ts; one file per case study + index.ts
│   └── recreations/synthetic.ts
├── docs/                           # PLAN.md (this plan), DECISIONS.md, CONTENT-GUIDE.md, VERIFICATION.md,
│   ├── og/og.html                  #   PIPELINE.md, design-system/ (ui-ux-pro-max --persist output)
├── public/cv/Johnson_Bolhayon_CV.pdf, og.png, posters/
├── scripts/guard-confidential.mjs  # fails CI on phone / work email / store-code / internal-URL patterns
├── src/app/                        # layout.tsx (contract comment, fonts, skip link, metadata), page.tsx,
│                                   #   globals.css (Tailwind 4 @theme tokens), fonts.ts, icon.svg, not-found, sitemap, robots
├── src/components/three/           # SceneRoot, Scene, HeroScene, phases.ts, Poster, capability.ts
├── src/components/motion/          # gsap.ts, MotionProvider, useSectionProgress, Reveal, SplitHeading
├── src/components/recreations/     # Window, Dashboard, AuditLogUndo, TrackerBuilder, ExportWalker, ArchitectureDiagram
├── src/components/sections/        # Hero, Arc, Flagship, Projects, Skills, HowIWork, Contact, Footer
├── src/components/ui/              # SkipLink, Button/LinkButton, Icon (SVG sprite), Tag, Metric, SectionHeading, VisuallyHidden
├── src/lib/                        # store.ts, cn.ts, env.ts (siteUrl from NEXT_PUBLIC_SITE_URL / VERCEL_PROJECT_PRODUCTION_URL)
├── PRODUCT.md, DESIGN.md, README.md, LICENSE (MIT), .nvmrc (22), .gitignore
└── next.config.ts, eslint.config.mjs (flat, `eslint .`), tsconfig.json (@/* and @content/*), postcss.config.mjs
```

## Steps

1. **Tooling** → verify: `gh --version`, `ssh -T git@github.com`.
   - Install gh v2.99 from the linux_amd64 release tarball into `~/.local/bin` (no sudo). Generate `~/.ssh/id_ed25519_github`, add a `Host github.com` block to `~/.ssh/config`. **User runs** `gh auth login --git-protocol ssh --web` via `! gh auth login ...` (interactive). Install the R3F skill: `npx skills add freshtechbro/claudedesignskills@react-three-fiber -g -y`. Symlink impeccable + ui-ux-pro-max into `Portfolio/.claude/skills/`.
2. **Scaffold + pipeline** → verify: CI green, Vercel preview URL renders the skeleton.
   - `npx create-next-app@15 . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --turbopack --disable-git`, then `git init -b main`, local `user.name`/`user.email`, install three/fiber/drei/gsap/@gsap/react/zustand/@types/three, pin TS ^5.9 + ESLint ^9, write configs, scripts (`dev`, `build`, `build:local` with `NODE_OPTIONS=--max-old-space-size=2048`, `typecheck`, `lint`, `guard`, `check`), `.gitignore`, CI workflow, LICENSE, README. First commit, `gh repo create portfolio --public --source=. --remote=origin --push`. **User imports the repo in the Vercel dashboard** (no env vars needed).
3. **Content model + copy** → verify: `npm run typecheck` + `npm run guard` pass; user reviews `content/`.
   - Types + all data files from the CV and the verified flagship numbers; Evo cards drafted from READMEs; `docs/CONTENT-GUIDE.md` with the confidentiality rules; copy the CV PDF to `public/cv/`.
4. **Product truth + design direction** (impeccable + ui-ux-pro-max) → verify: `PRODUCT.md` exists; direction chosen by the user; contract comment present in `layout.tsx`.
   - Run `context.mjs` (cwd Portfolio) → `init` interview (mostly answered from this session, ask only real gaps) → write PRODUCT.md (Platform web, Stack recorded, Evidence: CV path + "synthetic data only"). Re-run the ui-ux-pro-max design-system search with `--persist --output-dir Portfolio/docs`. Then `new-work`: derive seven grounded candidate worlds, run `concept-seed.mjs --scope direction --mode experience`, present via the decision page (`serve-question.mjs`, structured-question fallback), user locks one; write the five-block contract comment as first child of `<body>`.
5. **Architecture skeleton** → verify: dev server up; `?tier=poster|lite|full` and `?motion=reduce` all render; console clean.
   - store, MotionProvider, SceneRoot/Scene/Poster/capability, useSectionProgress, section shells wired to content, skip link, metadata, sitemap/robots/icon.
6. **Build the chosen direction fully committed** (load craft-floor first) → verify: batched Playwright round at 1440×900 and 390×844 into `.impeccable/review/`.
   - Hero scene, the four recreations + architecture diagram, all sections, fonts/tokens, focal motion sequence, OG image, posters. One direction, no safe rendition.
7. **Verification gate + finish** → verify: everything below passes; reviewer verdict table reported as written.
   - `npm run check`, `npm run build:local` (fallback: CI/Vercel is the authoritative build if local OOMs), `grep -rl "FINISH:" .next/server/app/index.html`, detector `detect.mjs --json src/ content/` + URL mode at 390 width, keyboard tab-through, reduced-motion + tier checks, Lighthouse on the Vercel preview (PageSpeed Insights). Spawn the impeccable finish reviewer with screenshots + contract, one fix batch, one recapture, verdict; documenter writes `DESIGN.md` + `.impeccable/design.json`. Write `docs/VERIFICATION.md`, `docs/PIPELINE.md`, `docs/DECISIONS.md`, finish README. Commit + push; user promotes to production on Vercel.
8. **Custom domain (later, user)** → Vercel Domains + set `NEXT_PUBLIC_SITE_URL`, redeploy.

## Verification (end-to-end)

- Local: `npm run check` (typecheck + lint + guard) green; `npm run dev` + Playwright screenshots desktop/mobile, reduced-motion, poster/lite tiers, Tab order with visible focus, zero console errors.
- Build: CI workflow green on GitHub; contract comment survives in built HTML.
- Deployed: Vercel preview renders; `/robots.txt`, `/sitemap.xml`, `/cv/Johnson_Bolhayon_CV.pdf` work; OG preview via LinkedIn Post Inspector; Lighthouse mobile ≥90/100/100/100.
- Design: impeccable detector clean of mechanical tells; finish reviewer's verdict table has no open material findings (or the user chooses to ship with the listed items).

## Risks to flag

- Local `next build` may still OOM on 2.8 GiB; CI/Vercel is the authoritative build. Optional: raise WSL memory via `.wslconfig` on Windows (outside scope).
- `gh auth login` and the Vercel import are user-driven interactive steps; the work pauses there.
- The CV PDF carries the phone number; the site copy will not. If a phone-free PDF is wanted, the user re-exports it (no PDF tooling here).
- Employer case studies are described-only; any public claim beyond the CV is checked with the user before it ships.
