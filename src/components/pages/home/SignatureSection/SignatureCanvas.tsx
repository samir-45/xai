"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { CoreMesh } from "./CoreMesh";
import { OrbitStreams } from "./OrbitStreams";

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
        <CoreMesh progressRef={progressRef} />
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
