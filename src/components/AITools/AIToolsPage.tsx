const TOOLS = [
  {
    emoji: "🗣️",
    name: "即時日文翻譯",
    desc: "中日語音互譯，在餐廳、商店溝通最好用",
    url: "https://gemini.google.com/gem/1f4ApPXxyWzwesGE82e2SH11hKhbxqqq1?usp=sharing",
    color: "#7B9E6B",
  },
  {
    emoji: "🍽️",
    name: "日文菜單解讀",
    desc: "拍下菜單，立即了解每道料理內容",
    url: "https://gemini.google.com/gem/1fa0tVzBdpjJEAEjPYv0TANt8MT7cYuan?usp=sharing",
    color: "#D4956A",
  },
  {
    emoji: "🧭",
    name: "即時導遊",
    desc: "景點介紹、歷史背景、周邊推薦一次搞定",
    url: "https://gemini.google.com/gem/1mBVkQ0InL1gPdhZy6Np2ZJCSl6X3cGu7?usp=sharing",
    color: "#6B8FA8",
  },
]

export default function AIToolsPage() {
  return (
    <div className="p-4 pb-6">
      <div className="font-journal text-lg text-stamp mb-1">🤖 AI 旅遊助手</div>
      <p className="text-xs text-muted mb-5 leading-relaxed">
        旅途中遇到語言障礙？點擊下方工具，用 Gemini AI 即時幫你解決
      </p>

      <div className="flex flex-col gap-4">
        {TOOLS.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border-2 border-border rounded-2xl p-5 shadow-card flex items-center gap-4 active:scale-[.98] transition-transform"
            style={{ textDecoration: "none" }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ background: tool.color + "20", border: `2px solid ${tool.color}40` }}
            >
              {tool.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-base font-bold text-text mb-1">{tool.name}</div>
              <div className="text-xs text-muted leading-relaxed">{tool.desc}</div>
            </div>
            <div className="text-muted text-lg flex-shrink-0">›</div>
          </a>
        ))}
      </div>

      <div className="mt-6 bg-card border-2 border-border rounded-2xl p-4 shadow-card">
        <div className="text-xs text-muted text-center leading-relaxed">
          以上工具由 Google Gemini 提供<br />
          需要網路連線，請確認 eSIM 已啟用 📶
        </div>
      </div>
    </div>
  )
}
