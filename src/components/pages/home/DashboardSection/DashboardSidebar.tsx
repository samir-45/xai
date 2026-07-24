"use client";

import { savedViews } from "@/data/dashboard";

export type SidebarKey = "home" | "signals" | "insights" | "automations" | "cohorts" | "sources" | "models";

export function DashboardSidebar({
  active,
  onSelect,
  onView,
}: {
  active: SidebarKey;
  onSelect: (k: SidebarKey) => void;
  onView: (id: string) => void;
}) {
  const nav: { key: SidebarKey; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "signals", label: "Signals" },
    { key: "insights", label: "Insights" },
    { key: "automations", label: "Automations" },
    { key: "cohorts", label: "Cohorts" },
    { key: "sources", label: "Sources" },
    { key: "models", label: "Models" },
  ];

  return (
    <aside className="hairline-b border-b border-hairline lg:border-b-0 lg:border-r bg-surface-muted/60 p-3 sm:p-4">
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md border border-hairline-strong bg-surface flex items-center justify-center text-[10px] font-semibold text-ink">
            X
          </div>
          <span className="text-sm font-medium text-ink">Xai · Acme</span>
        </div>
        <span className="mono-num text-[10px] text-ink-subtle">prod</span>
      </div>
      <div className="mt-3 lg:mt-4">
        <p className="px-2 mono-num text-[10px] uppercase tracking-[0.2em] text-ink-subtle hidden lg:block">Workspace</p>
        <nav className="mt-1 flex flex-row overflow-x-auto gap-1 pb-1 custom-scrollbar lg:flex-col lg:space-y-0.5 lg:overflow-visible lg:pb-0">
          {nav.map((n) => {
            const isActive = active === n.key;
            return (
              <button
                key={n.key}
                onClick={() => onSelect(n.key)}
                className={`flex shrink-0 items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-xs sm:text-sm transition-colors cursor-pointer ${
                  isActive ? "bg-signal-soft/70 text-ink font-medium" : "text-ink-muted hover:bg-surface-sunken"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-signal" : "bg-hairline-strong"}`} />
                {n.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="mt-6 hidden lg:block">
        <p className="px-2 mono-num text-[10px] uppercase tracking-[0.2em] text-ink-subtle">Saved views</p>
        <div className="mt-1 space-y-0.5">
          {savedViews.map((v) => (
            <button
              key={v.id}
              onClick={() => onView(v.id)}
              className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-ink-muted hover:bg-surface-sunken hover:text-ink cursor-pointer"
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 hidden lg:block border-t border-hairline pt-3">
        <div className="flex items-center gap-2 px-2">
          <div className="h-6 w-6 rounded-full bg-ink text-surface flex items-center justify-center text-[10px] font-medium">
            RM
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-medium text-ink">Riley Mora</div>
            <div className="mono-num truncate text-[10px] text-ink-subtle">on call · 14d</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
