"use client";

import { motion } from "framer-motion";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";

export type Feature = {
  title: string;
  eyebrow: string;
  description: string;
  span: string;
  visual: ReactNode;
};

export function BentoCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-hairline bg-surface-muted p-6 pb-9 transition-colors hover:border-hairline-strong ${feature.span}`}
    >
      {/* Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, color-mix(in oklab, var(--color-signal) 14%, transparent), transparent 60%)`,
        }}
      />
      {/* Gradient border on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(240px circle at ${pos.x}px ${pos.y}px, color-mix(in oklab, var(--color-signal) 55%, transparent), transparent 65%)`,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <p className="mono-num text-[10px] uppercase tracking-[0.22em] text-ink-subtle">
              {feature.eyebrow}
            </p>
            <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_var(--color-signal)]" />
          </div>

          <div className="mt-1.5 flex items-center justify-center min-h-[5.5rem] w-full overflow-hidden">
            {feature.visual}
          </div>
        </div>

        <div className="mt-3">
          <h3 className="text-base md:text-lg font-medium tracking-tight text-ink">{feature.title}</h3>
          <p className="mt-1 text-xs md:text-sm text-ink-muted leading-relaxed">{feature.description}</p>
          <div
            className={`mt-4 flex items-center gap-1.5 text-xs font-medium text-signal transition-all duration-300 ${
              hovered ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-60"
            }`}
          >
            Explore
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6h8m0 0L6 2m4 4L6 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
