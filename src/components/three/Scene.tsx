"use client";

import { Canvas } from "@react-three/fiber";
import { useStore, type RenderTier } from "@/lib/store";
import { NodeField } from "./NodeField";

export const SCENE_LABEL = "A slowly drifting 3D mesh of connected nodes - the platform's web of integrations.";

/** Hero-contained WebGL layer. Fills its (relative) parent; never a full-page overlay. */
export default function Scene({ tier }: { tier: Exclude<RenderTier, "poster"> }) {
  const reducedMotion = useStore((s) => s.reducedMotion);
  return (
    <div className="absolute inset-0" role="img" aria-label={SCENE_LABEL}>
      <Canvas
        frameloop={reducedMotion ? "never" : "always"}
        dpr={tier === "full" ? [1, 1.75] : 1}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8], fov: 40 }}
        aria-hidden="true"
      >
        <NodeField tier={tier} animate={!reducedMotion} />
      </Canvas>
    </div>
  );
}
