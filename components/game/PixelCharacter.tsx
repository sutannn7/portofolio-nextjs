"use client";

import { useEffect, useState } from "react";

export default function PixelCharacter() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 16;
      const newPos = { ...position };

      switch (e.key) {
        case "ArrowLeft":
          newPos.x = Math.max(0, position.x - step);
          setDirection("left");
          e.preventDefault();
          break;
        case "ArrowRight":
          newPos.x = Math.min(100 - 8, position.x + step);
          setDirection("right");
          e.preventDefault();
          break;
        case "ArrowUp":
          newPos.y = Math.max(0, position.y - step);
          e.preventDefault();
          break;
        case "ArrowDown":
          newPos.y = Math.min(100 - 8, position.y + step);
          e.preventDefault();
          break;
        case "Escape":
          window.location.href = "/";
          return;
      }

      setPosition(newPos);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [position]);

  return (
    <div
      className="absolute transition-all duration-100"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
      }}
    >
      {/* 8x8 pixel character sprite */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 8 8"
        className="w-8 h-8 pixel-art"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Head */}
        <rect x="2" y="0" width="4" height="2" fill="var(--pixel-yellow)" />
        {/* Eyes */}
        <rect x="2" y="1" width="1" height="1" fill="var(--pixel-dark)" />
        <rect x="5" y="1" width="1" height="1" fill="var(--pixel-dark)" />
        {/* Body */}
        <rect x="1" y="2" width="6" height="3" fill="var(--pixel-cyan)" />
        {/* Arms */}
        <rect x="0" y="2" width="1" height="2" fill="var(--pixel-yellow)" />
        <rect x="7" y="2" width="1" height="2" fill="var(--pixel-yellow)" />
        {/* Legs */}
        <rect x="2" y="5" width="1" height="3" fill="var(--pixel-magenta)" />
        <rect x="5" y="5" width="1" height="3" fill="var(--pixel-magenta)" />
      </svg>
    </div>
  );
}
