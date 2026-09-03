# Johnson Bolhayon - Portfolio

Personal portfolio for a data automation engineer and full-stack developer.
**Live at [johnsonbolhayon.com](https://johnsonbolhayon.com).**

A clean, single-page site that leads with the flagship build (an internal franchise-operations
platform), then tells the nine-year arc from Excel VBA to a full-stack platform. Built with
Next.js 15 (App Router), TypeScript, Tailwind CSS 4, a subtle React Three Fiber node-mesh in the
hero, and GSAP ScrollTrigger for motion. Deployed on Vercel.

## What is here

| Path | Purpose |
|---|---|
| `content/` | All copy as typed data: profile, timeline, case studies, flagship figures, skills, principles, and the synthetic data the recreations may use |
| `src/app/` | Root layout (fonts, metadata), the single page, sitemap, robots, icon, 404 |
| `src/components/sections/` | Hero, Flagship, Experience, Projects, Skills, Contact, Footer |
| `src/components/recreations/` | Stylised recreations of the flagship's screens with invented data, plus the architecture diagram |
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

The flagship is an internal platform behind corporate single sign-on. Nothing on the site is a
screenshot; every screen is recreated with invented data, and employer work is described rather
than linked. A CI guard blocks confidential material from ever entering the repo.

## Licence

Code is MIT (see `LICENSE`). The written content, CV and imagery describe my own work and are not
licensed for reuse. Fonts are under the SIL Open Font License (`src/app/fonts/OFL.txt`).
