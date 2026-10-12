"use client";

import { useEffect, useState, type AnimationEvent } from "react";
import "./intro-overlay.css";

const KEY = "intro-seen";

function markSeen() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* sessionStorage tidak tersedia: abaikan */
  }
}

export default function IntroOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Hanya MEMBACA tanda di sini. Menulis tanda di effect membuat intro
    // hilang di mode dev karena React Strict Mode menjalankan effect dua kali.
    try {
      if (sessionStorage.getItem(KEY)) {
        setShow(false);
        return;
      }
    } catch {
      /* tetap tampilkan intro */
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        markSeen();
        setShow(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!show) return null;

  const close = () => {
    markSeen();
    setShow(false);
  };

  return (
    <div
      className="intro-overlay"
      aria-hidden="true"
      onClick={close}
      onAnimationEnd={(e: AnimationEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <p className="intro-line">
        <span className="intro-word">Sutan Akbar</span>
      </p>
    </div>
  );
}
