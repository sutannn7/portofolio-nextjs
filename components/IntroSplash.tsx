"use client";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ease } from "@/lib/motion";

const BOOT = [
  "> inisialisasi portfolio v2.0",
  "> memuat React · Next.js · Tailwind · Framer Motion",
  "> menyiapkan antarmuka...  OK",
];
const NAME_1 = "SUTAN AKBAR";
const NAME_2 = "DWI NUGRAHA";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/";
const TOTAL = 4.2; // detik

// Di luar komponen: tidak ter-reset oleh Strict Mode
let introFinished = false;

function scramble(target: string, frame: number, startAt: number) {
  return target
    .split("")
    .map((ch, i) => {
      if (ch === " ") return " ";
      if (frame >= startAt + i * 2) return ch;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

export default function IntroSplash() {
  const [show, setShow] = useState(!introFinished);
  const [lines, setLines] = useState(0);
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [decoded, setDecoded] = useState(false);

  // Semua hook di level atas
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const progress = useTransform(count, (v) => v / 100);

  const finish = () => {
    introFinished = true;
    setShow(false);
  };

  useEffect(() => {
    if (introFinished) return;

    document.body.style.overflow = "hidden";
    setLines(0);
    setN1("");
    setN2("");
    setDecoded(false);
    count.set(0);

    const timers: ReturnType<typeof setTimeout>[] = [];
    let iv: ReturnType<typeof setInterval> | undefined;

    // Baris terminal
    timers.push(setTimeout(() => setLines(1), 300));
    timers.push(setTimeout(() => setLines(2), 900));
    timers.push(setTimeout(() => setLines(3), 1500));

    // Decode nama
    timers.push(
      setTimeout(() => {
        let frame = 0;
        iv = setInterval(() => {
          frame++;
          setN1(scramble(NAME_1, frame, 6));
          setN2(scramble(NAME_2, frame, 6 + NAME_1.length * 2));
          if (frame > 6 + (NAME_1.length + NAME_2.length) * 2 + 4) {
            clearInterval(iv);
            setN1(NAME_1);
            setN2(NAME_2);
            setDecoded(true);
          }
        }, 38);
      }, 1900),
    );

    // Hitungan persen
    const controls = animate(count, 100, {
      duration: TOTAL,
      ease: [0.65, 0, 0.35, 1],
    });

    // Selesai
    timers.push(setTimeout(finish, (TOTAL + 0.5) * 1000));

    return () => {
      controls.stop();
      if (iv) clearInterval(iv);
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-100"
          exit={{ opacity: 1, transition: { duration: 1.1 } }}
        >
          {/* Dua panel yang terbelah */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-neutral-950"
            exit={{ y: "-100%", transition: { duration: 1, ease } }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-neutral-950"
            exit={{ y: "100%", transition: { duration: 1, ease } }}
          />

          {/* Garis cahaya di tengah saat terbelah */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-px bg-emerald-500 shadow-[0_0_20px_4px_rgba(16,185,129,0.5)]"
            initial={{ scaleX: 0, opacity: 0 }}
            exit={{
              scaleX: [0, 1, 1],
              opacity: [0, 1, 0],
              transition: { duration: 1, times: [0, 0.4, 1] },
            }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-6"
            exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.45 } }}
          >
            {/* Grid + cahaya latar */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage:
                  "radial-gradient(ellipse at center, black 20%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 20%, transparent 70%)",
              }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute h-112 w-md rounded-full bg-emerald-900/15 blur-3xl"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, 1.2, 1], opacity: 1 }}
              transition={{ duration: 2.6, ease }}
            />

            {/* Terminal */}
            <div className="relative mb-10 h-20 w-full max-w-md font-mono text-[11px] leading-6 text-emerald-400/70 md:text-sm">
              {BOOT.slice(0, lines).map((l, i) => (
                <motion.p
                  key={l}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={
                    i === lines - 1 ? "text-emerald-300" : "text-emerald-400/40"
                  }
                >
                  {l}
                  {i === lines - 1 && !decoded && (
                    <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-emerald-300 align-middle" />
                  )}
                </motion.p>
              ))}
            </div>

            {/* Nama (decode) */}
            <div
              className="relative flex flex-col items-center font-heading text-4xl font-bold leading-none tracking-tight md:text-6xl"
              aria-label="Sutan Akbar Dwi Nugraha"
            >
              <p className="text-white">{n1 || "\u00A0"}</p>
              <p className="mt-2 text-emerald-400">
                {n2 || "\u00A0"}
              </p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={decoded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease }}
              className="relative mt-6 text-center text-xs tracking-[0.3em] text-neutral-400 md:text-sm"
            >
              WEB DEVELOPER · POLSRI
            </motion.p>

            {/* Counter */}
            <div className="absolute inset-x-6 bottom-8 flex items-end justify-between md:inset-x-12 md:bottom-12">
              <div className="text-xs tracking-widest text-neutral-400">
                PORTFOLIO V2.0
              </div>
              <div className="flex items-baseline gap-1 font-mono text-5xl font-bold text-white md:text-7xl">
                <motion.span>{rounded}</motion.span>
                <span className="text-xl text-emerald-400">%</span>
              </div>
            </div>

            {/* Skip */}
            <button
              onClick={finish}
              className="absolute right-6 top-6 rounded-full border border-neutral-700 px-4 py-1.5 text-xs tracking-widest text-neutral-400 transition-colors hover:border-emerald-500/50 hover:text-white md:right-12 md:top-10"
            >
              SKIP →
            </button>

            {/* Progress bar */}
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-neutral-800">
              <motion.div
                className="h-full origin-left bg-emerald-500"
                style={{ scaleX: progress }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
