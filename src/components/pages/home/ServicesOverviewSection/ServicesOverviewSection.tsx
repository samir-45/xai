import { servicesOverviewContent } from "@/app/data/ServicesOverviewData";
import ServicesOverviewCard from "./ServicesOverviewCard";
import ServicesOverviewHeader from "./ServicesOverviewHeader";

export default function ServicesOverviewSection() {
  return (
    <section className="bg-[#f8f7f2] py-20 md:py-24">
      <div className="container">
        <ServicesOverviewHeader
          eyebrow={servicesOverviewContent.eyebrow}
          heading={servicesOverviewContent.heading}
        />

        <div className="mx-auto mt-10 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(servicesOverviewContent.cards || []).map((card) => (
            <ServicesOverviewCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
