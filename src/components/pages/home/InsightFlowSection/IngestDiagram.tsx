"use client";

import { motion } from "framer-motion";

export function IngestDiagram() {
  const rows = ["stripe.events", "orders.stream", "otel.traces", "support.tickets", "product.events"];
  return (
    <div className="grid min-w-0 grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
      <div className="space-y-2">
        {rows.map((r, i) => (
          <motion.div
            key={r}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
            className="mono-num flex min-w-0 items-center gap-2 rounded border border-hairline bg-surface px-3 py-1.5 text-[10px] text-ink-muted sm:text-[11px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal/70" />
            <span className="truncate">{r}</span>
          </motion.div>
        ))}
      </div>
      <svg width="80" height="140" viewBox="0 0 80 140" className="hidden text-ink-subtle sm:block">
        {rows.map((_, i) => (
          <motion.path
            key={i}
            d={`M0 ${20 + i * 24} C40 ${20 + i * 24}, 40 70, 80 70`}
            stroke="currentColor"
            strokeOpacity="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.15 + i * 0.06, duration: 0.6 }}
          />
        ))}
      </svg>
      <div className="rounded border border-signal/40 bg-signal-soft/40 p-3 sm:p-4">
        <div className="mono-num text-[10px] uppercase tracking-[0.18em] text-signal">unified graph</div>
        <div className="mt-2 grid grid-cols-6 gap-1">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.02 }}
              className="h-2 rounded-sm bg-signal/60"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
