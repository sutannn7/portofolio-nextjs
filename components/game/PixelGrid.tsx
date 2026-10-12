"use client";

export default function PixelGrid() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[var(--pixel-purple)] via-[var(--pixel-dark)] to-[var(--pixel-dark)]">
      {/* Grid pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="var(--pixel-cyan)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-repeat-y opacity-[0.03]" style={{
          backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 2px)"
        }} />
      </div>
    </div>
  );
}
