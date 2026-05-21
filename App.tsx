// src/App.tsx
import { useState, Suspense, lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import PinGuard from './components/shared/PinGuard'

const SchedulePage  = lazy(() => import('./components/Schedule/SchedulePage'))
const BookingsPage  = lazy(() => import('./components/Bookings/BookingsPage'))
const ExpensePage   = lazy(() => import('./components/Expense/ExpensePage'))
const JournalPage   = lazy(() => import('./components/Journal/JournalPage'))
const ChecklistPage = lazy(() => import('./components/Checklist/ChecklistPage'))


type Tab = 'schedule' | 'bookings' | 'expense' | 'journal' | 'checklist'

const TABS: { id: Tab; emoji: string; label: string; protected?: boolean }[] = [
  { id: 'schedule',  emoji: '📅', label: '行程' },
  { id: 'bookings',  emoji: '🎫', label: '預訂', protected: true },
  { id: 'expense',   emoji: '💰', label: '記帳' },
  { id: 'journal',   emoji: '📷', label: '日誌' },
  { id: 'checklist', emoji: '✅', label: '準備' },
]

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-48">
      <div className="text-muted text-sm animate-pulse">載入中...</div>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('schedule')

  const current = TABS.find(t => t.id === activeTab)!

  return (
    <div className="min-h-screen bg-bg bg-dot-pattern bg-dot font-sans max-w-[430px] mx-auto pb-20">
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

      {/* App Header */}
      <header className="bg-card border-b-2 border-border px-4 py-3 sticky top-0 z-40 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-journal text-xl text-stamp font-bold">✈ 大阪回憶製造所</div>
            <div className="text-[11px] text-muted">2026 / 5.25 — 5.29 · 6人同行</div>
          </div>
          <DaysCountdown />
        </div>
      </header>

      {/* Page Content */}
      <main>
        <Suspense fallback={<PageLoader />}>
          {activeTab === 'schedule' && <SchedulePage />}
          {activeTab === 'bookings' && (
            <PinGuard><BookingsPage /></PinGuard>
          )}
          {activeTab === 'expense'   && <ExpensePage />}
          {activeTab === 'journal'   && <JournalPage />}
          {activeTab === 'checklist' && <ChecklistPage />}
        </Suspense>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card 
        border-t-2 border-border flex z-40 shadow-[0_-3px_0_#D8D0C0]">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 flex flex-col items-center gap-0.5 text-[10px] font-medium
              transition-colors active:scale-95 border-none bg-transparent cursor-pointer
              ${activeTab === tab.id ? 'text-accent' : 'text-muted'}`}
          >
            <span className="text-[18px] leading-none">{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

function DaysCountdown() {
  const depart = new Date('2026-05-25')
  const now    = new Date()
  const days   = Math.max(0, Math.ceil((depart.getTime() - now.getTime()) / 86400000))

  if (days === 0) return <span className="text-sm text-accent font-bold">出發日！✈</span>

  return (
    <div className="bg-stamp text-white rounded-full px-3 py-1 text-xs font-medium">
      <span className="text-lg font-bold">{days}</span> 天後出發
    </div>
  )
}
