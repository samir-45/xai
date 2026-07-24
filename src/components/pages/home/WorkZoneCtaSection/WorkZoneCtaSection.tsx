import { workZoneCtaContent } from "@/app/data/WorkZoneCtaData";
import Link from "next/link";

export default function WorkZoneCtaSection() {
  return (
    <section id="contact" className="bg-[#f58200] py-16 md:py-20">
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-[850px] text-2xl font-extrabold leading-tight tracking-[-0.03em] text-white md:text-3xl">
              {workZoneCtaContent.heading}
            </h2>
            <p className="mt-5 text-[18px] font-medium leading-7 text-white">
              {workZoneCtaContent.description}
            </p>
          </div>

          <Link
            href={workZoneCtaContent.action.href}
            className="inline-flex min-h-[52px] w-full max-w-[250px] items-center justify-center rounded-lg bg-[#111111] px-8 text-[16px] font-semibold text-white transition-colors hover:bg-[#2a2a2a]"
          >
            {workZoneCtaContent.action.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
