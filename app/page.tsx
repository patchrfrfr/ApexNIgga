"use client";

import { CustomCursor } from "@/components/custom-cursor";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SoundProvider } from "@/components/sound-provider";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { ShowcaseSection } from "@/components/showcase-section";
import { DownloadSection } from "@/components/download-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <SoundProvider enabled={true}>
      <SmoothScrollProvider>
        <main className="relative min-h-screen overflow-x-hidden bg-[#030305]">
          <CustomCursor />
          <Navbar />
          <HeroSection />
          <FeaturesSection />
          <ShowcaseSection />
          <DownloadSection />
          <Footer />
        </main>
      </SmoothScrollProvider>
    </SoundProvider>
  );
}
