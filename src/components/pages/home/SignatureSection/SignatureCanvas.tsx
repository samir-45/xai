"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";

function Core({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
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

function OrbitStreams({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
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

export function SignatureCanvas() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      progressRef.current = 1;
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height + vh;
        const seen = vh - rect.top;
        progressRef.current = Math.max(0, Math.min(1, seen / total));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className="relative h-[320px] sm:h-[440px] md:h-[580px] lg:h-[620px] w-full overflow-hidden rounded-xl border border-hairline bg-panel"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(74,123,255,0.18) 0%, rgba(20,23,33,0) 60%)",
        }}
      />
      <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={["#0f1220"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 3, 4]} intensity={1.1} color="#8ea8ff" />
        <pointLight position={[-4, -3, -2]} intensity={0.6} color="#4a7bff" />
        <Core progressRef={progressRef} />
        <OrbitStreams progressRef={progressRef} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-panel-foreground/70">
        <div>
          <div className="mono-num text-[10px] uppercase tracking-[0.24em]">
            intelligence core · X-1
          </div>
          <div className="mt-1 text-sm text-surface-muted/90">Live signals orbiting a reasoning nucleus</div>
        </div>
        <div className="mono-num text-[10px] uppercase tracking-[0.24em] hidden md:block text-surface-muted/70">
          pulse · orbit · resonance
        </div>
      </div>
    </div>
  );
}
