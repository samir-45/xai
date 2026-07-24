import logoWhite from "@/assets/logo/logo-white.png";
import Image from "next/image";
import Link from "next/link";

export default function FooterBrand() {
  return (
    <Link
      href="/"
      aria-label="Titan Flaggers home"
      className="inline-flex items-center"
    >
      <Image
        src={logoWhite}
        alt="Titan Flaggers"
        width={280}
        height={110}
        className="h-[82px] w-auto object-contain sm:h-[90px] lg:h-[96px]"
      />
    </Link>
  );
}
