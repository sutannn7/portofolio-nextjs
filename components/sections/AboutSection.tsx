"use client";
import { GraduationCap, Award, Cpu } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

const skills = [
  {
    title: "Bahasa Pemrograman",
    items: ["Java", "PHP", "Python", "JavaScript", "C++"],
  },
  {
    title: "Web & Frontend",
    items: [
      "HTML",
      "CSS",
      "Bootstrap",
      "Next.js (belajar)",
      "Tailwind CSS (belajar)",
      "Framer Motion (belajar)",
    ],
  },
  {
    title: "Mobile & Database",
    items: ["Android Studio", "MySQL", "Oracle (dasar)"],
  },
  {
    title: "Tools",
    items: ["VS Code", "XAMPP", "phpMyAdmin", "Git", "GitHub"],
  },
  { title: "Analisis & Perancangan", items: ["UML", "ERD", "DFD"] },
  {
    title: "Pendukung",
    items: [
      "Jaringan Komputer (dasar)",
      "Penyusunan laporan",
      "Microsoft Excel (dasar)",
    ],
  },
];

const softSkills = [
  "Kerja tim & kepemimpinan",
  "Komunikasi & negosiasi",
  "Pengambilan keputusan",
  "Berpikir kritis",
  "Kreatif",
  "Bertanggung jawab",
];

const card = "rounded-3xl bg-surface p-8";
const pill =
  "rounded-pill border border-line px-3 py-1 text-label text-ink-muted";
const sectionTitle = "flex items-center gap-3 text-h2 text-ink";

export default function AboutSection() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-16 px-6 pb-16 pt-12">
      <PageHeader
        title="About Me"
        subtitle="Ringkasan profesional dan latar belakang akademis saya."
      />

      <Reveal>
        <div className={card}>
          <p className="max-w-[65ch] text-pretty text-body text-ink-muted">
            Mahasiswa semester 5 D-IV Manajemen Informatika Politeknik Negeri
            Sriwijaya dengan dasar yang baik di pengembangan web (HTML, CSS,
            PHP, MySQL), pengembangan aplikasi Android, analisis sistem, dan
            basis data. Telah menyelesaikan satu proyek web full-stack secara
            mandiri dan satu proyek frontend dalam tim yang dipublikasikan
            secara online. Antusias mempelajari teknologi baru dan siap
            berkontribusi sebagai peserta magang di bidang Teknologi Informasi /
            Sistem Informasi PT Pupuk Sriwijaya Palembang.
          </p>
        </div>
      </Reveal>

      <section className="space-y-6">
        <Reveal>
          <h2 className={sectionTitle}>
            <GraduationCap className="h-6 w-6" /> Pendidikan
          </h2>
        </Reveal>
        <Reveal>
          <div className={card}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-h3 text-ink">D-IV Manajemen Informatika</p>
              <span className="text-label text-ink-muted">2024 – Sekarang</span>
            </div>
            <p className="mt-1 text-body text-ink-muted">
              Politeknik Negeri Sriwijaya, Palembang
            </p>
            <p className="mt-4 inline-block rounded-pill bg-highlight px-3 py-1 text-label font-semibold text-ink">
              IPK 3,55 / 4,00 (hingga Semester 4)
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className={card}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-h3 text-ink">SMA Negeri 10 Palembang</p>
              <span className="text-label text-ink-muted">2021 – 2024</span>
            </div>
            <p className="mt-1 text-body text-ink-muted">
              Jurusan Ilmu Pengetahuan Alam (IPA)
            </p>
          </div>
        </Reveal>
      </section>

      <section className="space-y-6">
        <Reveal>
          <h2 className={sectionTitle}>
            <Cpu className="h-6 w-6" /> Keterampilan
          </h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((g) => (
            <Reveal key={g.title} className="h-full">
              <div className={`${card} h-full`}>
                <p className="mb-4 text-h3 text-ink">{g.title}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className={pill}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className={card}>
            <p className="mb-4 text-h3 text-ink">Soft Skill</p>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((s) => (
                <span
                  key={s}
                  className="rounded-pill bg-highlight px-3 py-1 text-label text-ink"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-6 text-body text-ink-muted">
              Bahasa: Indonesia (aktif), Inggris (pasif)
            </p>
          </div>
        </Reveal>
      </section>

      <section className="space-y-6">
        <Reveal>
          <h2 className={sectionTitle}>
            <Award className="h-6 w-6" /> Prestasi
          </h2>
        </Reveal>
        <Reveal>
          <div className={card}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-h3 text-ink">
                Juara 1 Lomba E-Sport PUBG Mobile
              </p>
              <span className="text-label text-ink-muted">2022</span>
            </div>
            <p className="mt-1 text-body text-ink-muted">
              MADAGASCAR (HUT RI ke-77), OSIS SMA Negeri 10 Palembang
            </p>
            <p className="mt-4 max-w-[65ch] text-pretty text-body text-ink-muted">
              Memimpin tim sebagai ketua tim (in-game leader) dalam menyusun
              strategi dan membagi peran hingga meraih juara 1.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
