"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Globe, Send } from "lucide-react";
import Reveal from "@/components/Reveal";

type Status = "idle" | "sending" | "ok" | "error";

const field =
  "w-full rounded-skill border border-line bg-bg px-4 py-3 text-ink placeholder:text-ink-muted outline-none transition-colors focus:border-ink";

const linkClass =
  "flex items-center gap-3 text-body text-ink-muted transition-colors hover:text-ink";

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
    <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12">
      <h1 className="text-h1 text-ink">Hubungi saya</h1>
      <p className="mt-4 max-w-xl text-body text-ink-muted">
        Punya tawaran magang, proyek, atau ingin berkolaborasi? Hubungi saya
        melalui kontak di bawah ini.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-[1fr_1.6fr]">
        <Reveal from="left" delay={0.1}>
          <div className="h-full space-y-4 rounded-3xl bg-surface p-8">
            <h3 className="text-h3 font-semibold text-ink">Informasi Kontak</h3>
            <p className="flex items-center gap-3 text-body text-ink-muted">
              <MapPin className="h-4 w-4 shrink-0" /> Palembang, Sumatera
              Selatan
            </p>
            <a href="mailto:Akbarcool998@gmail.com" className={linkClass}>
              <Mail className="h-4 w-4 shrink-0" /> Akbarcool998@gmail.com
            </a>
            <a href="tel:+6285758292876" className={linkClass}>
              <Phone className="h-4 w-4 shrink-0" /> 0857-5829-2876
            </a>
            <div className="space-y-3 border-t border-line pt-4">
              <a
                href="https://github.com/sutannn7"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <Globe className="h-4 w-4 shrink-0" /> github.com/sutannn7
              </a>
              <a
                href="https://www.linkedin.com/in/sutan-akbar-dwi-nugraha-193010442"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <Globe className="h-4 w-4 shrink-0" /> LinkedIn: Sutan Akbar
                Dwi Nugraha
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal from="right" delay={0.2}>
          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-3xl bg-surface p-8"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-label font-semibold text-ink"
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
                className="mb-1.5 block text-label font-semibold text-ink"
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
                className="mb-1.5 block text-label font-semibold text-ink"
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
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-pill bg-ink py-3 text-label font-semibold text-surface transition-opacity hover:opacity-85 disabled:opacity-50"
            >
              {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
              <Send className="h-4 w-4" />
            </button>

            <AnimatePresence mode="wait">
              {status === "ok" && (
                <motion.p
                  key="ok"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-skill bg-highlight px-4 py-3 text-center text-label text-ink"
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
                  className="text-center text-label text-ink"
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