import { useState } from "react"
import { useAppStore } from "../../lib/store"
import { addExpenseToFirestore, useExpensesSync } from "../../hooks/useFirestore"
import { useExchangeRate, toTWD, convertCurrency } from "../../hooks/useExchangeRate"
import type { Expense, ExpenseCategory, Currency } from "../../types"
import toast from "react-hot-toast"

const CAT_EMOJI: Record<ExpenseCategory, string> = {
  transport: "🚗", food: "🍣", sight: "🎫", shopping: "🛍️", hotel: "🏨", other: "📌",
}
const CAT_LABELS: Record<ExpenseCategory, string> = {
  transport: "交通", food: "餐飲", sight: "景點", shopping: "購物", hotel: "住宿", other: "其他",
}
const CUR_SYM: Record<string, string> = { TWD: "NT$", JPY: "¥", USD: "$" }

export default function ExpensePage() {
  useExchangeRate()
  useExpensesSync()
  const { expenses, members, rates } = useAppStore()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: "", amount: "", currency: "JPY" as Currency,
    category: "food" as ExpenseCategory, paidBy: "m1",
  })
  const [convAmt, setConvAmt] = useState("1000")
  const [convFrom, setConvFrom] = useState("JPY")
  const [convTo, setConvTo] = useState("TWD")

  const convResult = convAmt ? Math.round(convertCurrency(parseFloat(convAmt), convFrom, convTo, rates)) : 0
  const totalTWD = expenses.reduce((sum, e) => sum + toTWD(e.amount, e.currency, rates), 0)
  const previewTWD = form.amount ? Math.round(toTWD(parseFloat(form.amount), form.currency, rates)) : null

  async function handleSubmit() {
    if (!form.title || !form.amount) return toast.error("請填寫名稱和金額")
    await addExpenseToFirestore({
      title: form.title, amount: parseFloat(form.amount),
      currency: form.currency, category: form.category,
      paidBy: form.paidBy, splitWith: members.map((m) => m.id),
      date: new Date().toISOString().slice(0, 10),
    })
    setShowForm(false)
    setForm({ title: "", amount: "", currency: "JPY", category: "food", paidBy: "m1" })
    toast.success("記帳成功！")
  }

  return (
    <div className="p-4 pb-6">

      {/* Exchange rate + converter */}
      <div className="bg-card border-[1.5px] border-border rounded-[14px] p-3 mb-3 shadow-card-sm">
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <span className="text-xs text-muted">即時匯率</span>
          <span className="text-sm font-medium text-accent">¥1 = NT${rates.JPY}</span>
          <span className="text-sm font-medium text-accent-3">$1 = NT${rates.USD?.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="number"
            className="w-24 border-[1.5px] border-border rounded-lg px-2 py-1.5 text-sm bg-bg focus:outline-none focus:border-accent font-sans text-text"
            value={convAmt}
            onChange={(e) => setConvAmt(e.target.value)}
          />
          <select
            className="border-[1.5px] border-border rounded-lg px-2 py-1.5 text-sm bg-bg font-sans text-text"
            value={convFrom}
            onChange={(e) => setConvFrom(e.target.value)}
          >
            <option value="JPY">¥ JPY</option>
            <option value="USD">$ USD</option>
            <option value="TWD">NT$ TWD</option>
          </select>
          <span className="text-muted text-sm">→</span>
          <select
            className="border-[1.5px] border-border rounded-lg px-2 py-1.5 text-sm bg-bg font-sans text-text"
            value={convTo}
            onChange={(e) => setConvTo(e.target.value)}
          >
            <option value="TWD">NT$ TWD</option>
            <option value="JPY">¥ JPY</option>
            <option value="USD">$ USD</option>
          </select>
          <span className="ml-auto text-base font-bold text-stamp">
            {CUR_SYM[convTo]}{convResult.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="bg-card border-[1.5px] border-border rounded-[14px] p-3 mb-3 shadow-card-sm text-center">
        <div className="text-xs text-muted mb-0.5">台幣合計（估）</div>
        <div className="text-2xl font-bold text-stamp">NT${Math.round(totalTWD).toLocaleString()}</div>
      </div>

      {/* Add button */}
      <button
        onClick={() => setShowForm((v) => !v)}
        className="w-full bg-accent text-white rounded-[14px] py-2.5 text-sm font-medium shadow-btn-green active:translate-y-0.5 transition-all mb-3 border-none cursor-pointer font-sans"
      >
        ＋ 新增記帳
      </button>

      {/* Add form */}
      {showForm && (
        <div className="bg-card border-2 border-border rounded-2xl p-3 mb-3 shadow-card">
          <input
            className="w-full border-[1.5px] border-border rounded-xl p-2 text-sm mb-2 bg-bg focus:outline-none focus:border-accent font-sans text-text"
            placeholder="支出名稱（例：午餐、入場券）"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <div className="flex gap-2 mb-1">
            <input
              type="number" inputMode="decimal"
              className="flex-1 border-[1.5px] border-border rounded-xl p-2 text-sm bg-bg focus:outline-none focus:border-accent font-sans text-text"
              placeholder="金額"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            />
            <select
              className="border-[1.5px] border-border rounded-xl px-2 text-sm bg-bg font-sans text-text"
              value={form.currency}
              onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value as Currency }))}
            >
              <option value="JPY">¥ JPY</option>
              <option value="TWD">NT$ TWD</option>
              <option value="USD">$ USD</option>
            </select>
          </div>
          {previewTWD !== null && form.currency !== "TWD" && (
            <div className="text-xs text-muted mb-2 px-1">≈ NT${previewTWD.toLocaleString()}</div>
          )}

          {/* Category chips */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {(Object.keys(CAT_LABELS) as ExpenseCategory[]).map((cat) => (
              <button key={cat}
                onClick={() => setForm((f) => ({ ...f, category: cat }))}
                className={`text-xs px-2.5 py-1 rounded-full border-[1.5px] cursor-pointer font-sans transition-colors ${form.category === cat ? "bg-accent text-white border-accent" : "bg-bg border-border text-muted"}`}>
                {CAT_EMOJI[cat]} {CAT_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Payer chips */}
          <div className="text-xs text-muted mb-1">付款人</div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {members.map((m) => (
              <button key={m.id}
                onClick={() => setForm((f) => ({ ...f, paidBy: m.id }))}
                className={`text-xs px-2.5 py-1 rounded-full border-[1.5px] cursor-pointer font-sans transition-colors ${form.paidBy === m.id ? "bg-tag-food border-accent-2 text-amber-700" : "bg-bg border-border text-muted"}`}>
                {m.nickname}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-stamp text-white rounded-xl py-2 text-sm font-medium border-none cursor-pointer font-sans active:scale-[.98] transition-transform"
          >
            確認記帳
          </button>
        </div>
      )}

      {/* List */}
      <h2 className="font-journal text-lg text-stamp mb-3">📋 明細</h2>
      <div className="flex flex-col gap-2">
        {expenses.length === 0 && (
          <div className="text-center text-muted text-sm py-8">還沒有任何記帳喔！</div>
        )}
        {expenses.map((e) => {
          const payer = members.find((m) => m.id === e.paidBy)
          const twd = Math.round(toTWD(e.amount, e.currency, rates))
          return (
            <div key={e.id} className="bg-card border-[1.5px] border-border rounded-[12px] p-3 flex items-center gap-3 shadow-card-sm">
              <div className="w-8 h-8 bg-bg rounded-[9px] flex items-center justify-center text-base flex-shrink-0">
                {CAT_EMOJI[e.category]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{e.title}</div>
                <div className="text-[11px] text-muted">{payer?.nickname ?? "?"} · {e.date}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-bold text-accent-2">
                  {CUR_SYM[e.currency]}{e.amount.toLocaleString()}
                </div>
                {e.currency !== "TWD" && (
                  <div className="text-[10px] text-muted">≈NT${twd.toLocaleString()}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
