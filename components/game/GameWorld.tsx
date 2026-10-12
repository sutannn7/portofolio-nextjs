"use client";

import { useEffect, useState } from "react";
import PixelGrid from "./PixelGrid";
import PixelCharacter from "./PixelCharacter";

export default function GameWorld() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative w-full h-screen bg-[var(--pixel-dark)] overflow-hidden font-[var(--font-pixelify)]">
      {/* Canvas layer */}
      <PixelGrid />

      {/* Character layer */}
      <div className="absolute inset-0 pointer-events-none">
        <PixelCharacter />
      </div>

      {/* UI overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-[calc(var(--px)*2)]">
        <div className="text-[var(--pixel-cyan)] text-sm tracking-wider">
          DUNIA PIXEL v0.1
        </div>
        <div className="text-[var(--pixel-lime)] text-xs text-right">
          Press ESC to exit
        </div>
      </div>
    </div>
  );
}
