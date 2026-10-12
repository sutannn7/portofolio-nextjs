# DESIGN.md - Portofolio Sutan Akbar (v3: Dunia Game Pixel 8-bit)

> Versi: 3.0 | Tanggal: 2026-10-13 | Status: DRAF, perlu persetujuan pemilik sebelum jadi acuan kode
> Menggantikan: v2.1 (warm minimalism). v2.1 disimpan sebagai `DESIGN-v2.1.md` dan tetap berlaku untuk Mode Cepat.
> Stack: Next.js 16 (Cache Components) + Tailwind CSS v4
> Acuan: PRD Desain bagian 17. Referensi interaksi: rleonardi.com/interactive-resume (prinsip saja, bukan salinan).

---

## 1. Ruang lingkup dan hubungan dengan v2.1

- Dokumen ini mengatur **Dunia Game**: resume interaktif side-scrolling bergaya pixel 8-bit.
- **Mode Cepat** (halaman lama: Home, About, Experience, Projects, Contact) tetap mengikuti `DESIGN-v2.1.md` tanpa perubahan.
- Bila dua dokumen bertentangan: Dunia Game memakai v3, Mode Cepat memakai v2.1.
- Token v2.1 tetap ada dengan nilai yang sama: bg, surface, ink, ink-muted, line, highlight, mint, sky, butter, signal.

## 2. Prinsip

1. **Game hanya pembungkus.** Semua isi tetap teks HTML nyata, bukan gambar.
2. **Selalu ada jalan keluar.** Tombol Mode Cepat dan Download CV terlihat di setiap level.
3. **Pixel yang konsisten.** Satu grid piksel, tanpa blur, tanpa gradient halus.
4. **Teks selalu di panel solid.** Tidak pernah langsung di atas gambar latar.
5. **Jujur.** Tingkat keterampilan sesuai kenyataan, bukan demi tampilan.
6. **Gerak aman.** Tidak ada kedipan cepat, dan semua gerak mati pada reduced-motion.
7. **Gulir bawaan browser.** Tidak membajak roda mouse atau sentuhan.

## 3. Struktur dan rute

| Rute | Isi | Aturan |
|---|---|---|
| `/game` | Dunia Game (tahap pengembangan, tidak mengganggu situs live) | v3 |
| `/` (setelah lolos tes) | Dunia Game | v3 |
| `/cepat` (setelah lolos tes) | Home lama | v2.1 |
| `/about`, `/experience`, `/projects`, `/contact` | Mode Cepat, tidak diubah | v2.1 |

Tautan langsung ke halaman lama tetap berfungsi, jadi pengunjung yang datang dari CV atau pesan tetap mendapat isi. Nama `/cepat` adalah usulan.

## 4. Palet

Warna lama dipertahankan, tujuh warna baru ditambahkan untuk membangun dunia. Semua didaftarkan di `@theme` pada `globals.css`.

| Token | Nilai | Kelas Tailwind | Fungsi | Status |
|---|---|---|---|---|
| ink | #171313 | `text-ink`, `border-ink` | Garis tepi dan teks | lama |
| bg | #EFEAE9 | `bg-bg` | Latar HUD dan panel | lama |
| surface | #FFFFFF | `bg-surface` | Panel teks | lama |
| sky | #CFE2FF | `bg-sky` | Langit, latar panel | lama |
| sky-deep | #8FB8F0 | `bg-sky-deep` | Bayangan awan | baru |
| mint | #CDEBD8 | `bg-mint` | Bukit jauh, latar panel | lama |
| grass | #6FBF8E | `bg-grass` | Rumput | baru |
| grass-dark | #3F8F63 | `bg-grass-dark` | Bayangan rumput | baru |
| dirt | #B98B6A | `bg-dirt` | Tanah | baru |
| dirt-dark | #8C5E45 | `bg-dirt-dark` | Bayangan tanah | baru |
| butter | #FFEBA8 | `bg-butter` | Koin, matahari, latar panel | lama |
| gold | #F2B83B | `bg-gold` | Bayangan koin, trofi | baru |
| highlight | #FFC7D8 | `bg-highlight` | Aksen, hover, karakter | lama |
| pink-deep | #E56B8F | `bg-pink-deep` | Nyawa, bayangan karakter | baru |
| signal | #C8FF12 | `bg-signal` | Penanda 1UP, bukan teks | lama |

Aturan pemakaian:

