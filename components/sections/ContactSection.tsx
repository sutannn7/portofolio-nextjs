"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Globe, Send } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

type Status = "idle" | "sending" | "ok" | "error";

const field =
  "w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white placeholder:text-neutral-500 outline-none transition-colors focus:border-emerald-500/60";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xeaeeeyv", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="pb-12 xl:pr-72">
      <PageHeader
        title="Contact Me"
        subtitle="Punya tawaran magang, proyek, atau ingin berkolaborasi? Hubungi saya melalui kontak di bawah ini."
      />

      <div className="grid gap-6 md:grid-cols-[1fr_1.6fr]">
        <Reveal from="left" delay={0.1}>
          <div className="h-full space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold text-white">
              Informasi Kontak
            </h3>
            <p className="flex items-center gap-3 text-sm text-neutral-300">
              <MapPin className="h-4 w-4 shrink-0 text-neutral-400" /> Palembang,
              Sumatera Selatan
            </p>
            <a
              href="mailto:Akbarcool998@gmail.com"
              className="flex items-center gap-3 text-sm text-neutral-300 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0 text-neutral-400" />{" "}
              Akbarcool998@gmail.com
            </a>
            <a
              href="tel:+6285758292876"
              className="flex items-center gap-3 text-sm text-neutral-300 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0 text-neutral-400" />{" "}
              0857-5829-2876
            </a>
            <div className="space-y-3 border-t border-neutral-800 pt-4">
              <a
                href="https://github.com/sutannn7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-neutral-300 transition-colors hover:text-white"
              >
                <Globe className="h-4 w-4 shrink-0" /> github.com/sutannn7
              </a>
              <a
                href="https://www.linkedin.com/in/sutan-akbar-dwi-nugraha-193010442"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-neutral-300 transition-colors hover:text-white"
              >
                <Globe className="h-4 w-4 shrink-0" /> LinkedIn: Sutan Akbar Dwi
                Nugraha
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal from="right" delay={0.2}>
          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm text-neutral-300"
              >
                Nama Anda
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Masukkan nama..."
                className={field}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm text-neutral-300"
              >
                Email Anda
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="nama@email.com"
                className={field}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm text-neutral-300"
              >
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tuliskan pesan atau tawaran kerjasama magang..."
                className={field}
              />
            </div>

            <button
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 font-semibold text-neutral-950 transition-colors hover:bg-emerald-400 disabled:opacity-50"
            >
              {status === "sending" ? "Mengirim…" : "Kirim Pesan"}
              <Send className="h-4 w-4" />
            </button>

            <AnimatePresence mode="wait">
              {status === "ok" && (
                <motion.p
                  key="ok"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-sm text-emerald-400"
                >
                  Terkirim! Terima kasih, saya akan segera membalas.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  key="er"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-sm text-red-400"
                >
                  Gagal mengirim, coba lagi.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
