"use client";
import { motion } from "framer-motion";
import { ease, ENTER_DELAY } from "@/lib/motion";

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
  const x = from === "left" ? "-40px" : from === "right" ? "40px" : "0px";
  const y = from === "up" ? "40px" : "0px";

  return (
    <motion.div
      className={className}
      initial={{ opacity: "0", x, y, filter: "blur(10px)" }}
      whileInView={{ opacity: "1", x: "0px", y: "0px", filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: ENTER_DELAY + delay, duration: 0.9, ease }}
    >
      {children}
    </motion.div>
  );
}
