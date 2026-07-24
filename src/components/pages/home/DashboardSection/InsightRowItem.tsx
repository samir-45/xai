"use client";

import { motion, AnimatePresence } from "framer-motion";
import { StatusPill } from "./StatusPill";
import type { InsightRow } from "@/data/dashboard";

export function InsightRowItem({
  row,
  index,
  isExpanded,
  onExpand,
}: {
  row: InsightRow;
  index: number;
  isExpanded: boolean;
  onExpand: (id: string) => void;
}) {
  return (
    <div className="hairline-b last:border-b-0">
      <motion.button
        type="button"
        onClick={() => onExpand(row.id)}
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.35, delay: index * 0.03 }}
        className="grid w-full grid-cols-[80px_1fr_140px_90px_100px_50px] items-center gap-3 px-4 py-3 text-left text-xs sm:text-sm transition-colors hover:bg-surface-muted/40 cursor-pointer"
      >
        <span className="mono-num text-xs text-ink-subtle">{row.id}</span>
        <span className="truncate text-ink">{row.signal}</span>
        <span className="mono-num truncate text-xs text-ink-muted">{row.source}</span>
        <span className="mono-num text-xs text-ink">{row.confidence.toFixed(2)}</span>
        <StatusPill status={row.status} />
        <span className="mono-num text-right text-xs text-ink-subtle">{row.time}</span>
      </motion.button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-surface-muted/40"
          >
            <div className="px-4 py-3 text-xs text-ink-muted">
              <div className="mono-num text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
                Evidence
              </div>
              <p className="mt-1 text-ink">{row.detail}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
