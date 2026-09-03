import { timeline } from "@content/timeline";
import { caseStudyById } from "@content/case-studies";
import { PrintReveal } from "@/components/motion/PrintReveal";
import { JobHeader } from "@/components/ui/JobHeader";
import { EraTag } from "@/components/ui/Report";
import { Section } from "./Section";

const fmt = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return `${["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][m - 1]} ${y}`;
};

export function Arc() {
  return (
    <Section id="arc">
      <JobHeader id="arc" title="The arc" job={2} page={2} pages={7} />
      <p className="mt-line max-w-[62ch] text-[1.125rem] leading-[calc(var(--line)*1.25)]">
        Nine years, one direction: every job automated the previous one&apos;s repetitive work. Spreadsheets taught the
        discipline, scripts scaled it, and the platform is where it all runs now.
      </p>

      <PrintReveal className="mt-[calc(var(--line)*2)]" rowDuration={0.18}>
        <div className="print-row t-data grid grid-cols-[7rem_1fr] gap-x-4 border-b border-rule-strong pb-2 text-[11px] uppercase tracking-[0.08em] text-ink-muted sm:grid-cols-[9rem_1fr_9rem]">
          <span>Period</span>
          <span>Role and employer</span>
          <span className="hidden sm:block">Era</span>
        </div>
        <ol>
          {timeline.map((t) => (
            <li key={t.id} className="print-row grid grid-cols-[7rem_1fr] gap-x-4 border-b border-rule py-line sm:grid-cols-[9rem_1fr_9rem]">
              <p className="t-data text-[0.8125rem] leading-line text-ink-muted">
                {fmt(t.start)}
                <br />
                {t.end ? fmt(t.end) : "PRESENT"}
              </p>
              <div>
                <h3 className="text-[1.0625rem] font-semibold leading-line">
                  {t.role} <span className="font-normal text-ink-muted">at {t.org}</span>
                </h3>
                <p className="t-data text-[11px] leading-line text-ink-muted">{t.location.toUpperCase()}</p>
                <p className="mt-2 max-w-[68ch] text-[0.9375rem] leading-line">{t.summary}</p>
                {t.caseStudyIds.length ? (
                  <p className="t-data mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem] leading-line">
                    {t.caseStudyIds.map((id) => {
                      const cs = caseStudyById(id);
                      if (!cs) return null;
                      const href = cs.kind === "flagship" ? "#flagship" : `#cs-${cs.id}`;
                      return (
                        <a key={id} href={href} className="text-ink underline decoration-rule-strong hover:decoration-ink">
                          ATT: {cs.title}
                        </a>
                      );
                    })}
                  </p>
                ) : null}
              </div>
              <p className="hidden sm:block">
                <EraTag era={t.era} />
              </p>
            </li>
          ))}
        </ol>
      </PrintReveal>
    </Section>
  );
}
