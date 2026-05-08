"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MagneticButton } from "./magnetic-button";
import { useSounds } from "./sound-provider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { playClick, playHover } = useSounds();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Initial full-width navbar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: scrolled ? 0 : 1,
          y: scrolled ? -30 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        style={{ pointerEvents: scrolled ? "none" : "auto" }}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-8 h-28">
          <Link href="/" className="flex items-center gap-4" onClick={playClick}>
            <Image
              src="/favicon.ico"
              alt="Apex"
              width={44}
              height={44}
              className="rounded-xl"
            />
            <span className="text-xl font-semibold tracking-tight text-white">
              Apex
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-16">
            {["Features", "Showcase", "Download"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[15px] text-white/50 hover:text-white transition-colors duration-300"
                onMouseEnter={playHover}
                onClick={playClick}
              >
                {item}
              </Link>
            ))}
          </div>

          <MagneticButton href="#download" strength={0.25}>
            <span 
              className="px-8 py-4 rounded-full text-[15px] font-medium bg-white text-[#030305] inline-block"
              onClick={playClick}
            >
              Get Started
            </span>
          </MagneticButton>
        </nav>
      </motion.header>

      {/* Floating pill navbar */}
      <AnimatePresence>
        {scrolled && (
          <motion.header
            className="fixed top-8 left-1/2 z-50"
            initial={{ opacity: 0, y: -40, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <nav 
              className="flex items-center gap-12 px-10 py-5 rounded-full"
              style={{
                background: "rgba(255, 255, 255, 0.025)",
                backdropFilter: "blur(100px) saturate(200%)",
                WebkitBackdropFilter: "blur(100px) saturate(200%)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.04),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.1),
                  0 0 0 1px rgba(255, 255, 255, 0.02),
                  0 40px 80px -16px rgba(0, 0, 0, 0.6)
                `,
              }}
            >
              <Link href="/" className="flex items-center gap-3" onClick={playClick}>
                <Image
                  src="/favicon.ico"
                  alt="Apex"
                  width={36}
                  height={36}
                  className="rounded-xl"
                />
                <span className="text-lg font-semibold tracking-tight text-white">
                  Apex
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-12">
                {["Features", "Showcase", "Download"].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                    onMouseEnter={playHover}
                    onClick={playClick}
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <MagneticButton href="#download" strength={0.2}>
                <span 
                  className="ml-4 px-7 py-3 rounded-full text-sm font-medium bg-white text-[#030305] inline-block"
                  onClick={playClick}
                >
                  Get Started
                </span>
              </MagneticButton>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}
