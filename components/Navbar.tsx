"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { usePageTransition } from "./TransitionProvider";

const TABS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { navigate } = usePageTransition();

  const onClick = (e: React.MouseEvent, href: string) => {
    // Biarkan ctrl/cmd/shift-klik membuka tab baru seperti biasa
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <>
      {/* Desktop */}
      <nav className="fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-xl md:flex">
        {TABS.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              onClick={(e) => onClick(e, t.href)}
              className={`relative px-5 py-2 text-sm transition-colors ${
                active ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile */}
      <nav
        className="fixed inset-x-3 bottom-3 z-50 flex rounded-2xl border border-white/10 bg-black/60 p-1.5 backdrop-blur-xl md:hidden"
        style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
      >
        {TABS.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              onClick={(e) => onClick(e, t.href)}
              className={`relative flex-1 py-2.5 text-center text-[11px] ${
                active ? "text-white" : "text-white/60"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill-m"
                  className="absolute inset-0 rounded-xl bg-white/15"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
