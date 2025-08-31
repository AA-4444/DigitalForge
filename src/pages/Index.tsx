import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import AwardsButton from "@/components/AwardsButton";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-background font-depo relative">
      <Navigation />
      <main>
        <section id="home">
          <HeroSection />
        </section>

        <section id="about">
          <WhatWeDoSection />
        </section>

        <section id="services">
          <ServicesSection />
        </section>

        <section id="contact">
          <Footer />
        </section>
      </main>
      <AwardsButton />
    </div>
  );
};

export default Index;