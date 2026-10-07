import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import TransitionProvider from "@/components/TransitionProvider";
import Shell from "@/components/Shell";

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
    <html lang="id">
      <body className="bg-neutral-950 text-gray-200 antialiased">
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
