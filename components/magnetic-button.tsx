"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      className={className}
    >
      <motion.div
        animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
        transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
