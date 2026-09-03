import type { CaseStudy } from "../types";

export const evoToolingStandards = {
  id: "evo-tooling-standards",
  title: "Evo Tooling Standards",
  era: "full-stack",
  kind: "project",
  org: "Poolwerx",
  period: "2026",
  problem:
    "Internal tools were being built by one person with AI assistance at a pace the rest of the team could not follow or reproduce. Without a shared way of working, every new tool would be a snowflake.",
  approach:
    "Wrote the team's single home for how internal tooling is built: an onboarding walkthrough, engineering conventions, a WSL2 / Windows dev setup, AI-agent (Claude Code) workflow rules, infrastructure patterns for Docker Compose, Cloud Run and secrets, copy-to-start project templates, and a read-only machine 'doctor' script that checks a workstation against the standard.",
  outcome:
    "A documented, repeatable path from a fresh laptop to a deployable tool - the engineering standards a solo builder leaves behind so the work outlives them.",
  stack: ["Markdown", "Bash", "Python", "Docker Compose", "Google Cloud Run", "Claude Code"],
  confidentiality: "described-only",
} satisfies CaseStudy;
