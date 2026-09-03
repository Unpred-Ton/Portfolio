import { profile } from "@content/profile";
import { site } from "@content/site";
import { Section } from "./Section";

export function Hero() {
  return (
    <Section id="hero" className="min-h-screen">
      <h1>{profile.name}</h1>
      <p>{profile.headline}</p>
      <p>{profile.oneLiner}</p>
      <a href={site.cvPath} download>
        Download CV
      </a>
    </Section>
  );
}
