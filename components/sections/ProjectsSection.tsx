"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Code2 } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import { stagger, fadeUp, ease } from "@/lib/motion";
import TiltCard from "@/components/TiltCard";
import PageHeader from "@/components/PageHeader";

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section className="pb-12 xl:pr-72">
      <PageHeader
        title="Projects"
        subtitle="Klik kartu untuk melihat detail proyek."
      />

      <motion.div
        variants={stagger(0.15)}
        initial="initial"
        animate="animate"
        className="grid gap-6 md:grid-cols-2"
      >
        {projects.map((p, i) => (
          <motion.div key={p.id} variants={fadeUp}>
            <TiltCard>
              <motion.button
                layoutId={`card-${p.id}`}
                onClick={() => setSelected(p)}
                whileTap={{ scale: 0.98 }}
                className="group h-full w-full rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 text-left backdrop-blur transition-colors hover:border-neutral-700"
              >
                {/* BLOK GAMBAR DI KARTU */}
                {p.image && (
                  <div className="relative mb-5 aspect-video overflow-hidden rounded-xl border border-neutral-800">
                    <Image
                      src={p.image}
                      alt={`Tampilan ${p.title}`}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="mb-6 flex items-start justify-between">
                  <span className="font-mono text-xs text-neutral-400">
                    0{i + 1} • {p.year}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-neutral-500 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-neutral-300" />
                </div>
                <motion.h3
                  layoutId={`title-${p.id}`}
                  className="text-xl font-semibold text-white"
                >
                  {p.title}
                </motion.h3>
                <p className="mt-1 text-xs text-neutral-400">{p.type}</p>
                <p className="mt-3 max-w-[65ch] text-pretty text-sm leading-relaxed text-neutral-300">{p.short}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-neutral-800 bg-neutral-800 px-2.5 py-1 text-[11px] text-neutral-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.button>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <div
              key="modal"
              className="pointer-events-none fixed inset-0 z-70 grid place-items-center p-4"
            >
              <motion.div
                layoutId={`card-${selected.id}`}
                role="dialog"
                aria-modal="true"
                className="pointer-events-auto max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-neutral-800 bg-neutral-950 p-6 md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${selected.id}`}
                      className="text-2xl font-semibold text-white"
                    >
                      {selected.title}
                    </motion.h3>
                    <p className="mt-1 text-sm text-neutral-400">
                      {selected.type} • {selected.year}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Tutup"
                    className="rounded-full border border-neutral-800 p-2 text-neutral-400 transition-colors hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* BLOK GAMBAR DI MODAL */}
                {selected.image && (
                  <div className="relative mt-5 aspect-video overflow-hidden rounded-xl border border-neutral-800">
                    <Image
                      src={selected.image}
                      alt={`Tampilan ${selected.title}`}
                      fill
                      sizes="(min-width: 768px) 42rem, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.5, ease },
                  }}
                >
                  <p className="mb-2 mt-6 text-xs tracking-widest text-neutral-500">
                    YANG SAYA KERJAKAN
                  </p>
                  <ul className="space-y-3">
                    {selected.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 text-sm leading-relaxed text-neutral-300"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <p className="mb-2 mt-6 text-xs tracking-widest text-neutral-500">
                    TECH STACK
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {selected.demo && (
                      <a
                        href={selected.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-emerald-400"
                      >
                        Live Demo <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    {selected.github && (
                      <a
                        href={selected.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-sm text-neutral-100 transition-colors hover:border-neutral-600"
                      >
                        <Code2 className="h-4 w-4" /> GitHub
                      </a>
                    )}
                    <button
                      onClick={() => setSelected(null)}
                      className="rounded-full px-5 py-2.5 text-sm text-neutral-400 hover:text-white"
                    >
                      Tutup
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
