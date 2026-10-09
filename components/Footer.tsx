export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pb-10 pt-6">
      <div className="flex flex-col gap-3 border-t border-line pt-6 text-label text-ink-muted md:flex-row md:items-center md:justify-between">
        <p>© 2026 Sutan Akbar</p>
        <p className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-pill bg-signal" />
          Terbuka untuk magang
        </p>
      </div>
    </footer>
  );
}
