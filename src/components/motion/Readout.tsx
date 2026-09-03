"use client";

import { useRef } from "react";
import { useStore } from "@/lib/store";
import { gsap, useGSAP, NO_PREFERENCE } from "./gsap";

/**
 * A printed figure that counts into place when it enters the viewport.
 * Non-numeric prefixes/suffixes (~, +, k, yrs) are kept; only the digits move.
 */
export function Readout({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = /^([^0-9]*)([0-9][0-9,.]*)(.*)$/.exec(value);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !match) return;
      const [, prefix, num, suffix] = match;
      const target = Number(num.replace(/,/g, ""));
      const decimals = (num.split(".")[1] ?? "").length;
      const mm = gsap.matchMedia();
      mm.add(NO_PREFERENCE, () => {
        if (useStore.getState().reducedMotion) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = `${prefix}${obj.v.toLocaleString("en", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
          },
          onComplete: () => {
            el.textContent = value;
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
