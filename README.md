# Johnson Bolhayon - Portfolio

Personal portfolio for a data automation engineer and full-stack developer.
**Live at [johnsonbolhayon.com](https://johnsonbolhayon.com).**

A clean, single-page site that leads with the flagship build (an internal franchise-operations
platform), its Gemini agents, and SukliCo POS (an offline-first Android point of sale, a personal
product), then tells the nine-year arc from Excel VBA to a full-stack platform. Built with
Next.js 15 (App Router), TypeScript, Tailwind CSS 4, a subtle React Three Fiber node-mesh in the
hero, and GSAP ScrollTrigger for motion. Deployed on Vercel.

## What is here

| Path | Purpose |
|---|---|
| `content/` | All copy as typed data: profile, timeline, case studies, flagship figures, the Gemini features (`ai.ts`), SukliCo POS (`suklico.ts`), skills, principles, and the synthetic data the recreations may use |
| `src/app/` | Root layout (fonts, metadata), the single page, sitemap, robots, icon, 404 |
| `src/components/sections/` | Hero, Flagship, AiAutomations, SukliCo, Experience, Projects, Skills, Contact, Footer |
| `src/components/recreations/` | Stylised recreations of the flagship's screens with invented data (including the Reply Assistant agent), the architecture diagram, and the reusable image gallery |
| `public/media/` | Real images that are safe to publish: anonymised Freshdesk analytics, and the owner's own SukliCo artwork (Gemini-generated scenes, brand cover, a compressed explainer video) |
| `src/components/three/` | The hero node-mesh: tiered scene, capability detection, flat SVG poster fallback |
| `src/components/motion/` | GSAP setup, scroll reveals, counting readouts |
| `scripts/guard-confidential.mjs` | CI guard: no phone numbers, internal hostnames, store codes or secret material may enter the repo |
| `DESIGN.md` / `docs/DECISIONS.md` | The recorded visual system and the log of build decisions |

## Scripts

```bash
npm run dev          # dev server (Turbopack)
npm run check        # typecheck + lint + confidentiality guard
npm run build:local  # production build with a 2 GB heap (small machines)
npm run build        # production build (CI / Vercel)
```

Dev-only URL overrides for testing: `?tier=poster|lite|full` forces the 3D tier, `?motion=reduce`
forces the reduced-motion path.

## Confidentiality

The flagship is an internal platform behind corporate single sign-on. Its screens are recreated
with invented data (the only real captures are anonymised analytics reports), and employer work is
described rather than linked. SukliCo POS is the owner's own product, so its artwork and explainer
video are real; its repository stays private while the app is in testing. A CI guard blocks
confidential material from ever entering the repo.

## Licence

Code is MIT (see `LICENSE`). The written content, CV and imagery describe my own work and are not
licensed for reuse. Fonts are under the SIL Open Font License (`src/app/fonts/OFL.txt`).
