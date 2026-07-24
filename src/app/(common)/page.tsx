import HeroSection from "@/components/pages/home/HeroSection/HeroSection";
import { SectionInsightFlow } from "@/components/pages/home/InsightFlowSection/SectionInsightFlow";
import { SectionDashboard } from "@/components/pages/home/DashboardSection/SectionDashboard";
import { SectionBento } from "@/components/pages/home/BentoSection/SectionBento";
import { SectionSignature } from "@/components/pages/home/SignatureSection/SectionSignature";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <HeroSection />
      <SectionInsightFlow />
      <SectionDashboard />
      <SectionBento />
      <SectionSignature />
    </div>
  );
};

export default HomePage;
