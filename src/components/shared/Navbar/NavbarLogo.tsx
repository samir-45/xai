import Link from "next/link";

export default function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <rect x="1" y="1" width="20" height="20" rx="4" stroke="currentColor" strokeOpacity="0.35" />
          <path d="M5 5 L17 17 M17 5 L5 17" stroke="currentColor" strokeWidth="1.25" />
        </svg>
        <span className="text-[15px] font-semibold tracking-tight text-ink">Xai</span>
        <span className="mono-num hidden text-[11px] uppercase tracking-[0.18em] text-ink-subtle md:inline">
          / intelligence workspace
        </span>
      </div>
    </Link>
  );
}
