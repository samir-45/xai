"use client";

import { kpis } from "@/data/dashboard";

export function KpiCardsGrid() {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
      {kpis.map((k) => (
        <div key={k.label} className="min-w-0 rounded-lg border border-hairline bg-surface p-3.5 sm:p-4">
          <div className="text-[10px] uppercase tracking-[0.14em] text-ink-subtle sm:text-[11px] sm:tracking-[0.18em]">{k.label}</div>
          <div className="mono-num mt-1.5 text-xl sm:text-2xl text-ink font-medium">{k.value}</div>
          <div
            className={`mono-num mt-1 inline-flex items-center gap-1 text-[10px] sm:text-[11px] ${
              k.trend === "down" ? "text-success" : "text-signal"
            }`}
          >
            {k.trend === "down" ? "↓" : "↑"} {k.delta}
          </div>
        </div>
      ))}
    </div>
  );
}
