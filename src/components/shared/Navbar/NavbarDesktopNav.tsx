"use client";

export type NavLink = {
  label: string;
  href: string;
};

export function NavbarDesktopNav({ links }: { links: NavLink[] }) {
  return (
    <nav className="hidden items-center gap-8 text-sm text-ink-muted md:flex">
      {links.map((link) => (
        <a key={link.label} href={link.href} className="transition-colors hover:text-ink">
          {link.label}
        </a>
      ))}
    </nav>
  );
}
