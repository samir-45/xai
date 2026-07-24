"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface mt-12 sm:mt-20 lg:mt-24">
      <div className="mx-auto grid max-w-[1240px] gap-8 sm:gap-10 px-4 sm:px-6 py-10 sm:py-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="mono-num text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-ink-subtle">Xai / 2026</p>
          <p className="mt-2 sm:mt-3 max-w-sm text-xs sm:text-sm text-ink-muted leading-relaxed">
            An intelligence workspace for teams that would rather decide than dashboard.
          </p>
        </div>
        <FooterCol
          title="Product"
          items={["Workspace", "Signals", "Automations", "Model", "Changelog"]}
        />
        <FooterCol title="Company" items={["Customers", "Security", "Careers", "Contact"]} />
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto flex flex-col sm:flex-row max-w-[1240px] items-center justify-between gap-2 px-4 sm:px-6 py-4 sm:py-5 text-xs text-ink-subtle">
          <span>© 2026 Xai Systems, Inc.</span>
          <span className="mono-num tracking-wide text-[11px]">SOC 2 · ISO 27001 · HIPAA</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mono-num text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-ink-subtle">{title}</p>
      <ul className="mt-2 sm:mt-3 space-y-2 text-xs sm:text-sm text-ink-muted">
        {items.map((item) => (
          <li key={item}>
            <Link href="#" className="transition-colors hover:text-ink">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
