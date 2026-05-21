# 大阪回憶製造所 — 一鍵建立專案
# 使用方式：在 PowerShell 執行此腳本
# 執行前請先確認：已安裝 Node.js (https://nodejs.org)

$projectName = "osaka-trip-app"
$base = "$PWD\$projectName"

Write-Host "建立專案資料夾..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path $base | Out-Null
New-Item -ItemType Directory -Force -Path "$base\src\components\Schedule" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\src\components\Bookings" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\src\components\Expense" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\src\components\Journal" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\src\components\Checklist" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\src\components\shared" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\src\hooks" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\src\lib" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\src\data" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\src\types" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\public" | Out-Null

# ── package.json ──────────────────────────────────────────────────────────────
Set-Content "$base\package.json" -Encoding UTF8 '{
  "name": "osaka-trip-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "firebase": "^10.12.0",
    "zustand": "^4.5.0",
    "react-hot-toast": "^2.4.1",
    "date-fns": "^3.6.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.4.0",
    "vite": "^5.3.0",
    "vite-plugin-pwa": "^0.20.0"
  }
}'

# ── .env.local ────────────────────────────────────────────────────────────────
Set-Content "$base\.env.local" -Encoding UTF8 'VITE_FIREBASE_API_KEY=AIzaSyDPn1Q_zE8ombtJpNntav03VTVe8XddSro
VITE_FIREBASE_AUTH_DOMAIN=osaka-bcd93.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=osaka-bcd93
VITE_FIREBASE_STORAGE_BUCKET=osaka-bcd93.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=172887570983
VITE_FIREBASE_APP_ID=1:172887570983:web:d32d1d7a3fe9e227b32c02
VITE_FIREBASE_MEASUREMENT_ID=G-3ELTZ95MW4'

# ── .gitignore ────────────────────────────────────────────────────────────────
Set-Content "$base\.gitignore" -Encoding UTF8 'node_modules
dist
.env.local'

# ── vite.config.ts ────────────────────────────────────────────────────────────
Set-Content "$base\vite.config.ts" -Encoding UTF8 'import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "大阪回憶製造所",
        short_name: "大阪旅遊",
        theme_color: "#7B9E6B",
        background_color: "#F5F0E8",
        display: "standalone",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
        ]
      }
    })
  ]
})'

# ── tailwind.config.js ────────────────────────────────────────────────────────
Set-Content "$base\tailwind.config.js" -Encoding UTF8 '/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F5F0E8", card: "#FFFDF7", border: "#E5DECE", stamp: "#C4735A",
        accent: "#7B9E6B", "accent-2": "#D4956A", "accent-3": "#6B8FA8", muted: "#9B8E85", text: "#3D3530",
        "tag-sight": "#E8F4EC", "tag-food": "#FEF3E8", "tag-transport": "#E8F0F8", "tag-hotel": "#F3E8F8",
      },
      fontFamily: { sans: ["Noto Sans TC", "sans-serif"], journal: ["Caveat", "cursive"] },
      boxShadow: { card: "3px 3px 0px #D8D0C0", "card-sm": "2px 2px 0px #D8D0C0", "btn-green": "0 3px 0 #4A7A3A" },
    },
  },
  plugins: [],
}'

# ── postcss.config.js ─────────────────────────────────────────────────────────
Set-Content "$base\postcss.config.js" -Encoding UTF8 'export default {
  plugins: { tailwindcss: {}, autoprefixer: {} }
}'

# ── tsconfig.json ─────────────────────────────────────────────────────────────
Set-Content "$base\tsconfig.json" -Encoding UTF8 '{
  "compilerOptions": {
    "target": "ES2020", "useDefineForClassFields": true, "lib": ["ES2020","DOM","DOM.Iterable"],
    "module": "ESNext", "skipLibCheck": true, "moduleResolution": "bundler",
    "allowImportingTsExtensions": true, "resolveJsonModule": true, "isolatedModules": true,
    "noEmit": true, "jsx": "react-jsx", "strict": true
  },
  "include": ["src"]
}'

# ── index.html ────────────────────────────────────────────────────────────────
Set-Content "$base\index.html" -Encoding UTF8 '<!doctype html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>大阪回憶製造所</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Caveat:wght@500;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>'

# ── src/main.tsx ──────────────────────────────────────────────────────────────
Set-Content "$base\src\main.tsx" -Encoding UTF8 'import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)'

# ── src/index.css ─────────────────────────────────────────────────────────────
Set-Content "$base\src\index.css" -Encoding UTF8 '@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
}'

# ── src/types/index.ts ────────────────────────────────────────────────────────
Set-Content "$base\src\types\index.ts" -Encoding UTF8 'export type EventCategory = "sight" | "food" | "transport" | "hotel"

export interface ScheduleEvent {
  id: string; dayIndex: number; time: string; title: string; category: EventCategory
  location?: string; notes?: string; mapUrl?: string; photoUrls?: string[]
}

export interface DaySchedule {
  dayIndex: number; date: string; label: string; title: string
  weather: { emoji: string; temp: string; desc: string; rainPercent: number; outfitTip: string }
  events: ScheduleEvent[]
}

