# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 15 (App Router) + TypeScript + Tailwind 4, React Three Fiber (three / fiber 9 / drei 10) for the 3D scene, GSAP 3.15 + ScrollTrigger for motion, zustand as the scroll-to-scene bridge. Deployed on Vercel (free tier) from a public GitHub repository; a custom domain follows. The user chose this stack from three options; it mirrors the stack on his CV.

## Users

Recruiters, hiring managers and technical leads screening a candidate for a remote data-automation, internal-tooling or full-stack web role - usually on a desktop during a hiring pass, sometimes on a phone from a LinkedIn link. They have two to three minutes, a CV already open, and one question: can this person build what they describe, and to what standard?

A secondary audience is a prospective client or collaborator evaluating him for contract work.

## Product Purpose

A personal portfolio for Johnson Bolhayon that proves, not claims, a nine-year arc from spreadsheet automation (Excel VBA, Google Apps Script, C# ETL) to designing, building and operating a production internal platform solo (Next.js + Supabase + Google Cloud, AI-assisted with Claude Code). Success = the visitor understands the arc in one viewport, believes the flagship is real and well-engineered within a minute, and leaves with the CV, the LinkedIn profile or an email started.

## Positioning

The mechanism nobody nearby can copy: the same person who wrote the VBA macros later replaced them with a verified platform, and can show the verification discipline (cell-for-cell diffs, probe-verified API writes, dry-run-by-default pushes, audit trails with undo) rather than a feature list. The portfolio itself is the third proof point: a 3D, motion-rich site designed and shipped with the AI-assisted workflow it describes.

## Operating Context

Visited from a CV or LinkedIn link. The flagship is an internal, SSO-gated application that cannot be linked or screenshotted, so the site must demonstrate it through stylised recreations with synthetic data and through architecture and metrics. Earlier work (VBA, Apps Script, C#) has no surviving source, so it is told as case studies. The downloadable CV PDF is the one artefact the visitor takes away.

## Capabilities and Constraints

- Single page, one route, plus 404, sitemap, robots, OG image. No CMS, no backend, no analytics beyond the host's.
- Sections: hero with the signature 3D scene; the arc (timeline + case-study cards); the flagship deep-dive (metrics, security posture, integrations, the 12 tools, recreations); other projects; skills matrix; how I work; contact with CV download.
- All copy is typed data in `content/`. Numbers must trace to the CV or the source repository's own documentation.
- Confidentiality is a hard constraint enforced by `scripts/guard-confidential.mjs`: no internal URLs, corporate email domain, franchise names or store codes, secret schemes, real screenshots or real data. Employer and product names are already public on the CV and may be used.
- Contact shows email, LinkedIn, GitHub and "Philippines (Remote)". No phone number on the site (it stays in the PDF by the owner's choice).
- Performance and accessibility are non-negotiable: reduced-motion path renders every section in its final state; no-WebGL and low-power tiers fall back to posters; Lighthouse mobile targets 90 / 100 / 100 / 100.
- Undecided: the final domain name (placeholder `johnsonbolhayon.dev` in `content/site.ts`); the exact GitHub profile URL (placeholder, marked TODO).

## Brand Commitments

- The owner asked for a "supreme" design with real motion and animation, 3D where it earns its place, built with the impeccable and ui-ux-pro-max skills - this is a portfolio, not a tool, and it should feel like one.
- The flagship recreations should look like the product they depict (its own design system is a calm, dark, data-dense operations console with a single commanding blue) rather than like the portfolio's world.
- Plain hyphens in all copy, never em or en dashes.

## Evidence on Hand

- The CV: `public/cv/Johnson_Bolhayon_CV.pdf` (source of truth for every career claim).
- Verified flagship figures from the source repository's own docs: 78 API routes, ~55k lines TS/TSX across 224 files, 20 migrations, 12 tools, 20 runtime dependencies, ~150 store tokens in Secret Manager, ~130k tickets mirrored, three years of monthly exports in about a minute, Xero COGS validated to zero diffs, in production since July 2026.
- No screenshots, no public repositories, no testimonials, no client logos. None of these may be fabricated; recreations are labelled synthetic.

## Product Principles

1. Prove, do not claim - every section shows a mechanism, a number or a verification, never an adjective alone.
2. The arc is the story - VBA to platform is the through-line every section returns to.
3. Confidential by construction - if it could identify a franchise or expose infrastructure, it does not exist on this site.
4. The site is a work sample - its own craft, performance and accessibility are part of the evidence.
5. Respect the two-minute visitor - the first viewport answers who, what and how good; the CV and contact are never more than one action away.

## Accessibility & Inclusion

WCAG 2.2 AA as the floor: 4.5:1 text contrast, visible focus, full keyboard path, skip link, canvas described for screen readers, reduced-motion and reduced-data honoured, 44 px targets, 16 px base type. The 3D scene is decoration that degrades to a poster; no information lives only in the canvas.
