import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorkoutsSection from "@/components/WorkoutsSection";
import PremiumSection from "@/components/PremiumSection";
import CalculatorSection from "@/components/CalculatorSection";
import NutritionSection from "@/components/NutritionSection";
import AIChatbot from "@/components/AIChatbot";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <WorkoutsSection />
      <PremiumSection />
      <CalculatorSection />
      <NutritionSection />
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Index;
