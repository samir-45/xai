"use client";

export function FooterBottom() {
  return (
    <div className="border-t border-hairline">
      <div className="mx-auto flex flex-col sm:flex-row max-w-[1240px] items-center justify-between gap-2 px-4 sm:px-6 py-4 sm:py-5 text-xs text-ink-subtle">
        <span>© 2026 Xai Systems, Inc.</span>
        <span className="mono-num tracking-wide text-[11px]">SOC 2 · ISO 27001 · HIPAA</span>
      </div>
    </div>
  );
}
