import type { CaseStudy } from "../types";

export const iqviaVbaTools = {
  id: "iqvia-vba-tools",
  title: "Where it started: Excel VBA at IQVIA",
  era: "vba",
  kind: "legacy",
  org: "IQVIA",
  period: "Feb 2018 - Apr 2022",
  problem:
    "The Product Reference Management team for the Middle East and Africa processed pharmaceutical product data by hand: QC checks, data input, product classification and migrations into internal databases, all under weekly and monthly production deadlines.",
  approach:
    "Taught myself Excel VBA and built the team's automation: an automated QC tool with role-based templates, a consumer-health product tracker that removed manual duplication, and a patent-intelligence tool that consolidated 60+ global pharmaceutical datasets. Led the weekly and monthly production meetings and coordinated with global teams.",
  outcome:
    "Product migrations and imports preserved structure and classification integrity, and the tooling earned the IQVIA Impact Program Award for innovations improving data efficiency and quality control.",
  stack: ["Excel VBA", "Advanced Excel", "Pivot tables", "Internal databases"],
  metrics: [{ value: "60+", label: "global datasets consolidated" }],
  confidentiality: "described-only",
} satisfies CaseStudy;
