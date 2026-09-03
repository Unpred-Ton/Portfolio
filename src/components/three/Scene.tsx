"use client";

import { Canvas, invalidate, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useStore, type RenderTier } from "@/lib/store";
import { PHASES } from "./phases";
import { HeroScene } from "./HeroScene";

function currentPhase(progress: Record<string, number>) {
  // The section closest to the middle of its own pass (progress ~0.5) leads.
  let best = "hero";
  let score = Infinity;
  for (const [id, p] of Object.entries(progress)) {
    if (!(id in PHASES)) continue;
    const d = Math.abs(p - 0.5);
    if (d < score) {
      score = d;
      best = id;
    }
  }
  return PHASES[best] ?? PHASES.hero;
}

function CameraRig() {
  const camera = useThree((s) => s.camera);
  const target = useRef(new THREE.Vector3());
  const lookAt = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const { progress, reducedMotion } = useStore.getState();
    const phase = currentPhase(progress);
    target.current.set(...phase.camera);
    lookAt.current.set(...phase.target);
    if (reducedMotion) {
      camera.position.copy(target.current);
      camera.lookAt(lookAt.current);
      return;
    }
    const lambda = 3;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.current.x, lambda, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, target.current.y, lambda, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, target.current.z, lambda, delta);
    camera.lookAt(lookAt.current);
    if (camera.position.distanceToSquared(target.current) > 1e-5) invalidate();
  });
  return null;
}

function RegisterInvalidate() {
  const register = useStore((s) => s.registerInvalidate);
  useEffect(() => {
    register(invalidate);
    return () => register(() => {});
  }, [register]);
  return null;
}

export default function Scene({ tier }: { tier: Exclude<RenderTier, "poster"> }) {
  const reducedMotion = useStore((s) => s.reducedMotion);
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        frameloop={reducedMotion ? "never" : "demand"}
        dpr={tier === "full" ? [1, 1.5] : 1}
        gl={{ antialias: tier === "full", powerPreference: "high-performance", alpha: true }}
        camera={{ position: PHASES.hero.camera, fov: 40 }}
      >
        <RegisterInvalidate />
        <CameraRig />
        <HeroScene tier={tier} />
      </Canvas>
    </div>
  );
}