export type Currency = "TWD" | "JPY" | "USD"
export type ExpenseCategory = "transport" | "food" | "sight" | "shopping" | "hotel" | "other"

export interface Expense {
  id: string; title: string; amount: number; currency: Currency; category: ExpenseCategory
  paidBy: string; splitWith: string[]; date: string; note?: string
}

export interface JournalPost {
  id: string; authorId: string; authorName: string; dayIndex: number
  content: string; photoUrls: string[]; createdAt: number; likes: string[]
}

export interface Member {
  id: string; name: string; nickname: string; avatarUrl?: string; avatarColor: string; role?: string
}

export type ChecklistCategory = "docs" | "finance" | "health" | "clothes" | "shopping"

export interface ChecklistItem {
  id: string; category: ChecklistCategory; label: string
  assignedTo?: string[]; isChecked: boolean; isUrgent?: boolean
}'

# ── src/lib/firebase.ts ───────────────────────────────────────────────────────
Set-Content "$base\src\lib\firebase.ts" -Encoding UTF8 'import { initializeApp } from "firebase/app"
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
export const db        = getFirestore(app)
export const storage   = getStorage(app)
export const auth      = getAuth(app)
export const analytics = getAnalytics(app)

enableIndexedDbPersistence(db).catch(() => {})

export async function ensureAnonymousAuth() {
  return new Promise<string>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe()
      if (user) { resolve(user.uid) }
      else {
        try { const c = await signInAnonymously(auth); resolve(c.user.uid) }
        catch (e) { reject(e) }
      }
    })
  })
}
export default app'

# ── src/lib/store.ts ──────────────────────────────────────────────────────────
Set-Content "$base\src\lib\store.ts" -Encoding UTF8 'import { create } from "zustand"
import type { Member, Expense, ChecklistItem, JournalPost } from "../types"

interface AppStore {
  currentUserId: string | null; setCurrentUserId: (id: string | null) => void
  activeDayIndex: number; setActiveDayIndex: (i: number) => void
  members: Member[]; setMembers: (m: Member[]) => void
  expenses: Expense[]; setExpenses: (e: Expense[]) => void; addExpense: (e: Expense) => void
  checklistItems: ChecklistItem[]; setChecklistItems: (i: ChecklistItem[]) => void; toggleChecklistItem: (id: string) => void
  journalPosts: JournalPost[]; setJournalPosts: (p: JournalPost[]) => void
  rates: Record<string, number>; setRates: (r: Record<string, number>) => void
  isPinUnlocked: boolean; unlockPin: () => void; lockPin: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  currentUserId: null, setCurrentUserId: (id) => set({ currentUserId: id }),
  activeDayIndex: 0, setActiveDayIndex: (i) => set({ activeDayIndex: i }),
  members: [
    { id: "m1", name: "靜怡", nickname: "靜怡", avatarColor: "#7B9E6B" },
    { id: "m2", name: "小陳", nickname: "小陳", avatarColor: "#6B8FA8" },
    { id: "m3", name: "名時", nickname: "名時", avatarColor: "#D4956A" },
    { id: "m4", name: "佳樺", nickname: "佳樺", avatarColor: "#C4735A" },
    { id: "m5", name: "子奇", nickname: "子奇", avatarColor: "#9B6BB5" },
    { id: "m6", name: "阿侖", nickname: "阿侖", avatarColor: "#5A9BA8" },
  ],
  setMembers: (members) => set({ members }),
  expenses: [], setExpenses: (expenses) => set({ expenses }),
  addExpense: (expense) => set((s) => ({ expenses: [...s.expenses, expense] })),
  checklistItems: [], setChecklistItems: (items) => set({ checklistItems: items }),
  toggleChecklistItem: (id) => set((s) => ({
    checklistItems: s.checklistItems.map((item) => item.id === id ? { ...item, isChecked: !item.isChecked } : item),
  })),
  journalPosts: [], setJournalPosts: (posts) => set({ journalPosts: posts }),
  rates: { JPY: 0.222, USD: 32.1, TWD: 1 }, setRates: (rates) => set({ rates }),
  isPinUnlocked: false, unlockPin: () => set({ isPinUnlocked: true }), lockPin: () => set({ isPinUnlocked: false }),
}))'

# ── src/hooks/useExchangeRate.ts ──────────────────────────────────────────────
Set-Content "$base\src\hooks\useExchangeRate.ts" -Encoding UTF8 'import { useEffect } from "react"
import { useAppStore } from "../lib/store"

const FALLBACK = { JPY: 0.222, USD: 32.1, TWD: 1 }

export function useExchangeRate() {
  const setRates = useAppStore((s) => s.setRates)
  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/TWD")
      .then((r) => r.json())
      .then((d) => setRates({ JPY: parseFloat((1 / d.rates.JPY).toFixed(4)), USD: parseFloat((1 / d.rates.USD).toFixed(2)), TWD: 1 }))
      .catch(() => setRates(FALLBACK))
  }, [setRates])
}

export function toTWD(amount: number, currency: string, rates: Record<string, number>): number {
  if (currency === "TWD") return amount
  return amount * (rates[currency] ?? 1)
}

