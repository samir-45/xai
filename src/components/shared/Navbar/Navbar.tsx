"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import NavbarLogo from "./NavbarLogo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Product", href: "#flow" },
    { label: "Workspace", href: "#dashboard" },
    { label: "Capabilities", href: "#bento" },
    { label: "Model", href: "#signature" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-surface/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between px-4 sm:px-6">
        <NavbarLogo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm text-ink-muted md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="hidden text-sm text-ink-muted transition-colors hover:text-ink md:inline-flex">
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
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline bg-surface-muted text-ink transition-colors hover:bg-surface-sunken md:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-hairline bg-surface px-4 py-4 md:hidden sm:px-6"
          >
            <nav className="flex flex-col gap-3 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-hairline pt-3 px-3">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-ink-muted hover:text-ink"
                >
                  Sign in
                </button>
                <span className="mono-num text-[10px] text-ink-subtle">SOC 2 · ISO 27001</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
