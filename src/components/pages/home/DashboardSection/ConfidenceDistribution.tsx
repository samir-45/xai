"use client";

import { motion } from "framer-motion";

export function ConfidenceDistribution() {
  const buckets = [
    ["≥ 0.95", 62],
    ["0.85–0.95", 24],
    ["0.70–0.85", 10],
    ["< 0.70", 4],
  ] as const;

  return (
    <div className="rounded-lg border border-hairline bg-surface p-4 sm:p-5">
      <div className="text-sm font-medium text-ink">Confidence distribution</div>
      <div className="mono-num text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
        last 1,000 insights
      </div>
      <div className="mt-5 space-y-3">
        {buckets.map(([bucket, pct]) => (
          <div key={bucket}>
            <div className="mono-num flex justify-between text-[11px] text-ink-muted">
              <span>{bucket}</span>
              <span>{pct}%</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-surface-sunken">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
                className="h-1.5 rounded-full bg-signal"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
