import type { CaseStudy } from "../types";

export const cogsAppsScript = {
  id: "cogs-apps-script",
  title: "COGS automation in Google Apps Script",
  era: "apps-script",
  kind: "legacy",
  org: "Poolwerx",
  period: "2025",
  problem:
    "Monthly cost-of-goods-sold posting for franchise stores was a hand-run sequence: import the product list, process SKU sales, map registers to outlets, freeze the month and produce a journal for Xero.",
  approach:
    "Built the whole workflow in Google Apps Script on top of Sheets: product-list imports, SKU sales processing, a monthly posting workflow with data freezing so closed months cannot drift, register-to-outlet mapping, and journal exports ready for Xero.",
  outcome:
    "A month-end that runs as a sequence of clicks instead of a day of spreadsheet surgery - and the direct ancestor of the API-driven Sales Export and Xero COGS engines in the later platform.",
  stack: ["Google Apps Script", "Google Sheets", "Xero"],
  confidentiality: "described-only",
} satisfies CaseStudy;
