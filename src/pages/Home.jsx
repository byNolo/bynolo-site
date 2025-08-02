import React from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import GradientMesh from "../components/GradientMesh";
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-16">
      {/* Interactive Backgrounds */}
      <GradientMesh />
      <AnimatedBackground />
      
      {/* Main Content */}
      <HeroSection />
    </div>
  );
}
