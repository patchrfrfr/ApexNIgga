"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { TiltCard } from "./tilt-card";
import { TextRevealLine } from "./text-reveal";

export function ShowcaseSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(imageRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const rawRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const rawRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.85]);
  
  const y = useSpring(rawY, { stiffness: 100, damping: 30 });
  const rotateX = useSpring(rawRotateX, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(rawRotateY, { stiffness: 100, damping: 30 });
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30 });

  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative py-48 lg:py-64 px-6 overflow-hidden min-h-screen flex items-center"
    >
      {/* Massive background text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y: textY, opacity: textOpacity }}
      >
        <span className="text-[30vw] font-bold text-white/[0.015] tracking-tighter">
          UI
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left side - Text content */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span 
              className="inline-block text-xs text-white/30 uppercase tracking-[0.3em] mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Interface
            </motion.span>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight mb-10 text-foreground leading-[0.95]">
              <TextRevealLine delay={0}>Designed for</TextRevealLine>
              <br />
              <span className="text-white/40">
                <TextRevealLine delay={0.15}>precision</TextRevealLine>
              </span>
            </h2>
            
            <motion.p 
              className="text-lg text-white/30 max-w-md font-light leading-relaxed mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              viewport={{ once: true }}
            >
              Every pixel is intentional. Clean, minimal, and built for users who demand the absolute best.
            </motion.p>

            {/* Feature list */}
            <motion.div 
              className="space-y-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              viewport={{ once: true }}
            >
              {[
                "Fully customizable overlay",
                "Real-time configuration",
                "Hotkey everything",
              ].map((feature, i) => (
                <motion.div 
                  key={feature}
                  className="flex items-center gap-5"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-px bg-white/20" />
                  <span className="text-base text-white/50 font-light">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Image with 3D effect */}
          <motion.div
            ref={imageRef}
            className="order-1 lg:order-2"
            style={{ perspective: 2000 }}
          >
            <motion.div
              style={{ y, rotateX, rotateY, scale }}
              className="relative"
            >
              {/* Multiple glow layers */}
              <div className="absolute -inset-24 rounded-[50px] bg-white/[0.01] blur-3xl" />
              <div className="absolute -inset-12 rounded-[40px] bg-white/[0.015] blur-2xl" />

              {/* Main glass container */}
              <TiltCard tiltAmount={8} scale={1.03}>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative liquid-glass-strong rounded-2xl lg:rounded-3xl p-3 lg:p-4"
                >
                  {/* Inner container with image */}
                  <div className="relative aspect-[4/3] rounded-xl lg:rounded-2xl overflow-hidden bg-[#080809]">
                    <Image
                      src="/ui.png"
                      alt="Apex User Interface"
                      fill
                      className="object-cover object-center"
                      priority
                    />
                    {/* Subtle vignette */}
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
                  </div>

                  {/* Glass shine effect on top edge */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-white/10 rounded-full" />
                </motion.div>
              </TiltCard>

              {/* Floating indicator */}
              <motion.div
                className="absolute -bottom-8 -right-8 lg:-bottom-10 lg:-right-10 liquid-glass px-6 py-4 rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-white/60 font-light">Live Preview</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
