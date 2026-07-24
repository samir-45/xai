"use client";

export function TraceVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center pt-1">
      <div className="w-full space-y-2 mono-num text-[10px] md:text-[11px]">
        {[
          { l: "claim", v: "MRR ↑ 12.4% WoW", tone: "text-ink font-medium" },
          { l: "→ row", v: "invoices/2026-07-14", tone: "text-ink-muted" },
          { l: "→ row", v: "invoices/2026-07-15", tone: "text-ink-muted" },
          { l: "conf", v: "0.94", tone: "text-signal font-semibold" },
        ].map((r) => (
          <div key={r.l + r.v} className="flex items-center gap-2">
            <span className="w-10 text-ink-subtle">{r.l}</span>
            <span className={`flex-1 border-b border-dashed border-hairline pb-1 ${r.tone}`}>
              {r.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
