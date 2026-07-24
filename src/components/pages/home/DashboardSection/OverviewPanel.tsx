"use client";

import { KpiCardsGrid } from "./KpiCardsGrid";
import { TrendChart } from "./TrendChart";
import { ConfidenceDistribution } from "./ConfidenceDistribution";
import { InsightsTable } from "./InsightsTable";
import { trendByRange, ranges, type RangeId, type InsightRow, type InsightStatus } from "@/data/dashboard";

export function OverviewPanel({
  range,
  onRange,
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
  range: RangeId;
  onRange: (r: RangeId) => void;
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
  const data = trendByRange[range];
  return (
    <div className="grid min-w-0 gap-4">
      <KpiCardsGrid />
      <div className="grid min-w-0 gap-3 lg:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 rounded-lg border border-hairline bg-surface p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-sm font-medium text-ink">Signal volume · {range}</div>
              <div className="mono-num text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                events · millions
              </div>
            </div>
            <div className="flex gap-1 text-[11px]">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => onRange(r)}
                  className={`rounded px-2 py-1 transition-colors cursor-pointer ${
                    range === r ? "bg-surface-sunken text-ink font-medium" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <TrendChart data={data} />
        </div>
        <ConfidenceDistribution />
      </div>
      <InsightsTable
        rows={rows}
        statusFilter={statusFilter}
        onStatusFilter={onStatusFilter}
        sourceFilter={sourceFilter}
        onClearSource={onClearSource}
        expanded={expanded}
        onExpand={onExpand}
        onRefresh={onRefresh}
        secondsAgo={secondsAgo}
      />
    </div>
  );
}
