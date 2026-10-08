"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Download, ArrowRight, Mail } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import Magnetic from "@/components/Magnetic";
import CountUp from "@/components/CountUp";

interface HomeSectionProps {
  setActiveSection: (section: string) => void;
}

const roles = ["Web Developer", "Frontend Developer", "UI Enthusiast"];

const stats = [
  { label: "IPK", to: 3.55, decimals: 2, suffix: " / 4.00" },
  { label: "Project", to: 2, decimals: 0, suffix: "" },
  { label: "Juara 1 PUBG Mobile", to: 1, decimals: 0, suffix: "st" },
];

export default function HomeSection({ setActiveSection }: HomeSectionProps) {
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [ri, setRi] = useState(0);

  useEffect(() => {
    const full = roles[ri];
    const t = setTimeout(
      () => {
        if (!deleting) {
          setText(full.slice(0, text.length + 1));
          if (text === full) setTimeout(() => setDeleting(true), 1500);
        } else {
          setText(full.slice(0, text.length - 1));
          if (text === "") {
            setDeleting(false);
            setRi((p) => (p + 1) % roles.length);
          }
        }
      },
      deleting ? 40 : 80,
    );
    return () => clearTimeout(t);
  }, [text, deleting, ri]);

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.15 }}
      className="flex min-h-[70vh] max-w-2xl flex-col justify-center space-y-8"
    >
      <motion.div
        variants={fadeUp}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-300"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Terbuka untuk magang & kolaborasi
        <Sparkles className="h-3.5 w-3.5 text-neutral-400" />
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="font-heading text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl"
      >
        Hi, I&apos;m{" "}
        <span className="text-white">Sutan Akbar</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="font-heading text-xl font-semibold text-neutral-200 md:text-2xl"
      >
        {text}
        <span className="animate-pulse text-neutral-500">|</span>
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="max-w-[58ch] text-pretty leading-relaxed text-neutral-300"
      >
        Saya membangun web yang rapi dan interaktif, dari antarmuka sampai
        database, dengan React, Next.js, Tailwind CSS, PHP, dan MySQL.
      </motion.p>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
        <Magnetic>
          <button
            onClick={() => setActiveSection("projects")}
            className="group flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-emerald-400"
          >
            Lihat Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Magnetic>
        <Magnetic>
          <a
            href="/cv.pdf"
            download
            className="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/60 px-6 py-3 text-sm text-neutral-100 backdrop-blur transition-colors hover:border-neutral-600 hover:bg-neutral-800"
          >
            <Download className="h-4 w-4" /> Download CV
          </a>
        </Magnetic>
        <Magnetic>
          <button
            onClick={() => setActiveSection("contact")}
            className="flex items-center gap-2 rounded-full px-6 py-3 text-sm text-neutral-300 transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4" /> Hubungi Saya
          </button>
        </Magnetic>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 pt-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 backdrop-blur transition-colors hover:border-neutral-700"
          >
            <p className="font-heading text-2xl font-bold text-white md:text-3xl">
              <CountUp to={s.to} decimals={s.decimals} />
              <span className="text-sm font-medium text-neutral-400">
                {s.suffix}
              </span>
            </p>
            <p className="mt-1 text-[11px] font-medium text-neutral-400 md:text-xs">
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
