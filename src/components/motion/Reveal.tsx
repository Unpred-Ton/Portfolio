"use client";

import { useRef } from "react";
import { useStore } from "@/lib/store";
import { gsap, useGSAP, NO_PREFERENCE } from "./gsap";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animate direct children in a capped stagger instead of the element itself. */
  stagger?: boolean;
  delay?: number;
  y?: number;
  as?: "div" | "ul" | "ol" | "section" | "header";
}

/**
 * Fade-and-rise on scroll enter. Content is visible by default (SSR / no-JS safe);
 * GSAP animates from a lower, transparent start. Reduced motion: no movement.
 */
export function Reveal({ children, className, stagger = false, delay = 0, y = 20, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.matchMedia().add(NO_PREFERENCE, () => {
        if (useStore.getState().reducedMotion) return;
        const targets = stagger ? Array.from(el.children) : el;
        gsap.from(targets, {
          autoAlpha: 0,
          y,
          duration: 0.7,
          delay,
          ease: "expo.out",
          stagger: stagger ? { each: 0.08, from: "start" } : 0,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );
  const Tag = as as "div";
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}
