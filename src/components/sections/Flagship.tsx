import { flagshipMetrics, securityLayers, integrations, tools } from "@content/flagship";
import { pwxToolTrackers } from "@content/case-studies/pwx-tool-trackers";
import type { ToolGroup } from "@content/types";
import { Readout } from "@/components/motion/Readout";
import { JobHeader } from "@/components/ui/JobHeader";
import { Field } from "@/components/ui/Report";
import { ArchitectureDiagram } from "@/components/recreations/ArchitectureDiagram";
import { DashboardRecreation } from "@/components/recreations/DashboardRecreation";
import { AuditUndoRecreation } from "@/components/recreations/AuditUndoRecreation";
import { TrackerBuilderRecreation } from "@/components/recreations/TrackerBuilderRecreation";
import { ExportWalkerRecreation } from "@/components/recreations/ExportWalkerRecreation";
import { Section } from "./Section";

/** Where each figure comes from. The CV is public; "docs" means the platform's own repository documentation. */
const PROVENANCE: Record<string, string> = {
  franchises: "CV",
  "API routes": "docs",
  "lines of TypeScript": "docs",
  tools: "docs",
  "store tokens secured": "CV",
  "support tickets mirrored": "docs",
  "of exports in minutes": "CV",
  "diffs vs the legacy reports": "docs",
};

const GROUP_LABEL: Record<ToolGroup, string> = {
  setup: "Setup - store migrations",
  maintenance: "Maintenance",
  inventory: "Inventory",
  reporting: "Reporting",
  builder: "Builder",
};
const GROUP_ORDER: ToolGroup[] = ["maintenance", "setup", "inventory", "reporting", "builder"];

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="t-banner mt-[calc(var(--line)*3)] border-b border-rule-strong pb-1 text-[1.25rem] uppercase leading-[calc(var(--line)*1.5)]">
      {children}
    </h3>
  );
}

