import { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../../lib/firebase'
import type { FoodItem } from '../../types'

const CATEGORIES = ['全部', '海鮮', '麵', '甜點', '燒肉', '飯', '漢堡', '中式', '西式']

const CATEGORY_EMOJI: Record<string, string> = {
  海鮮: '🦀',
  麵: '🍜',
  甜點: '🍡',
  燒肉: '🥩',
  飯: '🍚',
  漢堡: '🍔',
  中式: '🥢',
  西式: '🍝',
}

const PRIORITY_LABEL: Record<string, string> = {
  must: '必吃',
  recommend: '推薦',
  maybe: '想試試',
}

const PRIORITY_STYLE: Record<string, string> = {
  must: 'bg-red-100 text-red-700',
  recommend: 'bg-amber-100 text-amber-700',
  maybe: 'bg-gray-100 text-gray-500',
}

const TAB_OPTIONS = ['全部', '未去', '已吃'] as const
type Tab = (typeof TAB_OPTIONS)[number]

export default function FoodPage() {
  const [items, setItems] = useState<FoodItem[]>([])
  const [tab, setTab] = useState<Tab>('全部')
  const [catFilter, setCatFilter] = useState('全部')
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    name: '',
    area: '',
    category: '海鮮',
    priority: 'must' as FoodItem['priority'],
    note: '',
  })

  useEffect(() => {
    const q = query(collection(db, 'foods'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FoodItem)))
    })
    return unsub
  }, [])

  const handleAdd = async () => {
    if (!form.name.trim()) return
    await addDoc(collection(db, 'foods'), {
      ...form,
      visited: false,
      createdAt: Date.now(),
    })
    setForm({ name: '', area: '', category: '海鮮', priority: 'must', note: '' })
    setShowForm(false)
  }

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'foods', id))
  }

  const handleToggleVisited = async (item: FoodItem) => {
    await updateDoc(doc(db, 'foods', item.id), { visited: !item.visited })
  }

  const handleNavigate = (name: string) => {
    const q = encodeURIComponent(`大阪 ${name}`)
    window.open(`https://www.google.com/maps/search/${q}`, '_blank')
  }

  const filtered = items.filter((item) => {
    const tabMatch =
      tab === '全部' ||
      (tab === '未去' && !item.visited) ||
      (tab === '已吃' && item.visited)
    const catMatch = catFilter === '全部' || item.category === catFilter
    return tabMatch && catMatch
  })

  const total = items.length
  const visitedCount = items.filter((i) => i.visited).length
  const rate = total === 0 ? 0 : Math.round((visitedCount / total) * 100)

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Header */}
      <div className="bg-orange-500 px-4 pt-4 pb-0">
        <h1 className="text-white text-lg font-medium">🍜 大阪美食清單</h1>
        <p className="text-orange-100 text-xs mt-0.5 mb-3">
          {total} 間想去・{visitedCount} 間已吃
        </p>

        {/* Tabs */}
        <div className="flex gap-1">
          {TAB_OPTIONS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-t-lg text-xs font-medium transition-colors ${
                tab === t
                  ? 'bg-gray-50 text-orange-500'
                  : 'text-orange-100 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-3 pt-3 pb-28">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: '想去', value: total },
            { label: '已吃', value: visitedCount },
            { label: '達成率', value: `${rate}%` },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-gray-100 py-2 text-center"
            >
              <div className="text-orange-500 text-xl font-medium">{s.value}</div>
              <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Category chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                catFilter === cat
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-500 border-gray-200'
              }`}
            >
              {cat !== '全部' ? `${CATEGORY_EMOJI[cat] ?? ''} ` : ''}
              {cat}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-12">
            還沒有餐廳，點右下角 ＋ 新增
          </div>
        )}

        {/* Food cards */}
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border border-gray-100 p-3 mb-2.5 transition-opacity ${
              item.visited ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl flex-shrink-0">
                {CATEGORY_EMOJI[item.category] ?? '🍽️'}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={`text-sm font-medium text-gray-800 ${
                    item.visited ? 'line-through' : ''
                  }`}
                >
                  {item.name}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  {item.area && (
                    <span className="text-xs text-gray-400">{item.area}</span>
                  )}
                  {item.area && <span className="text-gray-300 text-xs">·</span>}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      PRIORITY_STYLE[item.priority]
                    }`}
                  >
                    {PRIORITY_LABEL[item.priority]}
                  </span>
                  {item.visited && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                      已吃 ✓
                    </span>
                  )}
                </div>
              </div>
            </div>

            {item.note ? (
              <div className="mt-2 text-xs text-gray-500 bg-orange-50 rounded-lg px-2.5 py-1.5 border-l-2 border-orange-400">
                {item.note}
              </div>
            ) : null}

            <div className="flex gap-1.5 mt-2.5 items-center">
              <button
                onClick={() => handleNavigate(item.name)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-medium"
              >
                📍 導航
              </button>
              {!item.visited ? (
                <button
                  onClick={() => handleToggleVisited(item)}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium"
                >
                  ✓ 已吃
                </button>
              ) : (
                <button
                  onClick={() => handleToggleVisited(item)}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500 text-xs"
                >
                  取消
                </button>
              )}
              <button
                onClick={() => handleDelete(item.id)}
                className="ml-auto px-3 py-1.5 rounded-lg bg-red-50 text-red-400 text-xs"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-20 right-4 w-12 h-12 bg-orange-500 text-white rounded-full shadow-lg text-2xl flex items-center justify-center z-40"
        >
          +
        </button>
      )}

      {/* Bottom sheet form */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setShowForm(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 px-4 pt-4 pb-8 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-gray-800">新增美食</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              placeholder="店名（必填）"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-2.5 focus:outline-none focus:border-orange-400"
            />

            <input
              type="text"
              placeholder="區域（道頓堀、難波…）"
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-2.5 focus:outline-none focus:border-orange-400"
            />

            <div className="flex gap-2 mb-2.5">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 bg-white"
              >
                {CATEGORIES.filter((c) => c !== '全部').map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_EMOJI[c]} {c}
                  </option>
                ))}
              </select>
              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority: e.target.value as FoodItem['priority'],
                  })
                }
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 bg-white"
              >
                <option value="must">🔴 必吃</option>
                <option value="recommend">🟡 推薦</option>
                <option value="maybe">⚪ 想試試</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="備註（訂位提醒、推薦菜色…）"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-4 focus:outline-none focus:border-orange-400"
            />

            <button
              onClick={handleAdd}
              disabled={!form.name.trim()}
              className="w-full py-3 bg-orange-500 text-white rounded-xl text-sm font-medium disabled:opacity-40"
            >
              新增
            </button>
          </div>
        </>
      )}
    </div>
  )
}
