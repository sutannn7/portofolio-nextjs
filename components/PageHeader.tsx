"use client";
import { motion } from "framer-motion";
import { ease, ENTER_DELAY } from "@/lib/motion";

export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const words = title.split(" ");

  return (
    <header className="mb-10 space-y-4">
      <h2 className="flex flex-wrap gap-x-4 font-heading text-4xl font-bold leading-tight tracking-tight text-neutral-100 md:text-5xl">
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
        className="h-0.5 w-24 origin-left bg-emerald-500/80"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: ENTER_DELAY + 0.4, duration: 1, ease }}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ENTER_DELAY + 0.6, duration: 0.7, ease }}
          className="max-w-[65ch] text-pretty text-sm leading-relaxed text-neutral-300"
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}
