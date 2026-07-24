import type { FooterLinkItem } from "@/app/data/FooterData";
import Link from "next/link";

interface FooterLinksProps {
  title: string;
  links: FooterLinkItem[];
}

export default function FooterLinks({ title, links = [] }: FooterLinksProps) {
  const safeLinks = links || [];
  return (
    <div>
      <h2 className="text-[20px] font-extrabold text-[#f5a400]">{title}</h2>
      <ul className="mt-10 space-y-4">
        {safeLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[16px] font-semibold text-[#e8e8e8] transition-colors hover:text-[#f5a400]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
