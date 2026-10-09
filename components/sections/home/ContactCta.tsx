import Link from "next/link";

export default function ContactCta() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="rounded-3xl bg-surface px-8 py-14 text-center md:px-16 md:py-20">
        <h2 className="text-h2 text-ink">
          Sedang mencari magang? Mari ngobrol.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body text-ink-muted">
          {/* TODO: ganti kalimat ini dengan versi Anda sendiri */}
          Saya terbuka untuk kesempatan magang di bidang pengembangan web.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-pill bg-ink px-6 py-3 text-label font-semibold text-surface"
          >
            Hubungi saya
          </Link>
          {/* Tombol Download CV dipasang di langkah berikutnya */}
        </div>
      </div>
    </section>
  );
}
