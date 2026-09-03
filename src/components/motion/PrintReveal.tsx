"use client";

import { useRef } from "react";
import { useStore } from "@/lib/store";
import { gsap, useGSAP, NO_PREFERENCE, REDUCED } from "./gsap";

interface PrintRevealProps {
  children: React.ReactNode;
  /** Seconds per printed row. */
  rowDuration?: number;
  /** Start printing only when scrolled into view (default true). The hero passes false to print on load. */
  onScroll?: boolean;
  className?: string;
}

/**
 * The world's native motion: rows print left to right as a print head passes.
 * Every direct descendant with the class `print-row` is one printed line.
 * Default (no JS, reduced motion) is the fully printed page.
 */
export function PrintReveal({ children, rowDuration = 0.14, onScroll = true, className }: PrintRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  /** A page prints once. If the media context re-evaluates (resize), the printed rows stay printed. */
  const printed = useRef(false);

  useGSAP(
    () => {
      const root = ref.current;
      const head = headRef.current;
      if (!root || !head) return;
      const rows = Array.from(root.querySelectorAll<HTMLElement>(".print-row"));
      if (rows.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => {
        if (useStore.getState().reducedMotion || printed.current) {
          gsap.set(rows, { clipPath: "inset(0 0 0 0)" });
          gsap.set(head, { autoAlpha: 0 });
          return;
        }
        gsap.set(rows, { clipPath: "inset(0 100% 0 0)" });
        gsap.set(head, { autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: onScroll ? { trigger: root, start: "top 80%", once: true } : undefined,
        });
        rows.forEach((row, i) => {
          const y = row.offsetTop;
          const h = row.offsetHeight;
          tl.set(head, { y, height: h, autoAlpha: 1 }, i === 0 ? 0 : ">");
          tl.to(row, { clipPath: "inset(0 0% 0 0)", duration: rowDuration }, "<");
        });
        tl.to(head, { autoAlpha: 0, duration: 0.15, ease: "power1.out" });
        tl.eventCallback("onComplete", () => {
          printed.current = true;
        });
      });

      mm.add(REDUCED, () => {
        gsap.set(rows, { clipPath: "inset(0 0 0 0)" });
        gsap.set(head, { autoAlpha: 0 });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {children}
      {/* The print head: a carriage bar riding the current row. */}
      <div
        ref={headRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-0 opacity-0"
        style={{ height: "var(--line)" }}
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-ink/40" />
        <div className="absolute right-[-0.5rem] top-1/2 h-[0.9em] w-[0.35rem] -translate-y-1/2 bg-ink" />
      </div>
    </div>
  );
}
