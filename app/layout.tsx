import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import TransitionProvider from "@/components/TransitionProvider";
import Shell from "@/components/Shell";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sutan Akbar - Portfolio",
  description:
    "Portofolio Sutan Akbar Dwi Nugraha, mahasiswa D-IV Manajemen Informatika Polsri dan web developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={montserrat.variable}
    >
      <body className="bg-[var(--color-bg)] font-sans text-[var(--color-ink)] antialiased selection:bg-[var(--color-highlight)]/30 selection:text-[var(--color-ink)]">
        <a
           href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--color-white)]"
        >
          Lewati ke konten utama
        </a>
        <MotionProvider>
          <TransitionProvider>
            <Shell />
            <main
              id="main-content"
              className="mx-auto px-5 pb-16 md:px-8"
            >
              {children}
            </main>
          </TransitionProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
