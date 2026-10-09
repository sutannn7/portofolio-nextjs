# DESIGN.md — Portofolio Sutan Akbar

> Versi: 2.1 (Jalur B: palet pastel + gerak tambahan) | Tanggal: 2026-10-10
> Stack: Next.js + Tailwind CSS
> Struktur: situs multi-halaman (/, /about, /experience, /projects, /contact)
> Target: Rekruter & dosen (waktu baca ~30 detik per halaman)
> Sumber inspirasi: https://typesomething.co/ (prinsip saja, bukan salinan)
> Prototype acuan utama: Figma attached (desktop & mobile)

---

## 1. Prinsip Desain

1. **Tipografi sebagai hierarki utama.** Judul pakai bobot reguler (400) dengan letter-spacing sangat rapat; ukuran saja yang membedakan level. Tidak pakai bold, kapital, atau warna berbeda untuk judul section.
2. **Ruang napas cukup.** Kontainer max 72rem, padding vertikal section clamp(4rem, 8vw, 7rem), gap kartu 1.5rem. Setiap blok konten punya jarak yang terasa lega.
3. **Kartu putih di atas krem.** Surface putih (#FFFFFF) dengan radius besar (24px) di atas latar krem (#EFEAE9). Border 1px line opsional tapi disarankan.
4. **Aksen terbatas pada palet pastel.** Warna non-netral yang diizinkan hanya: highlight pink (#FFC7D8), mint (#CDEBD8), sky (#CFE2FF), butter (#FFEBA8), plus dark card (ink) untuk CTA block dan signal lime (#C8FF12) khusus titik status. Pastel hanya sebagai LATAR, tidak pernah sebagai warna teks atau ikon. Dilarang menambahkan warna lain di luar daftar ini.
5. **Motion halus dan bermakna.** Reveal fade + slide-up 8–12px, 200–300ms, hormati `prefers-reduced-motion`. Efek tambahan hanya yang tercantum di §7.5. Tidak ada animasi dekoratif di luar daftar itu.

---

## 2. Warna

### Tabel Pasangan Teks/Latar

| Pasangan | Foreground | Background | Rasio | WCAG |
|---|---|---|---|---|
| Ink pada krem | `#171313` | `#EFEAE9` | **15.5:1** | AAA ✓ |
| Ink-muted pada krem | `rgba(23,19,19,.72)` | `#EFEAE9` | **10.8:1** | AAA ✓ |
| White pada ink (CTA gelap) | `#FFFFFF` | `#171313` | **15.5:1** | AAA ✓ |
| Ink pada putih (kartu) | `#171313` | `#FFFFFF` | **15.5:1** | AAA ✓ |
| Ink-muted pada putih | `rgba(23,19,19,.72)` | `#FFFFFF` | **10.8:1** | AAA ✓ |
| Ink pada mint | `#171313` | `#CDEBD8` | **14.5:1** | AAA ✓ |
| Ink pada sky | `#171313` | `#CFE2FF` | **14.0:1** | AAA ✓ |
| Ink pada butter | `#171313` | `#FFEBA8` | **15.5:1** | AAA ✓ |
| Ink pada pink | `#171313` | `#FFC7D8` | **12.7:1** | AAA ✓ |
| Ink-muted pada pastel (mint/sky/butter/pink) | `rgba(23,19,19,.72)` | pastel | **6.1–6.8:1** | AA ✓ (bukan AAA) |
| **Lime pada krem** ⚠️ | `#C8FF12` | `#EFEAE9` | **~1.1:1** | FAIL ✗ |

> **DILARANG** menggunakan `#C8FF12` untuk teks atau ikon. Lime hanya boleh sebagai titik status kecil (diameter ~6–8px) karena berfungsi sebagai penanda visual, bukan bacaan. Class Tailwind-nya `bg-signal`.
> **Catatan Figma:** Titik status pada prototype Figma tampak pink (`#FFC7D8`), sedangkan implementasi saat ini memakai lime (`bg-signal`) di pill Hero dan Footer. Kedua-duanya diizinkan untuk titik status; jangan dicampur dalam satu halaman.
> **Teks di atas pastel:** pakai `text-ink` penuh. `text-ink-muted` boleh untuk teks besar/isi sekunder (rasio 6.1–6.8:1, lulus AA).

### Token (app/globals.css, Tailwind v4)

Nilai warna ditulis SEKALI di blok `@theme` dan otomatis menjadi class utility
(`bg-bg`, `bg-surface`, `text-ink`, `text-ink-muted`, `border-line`, `bg-highlight`,
`bg-mint`, `bg-sky`, `bg-butter`, `bg-signal`). Tidak ada mode gelap.

```css
@theme {
  --color-bg: #EFEAE9;
  --color-surface: #FFFFFF;
  --color-ink: #171313;
  --color-ink-muted: rgba(23, 19, 19, 0.72);
  --color-line: rgba(23, 19, 19, 0.2);

  /* Pastel: LATAR saja, satu per kartu/bagian */
  --color-highlight: #FFC7D8;
  --color-mint: #CDEBD8;
  --color-sky: #CFE2FF;
  --color-butter: #FFEBA8;

  /* Titik status saja, BUKAN teks/ikon */
  --color-signal: #C8FF12;

  --radius-card: 24px;
  --radius-pill: 999px;
  --radius-skill: 12px;
}

html { color-scheme: light; }

body {
  background-color: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-montserrat), system-ui, sans-serif;
}
```

---

## 3. Tipografi

### Skala (USULAN — sesuaikan dengan viewport desktop)

| Elemen | Ukuran | Line-height | Letter-spacing | Bobot |
|---|---|---|---|---|
| h1 | `clamp(2.75rem, 7vw, 5rem)` | 0.92–0.95 | -0.055em | 400 |
| h2 | `clamp(1.75rem, 3vw, 2.25rem)` | 1.3 | -0.02em | 400 |
| h3 | 1.2rem (19.2px) | 1.5 | -0.01em | 400 |
| Isi/body | 1.0625rem (17px) | 1.6 | 0 | 400 |
| Label/tombol | 0.78rem (12.48px) | 1.3 | 0 | 600 |

> **Catatan Figma:** h1 pada prototype terlihat sekitar 52px di viewport ~490px (kemungkinan batas minimum clamp). Di desktop jauh lebih besar. Nilai di atas adalah USULAN berdasarkan referensi typesomething.co.

### Aturan Lebar Baca

- **Maksimal 65 karakter per baris** untuk paragraf isi.
- Gunakan `max-w-[65ch] text-pretty` pada elemen `<p>`, `<li>`, dan kolom teks panjang.
- h1 dan h2 tidak dibatasi lebar (biarkan wrap natural).
- Kontainer utama: `max-w-[72rem] mx-auto px-4 sm:px-6`.

### Font

- **Montserrat (variable)** untuk SEMUA teks, diimpor via `next/font/google`.
- Bobot 400 untuk judul dan isi, 600 hanya untuk label kecil dan tombol.
- Jangan campur font lain.

### 5.1 Navbar

| State | Deskripsi |
|---|---|
| **Default** | Logo "Sutan Akbar." (kiri, ink, bobot 400, ukuran ~1rem). Navigasi centered (Home, About, Experience, Projects, Contact) — link teks ink-muted (halaman aktif: ink), ukuran 0.875rem, hover: opacity 0.7. Tombol "Mari terhubung" (kanan) — pill gelap, teks putih, bobot 600, ukuran 0.78rem. Fixed top, backdrop-blur, border-b tipis. |
| **Hover** | Link nav: opacity 0.7. Tombol CTA: scale 1.02, opacity naik. |
| **Focus** | Ring tipis 2px ink di sekeliling link/tombol, offset 2px. |
| **Disabled** | Tidak ada link disabled di navbar. |

```tsx
// Struktur (implementasi saat ini: components/Navbar.tsx)
// - Tautan memakai next/link ke rute: /, /about, /experience, /projects, /contact
// - Menu halaman aktif: text-ink; lainnya: text-ink-muted (usePathname)
// - Layar < md: menu desktop disembunyikan, diganti satu baris menu yang bisa digeser
<nav className="fixed left-0 right-0 top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-sm">
  ...
  <Link href="/contact" className="rounded-pill bg-ink px-4 py-2 text-label font-semibold text-surface ...">
    Mari terhubung
  </Link>
</nav>
```

### 5.2 Tombol

#### Tombol Utama (Dark)

| State | Style |
|---|---|
| **Default** | `bg-[var(--color-ink)] text-[var(--color-white)] rounded-[999px] px-6 py-3 text-[0.875rem] font-[600] min-h-[44px]` |
| **Hover** | `opacity-90 scale-[1.02]` |
| **Focus** | `outline-none ring-2 ring-[var(--color-ink)] ring-offset-2 ring-offset-[var(--color-bg)]` |
| **Disabled** | `opacity-40 cursor-not-allowed` |

#### Tombol Sekunder (White/Light)

| State | Style |
|---|---|
| **Default** | `bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-line)] rounded-[999px] px-6 py-3 text-[0.875rem] font-[600] min-h-[44px]` |
| **Hover** | `border-[var(--color-ink-muted)] opacity-90 scale-[1.02]` |
| **Focus** | `outline-none ring-2 ring-[var(--color-ink)] ring-offset-2 ring-offset-[var(--color-bg)]` |
| **Disabled** | `opacity-40 cursor-not-allowed border-[var(--color-line)]` |

### 5.3 Pill Status

| State | Style |
|---|---|
| **Default** | `inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[999px] text-[0.78rem] font-[600] text-[var(--color-ink)]` |
| **Titik status** | `w-1.5 h-1.5 rounded-full bg-[var(--color-highlight)] inline-block` (pink, dari Figma) |
| **Hover** | `border-[var(--color-ink-muted)]` |
| **Focus** | `outline-none ring-2 ring-[var(--color-ink)] ring-offset-1` |
| **Disabled** | `opacity-50` |

Badge status di atas judul Hero diizinkan dan tidak dihitung sebagai label kecil di atas judul.

### 5.4 Kartu Project (Gambar Besar di Atas)

| State | Style |
|---|---|
| **Default** | `bg-[var(--color-surface)] rounded-[24px] overflow-hidden border border-[var(--color-line)]` |
| **Area gambar** | `aspect-[16/10] bg-[var(--color-bg)] rounded-t-[24px] overflow-hidden relative` — placeholder dengan tooltip "..." di pojok kiri atas. Gambar: `w-full h-full object-cover`. |
| **Konten** | `p-5` — judul h3, deskripsi body, tag pill (HTML, CSS, JS) di baris bawah. |
| **Hover** | `transform translateY(-2px) border-[var(--color-ink-muted)]` |
| **Focus** | `outline-none ring-2 ring-[var(--color-ink)] ring-offset-2 ring-offset-[var(--color-bg)] rounded-[24px]` |
| **Disabled** | `opacity-50 cursor-not-allowed` |

```tsx
// Tag pill kecil
<span class="inline-flex items-center px-3 py-1 rounded-[999px] bg-[var(--color-bg)] text-[var(--color-ink-muted)] text-[0.75rem] font-[600]">HTML</span>
```

### 5.5 Kartu Langkah Bernomor (01-03)

| State | Style |
|---|---|
| **Default** | `rounded-[24px] p-6 sm:p-8` dengan latar pastel (kartu 01 `bg-mint`, 02 `bg-sky`, 03 `bg-butter`), tanpa border. Teks `text-ink`. |
| **Nomor** | `text-[var(--color-ink-muted)] text-[0.78rem] font-[600] tracking-wider mb-3` (format: "01", "02", "03") |
| **Judul** | `text-[var(--color-ink)] text-[1.2rem] font-[400] leading-[1.5] mb-2` |
| **Isi** | `text-[var(--color-ink-muted)] text-[1.0625rem] leading-[1.6] max-w-[65ch]` |
| **Hover** | `hover:-translate-y-1` (naik 4px, tanpa shadow), `transition-transform duration-300 ease-out` |
| **Focus** | `outline-none ring-2 ring-[var(--color-ink)] ring-offset-2 ring-offset-[var(--color-bg)] rounded-[24px]` |
| **Disabled** | `opacity-50 cursor-not-allowed` |

### 5.6 Grid Skill

| State | Style |
|---|---|
| **Default** | `grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3` |
| **Item skill** | `bg-[var(--color-surface)] rounded-[12px] px-4 py-3 text-center border border-[var(--color-line)] text-[var(--color-ink)] text-[0.875rem] font-[400]` |
| **Hover** | `border-[var(--color-ink-muted)] bg-[var(--color-bg)]` |
| **Focus** | `outline-none ring-2 ring-[var(--color-ink)] ring-offset-1 rounded-[12px]` |

### 5.7 Kartu Pastel

Kartu atau bagian berlatar pastel (mint, sky, butter, highlight) untuk memberi warna tanpa menambah elemen dekoratif.

| Aturan | Style |
|---|---|
| Latar | Satu pastel per kartu/bagian. Tidak digabung, tidak digradasi. |
| Teks | `text-ink` (judul dan isi). Pastel tidak pernah jadi warna teks/ikon. |
| Bentuk | `rounded-3xl` (24px), tanpa border, tanpa shadow. |
| Hover | `hover:-translate-y-1 transition-transform duration-300 ease-out` |
| Pill kecil | `rounded-pill bg-highlight px-3 py-1 text-label text-ink` (atau pastel lain) |

### 5.8 Blok CTA Gelap

`bg-ink` dengan teks `text-bg`/`text-surface`, `rounded-3xl`, padding besar. Tombol utama di dalamnya berupa pill `bg-highlight text-ink`; tombol sekunder `border border-surface/30 text-surface`.

### Kontainer

```css
/* Tailwind utility recommendation */
.container-custom {
  max-width: min(100% - 2rem, 72rem);
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
```

### Spasi Vertikal Section

```
padding-block: clamp(4rem, 8vw, 7rem);
```

### Spasi Horizontal

- Padding sisi: `px-4` (mobile) → `px-6` (tablet+) → sesuai kontainer 72rem max.
- Gap antar kartu: `1.5rem` (24px).

### Responsif (mulai 360px)

| Breakpoint | Maks lebar konten | Layout kartu |
|---|---|---|
| 360px – 639px | 100% - 2rem | 1 kolom |
| 640px – 1023px | min(100% - 2rem, 56rem) | 1-2 kolom sesuai section |
| 1024px+ | min(100% - 2rem, 72rem) | 2 kolom (projects), 3 kolom (steps) |

---

## 6. Rancangan Tiap Halaman

### 6.1 Peta Halaman

Situs multi-halaman. Navigasi memakai `next/link`, bukan anchor `#`.

| Rute | Isi |
|---|---|
| `/` | Hero (pill status, h1, deskripsi, 2 tombol, statistik) → Project pilihan → Cara saya bekerja (3 kartu pastel) → Ajakan kontak + Download CV → Footer |
| `/about` | Ringkasan, pendidikan, keterampilan (kartu per kelompok + pill), soft skill, prestasi |
| `/experience` | Timeline vertikal: garis polos `bg-line`, ikon dalam lingkaran putih, kartu per item |
| `/projects` | Grid 2 kolom kartu project; klik membuka modal detail (Esc/klik latar untuk menutup) |
| `/contact` | Info kontak + form (Formspree), label eksplisit per input |

Aturan umum halaman dalam:
- Judul halaman memakai `PageHeader` (h1, bobot 400, tanpa garis dekoratif).
- Konten dibungkus `mx-auto max-w-6xl px-6`, jarak atas cukup untuk navbar fixed (`pt-32`; di HP perlu lebih besar karena navbar dua baris).
- Data project hanya dari `lib/projects.ts` (satu sumber untuk Home dan /projects).
- Footer: copyright (tahun ditulis manual karena Cache Components melarang `new Date()` di komponen server) dan titik status.

---

## 7. Motion

### 7.1 Prinsip

- Hanya **fade-in** dan **slide-up 8–12px**. Tidak ada bounce, rotate, scale berlebihan, atau animasi dekoratif.
- Durasi: **200–300ms** dengan easing `ease-out`.
- Semua motion hormati `prefers-reduced-motion: reduce` → nonaktifkan seluruh animasi.
- Gunakan CSS transitions untuk hover/focus; gunakan Intersection Observer + class toggle untuk scroll-reveal.

### 7.2 Scroll-Reveal (InterSectionObserver)

```tsx
// Pattern yang disarankan
const el = useRef<HTMLDivElement>(null);
const [visible, setVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setVisible(true); },
    { threshold: 0.15 }
  );
  if (el.current) observer.observe(el.current);
  return () => observer.disconnect();
}, []);
```

```css
/* globals.css atau module */
.reveal {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 250ms ease-out, transform 250ms ease-out;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
```

### 7.3 Hover & Focus Transitions

| Elemen | Transition |
|---|---|
| Tombol | `transition-opacity duration-200 hover:opacity-90 hover:scale-[1.02]` |
| Kartu project / langkah / pastel | `transition-transform duration-300 ease-out hover:-translate-y-1` (naik 4px, tanpa shadow) |
| Link nav | `transition-opacity duration-200 hover:opacity-70` |
| Item skill grid | `transition-colors duration-200 hover:bg-[var(--color-bg)] hover:border-[var(--color-ink-muted)]` |

> **DILARANG** menambahkan transition pada `padding`, `width`, atau `height` — dapat menyebabkan layout shift.

### 7.4 Stagger pada Grid

Untuk kartu project atau skill grid, tambahkan delay bertahap 50–80ms per item agar muncul berurutan:

```tsx
// Contoh: className dinamis berdasarkan index
className={`reveal ${visible ? 'visible' : ''} ${visible ? `style="transition-delay: ${index * 60}ms"` : ''}`}
```

---

### 7.5 Efek Tambahan yang Diizinkan (Jalur B)

| Efek | Aturan |
|---|---|
| Reveal bergantian (stagger) | 60–80ms per item, `Reveal` (fade + geser 10px, 250ms) |
| Hover kartu | Naik 4px, tanpa shadow, 300ms |
| Hover gambar project | Zoom maksimal `scale-105` di dalam bingkai `overflow-hidden`, 300–400ms |
| Hover tombol | Ganti warna isi (ink → highlight) atau opacity, 200ms |
| Angka statistik Hero | Hitung naik dari 0, sekali saat terlihat, maksimal 1 detik |
| Transisi antarhalaman | Fade pendek, maksimal 250ms |
| Scroll progress | Garis tipis `bg-ink` di atas halaman |

Semua efek di atas wajib mati pada `prefers-reduced-motion: reduce` (§8.5).
Marquee/teks berjalan BELUM disetujui; tambahkan ke tabel ini dulu sebelum dibuat.

---

## 8. Aksesibilitas

### 8.1 Kontras Warna

Semua pasangan teks/latar harus mencapai **WCAG AA (4.5:1)** atau lebih tinggi. Lihat §2 untuk tabel rasio.

| Kelas | Tujuan |
|---|---|
| `text-[var(--color-ink)]` | Teks utama — rasio 15.5:1 (AAA) |
| `text-[var(--color-ink-muted)]` | Teks sekunder — rasio 10.8:1 (AAA) |
| `text-[var(--color-white)]` pada background ink | CTA gelap — rasio 15.5:1 (AAA) |
| ⚠️ `text-signal` (lime `#C8FF12`) | **DILARANG** untuk teks (rasio ~1.1:1, FAIL) |

### 8.2 Focus Visible

Semua elemen interaktif harus menampilkan focus ring yang jelas:

```css
/* Pattern universal */
:focus-visible {
  outline: none;
  ring: 2px solid var(--color-ink);
  ring-offset: 2px;
  ring-offset-color: var(--color-bg);
}
```

- Tombol, link, input, dan kartu yang dapat difokuskan wajib memiliki `focus-visible` style.
- Hindari `outline: none` tanpa pengganti ring.

### 8.3 Semantic HTML

| Elemen | Penggunaan |
|---|---|
| `<nav>` | Navbar utama |
| `<main>` | Konten utama halaman |
| `<section>` | Setiap area (Hero, About, dll) dengan `aria-label` |
| `<header>` | Optional, untuk hero |
| `<footer>` | Footer |
| `<h1>`–`<h3>` | Hierarki judul sesuai §3 |
| `<ul>`/`<ol>` | List navigasi, skill, project |
| `<form>` | Form kontak |
| `<label>` | Setiap input form harus punya label tersambung via `htmlFor`/`id` |

### 8.4 ARIA & Skip Link

- **Skip link:** Tautan tersembunyi di awal `<body>` yang muncul saat focus, mengarah ke `<main id="main-content">`.
- **Landmark:** Pastikan setiap `<section>` memiliki `aria-label` yang deskriptif.
- **Form:** Semua input wajib memiliki label eksplisit (bukan hanya `placeholder`).

```tsx
// Skip link pattern
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[var(--color-ink)] text-[var(--color-white)] px-4 py-2 rounded">
  Lewati ke konten utama
</a>
```

### 8.5 Reduced Motion

Hormati `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 8.6 Keyboard Navigation

- Tab order mengikuti urutan dokumen (HTML source order).
- Semua interaksi harus dapat dijangkau dengan keyboard.
- Tidak ada hover-only interaction yang essential.

### 8.7 Image Alt

Setiap `<img>` wajib memiliki `alt` yang deskriptif. Gambar dekoratif gunakan `alt=""`.

---

## 9. DILARANG

### 9.1 Warna

| Larangan | Alasan |
|---|---|
| Menggunakan `#C8FF12` (lime) untuk teks atau ikon | Kontras ~1.1:1, tidak readable |
| Menambahkan warna di luar palet (ink, krem, putih, highlight, mint, sky, butter, signal) | Melanggar prinsip §1 poin 4 |
| Memakai pastel (mint/sky/butter/highlight) untuk teks atau ikon | Kontras rendah; pastel hanya latar |
| Menggabung dua pastel dalam satu kartu atau menggradasikannya | Menjaga tampilan tetap tenang |

### 9.2 Tipografi

| Larangan | Alasan |
|---|---|
| Menggunakan font selain Montserrat | Konsistensi brand |
| Menggunakan bold (700+) untuk judul section | Hierarki harus dari ukuran, bukan bobot |
| Menggunakan letter-spacing positif yang lebar | Judul harus rapat, bukan longgar |
| Mengutip atau menyalin teks dari typesomething.co | Inspirasi prinsip saja, bukan konten |

### 9.3 Motion & Animasi

| Larangan | Alasan |
|---|---|
| Animasi dekoratif (floating, spinning, pulse tanpa fungsi) | Melanggar prinsip §1 poin 5 |
| Transition pada `padding`, `width`, `height` | Menyebabkan layout shift |
| Durasi > 400ms | Terlalu lambat untuk UX |
| Gradient text, glow/neon, efek grid atau spotlight | Dekoratif, mengganggu keterbacaan |
| Cursor spotlight, efek tilt/miring pada kartu | Dekoratif |
| Efek mengetik (typewriter), intro splash, animated background | Dekoratif, memperlambat |
| Label kecil huruf kapital di atas judul (eyebrow) | Hierarki harus dari ukuran |
| Shadow berat | Desain flat sesuai referensi |
| Tidak menghormati `prefers-reduced-motion` | Aksesibilitas |

### 9.4 Komponen & Layout

| Larangan | Alasan |
|---|---|
| Menambah komponen di luar §5 tanpa persetujuan | Konsistensi desain system |
| Menggunakan shadow (`shadow-lg`, dll) pada kartu | Desain flat sesuai referensi |
| Mengubah radius default (24px untuk kartu, 12px untuk skill) | Konsistensi visual |
| Menambahkan divider/garis horizontal berlebihan | Ruang napas lebih penting |

### 9.5 Konten

| Larangan | Alasan |
|---|---|
| Menyalin deskripsi project dari typesomething.co | Hak cipta |
| Menambahkan section di luar urutan Hero → About → Experience → Projects → Contact | Flow baca terganggu |
| Menggunakan foto/profile yang tidak relevan | Konten harus orisinal |

### 9.6 Kode

| Larangan | Alasan |
|---|---|
| Hardcode warna hex di komponen (selalu pakai class token) | Sulit dirawat |
| Menggunakan `!important` secara sembarangan | Specificity conflict |
| Menambahkan library animasi baru (GSAP, dll) tanpa izin | Berat bundle, berlebihan untuk pola sederhana |
| Memakai Framer Motion di luar `Reveal`, modal Projects, form Contact, dan `ScrollProgress` | Library ini sudah terpasang; pemakaiannya dibatasi di komponen tersebut |

---

## 10. Checklist Verifikasi

### 10.1 Warna & Kontras

- [ ] Semua teks menggunakan `--color-ink` atau `--color-ink-muted`
- [ ] Tidak ada teks berwarna `#C8FF12` (lime)
- [ ] Titik status memakai `bg-signal` (lime) atau `bg-highlight` (pink), tidak dicampur dalam satu halaman
- [ ] Warna memakai class token (`bg-mint`, `text-ink`, dst.), tidak ada hardcode hex
- [ ] Tidak ada blok `prefers-color-scheme: dark` (situs hanya mode terang)
- [ ] Pastel hanya dipakai sebagai latar; teks di atasnya `text-ink`
- [ ] Satu pastel per kartu/bagian, tanpa gradien

### 10.2 Tipografi

- [ ] Font Montserrat digunakan untuk semua teks (via `next/font/google`)
- [ ] Tidak ada font lain yang diimpor
- [ ] Judul section menggunakan bobot 400, bukan bold
- [ ] Letter-spacing judul negatif (`-0.055em`, `-0.02em`, `-0.01em`)
- [ ] Paragraf isi menggunakan `max-w-[65ch] text-pretty`

### 10.3 Komponen

- [ ] Navbar fixed top dengan backdrop-blur
- [ ] Tombol primary: background ink, teks putih, radius 999px
- [ ] Tombol secondary: background surface, border line, radius 999px
- [ ] Pill status: inline-flex, gap-2, radius 999px, titik pink
- [ ] Kartu project: radius 24px, aspect-[16/10] untuk gambar
- [ ] Kartu langkah: bernomor 01, 02, 03
- [ ] Grid skill: 3 kolom mobile, 6 kolom desktop
- [ ] Form kontak: label eksplisit untuk setiap input

### 10.4 Layout & Spasi

- [ ] Kontainer max-width: min(100% - 2rem, 72rem)
- [ ] Padding vertikal section: clamp(4rem, 8vw, 7rem)
- [ ] Gap kartu: 1.5rem
- [ ] Padding sisi: px-4 mobile, px-6 tablet+

### 10.5 Responsif

- [ ] Breakpoint 360px–639px: 1 kolom
- [ ] Breakpoint 640px–1023px: 1–2 kolom
- [ ] Breakpoint 1024px+: 2 kolom projects, 3 kolom steps

### 10.6 Motion

- [ ] Scroll-reveal memakai komponen `Reveal` (whileInView, sekali jalan)
- [ ] Durasi 200–300ms dengan ease-out
- [ ] `prefers-reduced-motion: reduce` dinonaktifkan
- [ ] Tidak ada transition pada padding/width/height
- [ ] Stagger delay 50–80ms pada grid items

### 10.7 Aksesibilitas

- [ ] Skip link tersedia dan terlihat saat focus
- [ ] Semua section memiliki aria-label
- [ ] Form input memiliki label tersambung via htmlFor/id
- [ ] Fokus visible pada semua elemen interaktif
- [ ] Semua img memiliki alt text
- [ ] Semantic HTML (nav, main, section, footer)

### 10.8 DILARANG — Review Akhir

- [ ] Tidak ada warna di luar palet §1 poin 4
- [ ] Tidak ada shadow pada kartu
- [ ] Tidak ada animasi dekoratif
- [ ] Tidak ada teks dari typesomething.co
- [ ] Tidak ada library animasi baru (Framer Motion hanya di komponen yang diizinkan §9.6)
- [ ] Tautan navigasi memakai `Link` ke rute, bukan `#anchor`
- [ ] Tidak ada gradient text, glow, spotlight, tilt, efek mengetik
