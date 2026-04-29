"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/works", label: "作品" },
  { href: "/about", label: "关于" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-6 py-4 md:px-12 flex items-center justify-between bg-[#FAF6EF]/90 backdrop-blur-sm border-b border-[#E8D5C4]">
      <Link
        href="/"
        style={{ fontFamily: "var(--font-caveat)" }}
        className="text-2xl text-[#B5532A] tracking-wide hover:opacity-70 transition-opacity"
      >
        Astro
      </Link>

      <nav className="flex items-center gap-8">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm tracking-widest uppercase transition-colors ${
              pathname === href
                ? "text-[#B5532A] font-semibold"
                : "text-[#6B5344] hover:text-[#B5532A]"
            }`}
            style={{ fontFamily: "var(--font-lora)" }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
