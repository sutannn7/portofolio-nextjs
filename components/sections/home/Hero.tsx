"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "@/components/ui/CountUp";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

type Stat = {
  value: string;
  count?: number;
  decimals?: number;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  { value: "3.55", count: 3.55, decimals: 2, suffix: "/ 4.00", label: "IPK" },
  { value: "2", count: 2, decimals: 0, suffix: "", label: "Project" },
  { value: "1st", suffix: "", label: "Juara 1 PUBG Mobile" },
];

const primaryBtn =
  "inline-flex min-h-11 items-center justify-center rounded-pill bg-ink px-6 text-body font-semibold text-surface transition-colors hover:bg-highlight hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const secondaryBtn =
  "inline-flex min-h-11 items-center justify-center rounded-pill border border-line bg-transparent px-6 text-body font-semibold text-ink transition-colors hover:bg-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.section
      ref={ref}
      aria-labelledby="hero-title"
      className="pb-[clamp(4rem,8vw,7rem)] pt-40 md:pt-[clamp(4rem,8vw,7rem)]"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6">

        <motion.h1
          id="hero-title"
          className="max-w-4xl text-h1 font-normal leading-[0.95] tracking-[-0.055em] text-ink"
          variants={itemVariants}
        >
          Hi, I&apos;m Sutan Akbar
        </motion.h1>

        <motion.p
          className="max-w-[65ch] text-body text-ink-muted"
          variants={itemVariants}
        >
          Saya membangun web yang rapi dan interaktif, dari antarmuka sampai
          database, dengan React, Next.js, Tailwind CSS, PHP, dan MySQL.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3"
          variants={itemVariants}
        >
          <Link href="/projects" className={primaryBtn}>
            Lihat Project
          </Link>
          <Link href="/contact" className={secondaryBtn}>
            Hubungi Saya
          </Link>
        </motion.div>

        <motion.dl
          className="mt-6 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className="flex flex-col-reverse gap-1"
              variants={itemVariants}
            >
              <dt className="text-label font-semibold text-ink-muted">
                {s.label}
              </dt>
              <dd className="text-h2 font-normal tracking-[-0.02em] text-ink">
                {s.count !== undefined ? (
                  <CountUp to={s.count} decimals={s.decimals} />
                ) : (
                  s.value
                )}
                {s.suffix && (
                  <span className="ml-1 text-body text-ink-muted">
                    {s.suffix}
                  </span>
                )}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </motion.section>
  );
}
