import { skillGroups } from "@content/skills";
import { JobHeader } from "@/components/ui/JobHeader";
import { Section } from "./Section";

const LEVEL = { expert: 3, proficient: 2, working: 1 } as const;
const LEVEL_TEXT = { expert: "expert", proficient: "proficient", working: "working" } as const;

export function Skills() {
  return (
    <Section id="skills">
      <JobHeader id="skills" title="Inventory" job={5} page={5} pages={7} />
      <p className="mt-line max-w-[62ch] text-[1.125rem] leading-[calc(var(--line)*1.25)]">
        Skills on hand, grouped the way the work groups them. The bar is a level, not a percentage.
      </p>
      <div className="mt-[calc(var(--line)*2)] grid gap-x-10 gap-y-[calc(var(--line)*1.5)] md:grid-cols-2">
        {skillGroups.map((g) => (
          <div key={g.id}>
            <h3 className="t-data border-b border-rule-strong pb-1 text-[11px] uppercase tracking-[0.08em] text-ink-muted">
              {g.label}
            </h3>
            <ul>
              {g.skills.map((s) => (
                <li key={s.name} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-rule py-[0.45rem]">
                  <span className="text-[0.9375rem] leading-line">{s.name}</span>
                  <span className="t-data text-[0.75rem] leading-line text-ink-muted" aria-label={LEVEL_TEXT[s.level]}>
                    <span aria-hidden="true" className="mr-2 inline-flex gap-[3px] align-middle">
                      {[1, 2, 3].map((n) => (
                        <i key={n} className={`inline-block h-[9px] w-[9px] ${n <= LEVEL[s.level] ? "bg-ink" : "border border-rule-strong"}`} />
                      ))}
                    </span>
                    {s.since ? <span aria-hidden="true">{s.since}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
