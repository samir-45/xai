import type { PastClientItem } from "@/app/data/PastClientsData";
import Image from "next/image";

interface PastClientLogoProps {
  client: PastClientItem;
}

export default function PastClientLogo({ client }: PastClientLogoProps) {
  return (
    <div className="flex h-[96px] items-center justify-center px-4">
      <Image
        src={client.logo}
        alt={client.logoAlt}
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
        className="h-auto max-h-[82px] w-auto max-w-[220px] object-contain"
      />
    </div>
  );
}
