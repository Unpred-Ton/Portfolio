# Decisions

Short log of choices that are not obvious from the code. Newest at the bottom.

## 2026-09-03 Stack: Next.js 15 + R3F + GSAP on Vercel
Chosen over Vite/GitHub Pages and Astro/Cloudflare because it mirrors the stack on the CV, Vercel's free tier handles a static portfolio with a one-click custom domain, and the App Router gives metadata, sitemap and OG conventions for free. Next 16 exists but 15.5 is the last 15.x line and matches eslint-config-next.

## 2026-09-03 No screenshots, stylised recreations instead
The flagship is an SSO-gated internal platform full of franchise data. Recreations built from DOM/SVG with synthetic data are safer, crisper at any DPR, accessible, cheap on low-end devices and work in the no-WebGL tier. Canvas textures and drei `<Html>` were rejected for blur, weight and accessibility.

## 2026-09-03 Legacy VBA / Apps Script work as narrative case studies
No source survives on this machine. Cards describe problem, approach and outcome from the CV; no code panels, no promises of links.

## 2026-09-03 One persistent canvas, demand frameloop
A single fixed full-viewport `<Canvas frameloop="demand">` behind the DOM. Per-section canvases multiply WebGL contexts (the classic mobile crash). Scroll progress flows GSAP ScrollTrigger -> zustand store -> `useFrame`; the scene renders only while something moves.

## 2026-09-03 Confidentiality guard in CI
`scripts/guard-confidential.mjs` fails the build on phone numbers, the corporate email domain, internal hostnames, secret material, the secret-naming scheme and known store codes. Cheap insurance for a public repo built from private material.

## 2026-09-03 Impeccable code-led build path
No image-generation tool is available in this environment, so the direction is built code-led: ambition lives in the direction contract (first viewport, signature interaction, motion grammar) and is audited by the finish review. Recorded in `.impeccable/config.json`.

## 2026-09-03 Phone number stays in the CV PDF only
The site shows email, LinkedIn, GitHub and location. The downloadable CV keeps the phone number because recruiters expect one on a CV; the owner can swap in a phone-free export at any time.

## 2026-09-03 Visual world: The Green-Bar Printout
The impeccable direction round (seed 7f3a9c21, Experience mode) assigned The Punched Card; the user chose the pick card, The Green-Bar Printout. The page is one continuous form: bars every three lines, tractor strips, fan-fold page breaks with job and page counters, a banner page printed row by row. Faces: Workbench (banners), Martian Mono (data), Schibsted Grotesk (prose). Red ribbon is reserved for actions.

## 2026-09-03 The printer is the 3D object; the fan-fold stack was cut
A first build put a folding paper stack behind the housing. Scrolling down feeds the paper *into* the printer, so the stack belongs inside the machine and was invisible in the honest position; rendered in front it covered the page. The 3D scene is now the housing, exit slot, sheet and two sprockets that turn with scroll. Bounded to the top ~15% of the viewport at the hero and ~6% after.

## 2026-09-03 Detector advisory accepted: the bar background
`detect.mjs` flags the body's `linear-gradient` bars as a decorative grid background. Here the stripes are the subject itself (green-bar paper), which the craft floor names as the case that earns them. Accepted, not suppressed.
