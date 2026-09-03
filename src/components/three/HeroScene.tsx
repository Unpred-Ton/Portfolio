"use client";

import type { RenderTier } from "@/lib/store";

/** Placeholder until the chosen visual world is built. */
export function HeroScene({ tier }: { tier: Exclude<RenderTier, "poster"> }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} castShadow={tier === "full"} />
      <mesh rotation={[0.4, 0.6, 0]}>
        <boxGeometry args={[2, 1.2, 0.05]} />
        <meshStandardMaterial color="#e8dcc0" />
      </mesh>
    </>
  );
}