export function convertCurrency(amount: number, from: string, to: string, rates: Record<string, number>): number {
  const twd = toTWD(amount, from, rates)
  if (to === "TWD") return twd
  return twd / (rates[to] ?? 1)
}'

# ── src/hooks/useFirestore.ts ─────────────────────────────────────────────────
Set-Content "$base\src\hooks\useFirestore.ts" -Encoding UTF8 'import { useEffect } from "react"
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore"
import { db } from "../lib/firebase"
import { useAppStore } from "../lib/store"
import type { Expense, ChecklistItem, JournalPost } from "../types"

const TRIP_ID = "osaka-2026-05"

export function useExpensesSync() {
  const setExpenses = useAppStore((s) => s.setExpenses)
  useEffect(() => {
    const q = query(collection(db, "trips", TRIP_ID, "expenses"), orderBy("date", "desc"))
    return onSnapshot(q, (snap) => setExpenses(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Expense))))
  }, [setExpenses])
}

export async function addExpenseToFirestore(expense: Omit<Expense, "id">) {
  return addDoc(collection(db, "trips", TRIP_ID, "expenses"), { ...expense, createdAt: serverTimestamp() })
}

export async function deleteExpense(id: string) {
  return deleteDoc(doc(db, "trips", TRIP_ID, "expenses", id))
}

export function useChecklistSync() {
  const setItems = useAppStore((s) => s.setChecklistItems)
  useEffect(() => {
    return onSnapshot(collection(db, "trips", TRIP_ID, "checklist"), (snap) =>
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ChecklistItem)))
    )
  }, [setItems])
}

export async function toggleChecklistInFirestore(id: string, current: boolean) {
  return updateDoc(doc(db, "trips", TRIP_ID, "checklist", id), { isChecked: !current })
}

export function useJournalSync() {
  const setPosts = useAppStore((s) => s.setJournalPosts)
  useEffect(() => {
    const q = query(collection(db, "trips", TRIP_ID, "journal"), orderBy("createdAt", "desc"))
    return onSnapshot(q, (snap) => setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as JournalPost))))
  }, [setPosts])
}

export async function addJournalPost(post: Omit<JournalPost, "id" | "createdAt">) {
  return addDoc(collection(db, "trips", TRIP_ID, "journal"), { ...post, createdAt: serverTimestamp(), likes: [] })
}

export async function toggleLike(postId: string, memberId: string, currentLikes: string[]) {
  const newLikes = currentLikes.includes(memberId) ? currentLikes.filter((id) => id !== memberId) : [...currentLikes, memberId]
  return updateDoc(doc(db, "trips", TRIP_ID, "journal", postId), { likes: newLikes })
}'

# ── src/data/scheduleData.ts ──────────────────────────────────────────────────
Set-Content "$base\src\data\scheduleData.ts" -Encoding UTF8 'import type { DaySchedule } from "../types"

let _id = 0
const id = () => `evt-${++_id}`

