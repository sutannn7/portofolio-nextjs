// TODO: sesuaikan tiga langkah ini dengan cara kerja Anda yang sebenarnya.
const steps = [
  {
    number: "01",
    title: "Merancang tampilan",
    text: "Menyusun desain antarmuka yang rapi dan responsif di laptop maupun smartphone.",
  },
  {
    number: "02",
    title: "Membangun fitur",
    text: "Mengerjakan frontend dan backend, termasuk data dinamis dan penyimpanan ke database.",
  },
  {
    number: "03",
    title: "Merilis",
    text: "Mempublikasikan website agar bisa diakses publik, misalnya melalui Vercel.",
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
          className="mb-10 text-h2 font-normal tracking-[-0.02em] text-ink"
        >
          Cara saya bekerja
        </h2>

        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.number}
              className="rounded-3xl border border-line bg-surface p-6 sm:p-8"
            >
              <span className="text-label font-semibold text-ink-muted">
                {s.number}
              </span>
              <h3 className="mt-4 text-h3 font-normal text-ink">{s.title}</h3>
              <p className="mt-3 text-body text-ink-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}