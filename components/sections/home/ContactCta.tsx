import Link from "next/link";

export default function ContactCta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="mx-auto w-full max-w-6xl px-6 py-16"
    >
      <div className="rounded-3xl bg-ink px-8 py-14 text-center md:px-16 md:py-20">
        <h2 id="cta-title" className="text-h2 text-bg">
          Sedang mencari magang? Mari ngobrol.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body text-bg/70">
          Saya terbuka untuk kesempatan magang di bidang pengembangan web.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-pill bg-highlight px-6 py-3 text-label font-semibold text-ink transition-opacity duration-200 hover:opacity-85"
          >
            Hubungi saya
          </Link>
          <a
            href="/cv.pdf"
            download
            className="rounded-pill border border-bg/30 px-6 py-3 text-label font-semibold text-bg transition-opacity duration-200 hover:opacity-70"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
