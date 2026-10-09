"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `whitespace-nowrap text-[0.875rem] transition-opacity hover:opacity-70 ${
      isActive(href) ? "text-ink" : "text-ink-muted"
    }`;

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-[0.9375rem] tracking-[-0.02em] text-ink">
          Sutan Akbar.
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-6 md:flex">
          {TABS.map((tab) => (
            <li key={tab.href}>
              <Link href={tab.href} className={linkClass(tab.href)}>
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="inline-flex items-center rounded-pill bg-ink px-4 py-2 text-label font-semibold text-surface transition-opacity hover:opacity-85"
        >
          Mari terhubung
        </Link>
      </div>

      {/* Menu mobile: baris yang bisa digeser */}
      <ul className="flex items-center gap-5 overflow-x-auto px-6 pb-3 md:hidden">
        {TABS.map((tab) => (
          <li key={tab.href}>
            <Link href={tab.href} className={linkClass(tab.href)}>
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