- Teks dan ikon selalu `ink`.
- Latar panel boleh `surface`, `bg`, atau satu pastel (mint, sky, butter, highlight). Satu pastel per panel.
- `grass`, `grass-dark`, `dirt`, `dirt-dark`, `sky-deep`, `gold`, dan `pink-deep` hanya untuk pemandangan dan sprite, bukan latar teks.
- Kontras teks terhadap latar panel wajib minimal 4.5:1 dan diverifikasi saat implementasi.
- Warna di luar tabel ini dilarang.

## 5. Tipografi

- **Font piksel:** Pixelify Sans via `next/font/google`, variabel `--font-pixel`. Hanya untuk judul level, HUD, dan tombol. Cek lisensi dan ketersediaannya sebelum dipakai.
- **Font isi:** Montserrat 400 (600 untuk label) untuk semua teks di dalam panel.
- Fallback font piksel: `ui-monospace, system-ui, sans-serif`.

| Gaya | Font | Ukuran | Tinggi baris | Jarak huruf |
|---|---|---|---|---|
| game-title | piksel | clamp(2rem, 6vw, 3.5rem) | 1.1 | 0 |
| level-title | piksel | clamp(1.5rem, 4vw, 2.25rem) | 1.2 | 0 |
| hud | piksel | 0.875rem | 1.2 | 0 |
| body | Montserrat | 1.0625rem | 1.6 | normal |
| label | Montserrat | 0.78rem | normal | normal |

Aturan: font piksel tidak dipakai untuk paragraf, dan ukuran tidak boleh di bawah 14px.

## 6. Grid piksel, bentuk, dan jarak

- Satuan piksel logis `--px`: 4px di desktop, 3px di HP (lebar di bawah 640px).
- Sprite digambar di grid 16x16 (karakter) dan 32x32 (objek besar), diskalakan dengan `--px`.
- Garis tepi 4px solid `ink` pada panel, tombol, dan input. Sudut persegi, tanpa radius.
- **Bayangan keras** `4px 4px 0 var(--color-ink)`, tanpa blur. Ini satu-satunya shadow yang diizinkan di Dunia Game.
- Panel: latar surface atau satu pastel, padding 1.5rem.
- Tinggi dunia memakai `100svh`.
- Rendering sprite: SVG `shape-rendering: crispEdges`, gambar `image-rendering: pixelated`.

## 7. Dunia dan level

### 7.1 Mekanik gulir

- Wadah setinggi (4 level x 100svh) dengan kanvas `position: sticky` setinggi layar.
- Kemajuan `p` (0 sampai 1) dihitung dari posisi gulir dan ditulis ke variabel CSS `--p` lewat `requestAnimationFrame`. Dunia digeser `translateX` mengikuti `--p`.
- Gulir bawaan browser dipakai penuh, jadi roda mouse, sentuhan vertikal di HP, panah, PageDown, Space, Home, dan End langsung bekerja.
- Tiap level punya jangkar `#level-1` sampai `#level-4`.

### 7.2 Lapisan pemandangan

| Lapisan | Kecepatan | Isi |
|---|---|---|
| Langit | 0.2x | Awan, matahari |
| Bukit | 0.5x | Bukit jauh |
| Tanah dan objek | 1x | Rumput, tanah, koin, papan, bendera |

### 7.3 Level

| Level | Nama | Isi panel | Pemandangan |
|---|---|---|---|
| 1 | Start | Judul "Sutan Akbar", subjudul "Mahasiswa D-IV Manajemen Informatika Polsri", papan "Mencari magang TI / SI", tombol Mulai dan Mode Cepat | Padang rumput, awan |
| 2 | Skills | Pendidikan sebagai checkpoint, enam kelompok keterampilan dengan tingkat per alat, soft skill sebagai item power-up | Bukit dan blok |
| 3 | Stage | Stage 1: Website Profil Jurusan MI Polsri. Stage 2: Nusantara Kopi. Pengalaman dari halaman Experience **[cek]** | Jembatan, gerbang stage |
| 4 | Finish | Trofi Juara 1 PUBG Mobile, formulir kontak, Download CV, tautan profesional **[cek]** | Bendera finish |

Rincian isi:

