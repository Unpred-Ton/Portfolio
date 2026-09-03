# Johnson Bolhayon - Portfolio

Personal portfolio, built as one continuous-form report feeding out of a line printer. Next.js 15 (App Router), TypeScript, Tailwind 4, React Three Fiber for the printer, GSAP ScrollTrigger for the printing motion. Deployed on Vercel.

## What is here

| Path | Purpose |
|---|---|
| `content/` | All copy as typed data: profile, timeline, case studies, flagship figures, skills, principles, synthetic data for the recreations |
| `src/app/` | Root layout (fonts, metadata, direction contract), the single page, sitemap, robots, icon, 404 |
| `src/components/sections/` | The report's jobs: Hero, Arc, Flagship, Attachments, Inventory, Operating notes, End of report |
| `src/components/recreations/` | Stylised recreations of the flagship's screens with synthetic data, plus the architecture diagram |
| `src/components/three/` | The 3D printer: tiered scene root, scene, capability detection, flat poster fallback |
| `src/components/motion/` | GSAP setup, the print-head reveal, counting readouts, the scroll-progress bridge |
| `scripts/guard-confidential.mjs` | CI guard: no phone numbers, internal hostnames, store codes or secret material may enter the repo |
| `docs/` | Plan, decisions log, content guide, verification procedure, pipeline, OG image source, design-system search output |
| `PRODUCT.md` / `DESIGN.md` | Product truth and the recorded visual system (impeccable) |

## Scripts

```bash
npm run dev          # dev server (Turbopack)
npm run check        # typecheck + lint + confidentiality guard
npm run build:local  # production build with a 2 GB heap (small machines)
npm run build        # production build (CI / Vercel)
```

Dev-only URL overrides for testing: `?tier=poster|lite|full` forces the 3D tier, `?motion=reduce` forces the reduced-motion path.

## Confidentiality

The flagship is an internal platform behind corporate single sign-on. Nothing on the site is a screenshot; screens are recreated with invented data, and employer work is described rather than linked. See `docs/CONTENT-GUIDE.md`.

## Licence

Code is MIT (see `LICENSE`). The written content, CV and imagery describe my own work and are not licensed for reuse. Fonts are under the SIL Open Font License (`src/app/fonts/OFL.txt`).
