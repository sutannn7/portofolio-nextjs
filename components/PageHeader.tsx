"use client";
import { motion } from "framer-motion";
import { ease, ENTER_DELAY } from "@/lib/motion";

export default function PageHeader({
  index,
  title,
  subtitle,
  icon,
}: {
  index: string; // contoh: "01"
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}) {
  const words = title.split(" ");

  return (
    <header className="mb-10 space-y-4">
      <motion.p
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: ENTER_DELAY, duration: 0.6, ease }}
        className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-cyan-400"
      >
        {icon}
        {index} — {title.toUpperCase()}
      </motion.p>

      <h2 className="flex flex-wrap gap-x-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
        {words.map((w, i) => (
          <span key={i} className="overflow-hidden pb-1">
            <motion.span
              className="inline-block"
              initial={{ y: "115%", rotate: 4 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{
                delay: ENTER_DELAY + 0.1 + i * 0.12,
                duration: 0.9,
                ease,
              }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.div
        className="h-px w-40 origin-left bg-linear-to-r from-cyan-400 via-blue-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: ENTER_DELAY + 0.4, duration: 1, ease }}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ENTER_DELAY + 0.6, duration: 0.7, ease }}
          className="max-w-xl text-gray-400"
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}
