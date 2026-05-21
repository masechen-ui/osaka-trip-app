import { useState, useRef } from "react"

type ListTab = "todo" | "carry" | "wish" | "buy"

const TABS: { id: ListTab; emoji: string; label: string }[] = [
  { id: "todo",  emoji: "✅", label: "待辦" },
  { id: "carry", emoji: "🎒", label: "攜帶" },
  { id: "wish",  emoji: "⭐", label: "想去" },
  { id: "buy",   emoji: "🛒", label: "採買" },
]

const DEFAULT_ITEMS: Record<ListTab, { id: string; label: string; isChecked: boolean; badge?: string }[]> = {
  todo: [
    { id: "td1", label: "線上辦理長榮報到（起飛前48小時）", isChecked: false, badge: "5/23" },
    { id: "td2", label: "確認 eSIM 卡已啟用", isChecked: false, badge: "緊急" },
    { id: "td3", label: "力丸燒肉訂位確認", isChecked: true },
    { id: "td4", label: "iPhone 加入 ICOCA", isChecked: false },
    { id: "td5", label: "換好日幣現鈔", isChecked: true },
    { id: "td6", label: "前一晚買好隔天早餐", isChecked: false, badge: "5/25前" },
  ],
  carry: [
    { id: "c1", label: "護照正本（效期 > 6個月）", isChecked: true },
    { id: "c2", label: "Visit Japan Web QR Code 截圖", isChecked: true },
    { id: "c3", label: "行動電源 20000mAh（隨身，最多2顆）", isChecked: false },
    { id: "c4", label: "感冒／退燒／腸胃藥／止痛藥", isChecked: false },
    { id: "c5", label: "休足時間貼片", isChecked: false },
    { id: "c6", label: "最舒適的運動鞋（謝絕新鞋！）", isChecked: false },
    { id: "c7", label: "輕便晴雨兩用傘", isChecked: false },
    { id: "c8", label: "太陽眼鏡 + 遮陽帽", isChecked: false },
  ],
  wish: [
    { id: "w1", label: "伏見稻荷奧社（人少的鳥居段）", isChecked: false },
    { id: "w2", label: "八坂庚申堂彩球拍照", isChecked: false },
    { id: "w3", label: "餵伊根海鷗（蝦味先）", isChecked: false },
    { id: "w4", label: "天橋立跨下觀景", isChecked: false },
    { id: "w5", label: "大阪城御座船體驗", isChecked: false },
    { id: "w6", label: "日本橋電電城公仔戰利品", isChecked: false },
    { id: "w7", label: "試吃黑門市場神戶牛串", isChecked: false },
  ],
  buy: [
    { id: "b1", label: "唐吉訶德藥妝掃貨", isChecked: false },
    { id: "b2", label: "松本清藥妝", isChecked: false },
    { id: "b3", label: "超市晚間半價生魚片", isChecked: false },
    { id: "b4", label: "老爺爺起司蛋糕（Rikuro）帶回", isChecked: false },
    { id: "b5", label: "日本橋電電城公仔", isChecked: false },
    { id: "b6", label: "便利商店零食大採購", isChecked: false },
  ],
}

interface DeleteDialog {
  id: string
  label: string
}

export default function ChecklistPage() {
  const [activeTab, setActiveTab] = useState<ListTab>("todo")
  const [localItems, setLocalItems] = useState(DEFAULT_ITEMS)
  const [newItem, setNewItem] = useState("")
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialog | null>(null)
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handlePressStart(id: string, label: string) {
    pressTimer.current = setTimeout(() => {
      setDeleteDialog({ id, label })
    }, 500)
  }

  function handlePressEnd() {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current)
      pressTimer.current = null
    }
  }

  const items = localItems[activeTab]
  const doneCount = items.filter((i) => i.isChecked).length

  function toggle(id: string) {
    setLocalItems((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((it) =>
        it.id === id ? { ...it, isChecked: !it.isChecked } : it
      ),
    }))
  }

  function deleteItem(id: string) {
    setLocalItems((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((it) => it.id !== id),
    }))
    setDeleteDialog(null)
  }

  function addItem() {
    const label = newItem.trim()
    if (!label) return
    setLocalItems((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], { id: `u-${Date.now()}`, label, isChecked: false }],
    }))
    setNewItem("")
  }

  return (
    <div className="p-4 pb-6">

      {/* Delete confirmation dialog */}
      {deleteDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setDeleteDialog(null)}
        >
          <div
            className="bg-card rounded-2xl p-6 mx-6 shadow-card border-2 border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-2xl text-center mb-2">🗑️</div>
            <div className="text-sm font-medium text-center mb-1">刪除此項目？</div>
            <div className="text-xs text-muted text-center mb-5 leading-relaxed px-2">
              「{deleteDialog.label}」
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteDialog(null)}
                className="flex-1 py-2 rounded-xl border-[1.5px] border-border bg-bg text-sm text-muted cursor-pointer font-sans"
              >
                取消
              </button>
              <button
                onClick={() => deleteItem(deleteDialog.id)}
                className="flex-1 py-2 rounded-xl bg-stamp text-white text-sm border-none cursor-pointer font-sans font-medium"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab strip */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-xl border-[1.5px] text-xs cursor-pointer font-medium transition-all active:scale-95 font-sans
              ${activeTab === tab.id ? "bg-stamp border-stamp text-white" : "bg-bg border-border text-muted"}`}
          >
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex-1 bg-border rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all"
            style={{ width: items.length ? `${Math.round(doneCount / items.length * 100)}%` : "0%" }}
          />
        </div>
        <span className="text-xs text-muted">{doneCount}/{items.length}</span>
      </div>
      <div className="text-[10px] text-muted text-right mb-2 pr-1">長按項目可刪除</div>

      {/* List */}
      <div className="bg-card border-[1.5px] border-border rounded-[14px] px-4 py-2 shadow-card mb-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 py-2.5 border-b border-border last:border-0 cursor-pointer select-none"
            onClick={() => toggle(item.id)}
            onMouseDown={() => handlePressStart(item.id, item.label)}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={() => handlePressStart(item.id, item.label)}
            onTouchEnd={handlePressEnd}
          >
            <div className={`w-5 h-5 rounded-[5px] border-2 flex-shrink-0 flex items-center justify-center text-[11px] transition-all
              ${item.isChecked ? "bg-accent border-accent text-white" : "border-border"}`}>
              {item.isChecked && "✓"}
            </div>
            <span className={`text-sm flex-1 leading-snug ${item.isChecked ? "line-through text-muted" : "text-text"}`}>
              {item.label}
            </span>
            {item.badge && !item.isChecked && (
              <span className="text-[10px] px-2 py-0.5 rounded-lg bg-tag-food text-amber-700 flex-shrink-0">
                {item.badge}
              </span>
            )}
          </div>
        ))}

        {/* Add new item */}
        <div className="flex gap-2 pt-2">
          <input
            className="flex-1 border-[1.5px] border-border rounded-xl px-3 py-1.5 text-sm bg-bg focus:outline-none focus:border-accent font-sans text-text"
            placeholder="新增項目..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
          />
          <button
            onClick={addItem}
            className="bg-accent text-white border-none rounded-xl px-4 text-sm cursor-pointer font-sans active:scale-95 transition-transform"
          >
            ＋
          </button>
        </div>
      </div>
    </div>
  )
}
