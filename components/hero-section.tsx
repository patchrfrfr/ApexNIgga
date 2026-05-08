"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { MagneticButton } from "./magnetic-button";
import { TextRevealLine } from "./text-reveal";
import { useSounds } from "./sound-provider";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playClick, playWhoosh } = useSounds();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative h-[110vh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-[#030305]/70" />
      </motion.div>

      {/* Background image fallback/overlay */}
      <div 
        className="absolute inset-0 z-[1] opacity-30"
        style={{
          backgroundImage: "url('/root-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[2] bg-[#030305]/50" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y, opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 liquid-glass px-5 py-2.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-white/50 font-light tracking-wide">Undetected</span>
          </div>
        </motion.div>

        <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-medium tracking-[-0.03em] text-foreground mb-8 leading-[0.95]">
          <span className="block overflow-hidden">
            <TextRevealLine delay={0.7}>Market Leading</TextRevealLine>
          </span>
          <span className="block text-white/30 overflow-hidden">
            <TextRevealLine delay={0.85}>External</TextRevealLine>
          </span>
        </h1>

        <motion.p
          className="text-base sm:text-lg text-white/35 max-w-xl mx-auto mb-14 leading-relaxed font-light"
          initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
        >
          Experience unmatched precision and performance with Apex. 
          The most advanced solution trusted by thousands worldwide.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
        >
          <MagneticButton href="#download" strength={0.3}>
            <span 
              className="primary-button px-14 py-5 rounded-full text-base font-medium inline-block"
              onClick={() => { playClick(); playWhoosh(); }}
            >
              Download Now
            </span>
          </MagneticButton>
          <MagneticButton href="#features" strength={0.3}>
            <span 
              className="liquid-glass-button px-14 py-5 rounded-full text-base font-medium text-foreground inline-block"
              onClick={playClick}
            >
              Learn More
            </span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-white/20" />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#030305] to-transparent z-[3]" />
    </section>
  );
}
