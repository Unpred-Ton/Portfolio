"use client";

import type { RefObject } from "react";
import { useStore } from "@/lib/store";
import { ScrollTrigger, useGSAP } from "./gsap";

/**
 * Publishes a section's 0..1 scroll progress (top enters bottom of viewport -> bottom leaves top)
 * into the store, and asks the 3D scene to render a frame while it changes.
 */
export function useSectionProgress(ref: RefObject<HTMLElement | null>, id: string) {
  useGSAP(
    () => {
      if (!ref.current) return;
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (st) => {
          const { setProgress, invalidate } = useStore.getState();
          setProgress(id, st.progress);
          invalidate();
        },
      });
    },
    { scope: ref },
  );
}
