"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, FolderGit2, Code2 } from "lucide-react";
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
        index="03"
        title="Projects"
        subtitle="Klik kartu untuk melihat detail proyek."
        icon={<FolderGit2 className="h-4 w-4" />}
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
                className="group h-full w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur transition-colors hover:border-cyan-400/40"
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className="font-mono text-xs text-cyan-400">
                    0{i + 1} • {p.year}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-gray-500 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-400" />
                </div>
                <motion.h3
                  layoutId={`title-${p.id}`}
                  className="text-xl font-semibold text-white"
                >
                  {p.title}
                </motion.h3>
                <p className="mt-1 text-xs text-cyan-400/80">{p.type}</p>
                <p className="mt-3 text-sm text-gray-400">{p.short}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-gray-300"
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
                className="pointer-events-auto max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-neutral-950 p-6 md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${selected.id}`}
                      className="text-2xl font-semibold text-white"
                    >
                      {selected.title}
                    </motion.h3>
                    <p className="mt-1 text-sm text-cyan-400">
                      {selected.type} • {selected.year}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Tutup"
                    className="rounded-full border border-white/10 p-2 text-gray-400 transition-colors hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.5, ease },
                  }}
                >
                  <p className="mb-2 mt-6 text-xs tracking-widest text-gray-500">
                    YANG SAYA KERJAKAN
                  </p>
                  <ul className="space-y-3">
                    {selected.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 text-sm leading-relaxed text-gray-300"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <p className="mb-2 mt-6 text-xs tracking-widest text-gray-500">
                    TECH STACK
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-300"
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
                        className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black"
                      >
                        Live Demo <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    {selected.github && (
                      <a
                        href={selected.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition-colors hover:border-cyan-400/60"
                      >
                        <Code2 className="h-4 w-4" /> GitHub
                      </a>
                    )}
                    <button
                      onClick={() => setSelected(null)}
                      className="rounded-full px-5 py-2.5 text-sm text-gray-400 hover:text-white"
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
