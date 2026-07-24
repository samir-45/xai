"use client";

import { motion } from "framer-motion";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";

type Feature = {
  title: string;
  eyebrow: string;
  description: string;
  span: string;
  visual: ReactNode;
};

const features: Feature[] = [
  {
    eyebrow: "Ingest",
    title: "Every source, one shape",
    description:
      "Warehouses, docs, product events and third-party APIs land as a single typed stream.",
    span: "md:col-span-2 md:row-span-2",
    visual: <StreamsVisual />,
  },
  {
    eyebrow: "Analyze",
    title: "Reasoning that shows its work",
    description: "Traceable chains link every claim back to the underlying rows.",
    span: "md:col-span-2",
    visual: <TraceVisual />,
  },
  {
    eyebrow: "Signal",
    title: "Anomalies, ranked",
    description: "Change-point detection with confidence, not just alerts.",
    span: "md:col-span-2",
    visual: <SparkVisual />,
  },
  {
    eyebrow: "Generate",
    title: "Briefs, on demand",
    description: "One prompt turns a week of dashboards into a stakeholder-ready memo.",
    span: "md:col-span-3",
    visual: <BriefVisual />,
  },
  {
    eyebrow: "Automate",
    title: "Loops, not tickets",
    description: "Trigger workflows the moment a metric crosses your threshold.",
    span: "md:col-span-3",
    visual: <AutomateVisual />,
  },
];

export function SectionBento() {
  return (
    <section id="bento" className="relative border-t border-hairline bg-surface py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="mb-8 sm:mb-14 max-w-2xl"
        >
          <p className="mono-num text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-ink-subtle">
            04 / Capabilities
          </p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-ink sm:mt-3 sm:text-3xl lg:text-5xl">
            A workspace, not a wall of dashboards.
          </h2>
          <p className="mt-3 text-sm text-ink-muted sm:mt-4 sm:text-base lg:text-lg">
            Five primitives that turn scattered signal into decisions your team can defend.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-6 md:auto-rows-[19.5rem]">
          {features.map((f, i) => (
            <BentoCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ feature, index }: { feature: Feature; index: number }) {
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
            className={`mt-4 flex items-center gap-1.5 text-xs font-medium text-signal transition-all duration-300 ${hovered ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-60"
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

/* ---------- Visuals ---------- */

function StreamsVisual() {
  const lines = [18, 42, 66, 90, 114, 138, 162, 186];
  return (
    <svg viewBox="0 0 320 205" className="h-full w-full max-h-[220px]">
      <defs>
        <linearGradient id="sg" x1="0" x2="1">
          <stop offset="0" stopColor="var(--color-signal)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--color-signal)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--color-signal)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {lines.map((y, i) => (
        <g key={y}>
          <line x1="0" x2="320" y1={y} y2={y} stroke="var(--color-hairline)" strokeWidth="1" />
          <rect x={(i * 35 + 15) % 240} y={y - 3} width="24" height="6" rx="2" fill="url(#sg)">
            <animate
              attributeName="x"
              from="-30"
              to="320"
              dur={`${3.5 + (i % 5) * 0.7}s`}
              repeatCount="indefinite"
            />
          </rect>
        </g>
      ))}
      <g transform="translate(240 102)">
        <rect x="-50" y="-30" width="100" height="60" rx="8" fill="var(--color-surface)" stroke="var(--color-hairline-strong)" />
        <text x="0" y="-8" textAnchor="middle" className="fill-ink-muted mono-num text-[10px]">
          typed_stream
        </text>
        <text x="0" y="12" textAnchor="middle" className="fill-ink text-sm font-semibold">
          142k / s
        </text>
      </g>
    </svg>
  );
}

function TraceVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center pt-1">
      <div className="w-full space-y-2 mono-num text-[10px] md:text-[11px]">
        {[
          { l: "claim", v: "MRR ↑ 12.4% WoW", tone: "text-ink font-medium" },
          { l: "→ row", v: "invoices/2026-07-14", tone: "text-ink-muted" },
          { l: "→ row", v: "invoices/2026-07-15", tone: "text-ink-muted" },
          { l: "conf", v: "0.94", tone: "text-signal font-semibold" },
        ].map((r) => (
          <div key={r.l + r.v} className="flex items-center gap-2">
            <span className="w-10 text-ink-subtle">{r.l}</span>
            <span className={`flex-1 border-b border-dashed border-hairline pb-1 ${r.tone}`}>
              {r.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SparkVisual() {
  const pts = [8, 14, 11, 18, 22, 17, 28, 24, 40, 32, 55, 38];
  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * 20} ${60 - p}`)
    .join(" ");
  return (
    <svg viewBox="0 0 240 80" className="h-full w-full max-h-[85px] pt-1">
      <path d={path} fill="none" stroke="var(--color-ink-subtle)" strokeWidth="1.5" />
      <circle cx={220} cy={22} r="4" fill="var(--color-signal)">
        <animate attributeName="r" values="4;7;4" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <text x="205" y="24" textAnchor="end" className="fill-signal mono-num text-[11px] font-semibold">
        +38σ
      </text>
    </svg>
  );
}

function BriefVisual() {
  return (
    <div className="flex h-full w-full items-center justify-between gap-3">
      <div className="flex-1 rounded-lg border border-hairline bg-surface p-3.5">
        <div className="mb-1.5 mono-num text-[9px] uppercase tracking-widest text-ink-subtle">
          prompt
        </div>
        <div className="text-xs text-ink truncate">Summarize Q3 retention risk.</div>
      </div>
      <svg width="18" height="18" viewBox="0 0 20 20" className="text-signal shrink-0">
        <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      <div className="flex-1 rounded-lg border border-hairline bg-surface p-3.5">
        <div className="mb-1.5 flex items-center justify-between">
          <div className="mono-num text-[9px] uppercase tracking-widest text-ink-subtle">brief</div>
          <div className="h-1 w-12 overflow-hidden rounded-full bg-hairline">
            <div className="h-full w-3/4 bg-signal" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-hairline" />
          <div className="h-1.5 w-5/6 rounded-full bg-hairline" />
          <div className="h-1.5 w-2/3 rounded-full bg-hairline" />
        </div>
      </div>
    </div>
  );
}

function AutomateVisual() {
  const nodes = [
    { x: 30, y: 40, l: "trigger" },
    { x: 130, y: 40, l: "enrich" },
    { x: 230, y: 40, l: "notify" },
    { x: 330, y: 40, l: "create task" },
  ];
  return (
    <svg viewBox="0 0 380 80" className="h-full w-full max-h-[85px]">
      {nodes.slice(0, -1).map((n, i) => (
        <line
          key={i}
          x1={n.x + 34}
          y1={n.y}
          x2={nodes[i + 1].x - 34}
          y2={nodes[i + 1].y}
          stroke="var(--color-hairline-strong)"
          strokeDasharray="3 3"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={n.l} transform={`translate(${n.x} ${n.y})`}>
          <rect
            x="-34"
            y="-16"
            width="68"
            height="32"
            rx="6"
            fill="var(--color-surface)"
            stroke={i === 0 ? "var(--color-signal)" : "var(--color-hairline-strong)"}
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            className="fill-ink mono-num text-[10px] font-medium"
          >
            {n.l}
          </text>
        </g>
      ))}
      <circle r="3" fill="var(--color-signal)">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M30 40 L330 40" />
      </circle>
    </svg>
  );
}
