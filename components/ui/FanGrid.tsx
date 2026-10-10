"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export default function FanGrid({ children, className }: Props) {
  const ref = useRef<HTMLOListElement>(null);
  const [fanned, setFanned] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFanned(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={ref} data-fan={fanned ? "on" : "off"} className={className}>
      {children}
    </ol>
  );
}
