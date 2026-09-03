import { skillGroups } from "@content/skills";
import { principles } from "@content/principles";
import type { SkillLevel } from "@content/types";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";

const levelDot: Record<SkillLevel, string> = {
  expert: "bg-accent",
  proficient: "bg-ink-2",
  working: "border border-line-2 bg-transparent",
};

export function Skills() {
  return (
    <Section
      id="skills"
      index="04 / Skills"
      heading="What I bring"
      lead="Depth in spreadsheets and data pipelines, extended in the last two years into full-stack (AI-assisted) web, cloud and API integration."
    >
      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        {(["expert", "proficient", "working"] as SkillLevel[]).map((lv) => (
          <span key={lv} className="flex items-center gap-2 text-[0.8125rem] capitalize text-ink-muted">
            <span className={`h-2.5 w-2.5 rounded-full ${levelDot[lv]}`} />
            {lv}
          </span>
        ))}
      </div>

      <Reveal stagger className="border-t border-line">
        {skillGroups.map((g) => (
          <div key={g.id} className="grid gap-3 border-b border-line py-6 sm:grid-cols-[11rem_1fr]">
            <p className="tag pt-1.5">{g.label}</p>
            <ul className="flex flex-wrap gap-2">
              {g.skills.map((s) => (
                <li
                  key={s.name}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.9375rem] text-ink"
                >
                  <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${levelDot[s.level]}`} />
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>

      {/* How I work */}
      <div className="mt-20">
        <Reveal className="mb-8">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">How I work</h3>
        </Reveal>
        <Reveal stagger className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.id} className="border-t border-line pt-5">
              <h4 className="font-bold tracking-[-0.01em] text-ink">{p.title}</h4>
              <p className="mt-2 leading-relaxed text-ink-2">{p.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
