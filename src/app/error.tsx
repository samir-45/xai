"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-surface p-6 text-ink">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      <div className="relative w-full max-w-lg rounded-2xl border border-hairline bg-surface-muted p-8 shadow-2xl md:p-10">
        <div className="flex items-center justify-between">
          <p className="mono-num text-[10px] uppercase tracking-[0.24em] text-ink-subtle">
            00 / Exception Handler
          </p>
          <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_12px_var(--color-signal)]" />
        </div>

        <h1 className="mt-6 text-3xl font-medium tracking-tight text-ink md:text-4xl">
          System Signal Interrupted.
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          An unexpected exception occurred while processing live workspace telemetry. The runtime boundary caught the exception safely.
        </p>

        {/* Telemetry Exception Code Block */}
        <div className="mt-6 rounded-lg border border-hairline bg-surface p-4">
          <div className="flex items-center justify-between border-b border-hairline pb-2">
            <span className="mono-num text-[10px] uppercase tracking-widest text-ink-subtle">
              digest_id
            </span>
            <span className="mono-num text-[10px] font-medium text-signal">
              {error.digest || "ERR_WORKSPACE_BREAK"}
            </span>
          </div>
          <p className="mt-3 truncate mono-num text-xs text-ink-muted">
            {error.message || "An unhandled exception occurred in the client boundary."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => reset()}
            style={{ color: "#ffffff" }}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-ink px-4 text-sm font-medium transition-colors hover:bg-ink/90 cursor-pointer"
          >
            Re-evaluate pipeline
            <span aria-hidden>↺</span>
          </button>
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-hairline bg-surface px-4 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
          >
            Return to workspace
          </Link>
        </div>
      </div>
    </div>
  );
}
