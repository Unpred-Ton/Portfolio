"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useStore, type RenderTier } from "@/lib/store";
import { detectTier } from "./capability";
import { Poster } from "./Poster";

const SCENE_LABEL = "A slowly drifting 3D mesh of connected nodes - the platform's web of integrations.";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <Poster label={SCENE_LABEL} />,
});

/** Picks a render tier on the client; mounts the WebGL mesh or its flat poster. Hero-contained. */
export function SceneRoot() {
  const [tier, setTierLocal] = useState<RenderTier | null>(null);
  const setTier = useStore((s) => s.setTier);

  useEffect(() => {
    const t = detectTier();
    setTier(t);
    setTierLocal(t);
  }, [setTier]);

  if (tier === null || tier === "poster") return <Poster label={SCENE_LABEL} />;
  return <Scene tier={tier} />;
}
