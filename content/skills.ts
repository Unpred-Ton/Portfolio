import type { SkillGroup } from "./types";

export const skillGroups = [
  {
    id: "ai",
    label: "AI engineering",
    skills: [
      { name: "Gemini agents: function calling, structured output (responseSchema), model fallback chains, cache-aware prompting", level: "expert", since: 2025 },
      { name: "LLM evals: replay harnesses with an LLM grader, precision-gated auto-accept", level: "proficient" },
      { name: "Generative media: Gemini image generation, Gemini-TTS and Cloud Text-to-Speech voiceovers", level: "proficient" },
      { name: "Claude Code: spec-driven, verification-first delivery", level: "expert", since: 2025 },
    ],
  },
  {
    id: "spreadsheets",
    label: "Spreadsheets",
    skills: [
      { name: "Microsoft Excel (advanced formulas, pivots, Power Query, dashboards)", level: "expert", since: 2017 },
      { name: "Excel VBA", level: "expert", since: 2018 },
      { name: "Google Sheets", level: "expert", since: 2022 },
    ],
  },
  {
    id: "data",
    label: "Data and analytics",
    skills: [
      { name: "Data migration, cleansing and validation", level: "expert" },
      { name: "Deduplication and reconciliation", level: "expert" },
      { name: "QA testing against reference outputs", level: "expert" },
      { name: "Power BI and dashboards", level: "proficient" },
    ],
  },
  {
    id: "automation",
    label: "Automation and scripting",
    skills: [
      { name: "Google Apps Script", level: "expert", since: 2022 },
      { name: "C# (LINQ)", level: "proficient", since: 2022 },
      { name: "ETL pipelines and bulk imports", level: "expert" },
    ],
  },
  {
    id: "sql",
    label: "SQL and databases",
    skills: [
      { name: "PostgreSQL (RLS, migration-managed schemas)", level: "proficient", since: 2025 },
      { name: "Supabase (Auth, Storage, Edge Functions)", level: "proficient", since: 2025 },
      { name: "pgTAP database tests", level: "proficient" },
      { name: "SQLite (offline-first, WAL, outbox sync)", level: "proficient" },
      { name: "MySQL, SQL Server, Firebird", level: "proficient", since: 2022 },
      { name: "Snowflake", level: "working", since: 2025 },
    ],
  },
  {
    id: "apis",
    label: "APIs and integrations",
    skills: [
      { name: "REST integration, OAuth and scoped tokens, HMAC signing, rate-limit handling", level: "expert" },
      { name: "Lightspeed X-Series API", level: "expert", since: 2025 },
      { name: "Google Sheets and Drive APIs (service accounts)", level: "expert" },
      { name: "Atlassian (Jira, Confluence), Freshdesk, Xero APIs", level: "proficient" },
      { name: "Google Play Billing (server-side verification, RTDN)", level: "working" },
    ],
  },
  {
    id: "web",
    label: "Web development",
    skills: [
      { name: "Next.js 14 (App Router), React, TypeScript", level: "proficient", since: 2025 },
      { name: "Tailwind CSS", level: "proficient" },
      { name: "NextAuth (Auth.js), Google OAuth, RBAC", level: "proficient" },
      { name: "Node.js, Git", level: "proficient" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    skills: [
      { name: "React Native / Expo (SDK 57), Expo Router, Reanimated", level: "proficient", since: 2026 },
      { name: "Kotlin native modules (Android)", level: "working" },
      { name: "Bluetooth ESC/POS printing, camera barcode scanning", level: "working" },
    ],
  },
  {
    id: "media",
    label: "Video and media pipelines",
    skills: [
      { name: "Remotion (programmatic video in React)", level: "proficient" },
      { name: "FFmpeg (compositing, camera moves, silence detection)", level: "proficient" },
      { name: "Headless Chromium rendering (Playwright)", level: "proficient" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud and DevOps",
    skills: [
      { name: "Google Cloud: Cloud Run and Cloud Run Jobs, Cloud Build, Artifact Registry, Secret Manager, Cloud Scheduler, GCS", level: "proficient", since: 2025 },
      { name: "Docker, WSL2", level: "proficient" },
      { name: "Cloudflare Pages, EAS Build", level: "working" },
      { name: "AWS Parameter Store and IAM", level: "working" },
    ],
  },
] satisfies SkillGroup[];
