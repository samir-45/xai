"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { NavLink } from "./NavbarDesktopNav";

export function NavbarMobileDrawer({
  isOpen,
  links,
  onClose,
}: {
  isOpen: boolean;
  links: NavLink[];
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden border-b border-hairline bg-surface px-4 py-4 md:hidden sm:px-6"
        >
          <nav className="flex flex-col gap-3 text-sm">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="rounded-md px-3 py-2 text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-hairline pt-3 px-3">
              <button
                onClick={onClose}
                className="text-sm font-medium text-ink-muted hover:text-ink cursor-pointer"
              >
                Sign in
              </button>
              <span className="mono-num text-[10px] text-ink-subtle">SOC 2 · ISO 27001</span>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
