// Fails the build if anything that must never be public slips into the repo.
// Scope: source, content, docs, and text files under public/. Binary files are skipped.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["src", "content", "docs", "public", "README.md", "PRODUCT.md", "DESIGN.md"];
const TEXT_EXT = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".md", ".txt", ".html", ".json", ".svg", ".xml"]);
const SKIP_FILES = new Set(["docs/PLAN.md", "docs/CONTENT-GUIDE.md", "scripts/guard-confidential.mjs"]);

// Each rule: [label, regex]. Keep the list boring and specific.
const RULES = [
  ["phone number", /\+63\s?\d|\b0?961\s?068\s?7484\b/],
  ["work email domain", /poolwerx\.com(\.au)?\b/i],
  ["internal hostnames", /tool-trackers\.poolwerx|\.run\.app\b|git\.poolwerx\.io/i],
  ["secret material", /SUPABASE_SERVICE_ROLE|BEGIN (RSA |OPENSSH )?PRIVATE KEY|sk_live_|AIza[0-9A-Za-z_-]{20,}/],
  ["secret naming scheme", /fp_[a-z]{2,6}_lightspeed/],
  // Real franchise store codes follow <cc><3-4 letters>; only flag the ones we know appear in the source repo.
  ["franchise store codes", /\b(auind|aupsc|auerpuat|aushp|aushr|aukki|aukrk|aualb|uscnr)\b/i],
];

const findings = [];

function walk(path) {
  let st;
  try { st = statSync(path); } catch { return; }
  if (st.isDirectory()) {
    for (const name of readdirSync(path)) {
      if (name === "node_modules" || name === ".next") continue;
      walk(join(path, name));
    }
    return;
  }
  if (!TEXT_EXT.has(extname(path)) || SKIP_FILES.has(path)) return;
  const text = readFileSync(path, "utf8");
  for (const [label, re] of RULES) {
    const m = re.exec(text);
    if (m) {
      const line = text.slice(0, m.index).split("\n").length;
      findings.push(`${path}:${line}  ${label}  ("${m[0]}")`);
    }
  }
}

for (const root of ROOTS) walk(root);

if (findings.length) {
  console.error("Confidentiality guard failed:\n" + findings.map((f) => "  - " + f).join("\n"));
  process.exit(1);
}
console.log("Confidentiality guard passed.");