export const SCHEDULE_DATA: DaySchedule[] = [
  {
    dayIndex: 0, date: "2026-05-25", label: "Day 1", title: "Day 1 — 啟程大阪",
    weather: { emoji: "☀️", temp: "24°C", desc: "舒適 · 初夏好天氣", rainPercent: 10, outfitTip: "👕 短袖 + 薄外套，室內外冷熱差大，隨時可穿脫" },
    events: [
      { id: id(), dayIndex: 0, time: "05:20", title: "桃園機場 T2 報到", category: "transport", notes: "長榮建議出發前3小時抵達" },
      { id: id(), dayIndex: 0, time: "08:20", title: "長榮 BR132 起飛", category: "transport", notes: "行李23kg × 1件，手提7kg" },
      { id: id(), dayIndex: 0, time: "11:55", title: "抵達關西機場 KIX", category: "transport", notes: "入境後含行李約需1小時", mapUrl: "https://maps.google.com/?q=Kansai+International+Airport" },
      { id: id(), dayIndex: 0, time: "13:30", title: "南海電鐵 → 心齋橋飯店", category: "transport", notes: "¥930 空港急行 + ¥240 地鐵" },
      { id: id(), dayIndex: 0, time: "15:00", title: "日本橋電電城", category: "sight", notes: "懷舊遊戲、動漫公仔，約19:30打烊", mapUrl: "https://maps.google.com/?q=日本橋電電城+大阪" },
      { id: id(), dayIndex: 0, time: "18:00", title: "道頓堀固力果跑跑人", category: "sight", notes: "建議到河邊水上步道由下往上仰拍！", mapUrl: "https://maps.google.com/?q=道頓堀+戎橋+大阪" },
      { id: id(), dayIndex: 0, time: "20:00", title: "🥩 力丸燒肉（已預約）", category: "food", notes: "120分鐘吃到飽 ¥4,488/人", mapUrl: "https://maps.google.com/?q=焼肉力丸+心斎橋" },
      { id: id(), dayIndex: 0, time: "22:30", title: "回 VIA INN Shinsaibashi", category: "hotel", mapUrl: "https://maps.google.com/?q=Via+Inn+Shinsaibashi" },
    ],
  },
  {
    dayIndex: 1, date: "2026-05-26", label: "Day 2", title: "Day 2 — 海之京都夢幻鐵道",
    weather: { emoji: "🌤️", temp: "20°C", desc: "海邊涼爽，海風強勁", rainPercent: 25, outfitTip: "🧥 洋蔥式穿搭 + 防風外套，帽子必備" },
    events: [
      { id: id(), dayIndex: 1, time: "06:40", title: "飯店大廳集合出發", category: "transport", notes: "前一晚先買好早餐帶上車！" },
      { id: id(), dayIndex: 1, time: "07:15", title: "日本橋站 2號出口報到", category: "transport", notes: "出示 Klook 憑證上車", mapUrl: "https://maps.google.com/?q=日本橋駅+大阪" },
      { id: id(), dayIndex: 1, time: "10:00", title: "🚃 丹後海上觀光列車", category: "sight", notes: "由良川橋樑 = 神隱少女真實場景！", mapUrl: "https://maps.google.com/?q=西舞鶴駅+京都" },
      { id: id(), dayIndex: 1, time: "11:00", title: "天橋立 ViewLand 飛龍觀", category: "sight", notes: "搭纜車登頂，跨下看沙洲變飛龍！午餐自理", mapUrl: "https://maps.google.com/?q=天橋立ビューランド" },
      { id: id(), dayIndex: 1, time: "14:30", title: "🕊️ 伊根舟屋 & 餵海鷗", category: "sight", notes: "拿蝦味先餵食海鷗與老鷹！", mapUrl: "https://maps.google.com/?q=伊根の舟屋" },
      { id: id(), dayIndex: 1, time: "19:00", title: "🍜 鈍屋拉麵（心齋橋）", category: "food", notes: "濃郁豚骨，吹一天海風後最療癒", mapUrl: "https://maps.google.com/?q=ずんどう屋+心斎橋" },
    ],
  },
  {
    dayIndex: 2, date: "2026-05-27", label: "Day 3", title: "Day 3 — 京都古都散策",
    weather: { emoji: "🌡️", temp: "29°C", desc: "京都盆地悶熱，紫外線強", rainPercent: 15, outfitTip: "🕶️ 排汗透氣夏裝 + 防曬乳 + 遮陽帽，穿最耐走的鞋" },
    events: [
      { id: id(), dayIndex: 2, time: "09:30", title: "⛩ 伏見稻荷大社 千本鳥居", category: "sight", notes: "往上走15分鐘到奧社，人少景美！", mapUrl: "https://maps.google.com/?q=伏見稲荷大社" },
      { id: id(), dayIndex: 2, time: "12:00", title: "🏛️ 清水寺 & 午餐", category: "sight", notes: "推薦奧丹清水湯豆腐套餐 ¥3,500", mapUrl: "https://maps.google.com/?q=清水寺+京都" },
      { id: id(), dayIndex: 2, time: "14:00", title: "八坂庚申堂 → 三年坂", category: "sight", notes: "庚申堂彩球最吸睛！", mapUrl: "https://maps.google.com/?q=八坂庚申堂+京都" },
      { id: id(), dayIndex: 2, time: "15:30", title: "祇園花見小路漫步", category: "sight", notes: "⚠️ 私人巷弄拍照罰款¥10,000", mapUrl: "https://maps.google.com/?q=祇園花見小路+京都" },
      { id: id(), dayIndex: 2, time: "17:30", title: "🍜 晚餐（祇園周邊）", category: "food", notes: "推薦：麵屋豬一（必比登）", mapUrl: "https://maps.google.com/?q=麺屋猪一+京都" },
    ],
  },
  {
    dayIndex: 3, date: "2026-05-28", label: "Day 4", title: "Day 4 — 大阪港灣新世界",
    weather: { emoji: "⛅", temp: "26°C", desc: "大阪港灣海風清涼", rainPercent: 20, outfitTip: "👕 透氣短袖，遊船時套上防風薄外套" },
    events: [
      { id: id(), dayIndex: 3, time: "09:00", title: "🏯 大阪城公園", category: "sight", notes: "今日全程刷大阪周遊卡！A組：小火車+御座船 / B組：自由漫步", mapUrl: "https://maps.google.com/?q=大阪城+大阪" },
      { id: id(), dayIndex: 3, time: "12:15", title: "🦈 大阪海遊館", category: "sight", notes: "⚠️ 不含在周遊卡內，需另購票", mapUrl: "https://maps.google.com/?q=海遊館+大阪" },
      { id: id(), dayIndex: 3, time: "12:30", title: "🍳 北極星蛋包飯午餐", category: "food", notes: "天保山購物中心，約¥1,200", mapUrl: "https://maps.google.com/?q=北極星+天保山+大阪" },
      { id: id(), dayIndex: 3, time: "14:15", title: "⛵ 聖瑪麗亞號 & 摩天輪", category: "sight", notes: "周遊卡免費！省¥2,500", mapUrl: "https://maps.google.com/?q=天保山大観覧車+大阪" },
      { id: id(), dayIndex: 3, time: "16:15", title: "通天閣 & 新世界", category: "sight", notes: "周遊卡免費入場（原價¥1,000）", mapUrl: "https://maps.google.com/?q=通天閣+大阪" },
      { id: id(), dayIndex: 3, time: "17:30", title: "🍢 八重勝串炸", category: "food", notes: "牛肉串必點，現場排隊", mapUrl: "https://maps.google.com/?q=八重勝+新世界+大阪" },
    ],
  },
  {
    dayIndex: 4, date: "2026-05-29", label: "Day 5", title: "Day 5 — 晨間快閃返台",
    weather: { emoji: "🌦️", temp: "25°C", desc: "留意短暫陣雨", rainPercent: 40, outfitTip: "👟 寬鬆舒適機場裝，帶輕便晴雨傘" },
    events: [
      { id: id(), dayIndex: 4, time: "09:00", title: "飯店退房，行李寄放", category: "hotel" },
      { id: id(), dayIndex: 4, time: "09:15", title: "🦐 黑門市場海鮮早餐", category: "food", notes: "神戶牛串 ¥2,000，現場立食", mapUrl: "https://maps.google.com/?q=黒門市場+大阪" },
      { id: id(), dayIndex: 4, time: "11:15", title: "⚠️ 最晚出發！搭地鐵至難波", category: "transport", notes: "千萬別拖延！" },
      { id: id(), dayIndex: 4, time: "12:20", title: "KIX 捷星 GK55 報到", category: "transport", notes: "⚠️ 手提嚴格7kg，二次秤重！", mapUrl: "https://maps.google.com/?q=Kansai+International+Airport" },
      { id: id(), dayIndex: 4, time: "14:50", title: "捷星 GK55 起飛 🏠", category: "transport" },
    ],
  },
]'

