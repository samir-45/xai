"use client";

import NavbarLogo from "./NavbarLogo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-surface/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between px-6">
        <NavbarLogo />
        <nav className="hidden items-center gap-8 text-sm text-ink-muted md:flex">
          <a href="#flow" className="transition-colors hover:text-ink">Product</a>
          <a href="#dashboard" className="transition-colors hover:text-ink">Workspace</a>
          <a href="#bento" className="transition-colors hover:text-ink">Capabilities</a>
          <a href="#signature" className="transition-colors hover:text-ink">Model</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden text-sm text-ink-muted transition-colors hover:text-ink md:inline-flex">
            Sign in
          </button>
          <button style={{ color: "#ffffff" }} className="inline-flex h-8 items-center gap-1.5 rounded-md bg-ink px-3 text-xs font-medium transition-colors hover:bg-ink/90">
            Request access
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </header>
  );
}
