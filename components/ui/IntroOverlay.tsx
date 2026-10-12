"use client";

import { useEffect, useState, type AnimationEvent } from "react";
import "./intro-overlay.css";

const KEY = "intro-seen";

export default function IntroOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) {
        setShow(false);
        return;
      }
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* sessionStorage tidak tersedia: tetap tampilkan intro sekali */
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShow(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!show) return null;

  return (
    <div
      className="intro-overlay"
      aria-hidden="true"
      onClick={() => setShow(false)}
      onAnimationEnd={(e: AnimationEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) setShow(false);
      }}
    >
      <p className="intro-line">
        <span className="intro-word">Sutan Akbar</span>
      </p>
    </div>
  );
}
