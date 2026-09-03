# Design

The built world of johnsonbolhayon.dev, recorded from the shipped code. Replaces the earlier
Green-Bar Printout world (see `docs/DECISIONS.md`, 2026-09-03).

## Platform and mode

Web. Experience mode with a clear hire-me call to action: a single-page, scroll-navigable case
file a recruiter can scan in twenty seconds and dig into when interested.

## Visual world

A warm-paper light canvas with near-black grotesk type and a monospace "data voice", carrying one
Action-Blue accent (`#003DA5`) borrowed straight from the flagship product's own design system. The
only dark surfaces on the page are the screen recreations, which quote the product's navy chrome
verbatim - the contrast is the point. Hairline rules, generous vertical rhythm, no cards-in-cards,
no decorative eyebrows, no gradient text.

## Palette (tokens in `globals.css`)

- Ground: `--color-bg #fbfaf6`, surfaces `--color-surface #ffffff` / `--color-surface-2 #f3f1e9`.
- Ink: `--color-ink #17191f`, `--color-ink-2 #3b4150`, `--color-ink-muted #59626f` (all >= 4.5:1 on paper).
- Line: `--color-line #e6e1d5`, `--color-line-2 #d6d0c1`.
- Accent: `--color-accent #003da5`, hover `--color-accent-2 #1a56db`, tint `--color-accent-soft`.
- Semantic: `--color-good #15803d` (verified / available), `--color-warn #b45309`.
- Committed light. The design deliberately does not ship a dark theme; the reference and the use
  scene (a recruiter on a bright screen) are light.

## Type

- `Schibsted Grotesk` (self-hosted, variable 400-900) for display and reading copy. Hero name
  `clamp(2.9rem, 9vw, 6.25rem)`, tracking `-0.045em`; section headings `clamp(2rem, 4.6vw, 3.25rem)`.
- `Martian Mono` (variable) as the data voice: the `JB` monogram, metric figures, uppercase `.tag`
  labels, era badges, integration access pills. Never used as a "technical" costume - only for
  labels, figures and identity.
- Body measure held around 60-70ch; tabular numerals on all figures.

## Motion

GSAP + ScrollTrigger, one grammar throughout: a fade-and-rise on section enter (`Reveal`, capped
stagger, `expo.out`), metric count-ups (`Readout`), and per-recreation authored moments (the Sales
Export worker pool filling and stamping "Verified 0 diffs", the audit row reverting on Undo, a
status flipping to Completed and stamping a date). The one focal moment is the hero: name, role,
thesis and actions rise as the node-mesh drifts in behind. Content is visible by default (SSR / no-JS
safe); every animation lives in `gsap.matchMedia()` with a reduced-motion branch that sets the final
state - verified: the reduced-motion render shows the entire page with no movement.

## 3D

A single hero-contained `<Canvas>` renders a slow-drifting mesh of connected nodes - the platform's
web of integrations, abstracted. Tiered (`full` / `lite` / `poster`) with a flat SVG constellation
fallback for no-WebGL / reduced-data, masked to fade out under the copy, `frameloop` set to `never`
under reduced motion.

## Structure

Sticky top nav with scroll-spy (active link underline) and a mobile drawer. Sections: Hero,
Flagship (PWX Tool Trackers - metrics band, four dark recreation windows, an architecture diagram,
integrations + security posture, the twelve-tool inventory), Experience (a nine-year timeline with a
spine), Projects (the other case studies as `<details>` cards - keyboard-accessible, no JS needed),
Skills (a capability matrix with a level legend, plus "How I work" principles), Contact, Footer.

## Accessibility

Skip link, one `h1`, labelled sections and landmarks, `:focus-visible` ring never removed, targets
>= 44px, themed browser surfaces (selection, caret, scrollbar), reduced-motion path, JSON-LD Person.
Contrast checked against the paper ground.

## Constraints that outlive this file

Zero confidential data ships: recreations use only `content/recreations/synthetic.ts`; the CI guard
(`scripts/guard-confidential.mjs`) fails on internal URLs, store codes, the work-email domain, the
phone number and secret material. All copy uses plain hyphens.
