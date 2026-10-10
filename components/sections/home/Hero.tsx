import Link from "next/link";
import CountUp from "@/components/ui/CountUp";

type Stat = {
  value: string;
  count?: number;
  decimals?: number;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  { value: "3.55", count: 3.55, decimals: 2, suffix: "/ 4.00", label: "IPK" },
  { value: "2", count: 2, decimals: 0, suffix: "", label: "Project" },
  { value: "1st", suffix: "", label: "Juara 1 PUBG Mobile" },
];

const primaryBtn =
  "inline-flex min-h-11 items-center justify-center rounded-pill bg-ink px-6 text-body font-semibold text-surface transition-colors hover:bg-highlight hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const secondaryBtn =
  "inline-flex min-h-11 items-center justify-center rounded-pill border border-line bg-transparent px-6 text-body font-semibold text-ink transition-colors hover:bg-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="pb-[clamp(4rem,8vw,7rem)] pt-40 md:pt-[clamp(4rem,8vw,7rem)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6">
        <p className="inline-flex w-fit items-center gap-2 rounded-pill border border-line bg-surface px-[0.9rem] py-[0.45rem] text-label font-semibold text-ink">
          <span
            aria-hidden="true"
            className="size-[0.45rem] rounded-full bg-signal"
          />
          Terbuka untuk magang &amp; kolaborasi
        </p>

        <h1
          id="hero-title"
          className="max-w-4xl text-h1 font-normal leading-[0.95] tracking-[-0.055em] text-ink"
        >
          Hi, I&apos;m Sutan Akbar
        </h1>

        <p className="max-w-[65ch] text-body text-ink-muted">
          Saya membangun web yang rapi dan interaktif, dari antarmuka sampai
          database, dengan React, Next.js, Tailwind CSS, PHP, dan MySQL.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/projects" className={primaryBtn}>
            Lihat Project
          </Link>
          <Link href="/contact" className={secondaryBtn}>
            Hubungi Saya
          </Link>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-1">
              <dt className="text-label font-semibold text-ink-muted">
                {s.label}
              </dt>
              <dd className="text-h2 font-normal tracking-[-0.02em] text-ink">
                {s.count !== undefined ? (
                  <CountUp to={s.count} decimals={s.decimals} />
                ) : (
                  s.value
                )}
                {s.suffix && (
                  <span className="ml-1 text-body text-ink-muted">
                    {s.suffix}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
