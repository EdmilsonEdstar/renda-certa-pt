
"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 16 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        ease: "easeOut",
      }}
      className={`rounded-xl border border-border bg-card p-5 shadow-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}
