import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import TransitionProvider from "@/components/TransitionProvider";
import Shell from "@/components/Shell";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
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
    <html lang="id" className={`${sora.variable} ${dmSans.variable}`}>
      <body className="bg-neutral-950 font-sans text-neutral-100 antialiased selection:bg-emerald-500/20 selection:text-white">
        <MotionProvider>
          <TransitionProvider>
            <Shell />
            <main className="mx-auto max-w-6xl px-5 pb-28 pt-28 md:pb-16">
              {children}
            </main>
          </TransitionProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
