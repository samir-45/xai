"use client";

import { StatusPill } from "./StatusPill";
import type { InsightRow } from "@/data/dashboard";

export function SignalsPanel({ rows }: { rows: InsightRow[] }) {
  return (
    <div className="rounded-lg border border-hairline bg-surface p-4 sm:p-5">
      <div className="mb-4 text-sm font-medium text-ink">Inbound signals (live stream)</div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded border border-hairline bg-surface-muted/40 p-3"
          >
            <div className="flex items-center gap-3">
              <span className="mono-num text-xs text-ink-subtle">{r.id}</span>
              <span className="text-sm font-medium text-ink">{r.signal}</span>
              <span className="mono-num text-xs text-ink-muted">via {r.source}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="mono-num text-xs text-ink">{r.confidence.toFixed(2)}</span>
              <StatusPill status={r.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
