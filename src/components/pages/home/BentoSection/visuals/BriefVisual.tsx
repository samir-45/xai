"use client";

export function BriefVisual() {
  return (
    <div className="flex h-full w-full items-center justify-between gap-2 sm:gap-3">
      <div className="flex-1 rounded-lg border border-hairline bg-surface p-3 sm:p-3.5">
        <div className="mb-1.5 mono-num text-[9px] uppercase tracking-widest text-ink-subtle">
          prompt
        </div>
        <div className="text-xs text-ink truncate">Summarize Q3 retention risk.</div>
      </div>
      <svg width="18" height="18" viewBox="0 0 20 20" className="text-signal shrink-0">
        <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      <div className="flex-1 rounded-lg border border-hairline bg-surface p-3 sm:p-3.5">
        <div className="mb-1.5 flex items-center justify-between">
          <div className="mono-num text-[9px] uppercase tracking-widest text-ink-subtle">brief</div>
          <div className="h-1 w-12 overflow-hidden rounded-full bg-hairline">
            <div className="h-full w-3/4 bg-signal" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-hairline" />
          <div className="h-1.5 w-5/6 rounded-full bg-hairline" />
          <div className="h-1.5 w-2/3 rounded-full bg-hairline" />
        </div>
      </div>
    </div>
  );
}
