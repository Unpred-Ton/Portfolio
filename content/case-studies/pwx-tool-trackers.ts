import type { CaseStudy } from "../types";

export const pwxToolTrackers = {
  id: "pwx-tool-trackers",
  title: "PWX Tool Trackers",
  era: "full-stack",
  kind: "flagship",
  org: "Poolwerx",
  period: "Jun 2025 - present",
  problem:
    "A support team managing product, inventory and cost operations across 140+ franchises in three countries was running on spreadsheets, manual POS exports and one-off scripts. Every monthly report meant dozens of downloads per store, and nothing recorded who changed what.",
  approach:
    "Designed, built and operate an internal web platform end-to-end as the sole developer, AI-assisted with Claude Code. Next.js 14 App Router, TypeScript, Tailwind and Supabase (PostgreSQL), shipped as a Docker container on Google Cloud Run behind a custom HTTPS domain with Cloud Build deploys, Secret Manager and Cloud Scheduler jobs. Every export engine is verified cell-for-cell against the manual report it replaces before it ships.",
  outcome:
    "In daily production use since July 2026: a suite of Lightspeed POS tools, a no-code tracker builder, Jira / Freshdesk / Confluence in one dashboard, Gemini-powered ticket summaries, and a platform-wide audit log with one-click undo.",
  stack: [
    "Next.js 14",
    "TypeScript",
    "Tailwind CSS",
    "Supabase (PostgreSQL, RLS)",
    "NextAuth v5",
    "Google Cloud Run",
    "Cloud Build",
    "Secret Manager",
    "Lightspeed X-Series API",
    "Google Drive / Sheets API",
    "Gemini API",
    "Zod",
  ],
  metrics: [
    { value: "140+", label: "franchises served", note: "AU, NZ and US" },
    { value: "78", label: "API routes" },
    { value: "~55k", label: "lines of TypeScript", note: "224 files, 20 runtime dependencies" },
    { value: "12", label: "operational tools" },
    { value: "~150", label: "store tokens in Secret Manager", note: "never in the browser or logs" },
    { value: "3 yrs", label: "of monthly exports in minutes", note: "previously dozens of manual downloads per store" },
  ],
  confidentiality: "described-only",
  recreation: "dashboard",
} satisfies CaseStudy;
