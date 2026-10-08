"use client";
import { motion } from "framer-motion";
import { FolderGit2, GraduationCap, Music, Trophy } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ease, ENTER_DELAY } from "@/lib/motion";

const items = [
  {
    year: "2026",
    title: "Website Profil Jurusan MI Polsri",
    meta: "Proyek Mandiri",
    desc: "Membangun website profil jurusan dengan HTML, CSS, PHP Native, dan MySQL, dari desain antarmuka hingga backend.",
    icon: FolderGit2,
  },
  {
    year: "2025",
    title: "Nusantara Kopi",
    meta: "Proyek Tim (4 orang) • Event SINTAK",
    desc: "Mendesain dan mengimplementasikan frontend website produk kopi, lalu mempublikasikannya melalui Vercel.",
    icon: FolderGit2,
  },
  {
    year: "2024 – Sekarang",
    title: "D-IV Manajemen Informatika",
    meta: "Politeknik Negeri Sriwijaya",
    desc: "Mahasiswa semester 5 dengan IPK 3,55 / 4,00 (hingga Semester 4).",
    icon: GraduationCap,
  },
  {
    year: "2022",
    title: "Juara 1 E-Sport PUBG Mobile",
    meta: "MADAGASCAR (HUT RI ke-77) • OSIS SMA Negeri 10 Palembang",
    desc: "Memimpin tim sebagai in-game leader dalam menyusun strategi dan membagi peran hingga juara 1.",
    icon: Trophy,
  },
  {
    year: "2021 – 2024",
    title: "Gitaris Band",
    meta: "SMA Negeri 10 Palembang",
    desc: "Tampil sebagai gitaris pada acara pentas seni dan lomba 17 Agustus.",
    icon: Music,
  },
];

export default function ExperienceSection() {
  return (
    <div className="space-y-6 pb-12 xl:pr-72">
      <PageHeader
        title="Experience"
        subtitle="Perjalanan proyek, pendidikan, prestasi, dan aktivitas saya."
      />

      <div className="relative pl-8 md:pl-10">
        {/* Garis timeline yang tergambar */}
        <motion.div
          aria-hidden
          className="absolute bottom-2 left-3 top-2 w-px origin-top bg-linear-to-b from-emerald-500/70 to-transparent md:left-4"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: ENTER_DELAY + 0.5, duration: 1.6, ease }}
        />

        <div className="space-y-6">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title} delay={0.2 + i * 0.1} from="right">
                <div className="relative">
                  <span className="absolute -left-8.5 top-5 grid h-7 w-7 place-items-center rounded-full border border-neutral-800 bg-neutral-900 md:-left-10.5">
                    <Icon className="h-3.5 w-3.5 text-emerald-400" />
                  </span>
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 backdrop-blur transition-colors hover:border-neutral-700">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-semibold text-white">{it.title}</p>
                      <span className="font-mono text-xs text-neutral-400">
                        {it.year}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-neutral-400">{it.meta}</p>
                    <p className="mt-3 max-w-prose text-sm leading-relaxed text-neutral-300">
                      {it.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
