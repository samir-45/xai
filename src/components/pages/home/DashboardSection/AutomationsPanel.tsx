"use client";

import { StatusPill } from "./StatusPill";
import type { AutomationRule } from "@/data/dashboard";

export function AutomationsPanel({
  rules,
  onToggle,
  onAdd,
  onDelete,
}: {
  rules: AutomationRule[];
  onToggle: (id: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="rounded-lg border border-hairline bg-surface p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-medium text-ink">Automations</div>
        <button
          onClick={onAdd}
          className="mono-num text-[11px] text-signal hover:underline cursor-pointer"
        >
          + new rule
        </button>
      </div>
      <div className="grid gap-2">
        {rules.map((r) => (
          <div key={r.id} className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto_auto_auto] items-start sm:items-center gap-2 sm:gap-4 rounded border border-hairline bg-surface-muted/40 px-3 py-2.5">
            <div>
              <div className="text-sm text-ink">{r.name}</div>
              <div className="mono-num text-[11px] text-ink-subtle">{r.scope}</div>
            </div>
            <div className="mono-num text-[11px] text-ink-muted">{r.runs}</div>
            <StatusPill status={r.state === "active" ? "resolved" : "queued"} label={r.state} />
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggle(r.id)}
                className="text-xs text-ink-muted hover:text-ink cursor-pointer"
              >
                {r.state === "active" ? "Pause" : "Resume"}
              </button>
              <button
                onClick={() => onDelete(r.id)}
                className="text-xs text-ink-muted hover:text-warning cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
