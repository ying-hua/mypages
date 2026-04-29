import FadeIn from "@/components/fade-in";

const skills = [
  { category: "AI & 模型", items: ["LLM 应用开发", "RAG / 知识库", "Prompt Engineering", "Agent 框架"] },
  { category: "工程", items: ["Python", "TypeScript", "FastAPI", "Next.js"] },
  { category: "工具链", items: ["LangChain", "LlamaIndex", "Docker", "Git"] },
];

const timeline = [
  { year: "2025", event: "即将毕业，入职 AI 应用方向" },
  { year: "2024", event: "研究生阶段深入 AI 应用工程，完成多个落地项目" },
  { year: "2022", event: "考入北京大学，开始研究生学习" },
  { year: "2022", event: "本科毕业，初识 AI 的魅力" },
];

export default function About() {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-20 max-w-3xl mx-auto">
      {/* Header */}
      <FadeIn>
        <p
          style={{ fontFamily: "var(--font-caveat)" }}
          className="text-[#C68B59] text-2xl mb-3"
        >
          关于我
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1
          style={{ fontFamily: "var(--font-fraunces)" }}
          className="text-5xl md:text-6xl font-black text-[#EDE4D8] mb-12 relative inline-block"
        >
          Hi, I&apos;m Astro
          <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 8" fill="none" preserveAspectRatio="none">
            <path d="M2 5 C75 1, 150 7, 225 4 C262 2, 285 6, 298 4" stroke="#D4643A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </h1>
      </FadeIn>

      {/* Bio */}
      <FadeIn delay={0.2}>
        <div
          style={{ fontFamily: "var(--font-lora)" }}
          className="text-[#C8BAA8] text-lg leading-[1.9] mb-16 space-y-4"
        >
          <p>
            我是 <strong className="text-[#D4643A]">Astro</strong>，北京大学研三在读，即将毕业。
          </p>
          <p>
            在攻读研究生的这几年里，我被 AI 应用工程这件事深深吸引——不是追求论文里的 SOTA 数字，
            而是把大模型的能力真正落地成<em>有人会用、解决真实问题</em>的产品。
          </p>
          <p>
            即将以 <strong className="text-[#D4643A]">AI 应用软件工程师</strong> 的身份踏入职场。
            期待和有趣的团队一起，把那些还停留在演示 PPT 里的 AI 能力，
            变成每天都在运行的服务。
          </p>
        </div>
      </FadeIn>

      {/* Skills */}
      <FadeIn delay={0.3}>
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <p style={{ fontFamily: "var(--font-caveat)" }} className="text-[#C68B59] text-2xl">
              技能栈
            </p>
            <svg width="40" height="10" viewBox="0 0 40 10" fill="none">
              <path d="M2 5 C12 1, 28 9, 38 5" stroke="#C68B59" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {skills.map((group) => (
              <div key={group.category} className="bg-[#17171D] rounded-2xl p-5 border border-[#28283A]">
                <p
                  style={{ fontFamily: "var(--font-fraunces)" }}
                  className="text-sm text-[#D4643A] font-semibold mb-3 tracking-wide uppercase"
                >
                  {group.category}
                </p>
                <ul style={{ fontFamily: "var(--font-lora)" }} className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-[#8A7868] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C68B59] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Timeline */}
      <FadeIn delay={0.4}>
        <div>
          <div className="flex items-center gap-3 mb-8">
            <p style={{ fontFamily: "var(--font-caveat)" }} className="text-[#C68B59] text-2xl">
              经历
            </p>
            <svg width="40" height="10" viewBox="0 0 40 10" fill="none">
              <path d="M2 5 C12 1, 28 9, 38 5" stroke="#C68B59" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="relative pl-6">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-[#28283A]" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-[#C68B59] border-2 border-[#0E0E12]" />
                  <span
                    style={{ fontFamily: "var(--font-caveat)" }}
                    className="text-sm text-[#C68B59] block mb-1"
                  >
                    {item.year}
                  </span>
                  <p
                    style={{ fontFamily: "var(--font-lora)" }}
                    className="text-[#C8BAA8] text-base"
                  >
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Contact */}
      <FadeIn delay={0.5}>
        <div className="mt-20 p-8 bg-[#17171D] rounded-2xl border border-[#28283A] text-center">
          <p style={{ fontFamily: "var(--font-caveat)" }} className="text-[#C68B59] text-2xl mb-3">
            来聊聊？
          </p>
          <p style={{ fontFamily: "var(--font-lora)" }} className="text-[#8A7868] mb-5 text-sm">
            无论是合作、交流还是随便聊聊，我的邮箱随时敞开。
          </p>
          <a
            href="mailto:139152599yh@gmail.com"
            style={{ fontFamily: "var(--font-lora)" }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#B5532A] text-[#EDE4D8] text-sm hover:bg-[#D4643A] transition-colors"
          >
            发封邮件
          </a>
        </div>
      </FadeIn>
    </div>
  );
}
