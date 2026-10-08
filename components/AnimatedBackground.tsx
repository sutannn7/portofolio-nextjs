"use client";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-neutral-950"
    >
      <motion.div
        className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-emerald-950/25 blur-3xl"
        animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-emerald-900/15 blur-3xl"
        animate={{ x: [0, -100, 0], y: [0, -80, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
