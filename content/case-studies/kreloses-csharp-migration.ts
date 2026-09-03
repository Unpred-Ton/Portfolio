import type { CaseStudy } from "../types";

export const krelosesCsharpMigration = {
  id: "kreloses-csharp-migration",
  title: "SaaS onboarding data migration",
  era: "apps-script",
  kind: "legacy",
  org: "Kreloses PLT",
  period: "Nov 2022 - Jun 2025",
  problem:
    "Every new client arrived with data in a different shape - free-form Excel, POS exports, SQL dumps - and all of it had to match the platform's import schema before go-live.",
  approach:
    "Built C# (LINQ) tools to automate complex transformations and standardise records from large datasets; wrote SQL against MySQL, SQL Server and Firebird to filter, clean and export exactly what the import needed; ran post-migration QA on record counts and format compliance, and worked directly with clients to define goals and manage the transition from legacy systems.",
  outcome:
    "Import-ready data on a repeatable pipeline instead of a per-client scramble, with QA evidence clients could sign off on.",
  stack: ["C# (LINQ)", "MySQL", "SQL Server (SSMS)", "Firebird", "Excel"],
  confidentiality: "described-only",
} satisfies CaseStudy;
