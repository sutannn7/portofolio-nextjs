"use client";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function BadgeLanyard() {
  return (
    <div className="hidden xl:block fixed right-12 top-32 z-30">
      {/* Tali Gantungan */}
      <div className="w-0.5 h-24 bg-neutral-800 mx-auto" />

      {/* Kartu ID — hanya dipakai di Home */}
      <motion.div
        drag
        dragConstraints={{ top: 0, bottom: 50, left: -20, right: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ cursor: "grabbing" }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
        className="w-56 p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-xl shadow-lg cursor-grab text-center space-y-3"
      >
        <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center mx-auto text-neutral-300">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">
            Sutan Akbar Dwi Nugraha
          </h4>
          <p className="text-xs text-neutral-400 mt-0.5">Manajemen Informatika</p>
        </div>
        <div className="pt-2 border-t border-neutral-800 text-[11px] font-medium text-neutral-300 uppercase tracking-widest">
          Polsri • Verified
        </div>
      </motion.div>
    </div>
  );
}
