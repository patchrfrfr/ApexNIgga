"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  scale?: number;
  perspective?: number;
}

export function TiltCard({
  children,
  className = "",
  tiltAmount = 10,
  scale = 1.02,
  perspective = 1000,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    setRotateX(-y * tiltAmount);
    setRotateY(x * tiltAmount);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? scale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      }}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {/* Inner glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] opacity-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(
            600px circle at ${50 + rotateY * 5}% ${50 - rotateX * 5}%,
            rgba(255, 255, 255, 0.03),
            transparent 40%
          )`,
        }}
      />
      {children}
    </motion.div>
  );
}
