"use client";
import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export default function CountUp({
  to,
  decimals = 0,
  duration = 1.6,
}: {
  to: number;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const c = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = v.toFixed(decimals)),
    });
    return () => c.stop();
  }, [inView, to, decimals, duration]);

  return <span ref={ref}>0</span>;
}
