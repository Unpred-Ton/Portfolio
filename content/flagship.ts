import type { ArchitectureNode, FlagshipTool, Integration, Metric, SecurityLayer, Shot } from "./types";

export const flagshipMetrics = [
  { value: "140+", label: "franchises", note: "AU, NZ and US" },
  { value: "13", label: "tools" },
  { value: "~130k", label: "support tickets mirrored" },
  { value: "3 yrs", label: "of exports in minutes" },
] satisfies Metric[];

export const securityLayers = [
  {
    id: "oauth",
    title: "Domain-restricted Google OAuth",
    detail: "NextAuth v5 with the corporate domain as the gate, plus a per-user approval list and an admin role. Sessions expire daily and approval is re-checked every 15 minutes.",
  },
  {
    id: "rls",
    title: "Default-deny row-level security",
    detail: "Every table has RLS on with no anonymous policies. The browser never talks to the database; every read and write flows through a server-side API route validated with Zod.",
  },
  {
    id: "secrets",
    title: "Secrets never leave the server",
    detail: "About 150 per-store POS tokens and every service key live in GCP Secret Manager. They are read server-side, cached briefly, and never logged or shipped to the client.",
  },
  {
    id: "audit",
    title: "Everything is auditable",
    detail: "Every write across the platform is logged with before/after JSON snapshots, powering a filterable audit-log viewer with one-click undo and restore.",
  },
  {
    id: "receipts",
    title: "Write tools earn the right to write",
    detail: "Long scans stream progress as NDJSON, a 30-minute HMAC-signed receipt proves the review happened, pushes are dry-run by default, and the operator re-types the target store code before anything is written.",
  },
] satisfies SecurityLayer[];

export const integrations = [
  { id: "lightspeed", name: "Lightspeed X-Series", access: "read-write", note: "Products, inventory, sales history, suppliers, price books. Parallel version-cursor walks for big histories." },
  { id: "google", name: "Google Drive and Sheets", access: "write", note: "Formatted stock-take sheets, month-by-month export trees, tracker archives - all via a service account." },
  { id: "apps-script", name: "Google Apps Script webhooks", access: "write", note: "Two separate web apps: sheet actions and assignment emails. The origin story, still in production." },
  { id: "jira", name: "Jira", access: "read", note: "Each user's open issues surfaced in their dashboard and tracked for resolution, read with one scoped service token." },
  { id: "confluence", name: "Confluence", access: "read-write", note: "The team knowledge base: read into the app for ticket-doc suggestions, and updated directly through Claude Code's Confluence MCP - the documentation is maintained by the AI workflow." },
  { id: "freshdesk", name: "Freshdesk", access: "read-write", note: "Live ticket queues per agent, a whole-account mirror powering the team-wide Analytics dashboard, a webhook that wakes the Reply Assistant, and private-note drafts written back to the ticket." },
  { id: "gemini", name: "Google Gemini", access: "read", note: "An autonomous Reply Assistant agent with function calling, plus product mapping, categorisation, ticket summaries and an analytics chat - every call audit-logged, quota-guarded and behind a model fallback chain." },
] satisfies Integration[];

export const architecture = [
  { id: "browser", label: "Browser", sub: "Next.js App Router, SWR, streamed NDJSON", edges: ["routes"] },
  { id: "auth", label: "NextAuth", sub: "Google OAuth, JWT, approval list", edges: ["routes"] },
  { id: "routes", label: "Server API routes", sub: "159 routes, Zod on every write", edges: ["db", "secrets", "external", "audit"] },
  { id: "db", label: "Supabase Postgres", sub: "RLS default-deny, 48 migrations", edges: [] },
  { id: "secrets", label: "Secret Manager", sub: "~150 store tokens, service keys", edges: [] },
  { id: "audit", label: "Audit log", sub: "before/after snapshots, undo, AI token usage", edges: ["db"] },
  { id: "external", label: "External systems", sub: "Lightspeed, Google, Jira, Confluence, Freshdesk, Gemini", edges: [] },
  { id: "scheduler", label: "Cloud Scheduler", sub: "syncs, pollers and the daily harvest", edges: ["routes"] },
] satisfies ArchitectureNode[];

