import FadeIn from "@/components/fade-in";
import Link from "next/link";

const works = [
  {
    id: "1",
    title: "极简图片工具箱",
    desc: "纯本地处理 · 隐私安全 · 即开即用",
    tag: "AI · 工程",
    year: "2026",
    tech: ["TypeScript", "Pyodide", "Canvas", "React"],
    link: "https://app-8rgbkdgemb5t.appmiaoda.com/",
  },
  {
    id: "2",
    title: "双人抢红包小游戏",
    desc: "春节聚会必备 · 策略博弈 · 谁拿到炸弹谁输",
    tag: "游戏 · 博弈",
    year: "2026",
    tech: ["TypeScript", "AI"],
    link: "https://app-9gs6686wcoox.appmiaoda.com/",
  }
];

export default function Works() {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-20 max-w-5xl mx-auto">
      {/* Header */}
      <FadeIn>
        <p style={{ fontFamily: "var(--font-caveat)" }} className="text-[#C68B59] text-2xl mb-3">
          作品集
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1
          style={{ fontFamily: "var(--font-fraunces)" }}
          className="text-5xl md:text-6xl font-black text-[#EDE4D8] mb-4 relative inline-block"
        >
          我做过的事
          <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 8" fill="none" preserveAspectRatio="none">
            <path d="M2 5 C75 1, 150 7, 225 4 C262 2, 285 6, 298 4" stroke="#D4643A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p style={{ fontFamily: "var(--font-lora)" }} className="text-[#8A7868] text-base mt-8 mb-16 max-w-xl">
          这里收录了我在研究生期间完成的 AI 应用项目——每一个都试图回答同一个问题：
          <em className="text-[#C8BAA8]"> 如何让 AI 真正好用？</em>
        </p>
      </FadeIn>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work, i) => (
          <FadeIn key={work.id} delay={0.1 + i * 0.1}>
            <WorkCard work={work} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function WorkCard({ work }: { work: (typeof works)[0] }) {
  const isExternal = work.link.startsWith("http");

  return (
    <Link 
      href={work.link} 
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative bg-[#17171D] border border-[#28283A] rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-[#C68B59] block h-full cursor-pointer"
    >
      {/* Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5 rounded-sm opacity-30 rotate-1 bg-[#28283A]" />

      <div className="flex items-start justify-between">
        <span
          style={{ fontFamily: "var(--font-caveat)" }}
          className="text-[#C68B59] text-sm bg-[#1E1E26] px-3 py-1 rounded-full"
        >
          {work.tag}
        </span>
        <span style={{ fontFamily: "var(--font-lora)" }} className="text-xs text-[#8A7868]">
          {work.year}
        </span>
      </div>

      <h2
        style={{ fontFamily: "var(--font-fraunces)" }}
        className="text-xl text-[#EDE4D8] leading-snug group-hover:text-[#D4643A] transition-colors"
      >
        {work.title}
      </h2>

      <p style={{ fontFamily: "var(--font-lora)" }} className="text-sm text-[#8A7868] leading-relaxed flex-1">
        {work.desc}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#28283A]">
        {work.tech.map((t) => (
          <span
            key={t}
            style={{ fontFamily: "var(--font-lora)" }}
            className="text-xs text-[#C68B59] bg-[#1E1E26] px-2 py-0.5 rounded"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
