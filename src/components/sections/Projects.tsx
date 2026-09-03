import { caseStudies } from "@content/case-studies";
import { JobHeader } from "@/components/ui/JobHeader";
import { CaseStudyBlock } from "@/components/ui/Report";
import { Section } from "./Section";

export function Projects() {
  const others = caseStudies.filter((c) => c.kind !== "flagship");
  return (
    <Section id="projects">
      <JobHeader id="projects" title="Attachments" job={4} page={4} pages={7} />
      <p className="mt-line max-w-[62ch] text-[1.125rem] leading-[calc(var(--line)*1.25)]">
        The work before and beside the platform, oldest at the bottom. All of it employer work, so it is described
        rather than shown.
      </p>
      <div className="mt-[calc(var(--line)*2)] space-y-[calc(var(--line)*2)]">
        {others.map((c, i) => (
          <CaseStudyBlock key={c.id} cs={c} index={i} />
        ))}
      </div>
    </Section>
  );
}
