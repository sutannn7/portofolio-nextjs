"use client";
import { FolderGit2, GraduationCap, Music, Trophy } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

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
    <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-32">
      <PageHeader
        title="Experience"
        subtitle="Perjalanan proyek, pendidikan, prestasi, dan aktivitas saya."
      />

      <div className="relative pl-12 md:pl-14">
        {/* Garis timeline */}
        <div
          aria-hidden
          className="absolute bottom-2 left-4 top-2 w-px bg-line md:left-5"
        />

        <div className="space-y-6">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title}>
                <div className="relative">
                  <span className="absolute -left-12 top-8 grid h-8 w-8 place-items-center rounded-pill border border-line bg-surface md:-left-14">
                    <Icon className="h-4 w-4 text-ink" />
                  </span>
                  <div className="rounded-3xl bg-surface p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-h3 text-ink">{it.title}</p>
                      <span className="text-label text-ink-muted">
                        {it.year}
                      </span>
                    </div>
                    <p className="mt-1 text-label text-ink-muted">{it.meta}</p>
                    <p className="mt-4 max-w-[65ch] text-pretty text-body text-ink-muted">
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
