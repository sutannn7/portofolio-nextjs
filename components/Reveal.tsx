"use client";
import { motion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  from = "up",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "up" | "left" | "right";
  className?: string;
}) {
  const x = from === "left" ? -10 : from === "right" ? 10 : 0;
  const y = from === "up" ? 10 : 0;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay, duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}