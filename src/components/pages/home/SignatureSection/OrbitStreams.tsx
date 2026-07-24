"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function OrbitStreams({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);

  const rings = useMemo(() => {
    const configs = [
      { count: 220, radius: 2.6, tilt: 0.15, speed: 0.35, color: "#7fa8ff" },
      { count: 260, radius: 3.1, tilt: -0.55, speed: 0.22, color: "#a8bfff" },
      { count: 180, radius: 3.7, tilt: 0.95, speed: 0.14, color: "#c9d7ff" },
    ];
    return configs.map((cfg) => {
      const positions = new Float32Array(cfg.count * 3);
      const phases = new Float32Array(cfg.count);
      for (let i = 0; i < cfg.count; i++) {
        phases[i] = (i / cfg.count) * Math.PI * 2;
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;
      }
      return { ...cfg, positions, phases };
    });
  }, []);

  const refs = useRef<(THREE.Points | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progressRef.current;
    rings.forEach((ring, idx) => {
      const points = refs.current[idx];
      if (!points) return;
      const geo = points.geometry as THREE.BufferGeometry;
      const attr = geo.attributes.position as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      const speed = ring.speed * (0.4 + p * 1.2);
      const wobble = 0.06 + p * 0.18;
      for (let i = 0; i < ring.count; i++) {
        const angle = ring.phases[i] + t * speed;
        const r = ring.radius + Math.sin(t * 1.2 + i * 0.3) * wobble;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        const y = z * Math.sin(ring.tilt) + Math.sin(t + i) * 0.04;
        const zz = z * Math.cos(ring.tilt);
        arr[i * 3] = x;
        arr[i * 3 + 1] = y;
        arr[i * 3 + 2] = zz;
      }
      attr.needsUpdate = true;
    });

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, idx) => (
        <points
          key={idx}
          ref={(el) => {
            refs.current[idx] = el as THREE.Points | null;
          }}
        >
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[ring.positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color={ring.color}
            size={0.035}
            transparent
            opacity={0.85}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      ))}
    </group>
  );
}
