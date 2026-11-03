import type { Metric, ProductFeature, SecurityLayer, Shot } from "./types";

/**
 * SukliCo POS: the owner's own offline-first mobile point of sale for small Philippine stores.
 * Figures are from the repository's own docs and test suites at the time of writing (Oct 2026).
 */

export const suklicoMeta = ["Personal project", "Sole developer, AI-assisted", "Oct 2026", "Launch-ready, closed testing next"];

export const suklicoStatus =
  "Feature complete for launch. The next step is a closed test on Google Play, so it is not in the store yet.";

export const suklicoMetrics = [
  { value: "0", label: "bars of signal needed to sell", note: "every sale completes offline and syncs later" },
  { value: "18 days", label: "from first commit to launch-ready", note: "85 commits, about 30 planned milestones" },
  { value: "~1,000", label: "database assertions in pgTAP", note: "tenant isolation, roles, ledger, billing" },
  { value: "~385", label: "Jest tests against real SQLite", note: "plus 63 migrations and 3 Edge Functions" },
] satisfies Metric[];

export const suklicoFeatures = [
  { id: "sell", name: "Fast checkout", detail: "One search box by name, short code or barcode with the camera scanner beside it. Sell by piece, pack or box (tingi). Park a sale, split a payment, void or refund with a reason." },
  { id: "pay", name: "Cash, QR Ph and credit", detail: "Cash, the store's own QR Ph e-wallet or bank payment, customer credit, or a mix. A native listener confirms GCash and Maya payments from the wallet's notification." },
  { id: "utang", name: "Utang in order", detail: "Credit limits per customer, who has owed for how long, and reminders sent by WhatsApp or text from the owner's own phone." },
  { id: "loyalty", name: "Loyalty points", detail: "Points earned per sale, redeemed at checkout, visible to the customer on their own phone." },
  { id: "shifts", name: "Shifts and cash control", detail: "Open a shift, sell, close with a blind cash count. Every sale, void and price change says who did it." },
  { id: "stock", name: "Stock you can trust", detail: "Deliveries with cost and expiry, FEFO batches, weighted average cost, low-stock and expiring-soon reminders each morning, spoilage and count corrections, product photos." },
  { id: "reports", name: "Owner reports", detail: "Sales, profit and profit after expenses, payments, top products, cashiers, exports to spreadsheet files." },
  { id: "customers", name: "Customer mode and web page", detail: "Customers sign in with a QR sticker or an emailed code to see their own balance, receipts and points. An online catalogue shows prices to the public with cross-store comparison." },
  { id: "console", name: "SukliCo Console", detail: "The owner's web console on Cloudflare Pages: reports, receipts, customers, exports, QR sticker sheets and tutorials." },
  { id: "print", name: "Receipts on paper", detail: "58 mm ESC/POS receipts over Bluetooth Classic, with a preview before printing." },
] satisfies ProductFeature[];

export const suklicoEngineering = [
  {
    id: "offline",
    title: "Offline-first by construction",
    detail: "Writes go to SQLite (WAL, a single write queue), then an outbox syncs them. Client-generated UUIDs and idempotent upserts make retries safe with no merge conflicts. The server never refuses an offline sale; it flags it for the owner.",
  },
  {
    id: "ledger",
    title: "An append-only ledger",
    detail: "Sales and stock movements are voided or reversed, never edited. Money is integer centavos. Stock carries weighted average cost and expiry-ordered batches.",
  },
  {
    id: "tenancy",
    title: "Multi-tenant from day one",
    detail: "Every table carries the store id and every policy checks has_store_role(). Writes are RPC-only and the app holds nothing but the anon key.",
  },
  {
    id: "pin",
    title: "A shared phone, separate people",
    detail: "The owner signs the phone in once; each cashier unlocks it with a PIN that works offline through a device-keyed verifier. Hashes never leave the server. Per-person rights are toggled by the owner and enforced server-side, with a full audit log.",
  },
  {
    id: "operator",
    title: "Support access that is itself audited",
    detail: "An operator role is a table row, not a key, gated by TOTP two-factor, and every action it takes is logged.",
  },
  {
    id: "billing",
    title: "Subscriptions done properly",
    detail: "Google Play Billing through expo-iap with server-side verification and real-time developer notifications. Basic is free; Premium is US$6.99 a month with a 30-day trial and promo codes.",
  },
  {
    id: "native",
    title: "Native where it had to be",
    detail: "A Kotlin notification-listener module reads only e-wallet payment notifications on the owner's receiver phone and relays amount, masked payer and reference to the POS phones. Bluetooth Classic printing and camera scanning round it out.",
  },
  {
    id: "reviews",
    title: "Reviewed before launch",
    detail: "A pre-launch security review (grants, RPC-only writes, photo paths, headers, Android backups), an architecture review, and a cloud schema drift investigation that found stripped grants by dump-and-diff and repaired them.",
  },
] satisfies SecurityLayer[];

