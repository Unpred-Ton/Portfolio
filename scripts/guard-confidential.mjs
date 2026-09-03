// Fails the build if anything that must never be public slips into the repo.
// Scope: source, content, docs, and text files under public/. Binary files are skipped.
// Employer-specific deny-list tokens are base64-encoded so this guard does not itself
// leak the very strings it exists to keep out of a public repo.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["src", "content", "docs", "public", "README.md", "PRODUCT.md", "DESIGN.md"];
const TEXT_EXT = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".md", ".txt", ".html", ".json", ".svg", ".xml"]);
const SKIP_FILES = new Set(["scripts/guard-confidential.mjs"]);

const dec = (b64) => Buffer.from(b64, "base64").toString("utf8");

// Each rule: [label, regex]. Keep the list boring and specific.
const RULES = [
  // A Philippine mobile number in any spacing - matched by shape, never by the literal digits.
  ["phone number", /\+63\s?9\d{2}[\s.-]?\d{3}[\s.-]?\d{4}/],
  ["work email domain", new RegExp(dec("cG9vbHdlcnhcLmNvbShcLmF1KT8="), "i")],
  ["internal hostnames", new RegExp(dec("dG9vbC10cmFja2Vyc1wucG9vbHdlcnh8XC5ydW5cLmFwcHxnaXRcLnBvb2x3ZXJ4XC5pbw=="), "i")],
  ["secret material", /SUPABASE_SERVICE_ROLE|BEGIN (RSA |OPENSSH )?PRIVATE KEY|sk_live_|AIza[0-9A-Za-z_-]{20,}/],
  ["secret naming scheme", new RegExp(dec("ZnBfW2Etel17Miw2fV9saWdodHNwZWVk"))],
  ["franchise store codes", new RegExp(dec("XGIoYXVpbmR8YXVwc2N8YXVlcnB1YXR8YXVzaHB8YXVzaHJ8YXVra2l8YXVrcmt8YXVhbGJ8dXNjbnIpXGI="), "i")],
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
