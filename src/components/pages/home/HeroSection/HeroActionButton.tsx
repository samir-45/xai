import Link from "next/link";

interface HeroActionButtonProps {
  href: string;
  label: string;
}

export default function HeroActionButton({ href, label }: HeroActionButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[42px] items-center justify-center bg-[#f05a24] px-7 text-[15px] font-extrabold uppercase text-white transition-colors hover:bg-[#d94b18]"
    >
      {label}
    </Link>
  );
}