export const suklicoStack = [
  "Expo SDK 57",
  "React Native 0.86",
  "TypeScript (strict)",
  "Expo Router",
  "Reanimated",
  "Zustand",
  "expo-sqlite",
  "Supabase (Postgres, Auth, RLS, Storage)",
  "Supabase Edge Functions",
  "Google Play Billing",
  "Kotlin (native module)",
  "Cloudflare Pages",
  "Jest",
  "pgTAP",
  "EAS Build",
  "Docker",
];

export const suklicoMarketing = {
  heading: "Marketing, also built in code",
  body: [
    "The explainer is a Remotion 4 composition, not a video edit. Thirteen scenes were illustrated with Gemini 2.5 Flash Image from a single mascot reference sheet passed in with every prompt, which is what keeps the promodiser consistent from scene to scene. The pictures carry no text; every caption and logo is drawn in React.",
    "The Taglish voiceover is Gemini-TTS (gemini-2.5-pro-tts, Filipino voice) driven by a style prompt and cached by a content hash, so an unchanged line never costs a second take. Scene cuts are timed to the pauses in the voice track, measured with ffmpeg silencedetect.",
    "The ads claim only features that are built: a what-the-video-claims and what-backs-it table maps every line to a shipped milestone.",
  ],
  video: {
    src: "/media/suklico/explainer-720p.mp4",
    poster: "/media/suklico/explainer-poster.webp",
    width: 1280,
    height: 720,
    duration: "34 s",
  },
};

export const suklicoShots = [
  {
    src: "/media/suklico/s01-welcome.webp",
    title: "The store",
    caption: "Opening scene: the mascot outside a sari-sari store, the shop the app is built for.",
    alt: "Cartoon of a smiling promodiser in a navy polo and yellow visor waving in front of a small roadside sari-sari store stacked with goods.",
  },
  {
    src: "/media/suklico/s03-barcode.webp",
    title: "Scan or search",
    caption: "Checkout by camera scan, name or short code; the phone is the register.",
    alt: "Cartoon of the promodiser at a counter scanning a packet's barcode with a phone, a basket of groceries beside her.",
  },
  {
    src: "/media/suklico/s07-payments.webp",
    title: "Cash, GCash, Maya or credit",
    caption: "Split payments at the counter: cash, the store's QR, and customer credit.",
    alt: "Cartoon of three customers paying at a store counter by cash, by phone and by a credit notebook, with green ticks above each.",
  },
  {
    src: "/media/suklico/s08-expiry.webp",
    title: "Expiry reminders",
    caption: "A morning reminder for stock that is about to expire.",
    alt: "Cartoon of the promodiser between shelves of milk cartons, checking a phone, with a calendar-and-bell reminder above.",
  },
  {
    src: "/media/suklico/s09-profit.webp",
    title: "Real profit",
    caption: "Profit after expenses from a weighted average cost, not a guess.",
    alt: "Cartoon of the promodiser giving a thumbs up beside a rising green bar chart and stacks of coins.",
  },
  {
    src: "/media/suklico/s11-customer-page.webp",
    title: "The customer's own page",
    caption: "Customers see their balance, receipts and points on their own phone.",
    alt: "Cartoon of a man on a sofa checking his phone, with a thought bubble of a small shop and a heart.",
  },
  {
    src: "/media/suklico/mascot-sheet.webp",
    title: "The reference sheet",
    caption: "The one character sheet passed with every prompt, which keeps the mascot consistent across all thirteen scenes.",
    alt: "A character reference sheet showing the same promodiser mascot in three poses: presenting, waving and holding a phone.",
  },
] satisfies Shot[];
