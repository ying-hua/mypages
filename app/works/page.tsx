import FadeIn from "@/components/fade-in";

const works = [
  {
    id: "1",
    title: "AI 对话助手",
    desc: "基于大语言模型的智能客服系统，支持多轮对话与知识库检索，大幅降低人工客服压力。",
    tag: "AI · 工程",
    year: "2024",
    tech: ["Python", "LangChain", "FastAPI", "React"],
  },
  {
    id: "2",
    title: "文档智能解析",
    desc: "上传 PDF / Word 即可自动提炼摘要、生成问答，支持自定义模板，节省 80% 阅读时间。",
    tag: "NLP · 产品",
    year: "2024",
    tech: ["LlamaIndex", "GPT-4o", "Next.js"],
  },
  {
    id: "3",
    title: "个人知识图谱",
    desc: "将笔记、文章结构化为可探索的知识网络，辅助思考与回顾，让碎片化信息产生连接。",
    tag: "知识管理",
    year: "2025",
    tech: ["Python", "Neo4j", "Embedding"],
  },
  {
    id: "4",
    title: "代码评审 Agent",
    desc: "自动分析 Git diff，生成结构化评审意见，支持接入 GitHub PR 工作流，提升团队效率。",
    tag: "DevTool · AI",
    year: "2025",
    tech: ["Claude API", "GitHub Actions", "TypeScript"],
  },
  {
    id: "5",
    title: "多模态内容生成",
    desc: "根据简单描述自动生成图文并茂的长文章，结合 DALL-E 配图与 GPT-4o 写作，一键成稿。",
    tag: "多模态",
    year: "2024",
    tech: ["GPT-4o", "DALL-E 3", "Next.js"],
  },
  {
    id: "6",
    title: "会议纪要自动化",
    desc: "录音上传即出纪要——转写、归纳行动项、分配责任人，会议效率直接翻倍。",
    tag: "语音 · AI",
    year: "2023",
    tech: ["Whisper", "GPT-4", "FastAPI"],
  },
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
          className="text-5xl md:text-6xl font-black text-[#3A2E26] mb-4 relative inline-block"
        >
          我做过的事
          <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 8" fill="none" preserveAspectRatio="none">
            <path d="M2 5 C75 1, 150 7, 225 4 C262 2, 285 6, 298 4" stroke="#B5532A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p style={{ fontFamily: "var(--font-lora)" }} className="text-[#6B5344] text-base mt-8 mb-16 max-w-xl">
          这里收录了我在研究生期间完成的 AI 应用项目——每一个都试图回答同一个问题：
          <em> 如何让 AI 真正好用？</em>
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
  return (
    <div className="group relative bg-[#FAF6EF] border border-[#E8D5C4] rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(58,46,38,0.1)] hover:border-[#C68B59]">
      {/* Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5 rounded-sm opacity-50 rotate-1 bg-[#E8D5C4]" />

      <div className="flex items-start justify-between">
        <span
          style={{ fontFamily: "var(--font-caveat)" }}
          className="text-[#C68B59] text-sm bg-[#F2EBE0] px-3 py-1 rounded-full"
        >
          {work.tag}
        </span>
        <span style={{ fontFamily: "var(--font-lora)" }} className="text-xs text-[#6B5344] opacity-60">
          {work.year}
        </span>
      </div>

      <h2
        style={{ fontFamily: "var(--font-fraunces)" }}
        className="text-xl text-[#3A2E26] leading-snug group-hover:text-[#B5532A] transition-colors"
      >
        {work.title}
      </h2>

      <p style={{ fontFamily: "var(--font-lora)" }} className="text-sm text-[#6B5344] leading-relaxed flex-1">
        {work.desc}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E8D5C4]">
        {work.tech.map((t) => (
          <span
            key={t}
            style={{ fontFamily: "var(--font-lora)" }}
            className="text-xs text-[#7A4F35] bg-[#E8D5C4] px-2 py-0.5 rounded"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