export function Flagship() {
  return (
    <Section id="flagship">
      <JobHeader id="flagship" title={pwxToolTrackers.title} job={3} page={3} pages={7} />
      <p className="mt-line max-w-[62ch] text-[1.125rem] leading-[calc(var(--line)*1.25)]">
        The flagship: an internal franchise-operations platform designed, built and operated end to end as the sole
        developer, AI-assisted with Claude Code, in daily use by a support team across three countries.
      </p>

      <dl className="mt-[calc(var(--line)*1.5)] border-y border-rule-strong">
        <Field label="Problem">{pwxToolTrackers.problem}</Field>
        <Field label="Approach">{pwxToolTrackers.approach}</Field>
        <Field label="Outcome">{pwxToolTrackers.outcome}</Field>
        <Field label="Stack">
          <span className="t-data text-[0.8125rem] leading-line">{pwxToolTrackers.stack.join("  ·  ")}</span>
        </Field>
      </dl>

      {/* TOTALS: the report's figures, each with its source. */}
      <SubHead>Totals</SubHead>
      <dl className="grid grid-cols-2 gap-x-6 md:grid-cols-4">
        {flagshipMetrics.map((m) => (
          <div key={m.label} className="border-b border-rule py-line">
            <dd className="t-data text-[2rem] font-medium leading-[calc(var(--line)*1.5)] sm:text-[2.5rem] sm:leading-[calc(var(--line)*2)]">
              <Readout value={m.value} />
            </dd>
            <dt className="text-[0.9375rem] leading-line">{m.label}</dt>
            <p className="t-data mt-1 text-[10.5px] uppercase tracking-[0.08em] text-ink-muted">
              {m.note ? `${m.note} · ` : ""}src: {PROVENANCE[m.label] ?? "docs"}
            </p>
          </div>
        ))}
      </dl>

      {/* Recreations of the screens, in the product's own world. */}
      <SubHead>Screens, recreated</SubHead>
      <p className="mt-line max-w-[62ch] text-[0.9375rem] leading-line text-ink-muted">
        The platform sits behind corporate single sign-on and holds franchise data, so nothing here is a screenshot.
        These are recreations of four screens with invented stores, tickets and figures.
      </p>
      <div className="mt-[calc(var(--line)*1.5)] grid gap-x-8 gap-y-[calc(var(--line)*1.5)] lg:grid-cols-2">
        <DashboardRecreation />
        <AuditUndoRecreation />
        <TrackerBuilderRecreation />
        <ExportWalkerRecreation />
      </div>

      <SubHead>Architecture</SubHead>
      <div className="mt-line overflow-x-auto">
        <ArchitectureDiagram />
      </div>

      <SubHead>Security posture</SubHead>
      <ol className="divide-y divide-rule">
        {securityLayers.map((s, i) => (
          <li key={s.id} className="grid gap-x-6 py-line sm:grid-cols-[3rem_18rem_1fr]">
            <span className="t-data text-[0.8125rem] leading-line text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
            <h4 className="text-[1rem] font-semibold leading-line">{s.title}</h4>
            <p className="mt-1 max-w-[62ch] text-[0.9375rem] leading-line sm:mt-0">{s.detail}</p>
          </li>
        ))}
      </ol>

      <SubHead>Integrations</SubHead>
      <table className="mt-line w-full border-collapse text-left">
        <thead>
          <tr className="t-data border-b border-rule-strong text-[11px] uppercase tracking-[0.08em] text-ink-muted">
            <th scope="col" className="py-2 pr-4 font-medium">System</th>
            <th scope="col" className="py-2 pr-4 font-medium">Access</th>
            <th scope="col" className="hidden py-2 font-medium sm:table-cell">What flows</th>
          </tr>
        </thead>
        <tbody>
          {integrations.map((i) => (
            <tr key={i.id} className="border-b border-rule align-top">
              <th scope="row" className="py-2 pr-4 text-[0.9375rem] font-semibold leading-line">{i.name}</th>
              <td className="t-data py-2 pr-4 text-[0.75rem] leading-line uppercase tracking-[0.06em] text-ink-muted">{i.access}</td>
              <td className="hidden max-w-[60ch] py-2 text-[0.9375rem] leading-line sm:table-cell">{i.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SubHead>The tools - before and after</SubHead>
      <p className="mt-line max-w-[62ch] text-[0.9375rem] leading-line text-ink-muted">
        Each tool is listed as the manual job it replaced, what runs instead, and the guardrail that makes the write safe.
      </p>
      {GROUP_ORDER.map((g) => {
        const rows = tools.filter((t) => t.group === g);
        if (!rows.length) return null;
        return (
          <div key={g} className="mt-[calc(var(--line)*1.5)]">
            <h4 className="t-data border-b border-rule-strong pb-1 text-[11px] uppercase tracking-[0.08em] text-ink-muted">{GROUP_LABEL[g]}</h4>
            <ul className="divide-y divide-rule">
              {rows.map((t) => (
                <li key={t.id} className="grid gap-x-6 gap-y-1 py-line md:grid-cols-[12rem_1fr_1fr_1fr]">
                  <h5 className="text-[1rem] font-semibold leading-line">{t.name}</h5>
                  <p className="text-[0.9375rem] leading-line">
                    <span className="t-data mr-2 text-[10.5px] uppercase tracking-[0.08em] text-ink-muted">before</span>
                    {t.replaces}
                  </p>
                  <p className="text-[0.9375rem] leading-line">
                    <span className="t-data mr-2 text-[10.5px] uppercase tracking-[0.08em] text-ink-muted">after</span>
                    {t.mechanism}
                  </p>
                  <p className="text-[0.9375rem] leading-line text-ink-muted">
                    <span className="t-data mr-2 text-[10.5px] uppercase tracking-[0.08em]">guardrail</span>
                    {t.guardrail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </Section>
  );
}
