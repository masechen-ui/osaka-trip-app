import { useMemo } from "react"
import { useAppStore } from "../../lib/store"
import type { EventCategory } from "../../types"

const TAG_STYLES: Record<EventCategory, string> = {
  sight:     "bg-tag-sight text-green-700",
  food:      "bg-tag-food text-amber-700",
  transport: "bg-tag-transport text-blue-700",
  hotel:     "bg-tag-hotel text-purple-700",
}
const DOT_COLORS: Record<EventCategory, string> = {
  sight: "#7B9E6B", food: "#D4956A", transport: "#6B8FA8", hotel: "#9B6BB5",
}
const CAT_LABELS: Record<EventCategory, string> = {
  sight: "景點", food: "美食", transport: "交通", hotel: "住宿",
}
const YOUBI = ["日", "月", "火", "水", "木", "金", "土"]

// ── 行程資料（直接內嵌，避免 scheduleData.ts 的亂碼問題）──────────────────
const SCHEDULE = [
  {
    dayIndex: 0, date: "2026-05-25", label: "Day 1", title: "Day 1 — 啟程大阪",
    weather: { emoji: "☀️", temp: "24°C", desc: "舒適 · 初夏好天氣", rainPercent: 10, outfitTip: "👕 短袖 + 薄外套，室內外冷熱差大，隨時可穿脫" },
    events: [
      { id: "d1e1", time: "05:20", title: "桃園機場 T2 報到", category: "transport" as EventCategory, notes: "長榮建議出發前3小時抵達，早班機人潮多" },
      { id: "d1e2", time: "08:20", title: "長榮 BR132 起飛", category: "transport" as EventCategory, notes: "行李 23kg × 1件，手提 7kg，液體 >100ml 須託運" },
      { id: "d1e3", time: "11:55", title: "抵達關西機場 KIX", category: "transport" as EventCategory, notes: "入境後含檢疫、行李約需1小時", mapUrl: "https://maps.google.com/?q=Kansai+International+Airport" },
      { id: "d1e4", time: "13:30", title: "南海電鐵 → 難波 → 心齋橋", category: "transport" as EventCategory, notes: "¥930 空港急行（約48分）+ ¥240 地鐵御堂筋線" },
      { id: "d1e5", time: "15:00", title: "日本橋電電城", category: "sight" as EventCategory, notes: "懷舊遊戲、動漫公仔，約 19:30 陸續打烊", mapUrl: "https://maps.google.com/?q=Nipponbashi+Den+Den+Town+Osaka" },
      { id: "d1e6", time: "18:00", title: "道頓堀固力果跑跑人", category: "sight" as EventCategory, notes: "建議到河邊水上步道由下往上仰拍，六人合照最漂亮！", mapUrl: "https://maps.google.com/?q=Glico+Sign+Dotonbori+Osaka" },
      { id: "d1e7", time: "20:00", title: "🥩 力丸燒肉（已預約）", category: "food" as EventCategory, notes: "120分鐘吃到飽 ¥4,488/人，6人含1小朋友", mapUrl: "https://maps.google.com/?q=Yakiniku+Rikimaru+Shinsaibashi" },
      { id: "d1e8", time: "22:30", title: "回 VIA INN Shinsaibashi", category: "hotel" as EventCategory, notes: "心齋橋站 7號出口步行約2分鐘", mapUrl: "https://maps.google.com/?q=Via+Inn+Shinsaibashi+Osaka" },
    ],
  },
  {
    dayIndex: 1, date: "2026-05-26", label: "Day 2", title: "Day 2 — 海之京都夢幻鐵道",
    weather: { emoji: "🌤️", temp: "20°C", desc: "海邊涼爽，海風強勁", rainPercent: 25, outfitTip: "🧥 洋蔥式穿搭 + 防風外套，帽子必備，搭船時很冷" },
    events: [
      { id: "d2e1", time: "06:40", title: "飯店大廳集合出發", category: "transport" as EventCategory, notes: "前一晚先在便利商店買好早餐帶上車！" },
      { id: "d2e2", time: "07:05", title: "地鐵至日本橋站 2號出口", category: "transport" as EventCategory, notes: "御堂筋線→難波→千日前線→日本橋，¥190", mapUrl: "https://maps.google.com/?q=Nipponbashi+Station+Osaka" },
      { id: "d2e3", time: "07:15", title: "Klook 導遊報到上車", category: "transport" as EventCategory, notes: "出示 Klook 憑證，確認人數後上車" },
      { id: "d2e4", time: "10:00", title: "🚃 丹後海上觀光列車", category: "sight" as EventCategory, notes: "由良川橋樑 = 神隱少女真實場景！軌道彷彿懸浮於海面", mapUrl: "https://maps.google.com/?q=Nishi+Maizuru+Station+Kyoto" },
      { id: "d2e5", time: "11:00", title: "天橋立 ViewLand 飛龍觀", category: "sight" as EventCategory, notes: "搭纜車登頂，傳統「跨下觀景」讓沙洲化作飛龍！午餐自理推薦海鮮丼", mapUrl: "https://maps.google.com/?q=Amanohashidate+View+Land" },
      { id: "d2e6", time: "14:30", title: "🕊️ 伊根舟屋 & 餵海鷗", category: "sight" as EventCategory, notes: "拿蝦味先餵食海鷗與老鷹，小朋友最期待！可搭遊覽船出海", mapUrl: "https://maps.google.com/?q=Ine+Funaya+Kyoto" },
      { id: "d2e7", time: "18:30", title: "返回大阪解散（日本橋站）", category: "transport" as EventCategory },
      { id: "d2e8", time: "19:00", title: "🍜 鈍屋拉麵（心齋橋）", category: "food" as EventCategory, notes: "濃郁豚骨，吹一天海風後最療癒，營業至深夜", mapUrl: "https://maps.google.com/?q=Zundouya+Shinsaibashi+Osaka" },
    ],
  },
  {
    dayIndex: 2, date: "2026-05-27", label: "Day 3", title: "Day 3 — 京都古都散策",
    weather: { emoji: "🌡️", temp: "29°C", desc: "京都盆地悶熱，紫外線強", rainPercent: 15, outfitTip: "🕶️ 排汗透氣夏裝 + 防曬乳 + 遮陽帽，穿整趟最耐走的鞋" },
    events: [
      { id: "d3e1", time: "08:00", title: "出發搭地鐵至淀屋橋", category: "transport" as EventCategory, notes: "御堂筋線 ¥240" },
      { id: "d3e2", time: "08:30", title: "淀屋橋轉京阪電車", category: "transport" as EventCategory, notes: "特急→普通 ¥430，車程約50分鐘" },
      { id: "d3e3", time: "09:30", title: "⛩ 伏見稻荷大社 千本鳥居", category: "sight" as EventCategory, notes: "往上走15分鐘到奧社奉拜所，人潮銳減、光影絕美！入口鳥居人多建議直接往上走", mapUrl: "https://maps.google.com/?q=Fushimi+Inari+Taisha+Kyoto" },
      { id: "d3e4", time: "12:00", title: "🏛️ 清水寺 & 午餐", category: "sight" as EventCategory, notes: "推薦奧丹清水湯豆腐套餐 ¥3,500，座位多環境美", mapUrl: "https://maps.google.com/?q=Kiyomizudera+Kyoto" },
      { id: "d3e5", time: "14:00", title: "八坂庚申堂 → 三年坂 → 二年坂", category: "sight" as EventCategory, notes: "庚申堂彩球最吸睛！廣角低角度拍石板路效果最好", mapUrl: "https://maps.google.com/?q=Yasaka+Koshin+Do+Kyoto" },
      { id: "d3e6", time: "15:30", title: "祇園花見小路", category: "sight" as EventCategory, notes: "⚠️ 私人巷弄拍照罰款 ¥10,000，僅在主街拍。傍晚點燈後最有氣氛", mapUrl: "https://maps.google.com/?q=Gion+Hanamikoji+Kyoto" },
      { id: "d3e7", time: "17:30", title: "晚餐（祇園周邊）", category: "food" as EventCategory, notes: "推薦：麵屋豬一（必比登）或 京極かねよ（鰻魚厚蛋丼）", mapUrl: "https://maps.google.com/?q=Menya+Inoichi+Kyoto" },
      { id: "d3e8", time: "18:30", title: "京阪返回大阪", category: "transport" as EventCategory, notes: "祇園四條→淀屋橋→地鐵心齋橋 ¥430" },
    ],
  },
  {
    dayIndex: 3, date: "2026-05-28", label: "Day 4", title: "Day 4 — 大阪港灣 & 新世界",
    weather: { emoji: "⛅", temp: "26°C", desc: "大阪港灣海風清涼", rainPercent: 20, outfitTip: "👕 透氣短袖為主，聖瑪麗亞號遊船時套上防風薄外套" },
    events: [
      { id: "d4e1", time: "08:30", title: "搭地鐵至森之宮站", category: "transport" as EventCategory, notes: "長堀鶴見綠地線，今日全程刷大阪周遊卡 ¥0" },
      { id: "d4e2", time: "09:00", title: "🏯 大阪城公園", category: "sight" as EventCategory, notes: "周遊卡免費！A組：小火車+御座船 / B組：自由漫步，天守閣搭電梯至8樓再逐層往下", mapUrl: "https://maps.google.com/?q=Osaka+Castle+Park" },
      { id: "d4e3", time: "12:15", title: "🦈 大阪海遊館", category: "sight" as EventCategory, notes: "⚠️ 不含在周遊卡內，需另購票，鯨鯊必看！", mapUrl: "https://maps.google.com/?q=Osaka+Aquarium+Kaiyukan" },
      { id: "d4e4", time: "12:30", title: "🍳 北極星蛋包飯午餐", category: "food" as EventCategory, notes: "天保山購物中心內，約 ¥1,200", mapUrl: "https://maps.google.com/?q=Hokkyokusei+Tempozan+Osaka" },
      { id: "d4e5", time: "14:15", title: "⛵ 聖瑪麗亞號 & 天保山摩天輪", category: "sight" as EventCategory, notes: "周遊卡免費！聖瑪麗亞原價 ¥1,600、摩天輪 ¥900，合省 ¥2,500", mapUrl: "https://maps.google.com/?q=Tempozan+Ferris+Wheel+Osaka" },
      { id: "d4e6", time: "16:15", title: "通天閣 & 新世界懷舊", category: "sight" as EventCategory, notes: "周遊卡免費入場（原價 ¥1,000），懷舊街道超有氣氛", mapUrl: "https://maps.google.com/?q=Tsutenkaku+Shinsekai+Osaka" },
      { id: "d4e7", time: "17:30", title: "🍢 八重勝串炸（新世界）", category: "food" as EventCategory, notes: "在地人極推平價老店，牛肉串、炸蝦必點，現場排隊", mapUrl: "https://maps.google.com/?q=Yaekatsu+Kushikatsu+Shinsekai" },
      { id: "d4e8", time: "19:00", title: "搭地鐵返回心齋橋", category: "transport" as EventCategory, notes: "惠美須町→堺筋線→長堀橋→長堀鶴見綠地線→心齋橋" },
    ],
  },
  {
    dayIndex: 4, date: "2026-05-29", label: "Day 5", title: "Day 5 — 晨間快閃返台",
    weather: { emoji: "🌦️", temp: "25°C", desc: "留意短暫陣雨", rainPercent: 40, outfitTip: "👟 寬鬆舒適機場裝，帶輕便晴雨傘，方便安檢脫穿" },
    events: [
      { id: "d5e1", time: "09:00", title: "飯店退房，行李寄放", category: "hotel" as EventCategory, notes: "10:00前退房，行李可免費寄放至出發前取回" },
      { id: "d5e2", time: "09:15", title: "🦐 黑門市場海鮮早餐", category: "food" as EventCategory, notes: "丸善食肉神戶牛串 ¥2,000，現場立食。約9點陸續開店", mapUrl: "https://maps.google.com/?q=Kuromon+Market+Osaka" },
      { id: "d5e3", time: "10:45", title: "返回飯店取行李", category: "hotel" as EventCategory },
      { id: "d5e4", time: "11:15", title: "⚠️ 最晚出發！搭地鐵至難波", category: "transport" as EventCategory, notes: "心齋橋→難波 ¥190，千萬別拖延！" },
      { id: "d5e5", time: "11:30", title: "南海電鐵急行至關西機場", category: "transport" as EventCategory, notes: "難波→KIX ¥930，約48分鐘", mapUrl: "https://maps.google.com/?q=Kansai+International+Airport" },
      { id: "d5e6", time: "12:20", title: "KIX 捷星 GK55 報到", category: "transport" as EventCategory, notes: "⚠️ 手提嚴格限 7kg，二次秤重！超重罰金極高" },
      { id: "d5e7", time: "14:50", title: "捷星 GK55 起飛 ✈️", category: "transport" as EventCategory, notes: "降落桃園 T1，注意接送航廈與去程不同" },
    ],
  },
]

