import { site } from "@content/site";

export function Footer() {
  return (
    <footer className="border-t border-rule-strong py-line">
      <p className="t-data flex flex-wrap justify-between gap-x-6 text-[11px] leading-line text-ink-muted">
        <span>**** END OF JOB **** {site.name.toUpperCase()} **** {new Date().getFullYear()}</span>
        <span>NEXT.JS · REACT THREE FIBER · GSAP · CODE MIT, CONTENT MINE</span>
      </p>
    </footer>
  );
}
