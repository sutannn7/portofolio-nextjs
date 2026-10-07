"use client";
import { User, GraduationCap, Award, Cpu } from "lucide-react";
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

export default function AboutSection() {
  return (
    <div className="space-y-12 pb-12 text-gray-200 xl:pr-72">
      <PageHeader
        index="01"
        title="About Me"
        subtitle="Ringkasan profesional dan latar belakang akademis saya."
        icon={<User className="h-4 w-4" />}
      />

      <Reveal delay={0.1}>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <p className="leading-relaxed text-gray-300">
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

      <section className="space-y-4">
        <Reveal delay={0.15}>
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
            <GraduationCap className="h-6 w-6 text-cyan-400" /> Pendidikan
          </h3>
        </Reveal>
        <Reveal delay={0.2} from="left">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-medium text-white">
                D-IV Manajemen Informatika
              </p>
              <span className="font-mono text-xs text-cyan-400">
                2024 – Sekarang
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Politeknik Negeri Sriwijaya, Palembang
            </p>
            <p className="mt-2 text-sm text-cyan-400">
              IPK 3,55 / 4,00 (hingga Semester 4)
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.25} from="left">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-medium text-white">SMA Negeri 10 Palembang</p>
              <span className="font-mono text-xs text-cyan-400">
                2021 – 2024
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Jurusan Ilmu Pengetahuan Alam (IPA)
            </p>
          </div>
        </Reveal>
      </section>

      <section className="space-y-4">
        <Reveal delay={0.1}>
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
            <Cpu className="h-6 w-6 text-cyan-400" /> Keterampilan
          </h3>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((g, i) => (
            <Reveal key={g.title} delay={0.1 + (i % 2) * 0.1}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-cyan-400/40">
                <p className="mb-3 font-medium text-white">{g.title}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="mb-3 font-medium text-white">Soft Skill</p>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-300"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Bahasa: Indonesia (aktif), Inggris (pasif)
            </p>
          </div>
        </Reveal>
      </section>

      <section className="space-y-4">
        <Reveal>
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
            <Award className="h-6 w-6 text-cyan-400" /> Prestasi
          </h3>
        </Reveal>
        <Reveal delay={0.1} from="right">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-medium text-white">
                Juara 1 Lomba E-Sport PUBG Mobile
              </p>
              <span className="font-mono text-xs text-cyan-400">2022</span>
            </div>
            <p className="text-sm text-gray-400">
              MADAGASCAR (HUT RI ke-77), OSIS SMA Negeri 10 Palembang
            </p>
            <p className="mt-2 text-sm text-gray-300">
              Memimpin tim sebagai ketua tim (in-game leader) dalam menyusun
              strategi dan membagi peran hingga meraih juara 1.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
