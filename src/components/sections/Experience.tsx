import { timeline } from "@content/timeline";
import type { Era } from "@content/types";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmt(iso?: string): string {
  if (!iso) return "Present";
  const [y, m] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

const eraLabel: Record<Era, string> = { vba: "Excel VBA", "apps-script": "Apps Script", "full-stack": "Full-stack" };
const eraDot: Record<Era, string> = {
  vba: "bg-surface ring-line-2",
  "apps-script": "bg-ink ring-ink",
  "full-stack": "bg-accent ring-accent",
};

export function Experience() {
  return (
    <Section
      id="experience"
      index="02 / Experience"
      heading="Nine years, one direction"
      lead="Every role automated the repetitive work of the last one. Spreadsheets taught the discipline, scripts scaled it, and the platform is where it all runs now."
    >
      <Reveal stagger as="ol" className="relative ml-1.5 border-l border-line">
        {timeline.map((t, i) => {
          const current = !t.end;
          return (
            <li key={t.id} className="relative pb-12 pl-8 last:pb-0 sm:pl-10">
              <span
                aria-hidden="true"
                className={`absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full ring-2 ${eraDot[t.era]}`}
              >
                {current ? (
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
                ) : null}
              </span>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="t-data text-[0.8125rem] font-medium text-ink-muted">
                  {fmt(t.start)} - {fmt(t.end)}
                </p>
                <span className="t-data rounded-full bg-surface-2 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-ink-2">
                  {eraLabel[t.era]}
                </span>
              </div>

              <h3 className="mt-2 text-xl font-bold tracking-[-0.02em] text-ink sm:text-[1.375rem]">
                {t.role}
              </h3>
              <p className="mt-0.5 text-[0.9375rem] text-ink-2">
                {t.org} <span className="text-ink-muted">- {t.location}</span>
              </p>
              <p className="mt-3 max-w-[68ch] leading-relaxed text-ink-2">{t.summary}</p>

              {i === 0 ? (
                <a href="#flagship" className="link-underline mt-3 inline-block text-[0.9375rem] font-semibold text-accent">
                  Read the flagship case study
                </a>
              ) : null}
            </li>
          );
        })}
      </Reveal>
    </Section>
  );
}
