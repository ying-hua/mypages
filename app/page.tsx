import Link from "next/link";
import FadeIn from "@/components/fade-in";

const featuredWorks = [
  {
    id: "1",
    title: "AI 对话助手",
    desc: "基于大语言模型的智能客服系统，支持多轮对话与知识库检索",
    tag: "AI · 工程",
    year: "2024",
  },
  {
    id: "2",
    title: "文档智能解析",
    desc: "上传 PDF / Word 即可自动提炼摘要、生成问答，节省 80% 阅读时间",
    tag: "NLP · 产品",
    year: "2024",
  },
  {
    id: "3",
    title: "个人知识图谱",
    desc: "将笔记、文章结构化为可探索的知识网络，辅助思考与回顾",
    tag: "知识管理",
    year: "2025",
  },
];

export default function Home() {
  return (
    <div className="px-6 md:px-12 lg:px-24">
      {/* ── Hero ── */}
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center max-w-4xl mx-auto py-24">
        {/* Small hand-drawn squiggle */}
        <FadeIn delay={0.1}>
          <svg width="60" height="18" viewBox="0 0 60 18" fill="none" className="mb-8 opacity-50">
            <path
              d="M2 9 C12 3, 22 15, 32 9 C42 3, 52 15, 58 9"
              stroke="#C68B59"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p
            style={{ fontFamily: "var(--font-caveat)" }}
            className="text-[#C68B59] text-xl mb-4 tracking-wide"
          >
            你好，我是
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <h1
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="text-7xl md:text-9xl font-black text-[#3A2E26] leading-[0.9] mb-6 relative inline-block"
          >
            Astro
            {/* Hand-drawn underline */}
            <svg
              className="absolute -bottom-3 left-0 w-full"
              viewBox="0 0 200 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8 C50 2, 100 11, 150 6 C175 3, 190 9, 198 7"
                stroke="#B5532A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </h1>
        </FadeIn>

        <FadeIn delay={0.5}>
          <p
            style={{ fontFamily: "var(--font-lora)" }}
            className="text-lg md:text-xl text-[#6B5344] mt-10 max-w-xl leading-relaxed"
          >
            北京大学研三在读，即将毕业。
            <br />
            热爱将 AI 的可能性变成真实可用的产品——
            <br />
            <span className="text-[#B5532A] font-semibold">准 AI 应用软件工程师</span>。
          </p>
        </FadeIn>

        <FadeIn delay={0.65}>
          <div className="flex gap-4 mt-12 flex-wrap">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#B5532A] text-[#FAF6EF] text-sm tracking-widest uppercase transition-all hover:bg-[#7A4F35] hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              查看作品
              <span className="text-base">→</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-[#C68B59] text-[#6B5344] text-sm tracking-widest uppercase transition-all hover:bg-[#E8D5C4] hover:-translate-y-0.5"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              关于我
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-4xl mx-auto mb-20">
        <svg width="100%" height="2" viewBox="0 0 800 2" preserveAspectRatio="none" fill="none">
          <line x1="0" y1="1" x2="800" y2="1" stroke="#E8D5C4" strokeWidth="1" strokeDasharray="6 4" />
        </svg>
      </div>

      {/* ── Featured Works ── */}
      <section className="max-w-4xl mx-auto pb-32">
        <FadeIn delay={0.1}>
          <div className="flex items-center gap-4 mb-12">
            <p
              style={{ fontFamily: "var(--font-caveat)" }}
              className="text-[#C68B59] text-3xl"
            >
              近期作品
            </p>
            <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
              <path d="M2 6 C12 2, 28 10, 38 6" stroke="#C68B59" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredWorks.map((work, i) => (
            <FadeIn key={work.id} delay={0.1 + i * 0.15}>
              <WorkCard work={work} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.6}>
          <div className="mt-10 text-center">
            <Link
              href="/works"
              style={{ fontFamily: "var(--font-caveat)" }}
              className="text-xl text-[#B5532A] underline decoration-dotted underline-offset-4 hover:decoration-solid transition-all"
            >
              查看全部作品 →
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

function WorkCard({ work }: { work: (typeof featuredWorks)[0] }) {
  return (
    <div className="group relative bg-[#FAF6EF] border border-[#E8D5C4] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(58,46,38,0.1)] hover:border-[#C68B59] cursor-pointer">
      {/* Tape decoration */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5 rounded-sm opacity-60 rotate-1"
        style={{ backgroundColor: "#E8D5C4", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
      />

      <div className="flex items-start justify-between mb-4">
        <span
          style={{ fontFamily: "var(--font-caveat)" }}
          className="text-[#C68B59] text-sm bg-[#F2EBE0] px-3 py-1 rounded-full"
        >
          {work.tag}
        </span>
        <span
          style={{ fontFamily: "var(--font-lora)" }}
          className="text-xs text-[#6B5344] opacity-60"
        >
          {work.year}
        </span>
      </div>

      <h3
        style={{ fontFamily: "var(--font-fraunces)" }}
        className="text-xl text-[#3A2E26] mb-3 leading-snug group-hover:text-[#B5532A] transition-colors"
      >
        {work.title}
      </h3>

      <p
        style={{ fontFamily: "var(--font-lora)" }}
        className="text-sm text-[#6B5344] leading-relaxed"
      >
        {work.desc}
      </p>
    </div>
  );
}
