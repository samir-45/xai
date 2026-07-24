"use client";

import { motion, AnimatePresence } from "framer-motion";
import { stages } from "@/data/flow";
import { StageDiagram } from "./StageDiagram";

export function FlowStagePanel({
  active,
  reduced,
}: {
  active: number;
  reduced: boolean;
}) {
  const currentStage = stages[active];

  return (
    <div className="relative flex h-full min-w-0 items-center">
      <div className="relative min-h-[320px] w-full overflow-hidden rounded-lg border border-hairline bg-surface-muted sm:min-h-[420px] lg:aspect-[5/4]">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            className="absolute inset-0 flex flex-col justify-between overflow-y-auto p-4 custom-scrollbar sm:p-6 lg:p-12"
          >
            <StageDiagram id={currentStage.id} />
            <div className="mt-4">
              <div className="mono-num text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-signal">
                Stage {currentStage.index}
              </div>
              <h3 className="mt-1 text-lg font-medium tracking-tight text-ink sm:text-2xl lg:text-3xl">
                {currentStage.title} — {currentStage.subtitle}
              </h3>
              <p className="mt-2 max-w-xl text-xs text-ink-muted sm:text-sm lg:text-[15px]">
                {currentStage.body}
              </p>
              <div className="mt-4 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-hairline pt-3 sm:mt-6 sm:pt-4">
                <span className="mono-num text-xl sm:text-2xl text-ink">{currentStage.metric.value}</span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                  {currentStage.metric.label}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
