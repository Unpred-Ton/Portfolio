import { skillGroups } from "@content/skills";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      {skillGroups.map((g) => (
        <div key={g.id}>
          <h3>{g.label}</h3>
          <ul>
            {g.skills.map((s) => (
              <li key={s.name}>
                {s.name} - {s.level}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  );
}
