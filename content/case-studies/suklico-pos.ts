import type { CaseStudy } from "../types";

export const suklicoPos = {
  id: "suklico-pos",
  title: "SukliCo POS",
  era: "full-stack",
  kind: "showcase",
  org: "Personal project",
  period: "Oct 2026 - present",
  problem:
    "Small Philippine stores sell with no internet for much of the day, on one phone shared by the family and staff, in tingi units, to customers who pay later. No point-of-sale app on the market was built for that, so most sari-sari stores still run on a notebook.",
  approach:
    "Designed and built an offline-first Android point of sale as a multi-tenant subscription SaaS, solo and AI-assisted: Expo and React Native with a local SQLite database and an outbox sync, Supabase (Postgres with row-level security, RPC-only writes, Edge Functions) behind it, Google Play Billing for the Premium plan, a Kotlin native module for e-wallet payment confirmation, and a web console for owners on Cloudflare Pages. Built first for a real store and shaped by its owner's feedback, milestone by milestone.",
  outcome:
    "Launch-ready in eighteen days of commits: checkout, utang, stock with expiry and average cost, shifts, reports, loyalty, a customer web page and an online catalogue, all working with zero signal. Backed by about 385 Jest tests against real SQLite and about 1,000 pgTAP assertions on tenant isolation, roles, the ledger and billing. Closed testing on Google Play is the next step.",
  stack: ["Expo SDK 57", "React Native", "TypeScript", "SQLite", "Supabase", "PostgreSQL (RLS)", "Edge Functions", "Google Play Billing", "Kotlin", "Cloudflare Pages", "Jest", "pgTAP"],
  confidentiality: "private-repo",
} satisfies CaseStudy;
