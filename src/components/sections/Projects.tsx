import { caseStudies } from "@content/case-studies";
import { Section } from "./Section";

export function Projects() {
  const others = caseStudies.filter((c) => c.kind !== "flagship");
  return (
    <Section id="projects" title="More work">
      <ul>
        {others.map((c) => (
          <li key={c.id}>
            <h3>{c.title}</h3>
            <p>
              {c.org} - {c.period}
            </p>
            <p>{c.problem}</p>
            <p>{c.approach}</p>
            <p>{c.outcome}</p>
            <p>{c.stack.join(", ")}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
