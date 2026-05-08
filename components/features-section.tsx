"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { TiltCard } from "./tilt-card";
import { Counter, CounterText } from "./counter";
import { TextRevealLine } from "./text-reveal";

export function FeaturesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [3, -3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative py-48 lg:py-64 px-6 overflow-hidden"
    >
      {/* Massive floating text background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ y: y2 }}
      >
        <span className="text-[25vw] font-bold text-white/[0.012] tracking-tighter whitespace-nowrap">
          APEX
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] text-foreground mb-6">
            <TextRevealLine delay={0}>Built for Perfection</TextRevealLine>
          </h2>
          <motion.p 
            className="text-white/30 text-lg max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every feature designed with precision. Every update crafted for excellence.
          </motion.p>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-12 gap-5 lg:gap-7">
          
          {/* Large feature - spans 8 columns */}
          <motion.div
            className="col-span-12 lg:col-span-8"
            style={{ y: y1, rotateZ: rotate1 }}
          >
            <TiltCard className="h-full">
              <FeatureCard 
                title="Undetected Since Day One"
                subtitle="Zero detections"
                description="Our proprietary protection system has maintained a perfect track record. Advanced driver-level security combined with constant updates keeps you invisible."
                large
              />
            </TiltCard>
          </motion.div>

          {/* Stacked cards - spans 4 columns */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-5 lg:gap-7">
            <motion.div style={{ y: y2, rotateZ: rotate2 }}>
              <TiltCard tiltAmount={15}>
                <div className="liquid-glass-strong rounded-2xl lg:rounded-3xl p-10 h-full min-h-[180px] flex flex-col justify-center relative overflow-hidden">
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl lg:text-7xl font-medium text-foreground">
                      <Counter value={0} duration={1.5} />
                    </span>
                    <span className="text-3xl text-white/40">ms</span>
                  </div>
                  <p className="text-sm text-white/30 mt-3 font-light">Input Latency</p>
                </div>
              </TiltCard>
            </motion.div>
            <motion.div style={{ y: y3, rotateZ: rotate1 }}>
              <TiltCard tiltAmount={15}>
                <div className="liquid-glass-strong rounded-2xl lg:rounded-3xl p-10 h-full min-h-[180px] flex flex-col justify-center relative overflow-hidden">
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl lg:text-7xl font-medium text-foreground">
                      <Counter value={50} suffix="K" duration={2} />
                    </span>
                    <span className="text-3xl text-white/40">+</span>
                  </div>
                  <p className="text-sm text-white/30 mt-3 font-light">Active Users</p>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* Three medium cards */}
          <motion.div 
            className="col-span-12 md:col-span-4"
            style={{ y: y3 }}
          >
            <TiltCard className="h-full">
              <FeatureCard 
                title="Smart Prediction"
                description="Advanced algorithms that adapt to any situation in real-time. Machine learning powered."
              />
            </TiltCard>
          </motion.div>
          
          <motion.div 
            className="col-span-12 md:col-span-4"
            style={{ y: y1 }}
          >
            <TiltCard className="h-full">
              <FeatureCard 
                title="Resource Efficient"
                description="Uses less than 1% CPU. Your performance stays exactly where it should be."
              />
            </TiltCard>
          </motion.div>
          
          <motion.div 
            className="col-span-12 md:col-span-4"
            style={{ y: y2 }}
          >
            <TiltCard className="h-full">
              <FeatureCard 
                title="Instant Updates"
                description="Game patches? We update within hours, not days. Always ahead of the curve."
              />
            </TiltCard>
          </motion.div>

          {/* Full width feature */}
          <motion.div 
            className="col-span-12"
            style={{ scale }}
          >
            <TiltCard tiltAmount={5}>
              <div className="liquid-glass-strong rounded-2xl lg:rounded-3xl p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-4xl font-medium text-foreground mb-4">
                    <TextRevealLine delay={0}>Built Different</TextRevealLine>
                  </h3>
                  <p className="text-white/30 font-light max-w-xl text-lg">
                    Every line of code is written with one goal: perfection. No compromises, no shortcuts, no excuses.
                  </p>
                </div>
                <div className="flex items-center gap-12 lg:gap-16">
                  {[
                    { value: "24/7", label: "Support" },
                    { value: "99.9%", label: "Uptime" },
                    { value: "5min", label: "Setup" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl lg:text-4xl font-medium text-foreground">
                        <CounterText value={stat.value} delay={i * 0.15} />
                      </div>
                      <div className="text-xs text-white/25 mt-2 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  subtitle,
  description,
  large = false,
}: {
  title: string;
  subtitle?: string;
  description?: string;
  large?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <div className={`liquid-glass-strong rounded-2xl lg:rounded-3xl h-full ${large ? 'p-12 lg:p-16' : 'p-10'}`}>
        {subtitle && (
          <span className="inline-block text-xs text-white/40 uppercase tracking-wider mb-5">{subtitle}</span>
        )}
        <h3 className={`font-medium text-foreground mb-5 ${large ? 'text-3xl lg:text-4xl' : 'text-xl lg:text-2xl'}`}>
          {title}
        </h3>
        {description && (
          <p className={`text-white/30 font-light leading-relaxed ${large ? 'text-base lg:text-lg max-w-2xl' : 'text-sm lg:text-base'}`}>
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
