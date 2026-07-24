"use client";

import Link from "next/link";

export function FooterCol({ title, items }: { title: string; items: string[] }) {
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
