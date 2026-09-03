import { site } from "@content/site";
import { profile } from "@content/profile";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p>{profile.availability}</p>
      <ul>
        <li>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href={site.cvPath} download>
            Download CV (PDF)
          </a>
        </li>
      </ul>
      <p>{site.location}</p>
    </Section>
  );
}
