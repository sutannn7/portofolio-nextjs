# DESIGN.md — Portofolio Sutan Akbar

> Versi: 2.0 | Tanggal: 2026-10-10
> Stack: Next.js + Tailwind CSS
> Target: Rekruter & dosen (waktu baca ~30 detik per halaman)
> Sumber inspirasi: https://typesomething.co/ (prinsip saja, bukan salinan)
> Prototype acuan utama: Figma attached (desktop & mobile)

---

## 1. Prinsip Desain

1. **Tipografi sebagai hierarki utama.** Judul pakai bobot reguler (400) dengan letter-spacing sangat rapat; ukuran saja yang membedakan level. Tidak pakai bold, kapital, atau warna berbeda untuk judul section.
2. **Ruang napas cukup.** Kontainer max 72rem, padding vertikal section clamp(4rem, 8vw, 7rem), gap kartu 1.5rem. Setiap blok konten punya jarak yang terasa lega.
3. **Kartu putih di atas krem.** Surface putih (#FFFFFF) dengan radius besar (24px) di atas latar krem (#EFEAE9). Border 1px line opsional tapi disarankan.
4. **Aksen sangat terbatas.** Hanya dua warna non-netral: highlight pink (#FFC7D8) untuk latar kecil & titik status, dan dark card untuk CTA block. Dilarang menambahkan warna aksen lain.
5. **Motion hanya fungsional.** Fade dan slide-up 8–12px, 200–300ms, hormati `prefers-reduced-motion`. Tidak ada animasi dekoratif.

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
| **Lime pada krem** ⚠️ | `#C8FF12` | `#EFEAE9` | **~1.1:1** | FAIL ✗ |

> **DILARANG** menggunakan `#C8FF12` untuk teks atau ikon. Lime hanya boleh sebagai titik status kecil di dalam pill (diameter ~6px) karena berfungsi sebagai penanda visual, bukan bacaan.
> **Catatan Figma:** Titik status pada prototype tampak berwarna pink/salmon (`#FFC7D8`). Ikuti Figma untuk titik status.

### CSS Variables (app/globals.css)

```css
:root {
  /* Latar & surface */
  --color-bg: #EFEAE9;
  --color-surface: #FFFFFF;
  --color-highlight: #FFC7D8; /* pink lembut, latar kecil & titik status */

  /* Teks */
  --color-ink: #171313;
  --color-ink-muted: rgba(23, 19, 19, 0.72);
  --color-line: rgba(23, 19, 19, 0.2);

  /* Status & aksen */
  --color-accent-lime: #C8FF12; /* TITIK STATUS SAJA, BUKAN TEKS */
  --color-white: #FFFFFF;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1a1616;
    --color-surface: #252020;
    --color-ink: #F5F0EF;
    --color-ink-muted: rgba(245, 240, 239, 0.72);
    --color-line: rgba(245, 240, 239, 0.15);
  }
}

html {
  color-scheme: light;
}

body {
  background-color: var(--color-bg);
  color: var(--color-ink);
  font-family: 'Montserrat', system-ui, sans-serif;
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
| **Default** | Logo "Sutan Akbar." (kiri, ink, bobot 400, ukuran ~1rem). Navigasi centered (Home, About, Experience, Projects, Contact) — link teks ink-muted, ukuran 0.875rem, hover: opacity 0.7. Tombol "Mari terhubung" (kanan) — pill gelap, teks putih, bobot 600, ukuran 0.78rem. Fixed top, backdrop-blur, border-b tipis. |
| **Hover** | Link nav: opacity 0.7. Tombol CTA: scale 1.02, opacity naik. |
| **Focus** | Ring tipis 2px ink di sekeliling link/tombol, offset 2px. |
| **Disabled** | Tidak ada link disabled di navbar. |

```tsx
// Struktur
<nav class="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-sm border-b border-[var(--color-line)]">
  <div class="container-custom py-3 flex items-center justify-between">
    <a href="/" class="text-[var(--color-ink)] font-[400] text-[0.9375rem] tracking-[-0.02em]">Sutan Akbar.</a>
    <ul class="hidden md:flex items-center gap-6">
      <li><a href="#home" class="text-[var(--color-ink-muted)] text-[0.875rem] hover:opacity-70 transition-opacity">Home</a></li>
      {/* About, Experience, Projects, Contact */}
    </ul>
    <a href="#contact" class="inline-flex items-center px-4 py-2 rounded-[999px] bg-[var(--color-ink)] text-[var(--color-white)] text-[0.78rem] font-[600] hover:scale-[1.02] transition-transform focus:outline-none focus:ring-2 focus:ring-[var(--color-ink)] focus:ring-offset-2">
      Mari terhubung
    </a>
  </div>
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
| **Default** | `bg-[var(--color-surface)] rounded-[24px] p-6 border border-[var(--color-line)]` |
| **Nomor** | `text-[var(--color-ink-muted)] text-[0.78rem] font-[600] tracking-wider mb-3` (format: "01", "02", "03") |
| **Judul** | `text-[var(--color-ink)] text-[1.2rem] font-[400] leading-[1.5] mb-2` |
| **Isi** | `text-[var(--color-ink-muted)] text-[1.0625rem] leading-[1.6] max-w-[65ch]` |
| **Hover** | `border-[var(--color-ink-muted)]` |
| **Focus** | `outline-none ring-2 ring-[var(--color-ink)] ring-offset-2 ring-offset-[var(--color-bg)] rounded-[24px]` |
| **Disabled** | `opacity-50 cursor-not-allowed` |

### 5.6 Grid Skill

| State | Style |
|---|---|
| **Default** | `grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3` |
| **Item skill** | `bg-[var(--color-surface)] rounded-[12px] px-4 py-3 text-center border border-[var(--color-line)] text-[var(--color-ink)] text-[0.875rem] font-[400]` |
| **Hover** | `border-[var(--color-ink-muted)] bg-[var(--color-bg)]` |
| **Focus** | `outline-none ring-2 ring-[var(--color-ink)] ring-offset-1 rounded-[12px]` |

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

### 6.1 Home (`/`)

Single-page scroll dengan锚点 navigasi dari navbar.

| Area | Konten | Catatan |
|---|---|---|
| **Hero** | h1 singkat ("Sutan Akbar."), pill status "Open to work", paragraf body max-w-[65ch], CTA ganda (primary + secondary) | Gradien radial lembut di latar belakang hero (opsional, dari referensi). Tidak ada gambar portrait. |
| **About** | h2 "About", 2–3 paragraf body, grid skill di bawahnya | Skill grid: 3 kolom mobile, 6 kolom desktop. |
| **Experience** | h2 "Experience", timeline vertikal (carta langkah bernomor 01–03) | Timeline hanya teks + nomor; tanpa garis penghubung visual berlebihan. |
| **Projects** | h2 "Projects", grid kartu project 2 kolom (desktop) / 1 kolom (mobile) | Setiap kartu: gambar aspect-[16/10] + judul h3 + deskripsi + tag tech. |
| **Contact** | h2 "Contact", form sederhana (nama, email, pesan) + CTA | Form tanpa validasi rumit; submit → `mailto:` atau endpoint placeholder. |
| **Footer** | copyright, link ke social (GitHub, LinkedIn) | Minimalis, tanpa elemen dekoratif. |

> **Flow baca optimal:** Hero → About → Experience → Projects → Contact. Jangan sisipkan section di luar urutan ini.

### 6.2 Halaman Tambahan (jika ada)

Saat ini target hanya single-page. Jika nanti dibuat halaman terpisah (mis. `/project/[slug]`), pertahankan skema warna, tipografi, dan kartu project yang sama.

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
| Kartu project / langkah | `transition-transform duration-200 hover:-translate-y-0.5 hover:border-[var(--color-ink-muted)]` |
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

## 8. Aksesibilitas

### 8.1 Kontras Warna

Semua pasangan teks/latar harus mencapai **WCAG AA (4.5:1)** atau lebih tinggi. Lihat §2 untuk tabel rasio.

| Kelas | Tujuan |
|---|---|
| `text-[var(--color-ink)]` | Teks utama — rasio 15.5:1 (AAA) |
| `text-[var(--color-ink-muted)]` | Teks sekunder — rasio 10.8:1 (AAA) |
| `text-[var(--color-white)]` pada background ink | CTA gelap — rasio 15.5:1 (AAA) |
| ⚠️ `text-[var(--color-accent-lime)]` | **DILARANG** untuk teks (rasio ~1.1:1, FAIL) |

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
| Menambahkan warna aksen baru (biru, hijau, ungu, dll) | Melanggar prinsip §1 poin 4 |
| Menggunakan pink/salmon (`#FFC7D8`) untuk teks | Hanya untuk latar kecil dan titik status |

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
| Hardcode warna hex tanpa menggunakan CSS variable | Sulit maintain, tidak support dark mode |
| Menggunakan `!important` secara sembarangan | Specificity conflict |
| Menambahkan library animasi eksternal (Framer Motion, GSAP) tanpa izin | Berat bundle, berlebihan untuk pola sederhana |

---

## 10. Checklist Verifikasi

### 10.1 Warna & Kontras

- [ ] Semua teks menggunakan `--color-ink` atau `--color-ink-muted`
- [ ] Tidak ada teks berwarna `#C8FF12` (lime)
- [ ] Titik status pill menggunakan `--color-highlight` (pink), bukan lime
- [ ] CSS variable digunakan untuk semua warna (tidak ada hardcode hex)
- [ ] Dark mode variables terdefinisi di `@media (prefers-color-scheme: dark)`

### 10.2 Tipografi

- [ ] FontMontserrat digunakan untuk semua teks (via `next/font/google`)
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

- [ ] Scroll-reveal menggunakan IntersectionObserver
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

- [ ] Tidak ada warna aksen baru selain pink dan ink
- [ ] Tidak ada shadow pada kartu
- [ ] Tidak ada animasi dekoratif
- [ ] Tidak ada teks dari typesomething.co
- [ ] Tidak ada library animasi eksternal
- [ ] Urutan section: Hero → About → Experience → Projects → Contact

| Menambahkan library animasi eksternal (Framer Motion, GSAP) tanpa izin | Berat bundle, berlebihan untuk pola sederhana |