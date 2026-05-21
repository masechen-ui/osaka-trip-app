# Fix broken source files
$p = "$PWD"
$utf8 = New-Object System.Text.UTF8Encoding $false

# Fix ChecklistPage.tsx
$checklist = @'
import { useState } from "react"

type ListTab = "todo" | "carry" | "wish" | "buy"
const TABS = [
  { id: "todo" as ListTab, emoji: "OK", label: "ToDo" },
  { id: "carry" as ListTab, emoji: "bag", label: "Carry" },
  { id: "wish" as ListTab, emoji: "star", label: "Wish" },
  { id: "buy" as ListTab, emoji: "cart", label: "Buy" },
]

const TABS_DISPLAY: Record<ListTab, { emoji: string; label: string }> = {
  todo:  { emoji: "\u2705", label: "\u5f85\u8fa6" },
  carry: { emoji: "\ud83c\udf92", label: "\u651c\u5e36" },
  wish:  { emoji: "\u2b50", label: "\u60f3\u53bb" },
  buy:   { emoji: "\ud83d\uded2", label: "\u63c1\u8cb7" },
}

const DEFAULT_ITEMS: Record<ListTab, { id: string; label: string; isChecked: boolean; badge?: string }[]> = {
  todo: [
    { id: "td1", label: "\u7dda\u4e0a\u8fa6\u7406\u9577\u69ae\u5831\u5230\uff08\u8d77\u98db\u524d48\u5c0f\u6642\uff09", isChecked: false, badge: "5/23" },
    { id: "td2", label: "\u78ba\u8a8d eSIM \u5361\u5df2\u555f\u7528", isChecked: false, badge: "\u7dca\u6025" },
    { id: "td3", label: "\u529b\u4e38\u71d2\u8089\u8a02\u4f4d\u78ba\u8a8d", isChecked: true },
    { id: "td4", label: "iPhone \u52a0\u5165 ICOCA", isChecked: false },
    { id: "td5", label: "\u63db\u597d\u65e5\u5e63\u73fe\u9214", isChecked: true },
    { id: "td6", label: "\u524d\u4e00\u6649\u8cb7\u597d\u9694\u5929\u65e9\u9910", isChecked: false, badge: "5/25\u524d" },
  ],
  carry: [
    { id: "c1", label: "\u8b77\u7167\u6b63\u672c\uff08\u6548\u671f > 6\u500b\u6708\uff09", isChecked: true },
    { id: "c2", label: "Visit Japan Web QR Code \u622a\u5716", isChecked: true },
    { id: "c3", label: "\u884c\u52d5\u96fb\u6e90 20000mAh\uff08\u96a8\u8eab\uff0c\u6700\u591a2\u984f\uff09", isChecked: false },
    { id: "c4", label: "\u611f\u5192/\u9000\u71d2/\u8178\u80c3\u85e5/\u6b62\u75db\u85e5", isChecked: false },
    { id: "c5", label: "\u4f11\u8db3\u6642\u9593\u8cbc\u7247", isChecked: false },
    { id: "c6", label: "\u6700\u8212\u9069\u7684\u904b\u52d5\u978b\uff08\u8b1d\u7d55\u65b0\u978b\uff01\uff09", isChecked: false },
    { id: "c7", label: "\u8f15\u4fbf\u6674\u96e8\u5169\u7528\u5098", isChecked: false },
    { id: "c8", label: "\u592a\u967d\u773c\u93e1 + \u9060\u967d\u5e3d", isChecked: false },
  ],
  wish: [
    { id: "w1", label: "\u4f0f\u898b\u7a3b\u8377\u5967\u793e\uff08\u4eba\u5c11\u7684\u9ce5\u5c45\u6bb5\uff09", isChecked: false },
    { id: "w2", label: "\u516b\u5742\u5e9a\u7533\u5802\u5f69\u7403\u62cd\u7167", isChecked: false },
    { id: "w3", label: "\u9993\u4f0a\u6839\u6d77\u9f24\uff08\u8766\u5473\u5148\uff09", isChecked: false },
    { id: "w4", label: "\u5929\u6a4b\u7acb\u8de8\u4e0b\u89c0\u666f", isChecked: false },
    { id: "w5", label: "\u5927\u962a\u57ce\u5fa1\u5ea7\u8239\u9ad4\u9a57", isChecked: false },
    { id: "w6", label: "\u65e5\u672c\u6a4b\u96fb\u96fb\u57ce\u516c\u4ed\u6230\u5229\u54c1", isChecked: false },
  ],
  buy: [
    { id: "b1", label: "\u5510\u5409\u8a23\u5fb7\u85e5\u599d\u63a8\u8ca8", isChecked: false },
    { id: "b2", label: "\u677e\u672c\u6e05\u85e5\u599d", isChecked: false },
    { id: "b3", label: "\u8d85\u5e02\u6652\u9593\u534a\u50f9\u751f\u9b5a\u7247", isChecked: false },
    { id: "b4", label: "Rikuro \u8d77\u53f8\u874b\u7cd5\u5e36\u56de", isChecked: false },
    { id: "b5", label: "\u65e5\u672c\u6a4b\u516c\u4ed\u6230\u5229\u54c1", isChecked: false },
    { id: "b6", label: "\u4fbf\u5229\u5546\u5e97\u96f6\u98df\u5927\u63c1\u8cb7", isChecked: false },
  ],
}

