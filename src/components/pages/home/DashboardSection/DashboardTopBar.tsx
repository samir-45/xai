"use client";

import { motion } from "framer-motion";
import { tabs, type TabId } from "@/data/dashboard";

export function DashboardTopBar({
  tab,
  onChange,
  onCommand,
}: {
  tab: TabId;
  onChange: (t: TabId) => void;
  onCommand: () => void;
}) {
  return (
    <div className="hairline-b flex flex-wrap items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-3">
      <div className="hidden sm:flex items-center gap-3 text-sm text-ink-muted">
        <span>Workspace</span>
        <span className="text-ink-subtle">/</span>
        <span className="text-ink">Home</span>
      </div>
      <div className="relative flex items-center gap-1 overflow-x-auto overflow-y-hidden custom-scrollbar py-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`relative shrink-0 rounded px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm transition-colors cursor-pointer ${
              tab === t.id ? "text-ink font-medium" : "text-ink-muted hover:text-ink"
            }`}
          >
            {t.label}
            {tab === t.id && (
              <motion.span
                layoutId="tab-underline"
                className="absolute inset-x-2 bottom-0 h-[2px] bg-signal"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="mono-num hidden items-center gap-1 rounded border border-hairline bg-surface-muted px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-ink-subtle md:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> live
        </div>
        <button
          onClick={onCommand}
          className="rounded border border-hairline bg-surface px-2 py-1 text-xs text-ink-muted hover:text-ink cursor-pointer"
        >
          ⌘K
        </button>
      </div>
    </div>
  );
}
