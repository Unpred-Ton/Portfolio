import { caseStudies } from "@content/case-studies";
import type { CaseStudy } from "@content/types";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";

const eraLabel: Record<CaseStudy["era"], string> = {
  vba: "Excel VBA",
  "apps-script": "Apps Script",
  "full-stack": "Full-stack",
};

function Card({ cs }: { cs: CaseStudy }) {
  return (
    <details className="group rounded-[var(--radius-card)] border border-line bg-surface transition-colors duration-200 open:border-line-2 hover:border-line-2">
      <summary className="flex cursor-pointer list-none items-start gap-4 p-6 [&::-webkit-details-marker]:hidden sm:p-7">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="t-data rounded-full bg-surface-2 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-ink-2">
              {eraLabel[cs.era]}
            </span>
            <span className="tag text-ink-muted">
              {cs.org} / {cs.period}
            </span>
          </div>
          <h3 className="mt-2.5 text-xl font-bold tracking-[-0.02em] text-ink sm:text-[1.375rem]">{cs.title}</h3>
          <p className="mt-2 max-w-[70ch] leading-relaxed text-ink-2">{cs.problem}</p>
        </div>
        <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition-transform duration-300 group-open:rotate-180">
          <Icon name="chevron-down" size={18} />
        </span>
      </summary>

      <div className="border-t border-line px-6 pb-7 pt-6 sm:px-7">
        <div className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
          <div>
            <p className="tag mb-2">Approach</p>
            <p className="leading-relaxed text-ink-2">{cs.approach}</p>
          </div>
          <div>
            <p className="tag mb-2">Outcome</p>
            <p className="leading-relaxed text-ink-2">{cs.outcome}</p>
          </div>
        </div>

        {cs.metrics?.length ? (
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {cs.metrics.map((m) => (
              <div key={m.label}>
                <span className="t-data text-lg font-bold text-accent">{m.value}</span>{" "}
                <span className="text-sm text-ink-muted">{m.label}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          {cs.stack.map((s) => (
            <span key={s} className="t-data rounded-md border border-line bg-surface-2 px-2 py-1 text-[0.75rem] text-ink-2">
              {s}
            </span>
          ))}
        </div>

        <p className="mt-5 tag text-ink-muted">Employer project - described here, not linked or screenshotted.</p>
      </div>
    </details>
  );
}

export function Projects() {
  const others = caseStudies.filter((c) => c.kind !== "flagship");
  return (
    <Section
      id="projects"
      index="03 / Projects"
      bg="surface-2"
      heading="Selected work"
      lead="The systems behind the platform, and the years of scripting and data work that led to it. Open any card for the detail."
    >
      <Reveal stagger className="flex flex-col gap-4">
        {others.map((cs) => (
          <Card key={cs.id} cs={cs} />
        ))}
      </Reveal>
    </Section>
  );
}
