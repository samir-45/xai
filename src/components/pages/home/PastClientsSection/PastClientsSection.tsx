import { pastClientsContent } from "@/app/data/PastClientsData";
import PastClientLogo from "./PastClientLogo";

export default function PastClientsSection() {
  return (
    <section id="partners" className="bg-white py-20 md:py-24">
      <div className="container">
        <h2 className="text-center text-[34px] font-extrabold leading-tight text-[#141414] md:text-[40px]">
          {pastClientsContent.heading}
        </h2>

        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 xl:grid-cols-4">
          {(pastClientsContent.clients || []).map((client) => (
            <PastClientLogo key={client.id} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}
