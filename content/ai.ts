import type { AiFeature, Metric, PipelineStep, SecurityLayer } from "./types";

/**
 * The Gemini features shipped on the flagship platform (Google AI Studio API).
 * Figures come from the platform's own docs and eval runs; nothing here identifies a franchise.
 */

export const aiMetrics = [
  { value: "5", label: "Gemini features in production", note: "one autonomous agent, four assists" },
  { value: "8", label: "tool calls per investigation, max", note: "read-only function-calling loop" },
  { value: "~50%", label: "of prompt tokens served from cache", note: "up from 10% after reordering the prompt" },
  { value: "~2c", label: "per support ticket answered", note: "US cents, paid-tier key" },
] satisfies Metric[];

export const aiFeatures = [
  {
    id: "reply-assistant",
    name: "Reply Assistant",
    where: "Freshdesk tickets for the product-health and COGS trackers",
    replaces: "A support analyst reading every franchise reply, looking the store up in three systems and typing the same answers again.",
    mechanism:
      "A Freshdesk webhook (with a 15-minute scheduler poll as the safety net) hands each new franchise reply to a Gemini agent. It first decides what the message is: an acknowledgement to ignore, a question the knowledge base answers, something to investigate, or something for a person. An investigation is a function-calling loop of up to eight turns over read-only tools: the store's COGS line items and product lookups, its own Lightspeed products and recent sales, and the tracker's current state. The draft comes back as JSON against a response schema at temperature 0.1, through a fallback chain of three Gemini models.",
    guardrail:
      "Drafts land as a private note and an Inbox entry; 85%+ confidence is marked Ready to send, and auto-send is only on in live mode and never for investigations or replies that promise a team action. An invented-figure check and a per-ticket send cap sit in front of every reply. Every approved reply becomes a learned answer, and a daily harvest of closed tickets turns the team's own answers into Teach suggestions.",
    headline: true,
  },
  {
    id: "apl-mapping",
    name: "APL Product Mapping assist",
    where: "The ERP / MDM migration tool",
    replaces: "Mapping each franchise's whole Lightspeed catalogue onto the approved product list by hand, one product at a time.",
    mechanism:
      "Deterministic tiers run first: learned matches, supplier part number, barcode, exact name, fuzzy name, model number. Only what is still open goes to Gemini, with the ten best retrieval candidates, and it returns a structured verdict with a confidence. On the first store the matcher cut unmapped products from 2,348 to 1,450 of 3,701, and every confirmed pairing carries over to the rest of the network.",
    guardrail:
      "A replay test against confirmed pairings sets the auto-accept threshold: the lowest confidence band with at least 97% precision on at least 20 picks. Bulk accept stays locked until that test exists. The free-tier key is capped at 40 requests a day behind a fleet-wide cache.",
  },
  {
    id: "category-fix",
    name: "Category Fix assist",
    where: "The Category Fix tool",
    replaces: "Guessing a category for products that no other store in the region has ever sold.",
    mechanism:
      "Region-aware rules and a consensus vote across same-region stores classify most products. The leftovers go to Gemini in batches of up to a hundred, with the region's real category tree as the only allowed answer set.",
    guardrail:
      "Every suggestion is validated against the real category list, so an invented category is dropped, not pushed. Its own API key, a model fallback chain and a 500k-tokens-a-day budget; with no key it degrades to copy-paste prompts.",
  },
  {
    id: "ai-summary",
    name: "Freshdesk AI Summary",
    where: "The dashboard's ticket cards",
    replaces: "Reading a long ticket thread to work out what it is about and which article to send.",
    mechanism:
      "One click summarises an open ticket and suggests up to five relevant knowledge-base articles; a resolved ticket gets a recap of what was done.",
    guardrail: "Falls back to keyword search when the quota is spent. Suggests only; the agent still picks the article.",
  },
  {
    id: "ask-gemini",
    name: "Ask Gemini on Team Analytics",
    where: "The Freshdesk team analytics dashboard",
    replaces: "Hand-built answers to 'how did this quarter compare' questions about ticket volume and SLAs.",
    mechanism:
      "A chat grounded in the dashboard's aggregated statistics only. It can compare periods and explain a trend in plain words.",
    guardrail: "Never sees individual tickets or names: aggregates in, prose out.",
  },
] satisfies AiFeature[];

/** How one franchise reply moves through the Reply Assistant. */
export const replyPipeline = [
  { id: "trigger", label: "Reply arrives", detail: "Freshdesk webhook in seconds; a 15-minute poll catches anything missed. Deduped on the conversation id." },
  { id: "classify", label: "Classify", detail: "Ignore, answer from the knowledge base, investigate, or hand to a person. Structured JSON, temperature 0.1." },
  { id: "investigate", label: "Investigate", detail: "Up to eight read-only tool calls: COGS lines, the store's own products and sales, tracker state, a live fact card." },
  { id: "draft", label: "Draft + confidence", detail: "Grounded in about fifteen KB topics, two playbooks and the six most similar learned answers." },
  { id: "review", label: "Private note + Inbox", detail: "85%+ shows Ready to send. A person approves; auto-send only in live mode and never for investigations." },
  { id: "learn", label: "Learn", detail: "Approved replies become learned answers; a daily harvest of closed tickets proposes new ones to teach." },
] satisfies PipelineStep[];

/** Patterns shared by every Gemini feature on the platform. */
export const aiGuardrails = [
  {
    id: "approve",
    title: "Gemini suggests, a person approves",
    detail: "Every feature is draft-only by default. The one agent that can send does so only in live mode, above a confidence floor, and never when a reply promises a team action.",
  },
  {
    id: "audit",
    title: "Every call is audit-logged",
    detail: "Requests and token counts land in the platform audit log, which drives the daily quota gauges and the dashboard's usage leaderboard.",
  },
  {
    id: "keys",
    title: "One key per feature",
    detail: "Separate API keys isolate quotas, so a busy mapping run cannot starve the ticket agent. Each has a model fallback chain and a daily budget.",
  },
  {
    id: "eval",
    title: "Evaluated before trusted",
    detail: "A replay harness re-runs real historical tickets and grades the drafts with Gemini as the judge (baseline about 79 on 36 cases). Auto-accept thresholds come from a precision test, never a guess.",
  },
  {
    id: "test-mode",
    title: "Test mode stores nothing real",
    detail: "In test mode no franchise text is persisted, and a credits-exhausted banner replaces silent failure.",
  },
] satisfies SecurityLayer[];
