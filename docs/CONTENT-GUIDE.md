# Content guide

All copy lives in `content/` as typed TypeScript objects. Components only read from `@content/*`. Edit the data, not the components.

| File | What it holds |
|---|---|
| `content/site.ts` | Name, URL, email, LinkedIn, GitHub, CV path, location |
| `content/profile.ts` | Headline, summary paragraphs, education, availability |
| `content/timeline.ts` | The career arc (newest first), each entry pointing at case studies |
| `content/case-studies/*.ts` | One file per case study: problem / approach / outcome / stack / metrics |
| `content/flagship.ts` | PWX Tool Trackers detail: metrics, security layers, integrations, architecture nodes, the tool list |
| `content/skills.ts` | The skills matrix, grouped |
| `content/principles.ts` | "How I work" |
| `content/recreations/synthetic.ts` | The only data the animated screen recreations may use |

## Confidentiality rules

These are enforced by `npm run guard` (`scripts/guard-confidential.mjs`) and by review.

- Employer work is `confidentiality: "described-only"`. No source links, no screenshots, no live URLs.
- Never include: internal hostnames, the corporate email domain, franchise store codes or franchise names, secret-naming schemes, webhook URLs, Confluence space keys, environment-variable values, real ticket text, real SKUs, real costs.
- The employer name and the product name already appear on the public CV and may be used.
- Every number must be traceable to the CV or to the source repository's own docs. Do not round up.
- Recreations use `synthetic.ts` only. Store names end in "Demo", SKUs start with `DEMO-`, ticket ids start with `DEMO-`.
- The phone number is not shown anywhere on the site. It remains in the downloadable CV PDF by the owner's choice.

## Voice

Plain hyphens only, never em or en dashes. Short sentences. Numbers in the metric tiles, not buried in prose. Say what the manual job was, what replaced it, and how the output was verified.
