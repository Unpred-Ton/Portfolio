import type { TimelineEntry } from "./types";

export const timeline = [
  {
    id: "poolwerx-transformation",
    era: "full-stack",
    org: "Poolwerx Corporation Pty Ltd",
    role: "Data and Inventory Transformation Specialist",
    location: "Australia (Remote)",
    start: "2025-06",
    summary:
      "Sole developer of PWX Tool Trackers, an internal franchise-operations platform used daily by the support team across 140+ franchises. Also support the Lightspeed-Xero-Vital trading-terms integration, automate catalogue management via the Lightspeed API, and write ad hoc Snowflake SQL.",
    caseStudyIds: ["pwx-tool-trackers", "evo-platform-toolkit", "evo-tooling-standards", "cogs-apps-script"],
  },
  {
    id: "poolwerx-migration",
    era: "apps-script",
    org: "Poolwerx Corporation Pty Ltd",
    role: "Data Migration Executive",
    location: "Australia (Remote)",
    start: "2024-05",
    end: "2025-06",
    summary:
      "End-to-end data processing for migrations across tech stacks for 140+ franchise partners: VBA macro tools for ETL and reconciliation, Apps Script tools for multi-sheet processing and API integration, and migration monitoring dashboards.",
    caseStudyIds: ["poolwerx-migration-tools"],
  },
  {
    id: "kreloses",
    era: "apps-script",
    org: "Kreloses PLT (SaaS platform)",
    role: "Data Analyst / Data Migration Specialist",
    location: "Malaysia (Remote)",
    start: "2022-11",
    end: "2025-06",
    summary:
      "Restructured raw data from free-form Excel, POS exports and SQL dumps into import-ready formats. Built C# (LINQ) transformation tools, wrote MySQL / SQL Server / Firebird queries, and ran post-migration QA directly with clients. Full-time to May 2024, part-time after.",
    caseStudyIds: ["kreloses-csharp-migration"],
  },
  {
    id: "iqvia",
    era: "vba",
    org: "IQVIA",
    role: "Data Analyst / Spreadsheet Specialist",
    location: "Philippines (Hybrid)",
    start: "2018-02",
    end: "2022-04",
    summary:
      "Point of contact for the Product Reference Management team (Middle East and Africa). Self-taught Excel VBA and built the team's QC, data-input and product-processing automation. IQVIA Impact Program Award for innovations in data efficiency and quality control.",
    caseStudyIds: ["iqvia-vba-tools"],
  },
  {
    id: "optum",
    era: "vba",
    org: "Optum",
    role: "Pharmacy Benefits Analyst",
    location: "Philippines (Onsite)",
    start: "2017-08",
    end: "2018-01",
    summary:
      "Reviewed pharmacy benefit requests for US healthcare clients in a high-volume, deadline-driven environment. Where the habit of getting data exactly right began.",
    caseStudyIds: [],
  },
] satisfies TimelineEntry[];
