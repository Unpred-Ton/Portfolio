"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** A loose 3D mesh of connected nodes - the platform's web of integrations, abstracted. */
export function NodeField({ tier, animate }: { tier: "full" | "lite"; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const count = tier === "full" ? 28 : 16;

  const { pointArray, lineArray } = useMemo(() => {
    const w = 9.5;
    const h = 6.5;
    const d = 4.5;
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < count; i += 1) {
      nodes.push(new THREE.Vector3((Math.random() - 0.5) * w, (Math.random() - 0.5) * h, (Math.random() - 0.5) * d));
    }
    const pts = new Float32Array(count * 3);
    nodes.forEach((n, i) => {
      pts[i * 3] = n.x;
      pts[i * 3 + 1] = n.y;
      pts[i * 3 + 2] = n.z;
    });

    // Connect each node to its two nearest neighbours, de-duplicated.
    const seen = new Set<string>();
    const segs: number[] = [];
    nodes.forEach((n, i) => {
      const near = nodes
        .map((m, j) => ({ j, dist: n.distanceTo(m) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 2);
      near.forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) return;
        seen.add(key);
        segs.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
      });
    });
    return { pointArray: pts, lineArray: new Float32Array(segs) };
  }, [count]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (animate) g.rotation.y += delta * 0.045;
    const targetX = state.pointer.y * 0.18;
    g.rotation.x += (targetX - g.rotation.x) * 0.05;
  });

  return (
    <group ref={group} position={[1.4, 0.2, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lineArray, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#003da5" transparent opacity={0.2} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointArray, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#1a56db" size={0.1} sizeAttenuation transparent opacity={0.85} />
      </points>
    </group>
  );
}