# ── src/components/Schedule/SchedulePage.tsx ──────────────────────────────────
Set-Content "$base\src\components\Schedule\SchedulePage.tsx" -Encoding UTF8 'import { useState, useMemo } from "react"
import { useAppStore } from "../../lib/store"
import { SCHEDULE_DATA } from "../../data/scheduleData"
import type { EventCategory } from "../../types"

const TAG_STYLES: Record<EventCategory, string> = {
  sight: "bg-tag-sight text-green-700", food: "bg-tag-food text-amber-700",
  transport: "bg-tag-transport text-blue-700", hotel: "bg-tag-hotel text-purple-700",
}
const DOT_COLORS: Record<EventCategory, string> = {
  sight: "#7B9E6B", food: "#D4956A", transport: "#6B8FA8", hotel: "#9B6BB5",
}
const CAT_LABELS: Record<EventCategory, string> = {
  sight: "景點", food: "美食", transport: "交通", hotel: "住宿",
}
const YOUBI = ["日","月","火","水","木","金","土"]

export default function SchedulePage() {
  const { activeDayIndex, setActiveDayIndex } = useAppStore()
  const [openEvent, setOpenEvent] = useState<string | null>(null)
  const day = useMemo(() => SCHEDULE_DATA[activeDayIndex], [activeDayIndex])
  const daysUntil = useMemo(() => Math.max(0, Math.ceil((new Date("2026-05-25").getTime() - new Date().getTime()) / 86400000)), [])

  return (
    <div className="p-4 pb-6">
      {daysUntil > 0 && (
        <div className="bg-stamp text-white rounded-2xl p-3 mb-4 text-center shadow-card flex items-center justify-center gap-2">
          <span className="font-journal text-3xl font-bold">{daysUntil}</span>
          <span className="text-sm">天後就要出發囉！✈</span>
        </div>
      )}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {SCHEDULE_DATA.map((d, i) => {
          const dow = new Date(d.date).getDay()
          return (
            <button key={i} onClick={() => { setActiveDayIndex(i); setOpenEvent(null) }}
              className={`min-w-[56px] rounded-[14px] border-2 flex flex-col items-center py-1.5 px-1 transition-all active:scale-95 shadow-card-sm flex-shrink-0 cursor-pointer ${activeDayIndex === i ? "bg-accent border-accent text-white" : "bg-card border-border text-text"}`}>
              <span className="text-lg font-bold leading-none">{d.date.slice(-2)}</span>
              <span className="text-[9px] opacity-75 mt-0.5">{d.label}</span>
              <span className="text-[9px] opacity-70">{YOUBI[dow]}曜</span>
            </button>
          )
        })}
      </div>
      <div className="bg-card border-2 border-border rounded-2xl p-3 mb-4 shadow-card">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{day.weather.emoji}</span>
          <div>
            <div className="text-2xl font-bold text-accent-2 leading-none">{day.weather.temp}</div>
            <div className="text-xs text-muted mt-0.5">{day.weather.desc}</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-[10px] text-muted">降雨率</div>
            <div className="text-xl font-bold text-accent-3">{day.weather.rainPercent}%</div>
          </div>
        </div>
        <div className="mt-2 bg-[#F0F7EC] rounded-lg px-3 py-1.5 text-xs text-[#2A6A2A]">{day.weather.outfitTip}</div>
      </div>
      <h2 className="font-journal text-lg text-stamp mb-3">📍 {day.title}</h2>
      <div className="relative pl-7">
        <div className="absolute left-[9px] top-0 bottom-0 w-0.5" style={{ background: "repeating-linear-gradient(to bottom,#E5DECE 0,#E5DECE 6px,transparent 6px,transparent 12px)" }} />
        {day.events.map((event) => (
          <div key={event.id} className="relative mb-3">
            <div className="absolute -left-6 top-3 w-3 h-3 rounded-full border-2 border-card" style={{ background: DOT_COLORS[event.category] }} />
            <div className="bg-card border-[1.5px] border-border rounded-[14px] p-3 shadow-card-sm cursor-pointer active:scale-[.98] transition-transform" onClick={() => setOpenEvent(openEvent === event.id ? null : event.id)}>
              <div className="text-[11px] text-muted mb-0.5">{event.time}</div>
              <div className="text-sm font-medium">{event.title}</div>
              <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-1.5 ${TAG_STYLES[event.category]}`}>{CAT_LABELS[event.category]}</span>
              {openEvent === event.id && (
                <div className="mt-2 pt-2 border-t border-border">
                  {event.notes && <p className="text-xs text-muted leading-relaxed mb-2">{event.notes}</p>}
                  {event.mapUrl && (
                    <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-accent-3 text-white text-xs px-3 py-1.5 rounded-lg" onClick={(e) => e.stopPropagation()}>
                      🗺️ Google Maps
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}'

# ── src/components/Expense/ExpensePage.tsx ────────────────────────────────────
Set-Content "$base\src\components\Expense\ExpensePage.tsx" -Encoding UTF8 'import { useState } from "react"
import { useAppStore } from "../../lib/store"
import { addExpenseToFirestore, useExpensesSync } from "../../hooks/useFirestore"
import { useExchangeRate, toTWD, convertCurrency } from "../../hooks/useExchangeRate"
import type { Expense, ExpenseCategory, Currency } from "../../types"
import toast from "react-hot-toast"

const CAT_EMOJI: Record<ExpenseCategory, string> = { transport: "🚗", food: "🍣", sight: "🎫", shopping: "🛍️", hotel: "🏨", other: "📌" }
const CAT_LABELS: Record<ExpenseCategory, string> = { transport: "交通", food: "餐飲", sight: "景點", shopping: "購物", hotel: "住宿", other: "其他" }
const CUR_SYM: Record<string, string> = { TWD: "NT$", JPY: "¥", USD: "$" }

export default function ExpensePage() {
  useExchangeRate()
  useExpensesSync()
  const { expenses, members, rates } = useAppStore()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: "", amount: "", currency: "JPY" as Currency, category: "food" as ExpenseCategory, paidBy: "m1" })
  const [convAmt, setConvAmt] = useState("1000")
  const [convFrom, setConvFrom] = useState("JPY")
  const [convTo, setConvTo] = useState("TWD")

  const convResult = convAmt ? Math.round(convertCurrency(parseFloat(convAmt), convFrom, convTo, rates)) : 0
  const totalTWD = expenses.reduce((sum, e) => sum + toTWD(e.amount, e.currency, rates), 0)
  const previewTWD = form.amount ? Math.round(toTWD(parseFloat(form.amount), form.currency, rates)) : null

  async function handleSubmit() {
    if (!form.title || !form.amount) return toast.error("請填寫名稱和金額")
    await addExpenseToFirestore({ title: form.title, amount: parseFloat(form.amount), currency: form.currency, category: form.category, paidBy: form.paidBy, splitWith: members.map((m) => m.id), date: new Date().toISOString().slice(0, 10) })
    setShowForm(false)
    setForm({ title: "", amount: "", currency: "JPY", category: "food", paidBy: "m1" })
    toast.success("記帳成功！")
  }

  return (
    <div className="p-4 pb-6">
      <div className="bg-card border-[1.5px] border-border rounded-[14px] p-3 mb-3 shadow-card-sm">
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <span className="text-xs text-muted">即時匯率</span>
          <span className="text-sm font-medium text-accent">¥1 = NT${rates.JPY}</span>
          <span className="text-sm font-medium text-accent-3">$1 = NT${rates.USD?.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <input type="number" className="w-24 border-[1.5px] border-border rounded-lg px-2 py-1.5 text-sm bg-bg focus:outline-none focus:border-accent font-sans text-text" value={convAmt} onChange={(e) => setConvAmt(e.target.value)} />
          <select className="border-[1.5px] border-border rounded-lg px-2 py-1.5 text-sm bg-bg font-sans text-text" value={convFrom} onChange={(e) => setConvFrom(e.target.value)}>
            <option value="JPY">¥ JPY</option><option value="USD">$ USD</option><option value="TWD">NT$ TWD</option>
          </select>
          <span className="text-muted text-sm">→</span>
          <select className="border-[1.5px] border-border rounded-lg px-2 py-1.5 text-sm bg-bg font-sans text-text" value={convTo} onChange={(e) => setConvTo(e.target.value)}>
            <option value="TWD">NT$ TWD</option><option value="JPY">¥ JPY</option><option value="USD">$ USD</option>
          </select>
          <span className="ml-auto text-base font-bold text-stamp">{CUR_SYM[convTo]}{convResult.toLocaleString()}</span>
        </div>
      </div>
      <div className="bg-card border-[1.5px] border-border rounded-[14px] p-3 mb-3 shadow-card-sm text-center">
        <div className="text-xs text-muted mb-0.5">台幣合計（估）</div>
        <div className="text-2xl font-bold text-stamp">NT${Math.round(totalTWD).toLocaleString()}</div>
      </div>
      <button onClick={() => setShowForm((v) => !v)} className="w-full bg-accent text-white rounded-[14px] py-2.5 text-sm font-medium shadow-btn-green active:translate-y-0.5 transition-all mb-3 border-none cursor-pointer font-sans">＋ 新增記帳</button>
      {showForm && (
        <div className="bg-card border-2 border-border rounded-2xl p-3 mb-3 shadow-card">
          <input className="w-full border-[1.5px] border-border rounded-xl p-2 text-sm mb-2 bg-bg focus:outline-none focus:border-accent font-sans text-text" placeholder="支出名稱" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          <div className="flex gap-2 mb-1">
            <input type="number" inputMode="decimal" className="flex-1 border-[1.5px] border-border rounded-xl p-2 text-sm bg-bg focus:outline-none focus:border-accent font-sans text-text" placeholder="金額" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} />
            <select className="border-[1.5px] border-border rounded-xl px-2 text-sm bg-bg font-sans text-text" value={form.currency} onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value as Currency }))}>
              <option value="JPY">¥ JPY</option><option value="TWD">NT$ TWD</option><option value="USD">$ USD</option>
            </select>
          </div>
          {previewTWD !== null && form.currency !== "TWD" && <div className="text-xs text-muted mb-2 px-1">≈ NT${previewTWD.toLocaleString()}</div>}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {(Object.keys(CAT_LABELS) as ExpenseCategory[]).map((cat) => (
              <button key={cat} onClick={() => setForm((f) => ({ ...f, category: cat }))} className={`text-xs px-2.5 py-1 rounded-full border-[1.5px] cursor-pointer font-sans transition-colors ${form.category === cat ? "bg-accent text-white border-accent" : "bg-bg border-border text-muted"}`}>{CAT_EMOJI[cat]} {CAT_LABELS[cat]}</button>
            ))}
          </div>
          <div className="text-xs text-muted mb-1">付款人</div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {members.map((m) => (
              <button key={m.id} onClick={() => setForm((f) => ({ ...f, paidBy: m.id }))} className={`text-xs px-2.5 py-1 rounded-full border-[1.5px] cursor-pointer font-sans transition-colors ${form.paidBy === m.id ? "bg-tag-food border-accent-2 text-amber-700" : "bg-bg border-border text-muted"}`}>{m.nickname}</button>
            ))}
          </div>
          <button onClick={handleSubmit} className="w-full bg-stamp text-white rounded-xl py-2 text-sm font-medium border-none cursor-pointer font-sans active:scale-[.98] transition-transform">確認記帳</button>
        </div>
      )}
      <h2 className="font-journal text-lg text-stamp mb-3">📋 明細</h2>
      <div className="flex flex-col gap-2">
        {expenses.length === 0 && <div className="text-center text-muted text-sm py-8">還沒有任何記帳喔！</div>}
        {expenses.map((e) => {
          const payer = members.find((m) => m.id === e.paidBy)
          const twd = Math.round(toTWD(e.amount, e.currency, rates))
          return (
            <div key={e.id} className="bg-card border-[1.5px] border-border rounded-[12px] p-3 flex items-center gap-3 shadow-card-sm">
              <div className="w-8 h-8 bg-bg rounded-[9px] flex items-center justify-center text-base flex-shrink-0">{CAT_EMOJI[e.category]}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{e.title}</div>
                <div className="text-[11px] text-muted">{payer?.nickname ?? "?"} · {e.date}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-bold text-accent-2">{CUR_SYM[e.currency]}{e.amount.toLocaleString()}</div>
                {e.currency !== "TWD" && <div className="text-[10px] text-muted">≈NT${twd.toLocaleString()}</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}'

# ── src/components/Checklist/ChecklistPage.tsx ────────────────────────────────
Set-Content "$base\src\components\Checklist\ChecklistPage.tsx" -Encoding UTF8 'import { useState } from "react"
import { useAppStore } from "../../lib/store"

type ListTab = "todo" | "carry" | "wish" | "buy"
const TABS = [{ id: "todo" as ListTab, emoji: "✅", label: "待辦" }, { id: "carry" as ListTab, emoji: "🎒", label: "攜帶" }, { id: "wish" as ListTab, emoji: "⭐", label: "想去" }, { id: "buy" as ListTab, emoji: "🛒", label: "採買" }]

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
    { id: "c4", label: "感冒/退燒/腸胃藥/止痛藥", isChecked: false },
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
      <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide pb-1">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap px-3 py-1.5 rounded-xl border-[1.5px] text-xs cursor-pointer font-medium transition-all active:scale-95 font-sans ${activeTab === tab.id ? "bg-stamp border-stamp text-white" : "bg-bg border-border text-muted"}`}>{tab.emoji} {tab.label}</button>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 bg-border rounded-full h-2">
          <div className="bg-accent h-2 rounded-full transition-all" style={{ width: items.length ? `${Math.round(doneCount / items.length * 100)}%` : "0%" }} />
        </div>
        <span className="text-xs text-muted">{doneCount}/{items.length}</span>
      </div>
      <div className="bg-card border-[1.5px] border-border rounded-[14px] px-4 py-2 shadow-card mb-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0 cursor-pointer" onClick={() => toggle(item.id)}>
            <div className={`w-5 h-5 rounded-[5px] border-2 flex-shrink-0 flex items-center justify-center text-[11px] transition-all ${item.isChecked ? "bg-accent border-accent text-white" : "border-border"}`}>{item.isChecked && "✓"}</div>
            <span className={`text-sm flex-1 leading-snug ${item.isChecked ? "line-through text-muted" : "text-text"}`}>{item.label}</span>
            {item.badge && !item.isChecked && <span className="text-[10px] px-2 py-0.5 rounded-lg bg-tag-food text-amber-700 flex-shrink-0">{item.badge}</span>}
          </div>
        ))}
        <div className="flex gap-2 pt-2">
          <input className="flex-1 border-[1.5px] border-border rounded-xl px-3 py-1.5 text-sm bg-bg focus:outline-none focus:border-accent font-sans text-text" placeholder="新增項目..." value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addItem()} />
          <button onClick={addItem} className="bg-accent text-white border-none rounded-xl px-4 text-sm cursor-pointer font-sans active:scale-95 transition-transform">＋</button>
        </div>
      </div>
    </div>
  )
}'

