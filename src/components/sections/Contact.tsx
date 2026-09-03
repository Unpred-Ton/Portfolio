import { site } from "@content/site";
import { profile } from "@content/profile";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JobHeader } from "@/components/ui/JobHeader";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" className="pb-[calc(var(--line)*3)]">
      <JobHeader id="contact" title="End of report" job={7} page={7} pages={7} />
      <div className="mt-[calc(var(--line)*2)] grid gap-x-12 gap-y-line lg:grid-cols-[1fr_22rem]">
        <div>
          <p className="max-w-[30ch] text-[1.75rem] font-medium leading-[calc(var(--line)*1.5)] sm:text-[2.25rem] sm:leading-[calc(var(--line)*2)]">
            If your team has repetitive data work, I would like to make it disappear.
          </p>
          <p className="mt-line max-w-[56ch] text-[1rem] leading-line text-ink-muted">{profile.availability}</p>
          <div className="mt-[calc(var(--line)*1.5)] flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${site.email}`} variant="ribbon" icon="mail">
              Email me
            </ButtonLink>
            <ButtonLink href={site.cvPath} icon="download" download>
              Tear off the CV
            </ButtonLink>
          </div>
        </div>
        <dl className="t-data self-end text-[0.8125rem] leading-line">
          <div className="grid grid-cols-[6rem_1fr] border-t border-rule py-2">
            <dt className="text-ink-muted">EMAIL</dt>
            <dd>
              <a href={`mailto:${site.email}`} className="underline decoration-rule-strong hover:decoration-ink">
                {site.email}
              </a>
            </dd>
          </div>
          <div className="grid grid-cols-[6rem_1fr] border-t border-rule py-2">
            <dt className="text-ink-muted">LINKEDIN</dt>
            <dd>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline decoration-rule-strong hover:decoration-ink">
                johnson-bolhayon <Icon name="external" size={12} />
              </a>
            </dd>
          </div>
          <div className="grid grid-cols-[6rem_1fr] border-t border-rule py-2">
            <dt className="text-ink-muted">GITHUB</dt>
            <dd>
              <a href={site.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline decoration-rule-strong hover:decoration-ink">
                {site.github.replace("https://github.com/", "")} <Icon name="external" size={12} />
              </a>
            </dd>
          </div>
          <div className="grid grid-cols-[6rem_1fr] border-y border-rule py-2">
            <dt className="text-ink-muted">LOCATION</dt>
            <dd>{site.location}</dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
