import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LocationsSection } from "@/components/LocationsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PartnersSection } from "@/components/PartnersSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LocationsSection />
      <HowItWorksSection />
      <PartnersSection />
      <Footer />
    </main>
  );
};

export default Index;