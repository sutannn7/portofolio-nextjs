export interface Project {
  id: string;
  title: string;
  short: string;
  type: string;
  year: string;
  highlights: string[];
  stack: string[];
  image?: string; // <-- baris baru
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: "polsri",
    title: "Website Profil Jurusan Manajemen Informatika Polsri",
    short:
      "Website profil jurusan dengan data dosen dan berita dinamis, dikerjakan sendiri dari desain sampai backend.",
    type: "Proyek Mandiri",
    year: "2026",
    highlights: [
      "Mengembangkan website dengan halaman beranda, profil, dosen, mahasiswa, galeri, berita, dan kontak yang responsif di laptop maupun smartphone.",
      "Membangun fitur backend untuk menampilkan data dosen dan berita secara dinamis, serta menyimpan pesan dari form kontak ke database.",
      "Menyelesaikan seluruh tahap pengembangan secara mandiri, mulai dari desain antarmuka hingga implementasi backend.",
    ],
    stack: ["HTML", "CSS", "PHP Native", "MySQL"],
    // image: "/projects/polsri.jpg", // aktifkan setelah screenshot ada
    github: "https://github.com/sutannn7/web-informatika-mi-polsri",
  },
  {
    id: "kopi",
    title: "Nusantara Kopi",
    short:
      "Website produk kopi hasil kerja tim 4 orang untuk event SINTAK, sudah online di Vercel.",
    type: "Proyek Tim (4 orang) • Event SINTAK",
    year: "2025",
    highlights: [
      "Mendesain dan mengimplementasikan frontend website produk kopi, mencakup tata letak halaman, komponen tampilan, dan interaksi pengguna.",
      "Berkolaborasi dalam tim 4 orang dan mempublikasikan website melalui Vercel sehingga dapat diakses publik.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
    image: "/projects/kopi.jpg",
    demo: "https://nusantara-kopi.vercel.app",
  },
];
