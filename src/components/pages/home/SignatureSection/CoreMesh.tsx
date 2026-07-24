"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function CoreMesh({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.6, 4), []);
  const basePositions = useMemo(() => {
    const arr = geometry.attributes.position.array as Float32Array;
    return new Float32Array(arr);
  }, [geometry]);
  const normals = useMemo(() => {
    const arr = geometry.attributes.normal.array as Float32Array;
    return new Float32Array(arr);
  }, [geometry]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progressRef.current;
    const mesh = meshRef.current;
    if (!mesh) return;

    const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const amp = 0.05 + p * 0.42;
    const freq = 1.4 + p * 1.6;

    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const bz = basePositions[i + 2];

      const n = Math.sin(bx * freq + t * 0.9) *
                Math.cos(by * freq + t * 0.7) *
                Math.sin(bz * freq + t * 0.5);
      const swirl = Math.sin(t * 0.6 + (bx + by + bz) * 0.8) * 0.35;
      const d = (n + swirl) * amp;

      arr[i]     = bx + normals[i]     * d;
      arr[i + 1] = by + normals[i + 1] * d;
      arr[i + 2] = bz + normals[i + 2] * d;
    }
    posAttr.needsUpdate = true;
    mesh.geometry.computeVertexNormals();

    const spin = 0.05 + p * 0.35;
    if (groupRef.current) {
      groupRef.current.rotation.y += spin * 0.01;
      groupRef.current.rotation.x += spin * 0.004;

      const tx = mouse.y * 0.25;
      groupRef.current.rotation.x += (tx - groupRef.current.rotation.x * 0.02) * 0.02;
    }

    if (glowRef.current) {
      const s = 1.08 + Math.sin(t * 0.9) * 0.03 + p * 0.05;
      glowRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#1b2540"
          roughness={0.35}
          metalness={0.6}
          emissive="#3a5cff"
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh ref={meshRef} geometry={geometry.clone()}>
        <meshBasicMaterial color="#8ea8ff" wireframe transparent opacity={0.85} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.75, 48, 48]} />
        <meshBasicMaterial color="#4a7bff" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
