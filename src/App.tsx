import { useState, Suspense, lazy } from "react"
import { Toaster } from "react-hot-toast"

const SchedulePage  = lazy(() => import("./components/Schedule/SchedulePage"))
const ExpensePage   = lazy(() => import("./components/Expense/ExpensePage"))
const ChecklistPage = lazy(() => import("./components/Checklist/ChecklistPage"))
const InfoPage      = lazy(() => import("./components/Info/InfoPage"))
const AIToolsPage   = lazy(() => import("./components/AITools/AIToolsPage"))

type Tab = "schedule" | "expense" | "checklist" | "info" | "ai"

const TABS: { id: Tab; emoji: string; label: string }[] = [
  { id: "schedule",  emoji: "📅", label: "行程" },
  { id: "expense",   emoji: "💰", label: "記帳" },
  { id: "checklist", emoji: "✅", label: "清單" },
  { id: "info",      emoji: "ℹ️",  label: "資訊" },
  { id: "ai",        emoji: "🤖", label: "AI" },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("schedule")
  const daysUntil = Math.max(0, Math.ceil((new Date("2026-05-25").getTime() - new Date().getTime()) / 86400000))

  return (
    <div
      className="min-h-screen font-sans max-w-[430px] mx-auto pb-20"
      style={{ background: "#F5F0E8", backgroundImage: "radial-gradient(circle,#C8BFB030 1px,transparent 1px)", backgroundSize: "18px 18px" }}
    >
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

      <header className="bg-card border-b-2 border-border px-4 py-3 sticky top-0 z-40 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-journal text-xl text-stamp font-bold">✈ 大阪回憶製造所</div>
            <div className="text-[11px] text-muted">2026 / 5.25 — 5.29 · 6人同行</div>
          </div>
          {daysUntil > 0 && (
            <div className="bg-stamp text-white rounded-full px-3 py-1 text-xs font-medium">
              <span className="text-lg font-bold">{daysUntil}</span> 天後出發
            </div>
          )}
        </div>
      </header>

      <main>
        <Suspense fallback={<div className="flex items-center justify-center h-48 text-muted text-sm">載入中...</div>}>
          {activeTab === "schedule"  && <SchedulePage />}
          {activeTab === "expense"   && <ExpensePage />}
          {activeTab === "checklist" && <ChecklistPage />}
          {activeTab === "info"      && <InfoPage />}
          {activeTab === "ai"        && <AIToolsPage />}
        </Suspense>
      </main>

      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t-2 border-border flex z-40"
        style={{ boxShadow: "0 -3px 0 #D8D0C0" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors active:scale-95 border-none bg-transparent cursor-pointer font-sans
              ${activeTab === tab.id ? "text-accent" : "text-muted"}`}
          >
            <span className="text-[18px] leading-none">{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
