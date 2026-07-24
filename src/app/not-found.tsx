"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-surface p-6 text-ink">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      <div className="relative w-full max-w-lg rounded-2xl border border-hairline bg-surface-muted p-8 shadow-2xl md:p-10">
        <div className="flex items-center justify-between">
          <p className="mono-num text-[10px] uppercase tracking-[0.24em] text-ink-subtle">
            404 / Route Null
          </p>
          <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_12px_var(--color-signal)]" />
        </div>

        <h1 className="mt-6 text-3xl font-medium tracking-tight text-ink md:text-4xl">
          Signal Address Not Found.
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          The route you are trying to access does not exist in the Xai intelligence workspace graph.
        </p>

        {/* 404 Route Code Block */}
        <div className="mt-6 rounded-lg border border-hairline bg-surface p-4">
          <div className="flex items-center justify-between border-b border-hairline pb-2">
            <span className="mono-num text-[10px] uppercase tracking-widest text-ink-subtle">
              status_code
            </span>
            <span className="mono-num text-[10px] font-medium text-signal">
              404_NOT_FOUND
            </span>
          </div>
          <p className="mt-3 mono-num text-xs text-ink-muted">
            window.location.pathname $\to$ unmapped node
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            style={{ color: "#ffffff" }}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-ink px-4 text-sm font-medium transition-colors hover:bg-ink/90"
          >
            Return to workspace
            <span aria-hidden>→</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-hairline bg-surface px-4 text-sm font-medium text-ink transition-colors hover:bg-surface-muted cursor-pointer"
          >
            Previous location
          </button>
        </div>
      </div>
    </div>
  );
}
