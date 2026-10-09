import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

const linkClass =
  "text-label font-semibold text-ink underline underline-offset-4 decoration-line hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export default function ProjectsPreview() {
  return (
    <section
      aria-labelledby="projects-title"
      className="py-[clamp(4rem,8vw,7rem)]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2
            id="projects-title"
            className="text-h2 font-normal tracking-[-0.02em] text-ink"
          >
            Project pilihan
          </h2>
          <Link href="/projects" className={linkClass}>
            Lihat semua project
          </Link>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <li
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full bg-bg overflow-hidden">
                {p.image && (
                  <Image
                    src={p.image}
                    alt={`Tampilan website ${p.title}`}
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                <p className="text-label font-semibold text-ink-muted">
                  {p.type} · {p.year}
                </p>
                <h3 className="text-h3 font-normal leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="max-w-[65ch] text-body text-ink-muted">
                  {p.short}
                </p>

                <ul className="flex flex-wrap gap-2" aria-label="Teknologi">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-pill border border-line px-3 py-1 text-label font-semibold text-ink-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                {(p.demo || p.github) && (
                  <div className="mt-auto flex gap-6 pt-2">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        Lihat demo
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
