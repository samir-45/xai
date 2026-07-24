import type { PastProjectItem } from "@/app/data/PastProjectsData";
import Image from "next/image";
import Link from "next/link";

interface PastProjectCardProps {
  project: PastProjectItem;
}

export default function PastProjectCard({ project }: PastProjectCardProps) {
  return (
    <Link
      href={project.href}
      className="group block overflow-hidden rounded-md bg-white transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative h-[300px] overflow-hidden">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1280px) 390px, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ objectPosition: project.imagePosition }}
        />
      </div>
      <div className="min-h-[170px] px-6 py-6">
        <p className="text-[16px] font-bold text-[#f58200]">{project.client}</p>
        <h3 className="mt-4 text-[21px] font-extrabold leading-[1.45] text-[#111111]">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
