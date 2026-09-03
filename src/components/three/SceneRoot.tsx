"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useStore, type RenderTier } from "@/lib/store";
import { detectTier } from "./capability";
import { Poster } from "./Poster";

const SCENE_LABEL = "Decorative animated 3D scene behind the page content.";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <Poster label={SCENE_LABEL} />,
});

/** Chooses the render tier on the client and mounts either the WebGL scene or its poster. */
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