- **Level 1:** papan "Mencari magang" menjawab kebutuhan status magang yang hilang dari Hero v2.1.
- **Level 2:** Pendidikan: D-IV Manajemen Informatika Polsri (2024 sampai sekarang, IPK 3,55 / 4,00 hingga semester 4) dan SMA Negeri 10 Palembang (2021 sampai 2024). Kelompok keterampilan: Bahasa Pemrograman, Web dan Frontend, Mobile dan Database, Tools, Analisis dan Perancangan, Pendukung.
- **Skala tingkat:** 1 Belajar, 2 Dasar, 3 Menengah, 4 Mahir, 5 Ahli. Digambar sebagai bintang piksel **dan** ditulis teks. Alat berlabel "belajar" bernilai 1 dan berlabel "dasar" bernilai 2. Tingkat selebihnya **wajib diisi pemilik sebelum rilis**.
- **Level 3:** Stage 1 proyek mandiri 2026 (HTML, CSS, PHP Native, MySQL, tautan GitHub). Stage 2 proyek tim 4 orang untuk event SINTAK 2025 (HTML, CSS, JavaScript, Vercel, tautan demo). Klik kartu stage membuka dialog detail, Esc menutupnya.
- **Level 4:** Juara 1 Lomba E-Sport PUBG Mobile 2022 (MADAGASCAR, HUT RI ke-77, OSIS SMA Negeri 10 Palembang). Formulir memakai Formspree. Download CV mengarah ke `/cv.pdf`.

### 7.4 Karakter

- Karakter pixel netral berwarna highlight dengan bayangan pink-deep, grid 16x16.
- Satu frame diam dan empat frame jalan pada 8 fps. Berjalan hanya saat gulir bergerak dan berhenti 150ms setelah gulir berhenti.
- Menghadap arah gulir.
- Pada reduced-motion hanya satu frame statis.

### 7.5 HUD

- Posisi: tepi atas layar, selalu terlihat.
- Isi: "LEVEL n/4", bar progres berupa blok piksel, tombol lompat 1 sampai 4, tautan Mode Cepat, tautan Download CV.
- Di HP: ringkas, ikon dengan label singkat. Target sentuh minimal 44px.

## 8. Komponen

| Komponen | Aturan |
|---|---|
| Tombol utama | Latar ink, teks surface, border 4px ink, bayangan keras. Hover: latar highlight dengan teks ink dan bergeser 2px. Tekan: bergeser 4px, bayangan hilang |
| Tombol sekunder | Latar surface, teks ink, border dan bayangan sama |
| Panel / dialog | Border 4px ink, latar surface atau satu pastel, bayangan keras |
| Input form | Border 4px ink, latar surface, fokus berupa outline 4px ink dengan offset 2px |
| Bintang tingkat | Sprite 8x8 terisi atau kosong, disertai teks tingkat |
| Papan (sign) | Panel kecil di atas tiang piksel, isi satu kalimat |
| Bar progres HUD | Maksimal 20 blok piksel, terisi sesuai `--p` |

Fokus keyboard: outline 4px solid ink dengan offset 2px, selalu terlihat.

## 9. Gerak

Semua gerak wajib mati pada `prefers-reduced-motion: reduce`. Tidak ada elemen yang berkedip lebih dari 3 kali per detik.

| Efek | Aturan |
|---|---|
| Dunia bergeser | Mengikuti gulir langsung, tanpa easing tambahan |
| Parallax | 0.2x, 0.5x, 1x |
| Karakter berjalan | 4 frame pada 8 fps, hanya saat gulir bergerak |
| Koin dan bintang berkedip | Maksimal 1 kali per detik |
| Panel masuk | Geser 8px dan fade, 200ms, easing `steps(4)` |
| Hover dan tekan tombol | Ganti warna isi dan geser 2px, 100ms |
| Lompat level lewat HUD | Gulir halus maksimal 600ms, instan pada reduced-motion |

Intro nama v2.1 dihapus saat Dunia Game menjadi `/`. Layar Start adalah Level 1. Tidak ada overlay penuh.

## 10. Responsif

| Lebar | Perilaku |
|---|---|
| 1024px ke atas | Dunia penuh, panel lebar maksimal 560px, `--px` 4px |
| 640 sampai 1023px | Dunia penuh, panel lebar maksimal 480px, `--px` 4px |
| Di bawah 640px (HP) | `--px` 3px, panel lebar 88vw, satu panel per layar, HUD ringkas |
| Tinggi di bawah 480px | Pakai tampilan statis seperti reduced-motion |

Titik uji wajib: 400px dan 1280px. Tidak boleh ada scroll horizontal pada body.

## 11. Aksesibilitas

- Semua isi berada di HTML nyata di dalam `<section aria-labelledby>`. Gambar latar dan sprite `aria-hidden="true"`.
- Tab-stop pertama: skip link "Lewati ke Mode Cepat". Urutan fokus mengikuti urutan level.
- Tidak ada jebakan keyboard. Dialog tertutup dengan Esc dan fokus kembali ke pemicunya.
- Kontras teks minimal 4.5:1, ukuran minimal 14px, target sentuh minimal 44px.
- Tingkat keterampilan selalu ditulis dengan teks, tidak hanya bintang.
- Tidak ada suara otomatis. Tidak ada kedipan lebih dari 3 kali per detik.
- Gulir tidak dibajak, jadi pengguna tetap dapat memakai alat bantu.

