import { pastProjectsContent } from "@/app/data/PastProjectsData";
import Link from "next/link";
import PastProjectCard from "./PastProjectCard";
import PastProjectsHeader from "./PastProjectsHeader";

export default function PastProjectsSection() {
  return (
    <section id="past-projects" className="bg-[#f8f7f2] py-20 md:py-24">
      <div className="container">
        <PastProjectsHeader
          eyebrow={pastProjectsContent.eyebrow}
          heading={pastProjectsContent.heading}
        />

        <div className="mx-auto mt-10 grid max-w-7xl gap-7 lg:grid-cols-3">
          {(pastProjectsContent.projects || []).map((project) => (
            <PastProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href={pastProjectsContent.action.href}
            className="inline-flex min-h-[52px] min-w-[250px] items-center justify-center rounded-md bg-[#f58200] px-8 text-[16px] font-semibold text-white transition-colors hover:bg-[#df7200]"
          >
            {pastProjectsContent.action.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
