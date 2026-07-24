"use client";

import { stages } from "@/data/flow";

export function FlowStageList({
  active,
  progress,
  onSelectStage,
}: {
  active: number;
  progress: number;
  onSelectStage: (index: number) => void;
}) {
  return (
    <div className="flex flex-col justify-center py-2 sm:py-4 lg:py-16">
      <p className="mono-num text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-ink-subtle">
        02 / How Xai works
      </p>
      <h2 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-ink sm:mt-4 sm:text-3xl lg:text-4xl">
        From raw signal to
        <br className="hidden sm:inline" /> executed action.
      </h2>

      <ol className="mt-4 flex flex-row overflow-x-auto gap-2 pb-2 custom-scrollbar lg:mt-10 lg:flex-col lg:space-y-5 lg:gap-0 lg:overflow-visible lg:pb-0">
        {stages.map((s, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <li key={s.id} className="flex shrink-0 items-center gap-2 rounded-lg border border-hairline p-1.5 lg:border-none lg:p-0 lg:items-start lg:gap-3">
              <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                <span
                  className={`absolute inset-0 rounded-full border transition-colors ${
                    isActive || isPast ? "border-signal bg-signal" : "border-hairline-strong bg-surface"
                  }`}
                />
                <span
                  className={`relative mono-num text-[9px] ${
                    isActive || isPast ? "text-surface" : "text-ink-subtle"
                  }`}
                >
                  {s.index}
                </span>
              </div>
              <button
                onClick={() => onSelectStage(i)}
                className={`text-left text-xs sm:text-sm transition-colors cursor-pointer ${
                  isActive ? "text-ink font-semibold" : "text-ink-muted hover:text-ink"
                }`}
              >
                <div className="font-medium whitespace-nowrap lg:whitespace-normal">{s.title}</div>
                <div className="hidden text-xs text-ink-subtle lg:block">{s.subtitle}</div>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Progress line */}
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-hairline sm:mt-6 lg:mt-10 lg:w-40">
        <div
          className="h-full bg-signal transition-all duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
