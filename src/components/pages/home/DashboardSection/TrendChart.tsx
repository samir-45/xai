"use client";

import { motion } from "framer-motion";

export function TrendChart({ data }: { data: number[] }) {
  const w = 560;
  const h = 160;
  const pad = 8;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
    return [x, y] as const;
  });
  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const area = `${line} L ${points[points.length - 1][0]} ${h - pad} L ${points[0][0]} ${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-40 w-full">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={pad}
          x2={w - pad}
          y1={pad + f * (h - pad * 2)}
          y2={pad + f * (h - pad * 2)}
          stroke="var(--color-hairline)"
        />
      ))}
      <motion.path
        key={`area-${data.length}-${data[0]}`}
        d={area}
        fill="url(#areaFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        key={`line-${data.length}-${data[0]}`}
        d={line}
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
      />
      {points.filter((_, i) => i === points.length - 1).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="var(--color-signal)" />
      ))}
    </svg>
  );
}
