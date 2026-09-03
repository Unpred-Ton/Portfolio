"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useStore, type RenderTier } from "@/lib/store";

const PAPER = "#f6f3e9";
const BAR = "#d3e6d2";
const HOUSING = "#2a2f33";
const HOUSING_TOP = "#3a4147";
const STEEL = "#8e979c";

/** A 64x128 texture: half paper, half green bar - one bar period of the continuous form. */
function useGreenBarTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 128;
    const g = c.getContext("2d")!;
    g.fillStyle = PAPER;
    g.fillRect(0, 0, 64, 128);
    g.fillStyle = BAR;
    g.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, 3);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

/** Visible half-height at z=0 for the fixed camera. */
function useViewSize() {
  const { camera, size } = useThree();
  const cam = camera as THREE.PerspectiveCamera;
  const halfH = Math.tan((cam.fov * Math.PI) / 360) * cam.position.z;
  return { halfH, halfW: halfH * (size.width / size.height) };
}

function Sprocket({ x, y, z, lite, spin }: { x: number; y: number; z: number; lite: boolean; spin: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.x = spin.current;
  });
  const teeth = lite ? 0 : 10;
  return (
    <group ref={ref} position={[x, y, z]} rotation={[0, 0, Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[0.22, 0.22, 0.12, 24]} />
        <meshStandardMaterial color={STEEL} metalness={0.5} roughness={0.5} />
      </mesh>
      {Array.from({ length: teeth }, (_, i) => {
        const a = (i / teeth) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.24, 0, Math.sin(a) * 0.24]} rotation={[0, -a, 0]}>
            <boxGeometry args={[0.06, 0.1, 0.05]} />
            <meshStandardMaterial color={STEEL} metalness={0.5} roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}

/**
 * The line printer sitting across the top of the viewport. The page below is the paper coming out of it.
 * Scrolling feeds the paper up into the printer: the sprockets turn with it.
 */
export function PrinterScene({ tier }: { tier: Exclude<RenderTier, "poster"> }) {
  const lite = tier === "lite";
  const { halfH, halfW } = useViewSize();
  const texture = useGreenBarTexture();
  const housing = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const lastScroll = useRef(0);

  // Printer housing: at the hero it fills the top ~24% of the view; once the hero passes it lifts
  // until only the exit lip and sprockets show (~8%).
  const heroH = halfH * 2 * 0.15;
  const lipH = halfH * 2 * 0.06;
  const width = halfW * 2 + 1;


  useFrame(() => {
    const { progress, reducedMotion } = useStore.getState();
    const hero = progress.hero ?? 0.5;
    const leave = THREE.MathUtils.clamp((hero - 0.5) * 2, 0, 1);
    const eased = 1 - Math.pow(1 - leave, 3);

    if (housing.current) {
      const h = THREE.MathUtils.lerp(heroH, lipH, eased);
      housing.current.position.y = halfH - h / 2 + (heroH - h) / 2 + (heroH - h) / 2;
      housing.current.scale.y = h / heroH;
    }

    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    if (!reducedMotion) spin.current += (scrollY - lastScroll.current) * 0.004;
    lastScroll.current = scrollY;

  });

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[2, 6, 6]} intensity={1.1} />


      {/* Housing */}
      <group ref={housing} position={[0, halfH - heroH / 2, 0]}>
        <mesh>
          <boxGeometry args={[width, heroH, 1.4]} />
          <meshStandardMaterial color={HOUSING} roughness={0.7} />
        </mesh>
        {/* Model plate and a paper-guide bar give the housing a scale. */}
        <mesh position={[-halfW * 0.6, heroH * 0.05, 0.71]}>
          <boxGeometry args={[1.4, 0.14, 0.02]} />
          <meshStandardMaterial color="#4a5259" roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[0, -heroH / 2 + 0.16, 0.72]}>
          <boxGeometry args={[width * 0.92, 0.035, 0.04]} />
          <meshStandardMaterial color={STEEL} roughness={0.4} metalness={0.4} />
        </mesh>
        <mesh position={[0, heroH / 2 + 0.02, 0]}>
          <boxGeometry args={[width, 0.04, 1.4]} />
          <meshStandardMaterial color={HOUSING_TOP} roughness={0.6} />
        </mesh>
        {/* Exit slot: a dark slit on the front face where the paper emerges. */}
        <mesh position={[0, -heroH / 2 + 0.06, 0.71]}>
          <boxGeometry args={[width * 0.9, 0.05, 0.02]} />
          <meshStandardMaterial color="#0f1214" />
        </mesh>
        {/* The sheet emerging from the slot. */}
        <mesh position={[0, -heroH / 2 - 0.08, 0.66]} rotation={[-0.5, 0, 0]}>
          <planeGeometry args={[width * 0.86, 0.26]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>
        <Sprocket x={-halfW * 0.9} y={-heroH / 2 + 0.02} z={0.82} lite={lite} spin={spin} />
        <Sprocket x={halfW * 0.9} y={-heroH / 2 + 0.02} z={0.82} lite={lite} spin={spin} />
      </group>
    </>
  );
}
