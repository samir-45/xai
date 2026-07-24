import type { ServiceAreaContent as ServiceAreaContentType } from "@/app/data/ServiceAreaData";
import Link from "next/link";

interface ServiceAreaContentProps {
  content: ServiceAreaContentType;
}

export default function ServiceAreaContent({ content }: ServiceAreaContentProps) {
  return (
    <div>
      <h2 className="text-[34px] font-extrabold leading-tight text-[#00549f] md:text-[38px]">
        {content.heading}
      </h2>
      <p className="mt-8 max-w-[450px] text-[21px] font-medium leading-[1.45] text-[#626870]">
        {content.description}
      </p>
      <Link
        href={content.action.href}
        className="mt-8 inline-flex min-h-[46px] items-center justify-center bg-[#f05a24] px-8 text-[15px] font-extrabold uppercase text-white transition-colors hover:bg-[#d94b18]"
      >
        {content.action.label}
      </Link>
    </div>
  );
}
