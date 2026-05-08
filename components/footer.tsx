"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Footer() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.footer
      ref={containerRef}
      className="relative py-20 lg:py-32 px-6"
      style={{ y, opacity }}
    >
      {/* Top border with glow */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-white/[0.06]" />
      <div className="absolute top-0 left-1/3 right-1/3 h-px bg-white/[0.03] blur-sm" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center gap-3 mb-12">
              <Image
                src="/favicon.ico"
                alt="Apex Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl font-medium text-foreground">Apex</span>
            </Link>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {["Features", "Interface", "Download"].map((item, i) => (
              <Link
                key={item}
                href={`#${item === "Interface" ? "showcase" : item.toLowerCase()}`}
                className="text-sm text-white/30 hover:text-white/70 transition-colors duration-300 font-light"
              >
                {item}
              </Link>
            ))}
          </motion.nav>

          {/* Tagline */}
          <motion.p
            className="text-white/20 font-light mb-16 max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Built for those who refuse to settle.
          </motion.p>

          {/* Copyright */}
          <motion.div
            className="text-xs text-white/15 font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {new Date().getFullYear()} Apex. All rights reserved.
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
