import Image from "next/image";
import { caseStudyById } from "@content/case-studies";
import { flagshipMetrics, integrations, securityLayers, tools } from "@content/flagship";
import type { FlagshipTool } from "@content/types";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { Readout } from "@/components/motion/Readout";
import { Icon } from "@/components/ui/Icon";
import { DashboardRecreation } from "@/components/recreations/DashboardRecreation";
import { ExportWalkerRecreation } from "@/components/recreations/ExportWalkerRecreation";
import { TrackerBuilderRecreation } from "@/components/recreations/TrackerBuilderRecreation";
import { AuditUndoRecreation } from "@/components/recreations/AuditUndoRecreation";
import { ArchitectureDiagram } from "@/components/recreations/ArchitectureDiagram";
import { ScreenshotMatrix } from "@/components/recreations/ScreenshotMatrix";

const cs = caseStudyById("pwx-tool-trackers");

const meta = ["Sole developer", "Poolwerx", "In production since Jul 2026", "Next.js · Supabase · Google Cloud"];

const accessLabel: Record<string, string> = { read: "reads", write: "writes", "read-write": "read + write" };
const accessClass: Record<string, string> = {
  read: "bg-surface-2 text-ink-muted",
  write: "bg-accent-soft text-accent-ink",
  "read-write": "bg-accent text-white",
};

const toolEmoji: Record<string, string> = {
  "sales-export": "📊",
  "stock-take-export": "📦",
  "product-avg-cost-export": "💰",
  "delete-products": "🗑️",
  "category-fix": "🗂️",
  "composite-units": "🧩",
  "supplier-update": "📇",
  "price-book-migration": "📗",
  "import-products": "📥",
  "bulk-price-update": "💲",
  "create-product-category": "🏷️",
  "team-analytics": "📈",
  "tracker-builder": "🧱",
};

const groupOrder: { key: FlagshipTool["group"]; label: string }[] = [
  { key: "setup", label: "Store setup" },
  { key: "maintenance", label: "Maintenance" },
  { key: "inventory", label: "Inventory" },
  { key: "reporting", label: "Reporting" },
  { key: "builder", label: "No-code builder" },
];

