"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

const LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/experience": "Experience",
  "/projects": "Projects",
  "/contact": "Contact",
};

const STRIPS = 5;

type Ctx = { navigate: (href: string) => void };
const TransitionCtx = createContext<Ctx>({ navigate: () => {} });
export const usePageTransition = () => useContext(TransitionCtx);

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [cover, setCover] = useState(false);
  const [origin, setOrigin] = useState<"bottom" | "top">("bottom");
  const [label, setLabel] = useState("");
  const pending = useRef<string | null>(null);
  const busy = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      if (busy.current || href === pathname) return;
      busy.current = true;
      pending.current = href;
      setLabel(LABELS[href] ?? "");
      setOrigin("bottom");
      setCover(true);

      // Dorong URL setelah tirai menutup
      setTimeout(() => router.push(href), 750);

      // Pengaman: buka tirai kalau navigasi gagal
      setTimeout(() => {
        if (pending.current) {
          pending.current = null;
          setOrigin("top");
          setCover(false);
          busy.current = false;
        }
      }, 3500);
    },
    [pathname, router],
  );

  // Halaman baru sudah tampil: buka tirai
  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    window.scrollTo({ top: 0 });
    const t = setTimeout(() => {
      setOrigin("top");
      setCover(false);
      setTimeout(() => (busy.current = false), 900);
    }, 250);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <TransitionCtx.Provider value={{ navigate }}>
      {children}

      <div
        aria-hidden
        className={`fixed inset-0 z-80 flex ${
          cover ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {Array.from({ length: STRIPS }).map((_, i) => (
          <motion.div
            key={i}
            className="h-full flex-1 bg-neutral-950"
            style={{ transformOrigin: origin }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: cover ? 1 : 0 }}
            transition={{
              duration: 0.65,
              ease,
              delay: (origin === "bottom" ? i : STRIPS - 1 - i) * 0.06,
            }}
          />
        ))}

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: cover ? 1 : 0 }}
          transition={{ duration: 0.35, delay: cover ? 0.35 : 0 }}
        >
          <p className="mb-3 text-[10px] tracking-[0.4em] text-cyan-400">
            MENUJU
          </p>
          <p className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl">
            {label}
          </p>
          <div className="mt-6 h-px w-24 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />
        </motion.div>
      </div>
    </TransitionCtx.Provider>
  );
}
