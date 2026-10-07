"use client";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

export default function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.4 });
  const background = useMotionTemplate`radial-gradient(500px circle at ${sx}px ${sy}px, rgba(34,211,238,0.12), transparent 60%)`;

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
