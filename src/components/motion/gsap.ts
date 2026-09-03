import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/** Duration tiers in seconds: feedback, routine state change, layout/overlay, authored focal entrance. */
export const DUR = { feedback: 0.12, state: 0.22, view: 0.4, focal: 0.7 } as const;

/** Confident deceleration - cubic-bezier(0.16, 1, 0.3, 1). */
export const EASE = "expo.out";

export const REDUCED = "(prefers-reduced-motion: reduce)";
export const NO_PREFERENCE = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