export default function SchedulePage() {
  const { activeDayIndex, setActiveDayIndex } = useAppStore()
  const day = useMemo(() => SCHEDULE[activeDayIndex], [activeDayIndex])
  const daysUntil = useMemo(() => Math.max(0, Math.ceil((new Date("2026-05-25").getTime() - new Date().getTime()) / 86400000)), [])

  return (
    <div className="p-4 pb-6">
      {daysUntil > 0 && (
        <div className="bg-stamp text-white rounded-2xl p-3 mb-4 text-center shadow-card flex items-center justify-center gap-2">
          <span className="font-journal text-3xl font-bold">{daysUntil}</span>
          <span className="text-sm">天後就要出發囉！✈</span>
        </div>
      )}

      {/* Date chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: "none" }}>
        {SCHEDULE.map((d, i) => {
          const dow = new Date(d.date).getDay()
          return (
            <button key={i} onClick={() => setActiveDayIndex(i)}
              className={`min-w-[56px] rounded-[14px] border-2 flex flex-col items-center py-1.5 px-1 transition-all active:scale-95 shadow-card-sm flex-shrink-0 cursor-pointer
                ${activeDayIndex === i ? "bg-accent border-accent text-white" : "bg-card border-border text-text"}`}>
              <span className="text-lg font-bold leading-none">{d.date.slice(-2)}</span>
              <span className="text-[9px] opacity-75 mt-0.5">{d.label}</span>
              <span className="text-[9px] opacity-70">{YOUBI[dow]}曜</span>
            </button>
          )
        })}
      </div>

      {/* Weather card */}
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
        <div className="mt-2 bg-[#F0F7EC] rounded-lg px-3 py-1.5 text-xs text-[#2A6A2A]">
          {day.weather.outfitTip}
        </div>
      </div>

      {/* Day title */}
      <h2 className="font-journal text-lg text-stamp mb-3">📍 {day.title}</h2>

      {/* Timeline — always expanded */}
      <div className="relative pl-7">
        <div className="absolute left-[9px] top-0 bottom-0 w-0.5"
          style={{ background: "repeating-linear-gradient(to bottom,#E5DECE 0,#E5DECE 6px,transparent 6px,transparent 12px)" }} />

        {day.events.map((event) => (
          <div key={event.id} className="relative mb-3">
            <div className="absolute -left-6 top-3 w-3 h-3 rounded-full border-2 border-card"
              style={{ background: DOT_COLORS[event.category] }} />
            <div className="bg-card border-[1.5px] border-border rounded-[14px] p-3 shadow-card-sm">
              <div className="text-[11px] text-muted mb-0.5">{event.time}</div>
              <div className="text-sm font-medium mb-1">{event.title}</div>
              <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full ${TAG_STYLES[event.category]}`}>
                {CAT_LABELS[event.category]}
              </span>
              {event.notes && (
                <p className="text-xs text-muted leading-relaxed mt-2">{event.notes}</p>
              )}
              {event.mapUrl && (
                <a href={event.mapUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-accent-3 text-white text-xs px-3 py-1.5 rounded-lg mt-2">
                  🗺️ Google Maps
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
