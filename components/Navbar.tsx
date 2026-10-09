"use client";

const TABS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-sm border-b border-[var(--color-line)]">
      <div className="max-w-[72rem] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="text-[var(--color-ink)] font-[400] text-[0.9375rem] tracking-[-0.02em]"
        >
          Sutan Akbar.
        </a>

        {/* Nav Links - Hidden on mobile */}
        <ul className="hidden md:flex items-center gap-6">
          {TABS.map((tab) => (
            <li key={tab.href}>
              <a
                href={tab.href}
                className="text-[var(--color-ink-muted)] text-[0.875rem] hover:opacity-70 transition-opacity"
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#contact"
          className="inline-flex items-center px-4 py-2 rounded-[999px] bg-[var(--color-ink)] text-[var(--color-white)] text-[0.78rem] font-[600] hover:scale-[1.02] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
        >
          Mari terhubung
        </a>
      </div>
    </nav>
  );
}
