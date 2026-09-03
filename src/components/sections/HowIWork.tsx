import { principles } from "@content/principles";
import { Section } from "./Section";

export function HowIWork() {
  return (
    <Section id="how" title="How I work">
      <ul>
        {principles.map((p) => (
          <li key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
