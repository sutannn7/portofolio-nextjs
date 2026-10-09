import Reveal from "@/components/Reveal";

const steps = [
  {
    number: "01",
    title: "Merancang tampilan",
    text: "Menyusun desain antarmuka yang rapi dan responsif di laptop maupun smartphone.",
    color: "bg-mint",
  },
  {
    number: "02",
    title: "Membangun fitur",
    text: "Mengerjakan frontend dan backend, termasuk data dinamis dan penyimpanan ke database.",
    color: "bg-sky",
  },
  {
    number: "03",
    title: "Merilis",
    text: "Mempublikasikan website agar bisa diakses publik, misalnya melalui Vercel.",
    color: "bg-butter",
  },
];

export default function Steps() {
  return (
    <section
      aria-labelledby="steps-title"
      className="pb-[clamp(4rem,8vw,7rem)]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="steps-title"
          className="mb-10 text-h2 font-normal text-ink"
        >
          Cara saya bekerja
        </h2>

        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.number} className="h-full">
              <Reveal delay={i * 0.07} className="h-full">
                <div
                  className={`${s.color} h-full rounded-3xl p-6 transition-transform duration-300 ease-out hover:-translate-y-1 sm:p-8`}
                >
                  <span className="text-label font-semibold text-ink">
                    {s.number}
                  </span>
                  <h3 className="mt-4 text-h3 font-normal text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-body text-ink">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}