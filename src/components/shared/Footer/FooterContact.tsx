import type { FooterContactItem, FooterLinkItem } from "@/app/data/FooterData";
import Link from "next/link";
import { Clock3, Linkedin, Mail, Phone } from "lucide-react";

interface FooterContactProps {
  title: string;
  contacts: FooterContactItem[];
  socials: FooterLinkItem[];
}

function ContactIcon({ type }: { type: FooterContactItem["type"] }) {
  if (type === "email") return <Mail size={18} />;
  if (type === "hours") return <Clock3 size={18} />;
  return <Phone size={18} />;
}

export default function FooterContact({
  title,
  contacts = [],
  socials = [],
}: FooterContactProps) {
  const safeContacts = contacts || [];
  const safeSocials = socials || [];
  return (
    <div>
      <h2 className="text-[20px] font-extrabold text-[#f5a400]">{title}</h2>

      <ul className="mt-10 space-y-5">
        {safeContacts.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="flex items-center gap-3 text-[17px] font-semibold text-[#e8e8e8] transition-colors hover:text-[#f5a400]"
            >
              <ContactIcon type={item.type} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center gap-3">
        {safeSocials.map((social) => (
          <Link
            key={social.href}
            href={social.href}
            aria-label={social.label}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9a9a9a] text-[#151515] transition-colors hover:bg-[#f5a400]"
          >
            <Linkedin size={20} fill="currentColor" strokeWidth={0} />
          </Link>
        ))}
      </div>
    </div>
  );
}