## 12. Mode Cepat dan tampilan statis

- Mode Cepat adalah halaman lama. Ia ditautkan dari HUD, dari skip link, dan dari tampilan statis.
- **Tampilan statis** dipakai saat reduced-motion, tinggi layar di bawah 480px, atau JavaScript mati. Empat level disusun vertikal sebagai bagian biasa dengan latar piksel statis, dan isinya sama.
- Isi level dirender di server, jadi konten tetap terbaca tanpa JavaScript.

## 13. Teknis

- Next.js 16 dengan Cache Components: tanpa `new Date()` di komponen server. Komponen interaktif memakai `"use client"` dan dibuat kecil.
- **Tanpa library** game, 3D, atau animasi (tidak memakai three, gsap, zustand, atau framer-motion di Dunia Game). Cadangan arah 3D di branch `game-rich-upgrade` tidak dipakai.
- Sprite berupa komponen React yang merender SVG dari peta piksel.
- Aset level 3 dan 4 dimuat belakangan. Gambar project memakai `next/image` dengan ukuran tetap.
- Target usulan: tambahan JavaScript Dunia Game di bawah 30 KB gzip, Lighthouse mobile performance minimal 80 dan accessibility minimal 95. Ukur dulu, lalu putuskan.
- Struktur berkas usulan: `components/game/` (World, Character, Hud, `sprites/`, `levels/Level1` sampai `Level4`), `app/game/page.tsx`.

## 14. Dilarang di Dunia Game

- Bayangan dengan blur, glow, neon, atau gradient halus.
- Warna di luar tabel palet.
- Teks langsung di atas gambar, tanpa panel solid.
- Font piksel untuk paragraf.
- Elemen yang berkedip lebih dari 3 kali per detik.
- Suara otomatis.
- Membajak gulir (menahan atau mengubah arah roda mouse dan sentuhan).
- Konten penting yang hanya ada di dalam gambar.
- Efek mengetik pada dialog (teks muncul langsung).
- Library 3D atau animasi tambahan.

## 15. Daftar periksa penerimaan

- [ ] Semua warna berasal dari tabel palet, tanpa hex lepas.
- [ ] Tidak ada bayangan berblur dan tidak ada gradient.
- [ ] Teks selalu di panel solid dengan kontras minimal 4.5:1.
- [ ] Empat level tampil dan jangkar `#level-1` sampai `#level-4` bekerja.
- [ ] Gulir mouse, sentuhan vertikal di HP, panah, PageDown, dan Space menggerakkan dunia.
- [ ] HUD terlihat di setiap level, dengan Mode Cepat dan Download CV satu klik.
- [ ] Reduced-motion aktif: tampilan statis tanpa animasi, isi sama.
- [ ] JavaScript mati: isi tetap terbaca.
- [ ] Diuji di 400px dan 1280px tanpa scroll horizontal.
- [ ] Tingkat keterampilan semuanya sudah diisi pemilik dan ditulis dengan teks.
- [ ] Formulir kontak, Download CV, dan tautan demo atau GitHub berfungsi.
- [ ] Dialog stage tertutup dengan Esc.
- [ ] Tidak ada elemen berkedip lebih dari 3 kali per detik.
- [ ] `npx tsc --noEmit` dan `npm run build` lolos dengan semua rute.

## 16. Keputusan

**Sudah diambil** (13 Oktober 2026):

- Seluruh situs menjadi Dunia Game (pilihan A) bergaya pixel 8-bit.
- Mode Cepat dipertahankan permanen sampai ada keputusan lain.
- Karakter pemain: pixel netral berwarna highlight.
- Gulir vertikal bawaan browser menggerakkan dunia. Di HP, geser vertikal biasa dipakai, bukan geser horizontal. Ini **menggantikan** keterangan "geser kanan ke kiri" di PRD bagian 17.5.
- Tanpa suara, dan dialog tanpa efek mengetik.
- Intro nama lama dihapus saat Dunia Game menjadi `/`.

**Masih terbuka:**

- Avatar Sutan menggantikan karakter netral atau tidak.
- Tingkat keterampilan per alat (diisi pemilik).
- Lisensi dan ketersediaan Pixelify Sans.
- Isi halaman Experience dan tautan profesional di Level 3 dan 4 **[cek]**.
- Nama rute Mode Cepat (`/cepat` usulan).
- Apakah halaman lama kelak dihapus.