export default function ChecklistPage() {
  const [activeTab, setActiveTab] = useState<ListTab>("todo")
  const [localItems, setLocalItems] = useState(DEFAULT_ITEMS)
  const [newItem, setNewItem] = useState("")
  const items = localItems[activeTab]
  const doneCount = items.filter((i) => i.isChecked).length

  function toggle(id: string) {
    setLocalItems((prev) => ({ ...prev, [activeTab]: prev[activeTab].map((it) => it.id === id ? { ...it, isChecked: !it.isChecked } : it) }))
  }
  function addItem() {
    const label = newItem.trim()
    if (!label) return
    setLocalItems((prev) => ({ ...prev, [activeTab]: [...prev[activeTab], { id: `u-${Date.now()}`, label, isChecked: false }] }))
    setNewItem("")
  }

  return (
    <div className="p-4 pb-6">
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {TABS.map((tab) => {
          const display = TABS_DISPLAY[tab.id]
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl border text-xs cursor-pointer font-medium transition-all font-sans ${activeTab === tab.id ? "bg-stamp border-stamp text-white" : "bg-bg border-border text-muted"}`}>
              {display.emoji} {display.label}
            </button>
          )
        })}
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 bg-border rounded-full h-2">
          <div className="bg-accent h-2 rounded-full transition-all" style={{ width: items.length ? `${Math.round(doneCount / items.length * 100)}%` : "0%" }} />
        </div>
        <span className="text-xs text-muted">{doneCount}/{items.length}</span>
      </div>
      <div className="bg-card border border-border rounded-2xl px-4 py-2 shadow-card mb-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0 cursor-pointer" onClick={() => toggle(item.id)}>
            <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center text-xs transition-all ${item.isChecked ? "bg-accent border-accent text-white" : "border-border"}`}>
              {item.isChecked && "\u2713"}
            </div>
            <span className={`text-sm flex-1 leading-snug ${item.isChecked ? "line-through text-muted" : "text-text"}`}>{item.label}</span>
            {item.badge && !item.isChecked && (
              <span className="text-xs px-2 py-0.5 rounded-lg bg-tag-food text-amber-700 flex-shrink-0">{item.badge}</span>
            )}
          </div>
        ))}
        <div className="flex gap-2 pt-2">
          <input
            className="flex-1 border border-border rounded-xl px-3 py-1.5 text-sm bg-bg focus:outline-none focus:border-accent font-sans text-text"
            placeholder="\u65b0\u589e\u9805\u76ee..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
          />
          <button onClick={addItem} className="bg-accent text-white border-none rounded-xl px-4 text-sm cursor-pointer font-sans">+</button>
        </div>
      </div>
    </div>
  )
}
'@
[System.IO.File]::WriteAllText("$p\src\components\Checklist\ChecklistPage.tsx", $checklist, $utf8)

# Fix scheduleData.ts — remove broken unicode escape sequences, use actual UTF-8 strings
$schedule = @'
import type { DaySchedule } from "../types"

let _n = 0
const id = () => `evt-${++_n}`

