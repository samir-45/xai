"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { InsightRow } from "@/data/dashboard";

export function CommandPaletteModal({
  open,
  onClose,
  query,
  onQuery,
  results,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  query: string;
  onQuery: (v: string) => void;
  results: InsightRow[];
  onPick: (r: InsightRow) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 backdrop-blur-sm p-4 pt-[10vh] sm:pt-[18vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-xl border border-hairline bg-surface shadow-2xl"
          >
            <div className="hairline-b flex items-center gap-2 px-4 py-3">
              <span className="mono-num text-[11px] text-ink-subtle">⌘K</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                placeholder="Search insights, sources, IDs…"
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-subtle focus:outline-none"
              />
              <button onClick={onClose} className="text-xs text-ink-muted hover:text-ink cursor-pointer">esc</button>
            </div>
            <div className="max-h-80 overflow-auto p-2">
              {results.length === 0 && (
                <div className="px-3 py-6 text-center text-sm text-ink-muted">No matches</div>
              )}
              {results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onPick(r)}
                  className="grid w-full grid-cols-[70px_1fr_auto] items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-surface-muted cursor-pointer"
                >
                  <span className="mono-num text-[11px] text-ink-subtle">{r.id}</span>
                  <span className="truncate text-sm text-ink">{r.signal}</span>
                  <span className="mono-num text-[11px] text-ink-subtle">{r.source}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
