"use client";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

export default function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 200, damping: 20 });
  const spy = useSpring(py, { stiffness: 200, damping: 20 });
  const rotateY = useTransform(spx, [0, 1], [-10, 10]);
  const rotateX = useTransform(spy, [0, 1], [10, -10]);
  const gx = useTransform(spx, (v) => `${v * 100}%`);
  const gy = useTransform(spy, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(260px circle at ${gx} ${gy}, rgba(16,185,129,0.08), transparent 60%)`;

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full"
      >
        {children}
        <motion.div
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 rounded-2xl"
        />
      </motion.div>
    </div>
  );
}