# ── src/components/shared/PinGuard.tsx ───────────────────────────────────────
Set-Content "$base\src\components\shared\PinGuard.tsx" -Encoding UTF8 'import { useState, useRef } from "react"
import { useAppStore } from "../../lib/store"
import toast from "react-hot-toast"

const CORRECT_PIN = "007"

export default function PinGuard({ children }: { children: React.ReactNode }) {
  const { isPinUnlocked, unlockPin } = useAppStore()
  const [digits, setDigits] = useState(["", "", ""])
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

  if (isPinUnlocked) return <>{children}</>

  function handleInput(i: number, val: string) {
    if (!/^\d?$/.test(val)) return
    const next = [...digits]; next[i] = val; setDigits(next)
    if (val && i < 2) refs[i + 1].current?.focus()
    if (next.every((d) => d !== "")) {
      if (next.join("") === CORRECT_PIN) { unlockPin(); toast.success("解鎖成功！") }
      else { toast.error("PIN 碼錯誤"); setDigits(["", "", ""]); refs[0].current?.focus() }
    }
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-card text-center w-full max-w-[280px]">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="font-journal text-xl text-stamp mb-2">隱私保護</h2>
        <p className="text-xs text-muted mb-6">請輸入 PIN 碼查看訂單資料</p>
        <div className="flex gap-3 justify-center">
          {digits.map((d, i) => (
            <input key={i} ref={refs[i]} type="password" inputMode="numeric" maxLength={1} value={d} onChange={(e) => handleInput(i, e.target.value)}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-border rounded-xl bg-bg focus:outline-none focus:border-accent transition-colors" />
          ))}
        </div>
        <p className="text-[10px] text-muted mt-4">提示：旅伴的幸運數字 🎲</p>
      </div>
    </div>
  )
}'

