"use client";

export type StatusType = "resolved" | "investigating" | "queued" | "automated";

export function StatusPill({ status, label }: { status: StatusType; label?: string }) {
  const map: Record<string, { fg: string; bg: string; dot: string; label: string }> = {
    resolved: { fg: "text-success", bg: "bg-success/10", dot: "bg-success", label: "resolved" },
    investigating: { fg: "text-warning", bg: "bg-warning/15", dot: "bg-warning", label: "investigating" },
    queued: { fg: "text-ink-muted", bg: "bg-surface-sunken", dot: "bg-ink-subtle", label: "queued" },
    automated: { fg: "text-signal", bg: "bg-signal-soft", dot: "bg-signal", label: "automated" },
  };
  const s = map[status] || map.queued;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] ${s.bg} ${s.fg}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {label ?? s.label}
    </span>
  );
}
