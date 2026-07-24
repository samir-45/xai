"use client";

import { InsightRowItem } from "./InsightRowItem";
import type { InsightRow, InsightStatus } from "@/data/dashboard";

export function InsightsTable({
  rows,
  statusFilter,
  onStatusFilter,
  sourceFilter,
  onClearSource,
  expanded,
  onExpand,
  onRefresh,
  secondsAgo,
}: {
  rows: InsightRow[];
  statusFilter: InsightStatus | "all";
  onStatusFilter: (s: InsightStatus | "all") => void;
  sourceFilter: string | null;
  onClearSource: () => void;
  expanded: string | null;
  onExpand: (id: string) => void;
  onRefresh: () => void;
  secondsAgo: number;
}) {
  const statuses: (InsightStatus | "all")[] = ["all", "automated", "investigating", "queued", "resolved"];

  return (
    <div className="rounded-lg border border-hairline bg-surface">
      <div className="hairline-b flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium text-ink">Live insights</div>
          <div className="flex gap-1">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => onStatusFilter(s)}
                className={`mono-num rounded px-2 py-0.5 text-[11px] transition-colors cursor-pointer ${
                  statusFilter === s
                    ? "bg-surface-sunken text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {sourceFilter && (
            <button
              onClick={onClearSource}
              className="mono-num inline-flex items-center gap-1 rounded-full border border-hairline bg-surface-muted px-2 py-0.5 text-[11px] text-ink-muted hover:text-ink cursor-pointer"
            >
              source: {sourceFilter} ×
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="mono-num text-[11px] text-ink-subtle">refreshed {secondsAgo}s ago</div>
          <button
            onClick={onRefresh}
            className="mono-num rounded border border-hairline bg-surface px-2 py-1 text-[11px] text-ink-muted hover:text-ink cursor-pointer"
          >
            ↻ refresh
          </button>
        </div>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <div className="min-w-[640px]">
          <div className="hairline-b grid grid-cols-[80px_1fr_140px_90px_100px_50px] gap-3 px-4 py-2 mono-num text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
            <span>ID</span>
            <span>Signal</span>
            <span>Source</span>
            <span>Confidence</span>
            <span>Status</span>
            <span className="text-right">Age</span>
          </div>
          {rows.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-ink-muted">
              No insights match the current filters.
            </div>
          )}
          {rows.map((r, i) => (
            <InsightRowItem
              key={r.id}
              row={r}
              index={i}
              isExpanded={expanded === r.id}
              onExpand={onExpand}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
