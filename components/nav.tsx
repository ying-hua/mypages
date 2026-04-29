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
    <header className="sticky top-0 z-50 px-6 py-4 md:px-12 flex items-center justify-between bg-[#0E0E12]/85 backdrop-blur-md border-b border-[#28283A]">
      <Link
        href="/"
        style={{ fontFamily: "var(--font-caveat)" }}
        className="text-2xl text-[#D4643A] tracking-wide hover:opacity-70 transition-opacity"
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
                ? "text-[#D4643A] font-semibold"
                : "text-[#8A7868] hover:text-[#C68B59]"
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
