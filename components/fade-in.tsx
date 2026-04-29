"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "none";
}

export default function FadeIn({
  children,
  delay = 0,
  className,
  direction = "up",
}: FadeInProps) {
  const initial =
    direction === "up"
      ? { opacity: 0, y: 24 }
      : direction === "left"
      ? { opacity: 0, x: -24 }
      : { opacity: 0 };

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
