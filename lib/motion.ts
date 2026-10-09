import type { Variants } from "framer-motion";

export const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// Jeda supaya animasi mulai saat tirai transisi sedang terbuka
export const ENTER_DELAY = 0.35;

export const stagger = (delay = 0.08, start = ENTER_DELAY): Variants => ({
  initial: {},
  animate: { transition: { staggerChildren: delay, delayChildren: start } },
});

export const fadeUp: Variants = {
  initial: { opacity: "0", y: "12px" },
  animate: {
    opacity: "1",
    y: "0px",
    transition: { duration: 0.5, ease },
  },
};

export const maskReveal: Variants = {
  initial: { y: "110%" },
  animate: { y: "0%", transition: { duration: 0.5, ease } },
};
