"use client";
import { useState, useEffect, useRef } from "react";

const TYPING_SPEED = 70;
const DELETING_SPEED = 40;
const PAUSE_BEFORE_DELETE = 1200;

interface TypewriterProps {
  words: string[];
}

export default function Typewriter({ words }: TypewriterProps) {
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const reduced = useRef(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    if (reduced.current) return;

    const currentWord = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      timeout = setTimeout(() => {
        if (!deleting) {
          setText(currentWord.slice(0, text.length + 1));
          if (text === currentWord) {
            setTimeout(() => setDeleting(true), PAUSE_BEFORE_DELETE);
          }
        } else {
          setText(currentWord.slice(0, text.length - 1));
          if (text === "") {
            setDeleting(false);
            setWordIndex((i) => (i + 1) % words.length);
          }
        }
        tick();
      }, deleting ? DELETING_SPEED : TYPING_SPEED);
    };

    tick();
    return () => clearTimeout(timeout);
  }, [words, wordIndex, deleting, text]);

  if (reduced.current) {
    return <>
      {words[wordIndex]}
      <span className="inline-block w-[2px] h-[1em] align-middle ml-[2px] bg-[var(--text-muted)]" style={{ animation: "blink 1s steps(1) infinite" }} />
    </>;
  }

  return (
    <>
      {text}
      <span
        className="inline-block w-[2px] h-[1em] align-middle ml-[2px] bg-[var(--text-muted)]"
        style={{ animation: "blink 0.7s steps(1) infinite" }}
        aria-hidden="true"
      />
    </>
  );
}
