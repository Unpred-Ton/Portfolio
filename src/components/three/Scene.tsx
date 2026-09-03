"use client";

import { Canvas, invalidate } from "@react-three/fiber";
import { useEffect } from "react";
import { useStore, type RenderTier } from "@/lib/store";
import { PrinterScene } from "./PrinterScene";

function RegisterInvalidate() {
  const register = useStore((s) => s.registerInvalidate);
  useEffect(() => {
    register(invalidate);
    const onScroll = () => invalidate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      register(() => {});
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [register]);
  return null;
}

export const SCENE_LABEL =
  "A line printer across the top of the page; the page below is the continuous-form paper feeding out of it.";

export default function Scene({ tier }: { tier: Exclude<RenderTier, "poster"> }) {
  const reducedMotion = useStore((s) => s.reducedMotion);
  return (
    <div className="pointer-events-none fixed inset-0 z-30" role="img" aria-label={SCENE_LABEL}>
      <Canvas
        frameloop={reducedMotion ? "never" : "demand"}
        dpr={tier === "full" ? [1, 1.5] : 1}
        gl={{ antialias: tier === "full", powerPreference: "high-performance", alpha: true }}
        camera={{ position: [0, 0, 8], fov: 40 }}
        aria-hidden="true"
      >
        <RegisterInvalidate />
        <PrinterScene tier={tier} />
      </Canvas>
    </div>
  );
}
