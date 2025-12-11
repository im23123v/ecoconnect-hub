import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LocationsSection } from "@/components/LocationsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PartnersSection } from "@/components/PartnersSection";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <LocationsSection />
      <HowItWorksSection />
      <PartnersSection />
      <Footer />
      <BackToTop />
    </main>
  );
};

export default Index;