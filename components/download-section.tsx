"use client";

import { Download } from "lucide-react";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { MagneticButton } from "./magnetic-button";
import { TiltCard } from "./tilt-card";
import { TextRevealLine } from "./text-reveal";
import { Counter, CounterText } from "./counter";
import { useSounds } from "./sound-provider";

export function DownloadSection() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const { playClick, playWhoosh } = useSounds();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  const rawRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-1.5, 0, 1.5]);
  
  const y = useSpring(rawY, { stiffness: 100, damping: 30 });
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30 });
  const rotate = useSpring(rawRotate, { stiffness: 100, damping: 30 });

  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      id="download"
      ref={containerRef}
      className="relative py-48 lg:py-64 px-6 overflow-hidden"
    >
      {/* Background elements */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y: bgY }}
      >
        <span className="text-[35vw] font-bold text-white/[0.01] tracking-tighter">
          GET
        </span>
      </motion.div>

      <motion.div
        ref={cardRef}
        className="relative z-10 max-w-6xl mx-auto"
        style={{ y, scale, rotateZ: rotate }}
      >
        {/* Outer glow */}
        <motion.div 
          className="absolute -inset-2 rounded-[40px] bg-white/[0.02] blur-3xl transition-all duration-700"
          animate={{ opacity: isHovered ? 0.06 : 0.02 }}
        />

        <TiltCard tiltAmount={4} scale={1.01}>
          <motion.div
            className="relative liquid-glass-strong rounded-3xl lg:rounded-[32px] overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Top shine */}
            <div className="absolute top-0 left-10 right-10 h-px bg-white/10" />

            <div className="p-14 lg:p-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                
                {/* Left content */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    <span className="inline-block text-xs text-white/30 uppercase tracking-[0.3em] mb-8">
                      Download
                    </span>
                  </motion.div>

                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-8 text-foreground leading-[0.95]">
                    <TextRevealLine delay={0}>Ready to</TextRevealLine>
                    <br />
                    <span className="text-white/40">
                      <TextRevealLine delay={0.15}>dominate?</TextRevealLine>
                    </span>
                  </h2>

                  <motion.p
                    className="text-lg text-white/30 max-w-md font-light leading-relaxed mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.25 }}
                  >
                    Join the elite. One click to change everything. No complicated setup, no hassle.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.35 }}
                  >
                    <MagneticButton href="#" strength={0.25}>
                      <span 
                        className="group inline-flex items-center gap-5 primary-button px-12 py-6 rounded-2xl text-lg font-medium"
                        onClick={() => { playClick(); playWhoosh(); }}
                      >
                        <Download 
                          className="w-5 h-5 transition-all duration-500 group-hover:translate-y-0.5" 
                          strokeWidth={1.5} 
                        />
                        <span>Download Apex</span>
                      </span>
                    </MagneticButton>
                    <p className="mt-8 text-sm text-white/20 font-light">
                      Windows 10 & 11 supported
                    </p>
                  </motion.div>
                </div>

                {/* Right side - Stats */}
                <motion.div
                  className="grid grid-cols-2 gap-5"
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {[
                    { value: 50000, suffix: "+", label: "Active Users", delay: 0 },
                    { value: 0, suffix: "", label: "Detections", delay: 0.1 },
                    { text: "24/7", label: "Support", delay: 0.2 },
                    { text: "5min", label: "Setup Time", delay: 0.3 },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="liquid-glass rounded-2xl p-8 text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.4 + stat.delay }}
                      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                    >
                      <div className="text-3xl lg:text-4xl font-medium text-foreground mb-3">
                        {'value' in stat ? (
                          <Counter value={stat.value} suffix={stat.suffix} delay={0.5 + stat.delay} />
                        ) : (
                          <CounterText value={stat.text!} delay={0.5 + stat.delay} />
                        )}
                      </div>
                      <div className="text-xs text-white/25 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </TiltCard>
      </motion.div>
    </section>
  );
}
