# Referensi 1: typesomething.co

Sumber: https://typesomething.co/ (Awwwards: Type Something by hmmh Poland)
Tag: Clean, Flat Design, Animation, Responsive. Astro + Tailwind.

## Terkonfirmasi (computed style, viewport sempit ~490px)
- Latar halaman #EFEAE9 (krem). Warna tema browser #b2aead.
- Token: --color-ink #171313, --color-white, --color-acid ~#c8ff12.
- Gradien hero: radial-gradient(circle at 12% 14%, #ffc7d8, transparan).
- Font: Montserrat Variable untuk SEMUA teks. Bobot 400, kecuali pill 600.
- h1 52px, lh 0.92, ls -0.055em. h2 30.4px, lh 1.5, ls -0.02em.
- Kartu langkah: putih, radius 24px; judul 19.2px/400; isi 16.8px/1.6, ink 72%.
- Judul fitur 18.4px/400, ls -0.01em.
- Pill: putih, border 1px ink 20%, radius 999px, teks 12.48px/600,
  titik lime kecil dengan cincin glow.
- Kontainer hero min(100% - 2rem, 82rem), gap 1.5rem.
- Padding vertikal section clamp(4rem, 8vw, 7rem).
- Ada skip-link aksesibilitas.

## Ciri khas (inti gaya)
- Judul bobot reguler + letter-spacing sangat ketat, bukan tebal/kapital.
- Hierarki hanya dari ukuran, bukan dari warna atau efek.
- Kartu putih sudut besar di atas latar krem, teks isi redup.

## Catatan
- Nilai h1 kemungkinan batas minimum clamp(); di desktop lebih besar.
- Lime hanya untuk titik status, bukan teks (kontras ~1:1 di krem).
- Hindari transition pada padding.
- Jangan menyalin teks, mockup, atau ilustrasi.