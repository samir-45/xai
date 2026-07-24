"use client";

import { FooterCol } from "./FooterCol";
import { FooterBottom } from "./FooterBottom";

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
      <FooterBottom />
    </footer>
  );
}
