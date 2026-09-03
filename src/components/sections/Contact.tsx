import { site } from "@content/site";
import { profile } from "@content/profile";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const links = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: "mail" as const, external: false },
  { label: "LinkedIn", value: "in/johnson-bolhayon", href: site.linkedin, icon: "linkedin" as const, external: true },
  { label: "GitHub", value: "github.com/Unpred-Ton", href: site.github, icon: "github" as const, external: true },
];

export function Contact() {
  return (
    <Section id="contact" index="05 / Contact" bg="surface">
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_0.85fr]">
        <Reveal>
          <h2 id="contact-h" className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
            If your team has repetitive data work, I would like to make it disappear.
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-2">{profile.availability}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${site.email}`} iconLeft="mail">
              Get in touch
            </ButtonLink>
            <ButtonLink href={site.cvPath} download variant="outline" iconLeft="download">
              Download CV
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal stagger className="flex flex-col justify-end">
          <ul className="divide-y divide-line border-y border-line">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-ink-2 transition-colors group-hover:bg-accent-soft group-hover:text-accent">
                      <Icon name={l.icon} size={17} />
                    </span>
                    <span>
                      <span className="tag block">{l.label}</span>
                      <span className="font-medium text-ink group-hover:text-accent">{l.value}</span>
                    </span>
                  </span>
                  <Icon name="arrow-up-right" size={18} className="text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </li>
            ))}
            <li className="flex items-center gap-3 py-4">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-ink-2">
                <Icon name="location" size={17} />
              </span>
              <span>
                <span className="tag block">Based in</span>
                <span className="font-medium text-ink">{site.location}</span>
              </span>
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