export const SCHEDULE_DATA: DaySchedule[] = [
  {
    dayIndex: 0, date: "2026-05-25", label: "Day 1",
    title: "Day 1 - Start Osaka",
    weather: { emoji: "\u2600\ufe0f", temp: "24\u00b0C", desc: "\u8212\u9069 \u00b7 \u521d\u590f\u597d\u5929\u6c23", rainPercent: 10, outfitTip: "\ud83d\udc55 \u77ed\u8896 + \u8584\u5916\u5957" },
    events: [
      { id: id(), dayIndex: 0, time: "05:20", title: "\u6843\u5712 T2 \u5831\u5230", category: "transport", notes: "\u9577\u69ae\u5efa\u8b70\u51fa\u767c\u52133\u5c0f\u6642\u6297\u9054" },
      { id: id(), dayIndex: 0, time: "08:20", title: "\u9577\u69ae BR132 \u8d77\u98db", category: "transport", notes: "23kg \u6258\u904b + 7kg \u624b\u63d0" },
      { id: id(), dayIndex: 0, time: "11:55", title: "\u95dc\u897f\u6a5f\u5834 KIX \u5165\u5883", category: "transport", mapUrl: "https://maps.google.com/?q=Kansai+International+Airport" },
      { id: id(), dayIndex: 0, time: "13:30", title: "\u5357\u6d77\u96fb\u9435 \u2192 \u5fc3\u9f4b\u6a4b", category: "transport", notes: "\u00a5930 + \u00a5240 \u5730\u9435" },
      { id: id(), dayIndex: 0, time: "15:00", title: "\u65e5\u672c\u6a4b\u96fb\u96fb\u57ce", category: "sight", notes: "\u61f7\u820a\u9072\u6232\u3001\u52d5\u6f2b\u516c\u4ed", mapUrl: "https://maps.google.com/?q=Nipponbashi+Den+Den+Town+Osaka" },
      { id: id(), dayIndex: 0, time: "18:00", title: "\u9053\u9813\u5800\u56fa\u529b\u679c\u8de8\u8de8\u4eba", category: "sight", notes: "\u5efa\u8b70\u5230\u6cb3\u908a\u6c34\u4e0a\u6b65\u9053\u5f9e\u4e0b\u4e30\u4e0a\u4ef0\u62cd\uff01", mapUrl: "https://maps.google.com/?q=Glico+Sign+Dotonbori+Osaka" },
      { id: id(), dayIndex: 0, time: "20:00", title: "\ud83e\udd69 \u529b\u4e38\u71d2\u8089 (\u5df2\u9810\u7d04)", category: "food", notes: "120\u5206\u9418\u5438\u5230\u98fd \u00a54,488/\u4eba", mapUrl: "https://maps.google.com/?q=Yakiniku+Rikimaru+Shinsaibashi" },
      { id: id(), dayIndex: 0, time: "22:30", title: "VIA INN Shinsaibashi", category: "hotel", mapUrl: "https://maps.google.com/?q=Via+Inn+Shinsaibashi+Osaka" },
    ],
  },
  {
    dayIndex: 1, date: "2026-05-26", label: "Day 2",
    title: "Day 2 - Umi no Kyoto",
    weather: { emoji: "\ud83c\udf24\ufe0f", temp: "20\u00b0C", desc: "\u6d77\u908a\u6dbc\u723d\uff0c\u6d77\u98a8\u5f37\u52c1", rainPercent: 25, outfitTip: "\ud83e\udded \u6d0b\u8b65\u5f0f + \u9632\u98a8\u5916\u5957\uff0c\u5e3d\u5b50\u5fc5\u5099" },
    events: [
      { id: id(), dayIndex: 1, time: "06:40", title: "\u98ef\u5e97\u5927\u5ef3\u96c6\u5408", category: "transport", notes: "\u524d\u4e00\u6649\u5148\u8cb7\u597d\u65e9\u9910\uff01" },
      { id: id(), dayIndex: 1, time: "07:15", title: "\u65e5\u672c\u6a4b\u7ad9 2\u865f\u51fa\u53e3\u5831\u5230", category: "transport", notes: "Klook \u6191\u8b49\u4e0a\u8eca", mapUrl: "https://maps.google.com/?q=Nipponbashi+Station+Osaka" },
      { id: id(), dayIndex: 1, time: "10:00", title: "\ud83d\ude83 \u4e39\u5f8c\u6d77\u4e0a\u89c0\u5149\u5217\u8eca", category: "sight", notes: "\u7531\u826f\u5ddd\u6a4b\u6a11 = \u795e\u96b1\u5c11\u5973\u771f\u5be6\u5834\u666f\uff01", mapUrl: "https://maps.google.com/?q=Nishi+Maizuru+Station+Kyoto" },
      { id: id(), dayIndex: 1, time: "11:00", title: "\u5929\u6a4b\u7acb & ViewLand", category: "sight", notes: "\u641e\u7db1\u8eca\u767b\u9802\uff0c\u8de8\u4e0b\u770b\u6c99\u6d32\u8b8a\u98db\u9f8d\uff01", mapUrl: "https://maps.google.com/?q=Amanohashidate+View+Land" },
      { id: id(), dayIndex: 1, time: "14:30", title: "\ud83d\udd4a\ufe0f \u4f0a\u6839\u821f\u5c4b & \u9993\u6d77\u9f24", category: "sight", notes: "\u8766\u5473\u5148\u9993\u98df\u6d77\u9f24\uff01", mapUrl: "https://maps.google.com/?q=Ine+Funaya+Kyoto" },
      { id: id(), dayIndex: 1, time: "19:00", title: "\ud83c\udf5c \u9bcc\u5c4b\u62c9\u9eb5 (\u5fc3\u9f4b\u6a4b)", category: "food", notes: "\u6fc3\u90c1\u8c5a\u9aa8\uff0c\u5403\u4e00\u5929\u6d77\u98a8\u5f8c\u6700\u7642\u6108", mapUrl: "https://maps.google.com/?q=Zundouya+Shinsaibashi+Osaka" },
    ],
  },
  {
    dayIndex: 2, date: "2026-05-27", label: "Day 3",
    title: "Day 3 - Kyoto Classic",
    weather: { emoji: "\ud83c\udf21\ufe0f", temp: "29\u00b0C", desc: "\u4eac\u90fd\u76c6\u5730\u60b6\u71b1\uff0c\u7d2b\u5916\u7dda\u5f37", rainPercent: 15, outfitTip: "\ud83d\udd76\ufe0f \u6392\u6c57\u900f\u6c23\u590f\u88dd + \u9632\u6652\u4e73 + \u9060\u967d\u5e3d" },
    events: [
      { id: id(), dayIndex: 2, time: "09:30", title: "\u26e9 \u4f0f\u898b\u7a3b\u8377\u5927\u793e", category: "sight", notes: "\u5f80\u4e0a\u8d7015\u5206\u9418\u5230\u5967\u793e\uff0c\u4eba\u5c11\u5149\u5f71\u7f8e\uff01", mapUrl: "https://maps.google.com/?q=Fushimi+Inari+Taisha+Kyoto" },
      { id: id(), dayIndex: 2, time: "12:00", title: "\ud83c\udfdb\ufe0f \u6e05\u6c34\u5bfa & \u5348\u9910", category: "sight", notes: "\u63a8\u85a6\u5965\u4e39\u6e05\u6c34\u6e6f\u8c46\u8150\u5957\u9910 \u00a53,500", mapUrl: "https://maps.google.com/?q=Kiyomizudera+Kyoto" },
      { id: id(), dayIndex: 2, time: "14:00", title: "\u516b\u5742\u5e9a\u7533\u5802 \u2192 \u4e09\u5e74\u5742", category: "sight", notes: "\u5e9a\u7533\u5802\u5f69\u7403\u6700\u5438\u775b\uff01", mapUrl: "https://maps.google.com/?q=Yasaka+Koshin+Do+Kyoto" },
      { id: id(), dayIndex: 2, time: "15:30", title: "\u795d\u5712\u82b1\u898b\u5c0f\u8def", category: "sight", notes: "\u26a0\ufe0f \u79c1\u4eba\u5df7\u5f04\u62cd\u7167\u7f70\u6b3e\u00a510,000", mapUrl: "https://maps.google.com/?q=Gion+Hanamikoji+Kyoto" },
      { id: id(), dayIndex: 2, time: "17:30", title: "\ud83c\udf5c \u665a\u9910 (\u795d\u5712\u5468\u908a)", category: "food", notes: "\u63a8\u85a6\uff1a\u9eb5\u5c4b\u8c6c\u4e00\uff08\u5fc5\u6bd4\u767b\uff09", mapUrl: "https://maps.google.com/?q=Menya+Inoichi+Kyoto" },
    ],
  },
  {
    dayIndex: 3, date: "2026-05-28", label: "Day 4",
    title: "Day 4 - Osaka Bay & Shinsekai",
    weather: { emoji: "\u26c5", temp: "26\u00b0C", desc: "\u5927\u962a\u6e2f\u7063\u6d77\u98a8\u6e05\u6dbc", rainPercent: 20, outfitTip: "\ud83d\udc55 \u900f\u6c23\u77ed\u8896\uff0c\u9060\u8239\u6642\u5957\u4e0a\u9632\u98a8\u5916\u5957" },
    events: [
      { id: id(), dayIndex: 3, time: "09:00", title: "\ud83c\udff0 \u5927\u962a\u57ce\u516c\u5712", category: "sight", notes: "\u5468\u9052\u5361\u514d\u8cbb\uff01A\u7d44\uff1a\u5c0f\u706b\u8eca+\u5fa1\u5ea7\u8239 / B\u7d44\uff1a\u81ea\u7531\u6f2b\u6b65", mapUrl: "https://maps.google.com/?q=Osaka+Castle+Park" },
      { id: id(), dayIndex: 3, time: "12:15", title: "\ud83e\udd88 \u5927\u962a\u6d77\u904a\u9928", category: "sight", notes: "\u26a0\ufe0f \u4e0d\u542b\u5728\u5468\u9052\u5361\u5167\uff0c\u9808\u53e6\u8cfc\u7968", mapUrl: "https://maps.google.com/?q=Osaka+Aquarium+Kaiyukan" },
      { id: id(), dayIndex: 3, time: "12:30", title: "\ud83c\udf73 \u5317\u6975\u661f\u86cb\u5305\u98ef\u5348\u9910", category: "food", notes: "\u5929\u4fdd\u5c71\u8cfc\u7269\u4e2d\u5fc3\uff0c\u7d04\u00a51,200", mapUrl: "https://maps.google.com/?q=Hokkyokusei+Tempozan+Osaka" },
      { id: id(), dayIndex: 3, time: "14:15", title: "\u26f5 \u8056\u746a\u9e97\u4e9e\u865f & \u6458\u5929\u8f2a", category: "sight", notes: "\u5468\u9052\u5361\u514d\u8cbb\uff01\u7701\u00a52,500", mapUrl: "https://maps.google.com/?q=Tempozan+Ferris+Wheel+Osaka" },
      { id: id(), dayIndex: 3, time: "16:15", title: "\u901a\u5929\u95a3 & \u65b0\u4e16\u754c", category: "sight", notes: "\u5468\u9052\u5361\u514d\u8cbb\uff08\u539f\u50f9\u00a51,000\uff09", mapUrl: "https://maps.google.com/?q=Tsutenkaku+Shinsekai+Osaka" },
      { id: id(), dayIndex: 3, time: "17:30", title: "\ud83c\udf62 \u516b\u91cd\u52dd\u4e32\u70b8", category: "food", notes: "\u725b\u8089\u4e32\u5fc5\u9ede\uff0c\u73fe\u5834\u6392\u968a", mapUrl: "https://maps.google.com/?q=Yaekatsu+Kushikatsu+Shinsekai+Osaka" },
    ],
  },
  {
    dayIndex: 4, date: "2026-05-29", label: "Day 5",
    title: "Day 5 - Return Home",
    weather: { emoji: "\ud83c\udf26\ufe0f", temp: "25\u00b0C", desc: "\u7559\u610f\u77ed\u6682\u9663\u96e8", rainPercent: 40, outfitTip: "\ud83d\udc9f \u8f15\u9b06\u8212\u9069\u6a5f\u5834\u88dd\uff0c\u5e36\u8f15\u4fbf\u6674\u96e8\u5098" },
    events: [
      { id: id(), dayIndex: 4, time: "09:00", title: "\u98ef\u5e97\u9000\u623f\uff0c\u884c\u674e\u5bc4\u653e", category: "hotel" },
      { id: id(), dayIndex: 4, time: "09:15", title: "\ud83e\udd90 \u9ed1\u9580\u5e02\u5834\u6d77\u9bae\u65e9\u9910", category: "food", notes: "\u795e\u6238\u725b\u4e32 \u00a52,000\uff0c\u73fe\u5834\u7acb\u98df", mapUrl: "https://maps.google.com/?q=Kuromon+Market+Osaka" },
      { id: id(), dayIndex: 4, time: "11:15", title: "\u26a0\ufe0f \u6700\u665a\u51fa\u767c\uff01\u641e\u5730\u9435\u81f3\u96e3\u6ce2", category: "transport", notes: "\u5fc3\u9f4b\u6a4b\u2192\u96e3\u6ce2 \u00a5190\uff0c\u5343\u842c\u5225\u62d6\u5ef6\uff01" },
      { id: id(), dayIndex: 4, time: "12:20", title: "KIX \u6367\u661f GK55 \u5831\u5230", category: "transport", notes: "\u26a0\ufe0f \u624b\u63d0\u56b4\u683c7kg\uff0c\u4e8c\u6b21\u79e4\u91cd\uff01", mapUrl: "https://maps.google.com/?q=Kansai+International+Airport" },
      { id: id(), dayIndex: 4, time: "14:50", title: "\u6367\u661f GK55 \u8d77\u98db \ud83c\udfe0", category: "transport" },
    ],
  },
]
'@
[System.IO.File]::WriteAllText("$p\src\data\scheduleData.ts", $schedule, $utf8)

Write-Host "Fixed! Run: npm run dev" -ForegroundColor Green
