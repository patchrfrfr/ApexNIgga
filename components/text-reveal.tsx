"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
  by?: "char" | "word";
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  once = true,
  by = "char",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const items = by === "char" ? children.split("") : children.split(" ");

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {items.map((item, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * (by === "char" ? 0.02 : 0.08),
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {item === " " ? "\u00A0" : item}
            {by === "word" && i < items.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface TextRevealLineProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function TextRevealLine({
  children,
  className = "",
  delay = 0,
  once = true,
}: TextRevealLineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%", rotateX: -80 }}
        animate={isInView ? { y: 0, rotateX: 0 } : {}}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.215, 0.61, 0.355, 1],
        }}
        style={{ transformOrigin: "bottom" }}
      >
        {children}
      </motion.span>
    </span>
  );
}