# ── src/App.tsx ───────────────────────────────────────────────────────────────
Set-Content "$base\src\App.tsx" -Encoding UTF8 'import { useState, Suspense, lazy } from "react"
import { Toaster } from "react-hot-toast"
import PinGuard from "./components/shared/PinGuard"

const SchedulePage  = lazy(() => import("./components/Schedule/SchedulePage"))
const ExpensePage   = lazy(() => import("./components/Expense/ExpensePage"))
const ChecklistPage = lazy(() => import("./components/Checklist/ChecklistPage"))

type Tab = "schedule" | "expense" | "checklist"
const TABS = [{ id: "schedule" as Tab, emoji: "📅", label: "行程" }, { id: "expense" as Tab, emoji: "💰", label: "記帳" }, { id: "checklist" as Tab, emoji: "✅", label: "清單" }]

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("schedule")
  const daysUntil = Math.max(0, Math.ceil((new Date("2026-05-25").getTime() - new Date().getTime()) / 86400000))

  return (
    <div className="min-h-screen bg-bg bg-dot-pattern bg-dot font-sans max-w-[430px] mx-auto pb-20" style={{ backgroundImage: "radial-gradient(circle,#C8BFB030 1px,transparent 1px)", backgroundSize: "18px 18px" }}>
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
        </Suspense>
      </main>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t-2 border-border flex z-40 shadow-[0_-3px_0_#D8D0C0]">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-2 flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors active:scale-95 border-none bg-transparent cursor-pointer font-sans ${activeTab === tab.id ? "text-accent" : "text-muted"}`}>
            <span className="text-[18px] leading-none">{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}'

Write-Host ""
Write-Host "✅ 所有檔案建立完成！" -ForegroundColor Green
Write-Host ""
Write-Host "接下來請執行：" -ForegroundColor Yellow
Write-Host "  cd $projectName" -ForegroundColor Cyan
Write-Host "  npm install" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "瀏覽器開啟 http://localhost:5173 即可使用" -ForegroundColor Green
