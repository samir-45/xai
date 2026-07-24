"use client";

import { motion } from "framer-motion";

export function GenerateDiagram() {
  return (
    <div className="grid gap-3">
      {[
        { title: "Retry storm suppressed", meta: "confidence 0.97 · auto" },
        { title: "Shard failover scheduled", meta: "confidence 0.92 · approved" },
        { title: "Cohort surfaced to Growth", meta: "confidence 0.81 · queued" },
      ].map((r, i) => (
        <motion.div
          key={r.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08 }}
          className="flex items-center justify-between rounded border border-hairline bg-surface px-4 py-3"
        >
          <div>
            <div className="text-sm font-medium text-ink">{r.title}</div>
            <div className="mono-num mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle">
              {r.meta}
            </div>
          </div>
          <div className="h-6 w-6 rounded-full border border-signal/40 bg-signal/10 flex items-center justify-center text-signal text-xs">
            ✓
          </div>
        </motion.div>
      ))}
    </div>
  );
}
