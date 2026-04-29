export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-10 md:px-12 border-t border-[#E8D5C4] flex flex-col items-center gap-3">
      {/* Hand-drawn divider */}
      <svg width="120" height="12" viewBox="0 0 120 12" fill="none" className="mb-1 opacity-40">
        <path
          d="M2 6 C20 2, 40 10, 60 6 C80 2, 100 10, 118 6"
          stroke="#B5532A"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Handwritten signature */}
      <p
        style={{ fontFamily: "var(--font-caveat)" }}
        className="text-3xl text-[#B5532A]"
      >
        Astro
      </p>

      <p
        style={{ fontFamily: "var(--font-lora)" }}
        className="text-xs text-[#6B5344] tracking-widest"
      >
        © {year} · 手工精心制作
      </p>
    </footer>
  );
}
