import type { ServicesOverviewCard as ServicesOverviewCardType } from "@/app/data/ServicesOverviewData";
import Image from "next/image";
import Link from "next/link";

interface ServicesOverviewCardProps {
  card: ServicesOverviewCardType;
}

export default function ServicesOverviewCard({ card }: ServicesOverviewCardProps) {
  return (
    <Link
      href={card.href}
      className="group relative block aspect-[0.78] overflow-hidden rounded-lg bg-[#1f2933]"
    >
      <Image
        src={card.image}
        alt={card.imageAlt}
        fill
        sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw"
        quality={100}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        style={{ objectPosition: card.imagePosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 text-center">
        <h3 className="text-[22px] font-extrabold leading-tight text-white">
          {card.title}
        </h3>
      </div>
    </Link>
  );
}
