import { principles } from "@content/principles";
import { JobHeader } from "@/components/ui/JobHeader";
import { Section } from "./Section";

export function HowIWork() {
  return (
    <Section id="how">
      <JobHeader id="how" title="Operating notes" job={6} page={6} pages={7} />
      <ol className="mt-[calc(var(--line)*2)] divide-y divide-rule border-y border-rule-strong">
        {principles.map((p, i) => (
          <li key={p.id} className="grid gap-x-6 py-line sm:grid-cols-[4rem_16rem_1fr]">
            <span className="t-data text-[0.8125rem] leading-line text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-[1.0625rem] font-semibold leading-line">{p.title}</h3>
            <p className="mt-1 max-w-[62ch] text-[0.9375rem] leading-line sm:mt-0">{p.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
