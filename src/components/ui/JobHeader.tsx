interface JobHeaderProps {
  id: string;
  title: string;
  job: number;
  page: number;
  pages: number;
}

const pad = (n: number) => n.toString().padStart(4, "0");

/**
 * A fan-fold page break followed by the job's header line, exactly as a line printer prints one:
 * the section title is the heading; job and page counters sit on the same line at the right.
 */
export function JobHeader({ id, title, job, page, pages }: JobHeaderProps) {
  return (
    <header className="pt-[calc(var(--line)*2)]">
      <div className="perforation" aria-hidden="true" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 pt-line">
        <h2 id={`${id}-title`} className="t-banner text-[1.75rem] leading-[calc(var(--line)*2)] sm:text-[2.25rem] uppercase">
          {title}
        </h2>
        <p className="t-data text-xs leading-line text-ink-muted">
          JOB {pad(job)} <span aria-hidden="true">····</span> PAGE {pad(page)} OF {pad(pages)}
        </p>
      </div>
    </header>
  );
}
