import type { CaseStudy } from "../types";

export const evoPlatformToolkit = {
  id: "evo-platform-toolkit",
  title: "PWX Tool Trackers",
  subtitle: "Python toolkit - the flagship's predecessor",
  era: "full-stack",
  kind: "project",
  org: "Poolwerx",
  period: "2025 - 2026",
  problem:
    "The support team needed to pull customer, product, sales and inventory exports from Lightspeed and other platforms for many stores, each with its own credentials, without anyone ever handling a raw API token.",
  approach:
    "A stateless web toolkit: FastAPI backend and a React 18 / TypeScript / Vite frontend. Per-store credentials are pulled at runtime from AWS Parameter Store under a least-privilege IAM group, exports stream straight to the browser as CSV, and every run is audit-logged. Dev, staging and production environments run from Docker Compose behind nginx with Google SSO, plus a credential-free mock mode for local work.",
  outcome:
    "Versioned releases across three environments with real deploy discipline. This is the earlier Python toolkit that the flagship Next.js platform (above) grew out of, and whose exports became the cell-for-cell reference for its automated replacements.",
  stack: ["Python 3.11", "FastAPI", "React 18", "TypeScript", "Vite", "MUI", "Docker Compose", "nginx", "AWS Parameter Store", "IAM"],
  confidentiality: "described-only",
} satisfies CaseStudy;
