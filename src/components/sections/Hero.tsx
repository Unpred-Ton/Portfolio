import { profile } from "@content/profile";
import { site } from "@content/site";
import { PrintReveal } from "@/components/motion/PrintReveal";
import { BannerName } from "@/components/ui/BannerName";
import { ButtonLink } from "@/components/ui/Button";
import { ColumnRuler } from "@/components/ui/ColumnRuler";
import { Section } from "./Section";

const [first, last] = profile.name.split(" ");

export function Hero() {
  return (
    <Section id="hero" className="flex min-h-screen flex-col justify-between pt-[calc(15vh+var(--line)*2.5)] pb-line">
      <PrintReveal onScroll={false} rowDuration={0.11}>
        <p className="print-row t-data text-xs leading-line text-ink-muted">
          **** JOB 0001 **** BANNER PAGE **** {new Date().getFullYear()} **** PRINTED FOR: WHOEVER IS HIRING
        </p>
        <h1 className="mt-line">
          <span className="sr-only">{profile.name}</span>
          <BannerName word={first} className="w-full max-w-[52rem]" />
          <BannerName word={last} className="mt-[0.5em] w-full max-w-[59rem]" />
        </h1>
        <p className="print-row t-data mt-[calc(var(--line)*2)] text-xs leading-line uppercase tracking-[0.06em] text-ink-muted sm:text-sm">
          {profile.headline}
        </p>
        <p className="print-row mt-line max-w-[36rem] text-[1.375rem] leading-[calc(var(--line)*1.25)] font-medium sm:text-[1.75rem] sm:leading-[calc(var(--line)*1.5)]">
          {profile.oneLiner}
        </p>
        <div className="print-row mt-[calc(var(--line)*1.5)] flex flex-wrap items-center gap-3">
          <ButtonLink href={site.cvPath} variant="ribbon" icon="download" download>
            Tear off the CV
          </ButtonLink>
          <ButtonLink href="#arc" icon="arrow-right">
            Read the report
          </ButtonLink>
        </div>
      </PrintReveal>
      <div className="mt-[calc(var(--line)*3)]">
        <ColumnRuler />
      </div>
    </Section>
  );
}
