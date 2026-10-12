"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";


export default function Hero3DBackground() {
  const [isSupported, setIsSupported] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("webgl2");
      if (!gl) {
        console.warn("❌ WebGL not supported");
        setIsSupported(false);
        return;
      }
      console.log("✅ WebGL supported - Canvas will render");
    } catch (e) {
      console.warn("❌ WebGL detection error:", e);
      setIsSupported(false);
      return;
    }

    // Device memory check (optional, can disable for testing)
    const nav = navigator as any;
    console.log(
      `📊 Device memory: ${nav.deviceMemory || "unknown"}GB`
    );
  }, []);

  if (!mounted) {
    return null; // Loading state
  }

  if (!isSupported) {
    // Fallback: pastel gradient background
    console.log("🎨 Rendering fallback gradient");
    return (
      <div
        className="hero-3d-background-fallback"
        aria-hidden="true"
      />
    );
  }

  console.log("🎬 Rendering 3D Canvas");
  return (
    <div className="hero-3d-background" aria-hidden="true">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          style={{
            background: "transparent",
            width: "100%",
            height: "100%",
          }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          gl={{ antialias: true }}
        >\
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
}
