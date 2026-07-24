import { serviceAreaContent } from "@/app/data/ServiceAreaData";
import ServiceAreaContent from "./ServiceAreaContent";
import ServiceAreaMap from "./ServiceAreaMap";

export default function ServiceAreaSection() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.45fr_1fr]">
          <ServiceAreaMap mapQuery={serviceAreaContent.mapQuery} />
          <ServiceAreaContent content={serviceAreaContent} />
        </div>
      </div>
    </section>
  );
}
