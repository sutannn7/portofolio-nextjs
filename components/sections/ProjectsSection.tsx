"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Code2 } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

const pill =
  "rounded-pill border border-line px-3 py-1 text-label text-ink-muted";

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
    <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-32">
      <PageHeader
        title="Projects"
        subtitle="Klik kartu untuk melihat detail proyek."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <Reveal key={p.id} className="h-full">
            <button
              onClick={() => setSelected(p)}
              className="group h-full w-full rounded-3xl bg-surface p-6 text-left transition-opacity hover:opacity-90"
            >
              {p.image && (
                <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl">
                  <Image
                    src={p.image}
                    alt={`Tampilan ${p.title}`}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              )}

              <div className="flex items-start justify-between gap-4">
                <h2 className="text-h3 text-ink">{p.title}</h2>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-ink" />
              </div>
              <p className="mt-1 text-label text-ink-muted">
                {p.type} • {p.year}
              </p>
              <p className="mt-4 max-w-[65ch] text-pretty text-body text-ink-muted">
                {p.short}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className={pill}>
                    {s}
                  </span>
                ))}
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-60 bg-ink/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelected(null)}
            />
            <div
              key="modal"
              className="pointer-events-none fixed inset-0 z-70 grid place-items-center p-4"
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="pointer-events-auto max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-surface p-6 md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-h2 text-ink">{selected.title}</h2>
                    <p className="mt-2 text-label text-ink-muted">
                      {selected.type} • {selected.year}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Tutup"
                    className="rounded-pill border border-line p-2 text-ink transition-opacity hover:opacity-70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {selected.image && (
                  <div className="relative mt-6 aspect-video overflow-hidden rounded-2xl">
                    <Image
                      src={selected.image}
                      alt={`Tampilan ${selected.title}`}
                      fill
                      sizes="(min-width: 768px) 42rem, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                )}

                <h3 className="mt-8 text-h3 text-ink">Yang saya kerjakan</h3>
                <ul className="mt-3 space-y-3">
                  {selected.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-body text-ink-muted">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-pill bg-ink" />
                      {h}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-h3 text-ink">Tech stack</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-pill bg-highlight px-3 py-1 text-label text-ink"
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
                      className="flex items-center gap-2 rounded-pill bg-ink px-6 py-3 text-label font-semibold text-surface transition-opacity hover:opacity-85"
                    >
                      Live Demo <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {selected.github && (
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-pill border border-line px-6 py-3 text-label font-semibold text-ink transition-opacity hover:opacity-70"
                    >
                      <Code2 className="h-4 w-4" /> GitHub
                    </a>
                  )}
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-pill px-6 py-3 text-label font-semibold text-ink-muted transition-colors hover:text-ink"
                  >
                    Tutup
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
