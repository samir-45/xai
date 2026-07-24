"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavbarLogo from "./NavbarLogo";
import { NavbarDesktopNav, type NavLink } from "./NavbarDesktopNav";
import { NavbarMobileDrawer } from "./NavbarMobileDrawer";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { label: "Product", href: "#flow" },
    { label: "Workspace", href: "#dashboard" },
    { label: "Capabilities", href: "#bento" },
    { label: "Model", href: "#signature" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-surface/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between px-4 sm:px-6">
        <NavbarLogo />
        <NavbarDesktopNav links={navLinks} />

        {/* Action Buttons & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="hidden text-sm text-ink-muted cursor-pointer transition-colors hover:text-ink md:inline-flex">
            Sign in
          </button>
          <button
            style={{ color: "#ffffff" }}
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-ink px-3 text-xs font-medium transition-colors hover:bg-ink/90 cursor-pointer"
          >
            Request access
            <span aria-hidden>→</span>
          </button>

          {/* Hamburger toggle for mobile (< md) */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle Navigation Menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline bg-surface-muted text-ink transition-colors hover:bg-surface-sunken md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <NavbarMobileDrawer
        isOpen={mobileMenuOpen}
        links={navLinks}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