export const tools = [
  { id: "sales-export", name: "Sales Export", group: "maintenance", replaces: "Dozens of manual monthly POS downloads per store.", mechanism: "Streams up to three years of months through a bounded worker pool, writing paired sales and item-count workbooks plus a run-level product export into an auto-organised Drive tree.", guardrail: "Engines verified cell-for-cell against real exports; the Xero COGS workbook validated to zero diffs." },
  { id: "stock-take-export", name: "Stock Take Export", group: "inventory", replaces: "The manual inventory report download before every stocktake.", mechanism: "Four concurrent reads joined into one row per product per outlet, exported as a formatted Google Sheet with one tab per outlet or category and an Expected column for the franchisee.", guardrail: "A parallel version-range sales walk removed a five-minute tail on large stores." },
  { id: "product-avg-cost-export", name: "Product Avg Cost Export", group: "maintenance", replaces: "The manual product export feeding the average-cost workbook.", mechanism: "One click, four concurrent reads and a full sales-history walk for last-sale dates, streamed to a single workbook on Drive.", guardrail: "Data-exact at 31 columns; a truncated walk aborts rather than exporting a wrong date." },
  { id: "delete-products", name: "Delete Products", group: "maintenance", replaces: "A purge of dormant products nobody dared do by hand.", mechanism: "A streamed scan of products, inventory, the entire sales history, open consignments and tags keeps only what has never sold.", guardrail: "Dry run, review screen, type-the-count confirmation and a 30-minute HMAC receipt with a countdown." },
  { id: "category-fix", name: "Category Fix", group: "maintenance", replaces: "Products invisible to the data warehouse because of empty or off-scope categories.", mechanism: "Region-aware classification against the standard category tree, gaps filled by a consensus vote across same-region stores, then Gemini for whatever the network cannot agree on.", guardrail: "Every AI suggestion is validated against the real category list; invented categories cannot slip through." },
  { id: "composite-units", name: "Composite Units Check", group: "maintenance", replaces: "Silent margin corruption from wrong parent-to-composite unit breakdowns.", mechanism: "Parses size mentions from product-name pairs to suggest the correct unit ratio, then pushes fixes behind the push gate.", guardrail: "Suggestions only within the same measurement family; every push audit-logged." },
  { id: "supplier-update", name: "Supplier Update", group: "setup", replaces: "Name-only supplier records left behind by a store migration.", mechanism: "Matches suppliers by normalised name and copies contact details across, then re-links products to suppliers by SKU.", guardrail: "Fill-empty-only: nothing is ever overwritten, renamed or deleted." },
  { id: "price-book-migration", name: "Price Book Migration", group: "setup", replaces: "Rebuilding custom price books by hand on a new account.", mechanism: "Clones books and per-product entries add-only in batches of 100, re-derived live at push time.", guardrail: "Idempotent re-runs; the base price book is excluded so retail prices cannot be clobbered." },
  { id: "import-products", name: "Import Products", group: "setup", replaces: "The CSV export/import that drops multi-SKU codes, suppliers and composites.", mechanism: "Clones every product with all codes, suppliers, categories, variants and composites onto the new account via the API; inventory is never copied.", guardrail: "Every write shape probe-verified against the live system before shipping." },
  { id: "apl-mapping", name: "APL Product Mapping", group: "setup", replaces: "Mapping a store's whole catalogue onto the ERP's approved product list by hand for the MDM migration.", mechanism: "Deterministic tiers (learned, part number, barcode, exact and fuzzy name, model) and then Gemini over the ten best candidates, with confirmed pairings reused network-wide and an .xlsx export for the import.", guardrail: "Auto-accept only from a confidence band proven to 97% precision in a replay test; bulk accept locked until the test exists." },
  { id: "bulk-price-update", name: "Bulk Price Update", group: "maintenance", replaces: "Updating one product's price store by store across the network.", mechanism: "Find products on a reference store, scan every store in a 12-worker pool with exact-SKU lookups, review, push.", guardrail: "Never fuzzy matching, a 30-minute scan receipt, dry-run-gated pushes. Admin-only alpha." },
  { id: "create-product-category", name: "Create Product Category", group: "setup", replaces: "Hand-building the standard three-level category tree in every new store.", mechanism: "The category list lives in Postgres, is edited in a grid and pushed as leaf paths, reusing existing parents.", guardrail: "The first tool built; tokens used per request and never persisted." },
  { id: "team-analytics", name: "Freshdesk Team Analytics", group: "reporting", replaces: "A monthly PDF ticket-volume report.", mechanism: "A whole-account ticket mirror synced every 30 minutes drives yearly, quarterly and monthly views with deltas, business-hours response times, backlog ageing and a three-month forecast.", guardrail: "Validated within ~3% of the legacy report; ~130k tickets backfilled." },
  { id: "tracker-builder", name: "Adhoc Tracker Builder", group: "builder", replaces: "Yet another shared spreadsheet for every new team process.", mechanism: "Anyone creates a typed, shareable table. A tracker is data - JSONB rows keyed by column id - so no runtime DDL and no admin step. Roles, live summaries, quick filters, server-side automations, one-click archive to Sheets.", guardrail: "Every cell edit and structural change audit-logged." },
] satisfies FlagshipTool[];

/** Real Team Analytics drill-downs, anonymised (agent names and account identifiers removed). */
export const freshdeskShots = [
  {
    src: "/media/freshdesk-modal-created.png",
    title: "Created",
    caption: "New tickets by type and system, plus the first-response-within-8-business-hours benchmark.",
    alt: "Created report: new tickets broken down by type and system, with a first-response benchmark met at 91.4 percent against a 65 percent target.",
  },
  {
    src: "/media/freshdesk-modal-resolved.png",
    title: "Resolved",
    caption: "What closed this period by source and type, against the three-business-day target.",
    alt: "Resolved report: tickets closed broken down by source and type, tracked against an 85 percent within-three-business-days target.",
  },
  {
    src: "/media/freshdesk-modal-unresolved.png",
    title: "Unresolved",
    caption: "The still-open backlog by status, type, system and how long it has waited.",
    alt: "Unresolved report: the open backlog broken down by status, type and system, with an ageing distribution.",
  },
  {
    src: "/media/freshdesk-modal-reopened.png",
    title: "Reopened",
    caption: "Tickets that came back after resolution, by agent, type and system (agent names anonymised).",
    alt: "Reopened report: tickets that came back after resolution, broken down by agent, type and system.",
  },
] satisfies Shot[];