export function Flagship() {
  return (
    <Section
      id="flagship"
      index="01 / Flagship"
      bg="surface"
      heading="PWX Tool Trackers"
      lead={cs?.problem}
    >
      {/* Meta line */}
      <Reveal className="-mt-6 mb-14 flex flex-wrap items-center gap-x-3 gap-y-2">
        {meta.map((m, i) => (
          <span key={m} className="flex items-center gap-3">
            {i > 0 ? <span aria-hidden className="h-1 w-1 rounded-full bg-line-2" /> : null}
            <span className="tag text-ink-2">{m}</span>
          </span>
        ))}
      </Reveal>

      {/* What it is */}
      <Reveal className="mb-16 grid gap-x-14 gap-y-6 lg:grid-cols-2">
        <p className="text-lg leading-relaxed text-ink-2">{cs?.approach}</p>
        <p className="text-lg leading-relaxed text-ink-2">{cs?.outcome}</p>
      </Reveal>

      {/* Metrics band */}
      <Reveal stagger className="mb-20 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-4">
        {flagshipMetrics.map((m) => (
          <div key={m.label} className="bg-surface p-5 sm:p-6">
            <Readout value={m.value} className="t-data block text-[1.9rem] font-bold tracking-[-0.02em] text-accent sm:text-[2.25rem]" />
            <p className="mt-1 text-sm font-medium text-ink">{m.label}</p>
            {m.note ? <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-muted">{m.note}</p> : null}
          </div>
        ))}
      </Reveal>

      {/* Connected platforms - real Team Analytics proof */}
      <div className="mb-20">
        <Reveal className="mb-8 max-w-[64ch]">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">Wired into the tools the team already lives in</h3>
          <p className="mt-3 text-ink-2">
            Past the POS layer, the platform plugs into the team&apos;s daily systems -{" "}
            <span className="font-semibold text-ink">Jira</span> for task tracking,{" "}
            <span className="font-semibold text-ink">Confluence</span> for the knowledge base (read in-app,
            and updated directly through Claude Code&apos;s MCP), and the{" "}
            <span className="font-semibold text-ink">Freshdesk</span> API for live ticket queues and a
            team-wide SLA analytics dashboard that replaced a hand-built monthly PDF.
          </p>
        </Reveal>

        <Reveal>
          <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2 p-2 sm:p-3">
            <Image
              src="/media/freshdesk-analytics-overview.png"
              width={1900}
              height={852}
              alt="Freshdesk Team Analytics dashboard: an at-a-glance strip of ticket volume, first-response and resolution SLA figures above a monthly demand-versus-delivery chart with a three-month forecast."
              className="w-full rounded-lg border border-line-2"
              sizes="(min-width: 1024px) 900px, 100vw"
            />
            <figcaption className="tag mt-3 px-1 text-ink-muted">
              Freshdesk Team Analytics - the live monthly SLA report. Real dashboard; agent names and account identifiers removed.
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="mt-10">
          <p className="tag mb-4 text-ink-2">Drill-down reports - click any to enlarge and zoom</p>
          <ScreenshotMatrix />
        </Reveal>
      </div>

      {/* Recreations */}
      <div className="mb-20">
        <Reveal className="mb-8 max-w-[60ch]">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">Inside the platform</h3>
          <p className="mt-3 text-ink-2">
            Four more screens, recreated in the product&apos;s own dark chrome - the confidential production data
            stays on the corporate network.
          </p>
        </Reveal>
        <Reveal stagger className="grid gap-6 lg:grid-cols-2">
          <DashboardRecreation />
          <ExportWalkerRecreation />
          <TrackerBuilderRecreation />
          <AuditUndoRecreation />
        </Reveal>
      </div>

      {/* Architecture */}
      <div className="mb-20">
        <Reveal className="mb-8 max-w-[60ch]">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">How it is wired</h3>
          <p className="mt-3 text-ink-2">
            The browser never touches the database. Every read and write is a Zod-validated server route; secrets stay on the
            server.
          </p>
        </Reveal>
        <Reveal className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface-2 p-5 sm:p-8">
          <ArchitectureDiagram />
        </Reveal>
      </div>

      {/* Integrations + Security, two columns */}
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <Reveal className="mb-6">
            <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">Integrations</h3>
            <p className="mt-3 text-ink-2">Seven external systems - most behind Zod-validated server routes, with Confluence also updated through Claude Code&apos;s MCP.</p>
          </Reveal>
          <Reveal stagger as="ul" className="divide-y divide-line border-y border-line">
            {integrations.map((it) => (
              <li key={it.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{it.name}</p>
                  <p className="mt-0.5 text-[0.9375rem] leading-snug text-ink-muted">{it.note}</p>
                </div>
                <span className={`t-data shrink-0 self-start rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] ${accessClass[it.access]}`}>
                  {accessLabel[it.access]}
                </span>
              </li>
            ))}
          </Reveal>
        </div>

        <div>
          <Reveal className="mb-6">
            <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">Security posture</h3>
            <p className="mt-3 text-ink-2">Default-deny, audited, and dry-run by default.</p>
          </Reveal>
          <Reveal stagger as="ul" className="space-y-5">
            {securityLayers.map((l) => (
              <li key={l.id} className="flex gap-3.5">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon name="shield" size={16} />
                </span>
                <div>
                  <p className="font-semibold text-ink">{l.title}</p>
                  <p className="mt-1 text-[0.9375rem] leading-snug text-ink-2">{l.detail}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Tool inventory */}
      <div className="mt-20">
        <Reveal className="mb-8 max-w-[60ch]">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">The toolkit</h3>
          <p className="mt-3 text-ink-2">
            Twelve operational tools plus the tracker builder, each replacing a manual job and each carrying its own safety
            rail.
          </p>
        </Reveal>
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {groupOrder.map(({ key, label }) => {
            const group = tools.filter((t) => t.group === key);
            if (!group.length) return null;
            return (
              <Reveal key={key}>
                <p className="tag mb-3 border-b border-line pb-2 text-ink-2">{label}</p>
                <ul className="space-y-3.5">
                  {group.map((t) => (
                    <li key={t.id}>
                      <p className="flex items-center gap-2 font-semibold text-ink">
                        <span aria-hidden className="text-base leading-none">{toolEmoji[t.id]}</span>
                        {t.name}
                      </p>
                      <p className="mt-0.5 text-[0.9375rem] leading-snug text-ink-muted">
                        Replaces {t.replaces.charAt(0).toLowerCase() + t.replaces.slice(1)}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
