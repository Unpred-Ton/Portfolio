import { timeline } from "@content/timeline";
import { caseStudyById } from "@content/case-studies";
import { Section } from "./Section";

export function Arc() {
  return (
    <Section id="arc" title="The arc">
      <ol>
        {timeline.map((t) => (
          <li key={t.id}>
            <h3>
              {t.role} - {t.org}
            </h3>
            <p>
              {t.start} - {t.end ?? "present"} - {t.location}
            </p>
            <p>{t.summary}</p>
            <ul>
              {t.caseStudyIds.map((id) => {
                const cs = caseStudyById(id);
                return cs ? <li key={id}>{cs.title}</li> : null;
              })}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
