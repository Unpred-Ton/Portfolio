import type { CaseStudy } from "../types";

export const poolwerxMigrationTools = {
  id: "poolwerx-migration-tools",
  title: "Franchise migration tooling and dashboards",
  era: "apps-script",
  kind: "legacy",
  org: "Poolwerx",
  period: "May 2024 - Jun 2025",
  problem:
    "140+ franchise partners were migrating across tech stacks. Each migration meant cleaning, validating, transforming and extracting data, reconciling records, deduplicating, and reporting status to stakeholders - repeatedly.",
  approach:
    "Custom VBA macro tools automated the repetitive ETL steps, consolidated stakeholder reports, reconciled records and flagged errors from logic rules. Google Apps Script tools handled multi-sheet processing, pulled and pushed data through APIs, sent automated status emails and managed Drive files dynamically. Migration monitoring dashboards tracked readiness and progress per franchise.",
  outcome:
    "Rule-based validation and QA testing kept data accuracy and referential integrity across every migration, with progress visible to the business at a glance.",
  stack: ["Excel VBA", "Google Apps Script", "Google Sheets API", "Google Drive API"],
  metrics: [{ value: "140+", label: "franchise partners migrated" }],
  confidentiality: "described-only",
} satisfies CaseStudy;
