"use client";
import { motion } from "framer-motion";

const techs = [
  "React.js",
  "Next.js App Router",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "JavaScript",
  "Git & GitHub",
  "Formspree",
];

export default function TechMarquee() {
  return (
    <div className="py-8 overflow-hidden border-y border-neutral-800/60 my-12 bg-neutral-950/40 backdrop-blur-sm">
      <div className="flex gap-8 whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-8 items-center text-sm font-semibold text-neutral-400"
        >
          {[...techs, ...techs].map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
