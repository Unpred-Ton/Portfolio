"use client";

import { useRef } from "react";
import { useSectionProgress } from "@/components/motion/useSectionProgress";

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/** Semantic section wrapper that publishes its scroll progress to the 3D scene. */
export function Section({ id, title, children, className }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  useSectionProgress(ref, id);
  return (
    <section ref={ref} id={id} aria-labelledby={title ? `${id}-title` : undefined} className={className}>
      {title ? <h2 id={`${id}-title`}>{title}</h2> : null}
      {children}
    </section>
  );
}
