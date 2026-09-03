import type { CaseStudy } from "@content/types";

/** A labelled report line: an 8-character label column in the printer's voice, then the text. */
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-x-4 border-t border-rule py-[calc(var(--line)*0.5)] first:border-t-0 sm:grid-cols-[8rem_1fr]">
      <dt className="t-data pt-[0.2rem] text-[11px] leading-line uppercase tracking-[0.08em] text-ink-muted">{label}</dt>
      <dd className="max-w-[68ch] text-[0.9375rem] leading-line">{children}</dd>
    </div>
  );
}

export function EraTag({ era }: { era: CaseStudy["era"] }) {
  const label = era === "vba" ? "VBA" : era === "apps-script" ? "APPS SCRIPT" : "FULL-STACK";
  return <span className="t-data text-[11px] tracking-[0.08em] text-ink-muted">[{label}]</span>;
}

/** One case study printed as a report block. */
export function CaseStudyBlock({ cs, index }: { cs: CaseStudy; index: number }) {
  return (
    <article id={`cs-${cs.id}`} className="scroll-mt-[12vh] border-t border-rule-strong pt-line" aria-labelledby={`cs-${cs.id}-title`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6">
        <h3 id={`cs-${cs.id}-title`} className="text-[1.375rem] font-semibold leading-[calc(var(--line)*1.25)] sm:text-[1.5rem]">
          {cs.title}
        </h3>
        <p className="t-data text-[11px] leading-line text-ink-muted">
          ATT {String(index + 1).padStart(2, "0")} <span aria-hidden="true">··</span> {cs.org.toUpperCase()} <span aria-hidden="true">··</span> {cs.period.toUpperCase()}
        </p>
      </div>
      <dl className="mt-line">
        <Field label="Problem">{cs.problem}</Field>
        <Field label="Approach">{cs.approach}</Field>
        <Field label="Outcome">{cs.outcome}</Field>
        <Field label="Stack">
          <span className="t-data text-[0.8125rem] leading-line">{cs.stack.join("  ·  ")}</span>
        </Field>
        {cs.metrics?.length ? (
          <Field label="Figures">
            <span className="t-data text-[0.8125rem] leading-line">
              {cs.metrics.map((m) => `${m.value} ${m.label}`).join("  ·  ")}
            </span>
          </Field>
        ) : null}
        {cs.confidentiality === "described-only" ? (
          <Field label="Note">
            <span className="text-ink-muted">Employer work, described only. No source, screenshots or live links.</span>
          </Field>
        ) : null}
      </dl>
    </article>
  );
}
