"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { REDUCED } from "./gsap";

/** Mirrors the reduced-motion media query (and a dev-only ?motion=reduce override) into the store. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const setReducedMotion = useStore((s) => s.setReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED);
    const devOverride =
      process.env.NODE_ENV !== "production" && new URLSearchParams(window.location.search).get("motion") === "reduce";
    const apply = () => setReducedMotion(devOverride || mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [setReducedMotion]);

  return <>{children}</>;
}
