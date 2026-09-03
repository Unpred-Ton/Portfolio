import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

type Bg = "bg" | "surface" | "surface-2";

const bgClass: Record<Bg, string> = {
  bg: "bg-bg",
  surface: "bg-surface",
  "surface-2": "bg-surface-2",
};

interface SectionProps {
  id: string;
  heading?: string;
  lead?: React.ReactNode;
  index?: string;
  bg?: Bg;
  className?: string;
  children: React.ReactNode;
}

/**
 * Section shell: an anchored, labelled region with a consistent header. No decorative
 * eyebrow - the heading carries its own weight; the index is a real wayfinding number.
 */
export function Section({ id, heading, lead, index, bg = "bg", className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={heading ? `${id}-h` : undefined}
      className={cn("scroll-mt-20 py-20 sm:py-28 lg:py-32", bgClass[bg], className)}
    >
      <Container>
        {heading ? (
          <Reveal className="mb-12 sm:mb-16">
            <div className="flex items-end justify-between gap-6 border-b border-line-2 pb-5">
              <h2
                id={`${id}-h`}
                className="max-w-[18ch] text-[clamp(2rem,4.6vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink"
              >
                {heading}
              </h2>
              {index ? <span className="tag shrink-0 pb-1.5 text-ink-muted">{index}</span> : null}
            </div>
            {lead ? <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-2">{lead}</p> : null}
          </Reveal>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
