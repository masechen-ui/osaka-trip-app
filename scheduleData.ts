// src/data/scheduleData.ts
import type { DaySchedule, EventCategory } from '../types'

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  sight: '景點', food: '美食', transport: '交通', hotel: '住宿',
}

let _id = 0
const id = () => `evt-${++_id}`

export const SCHEDULE_DATA: DaySchedule[] = [
  {
    dayIndex: 0, date: '2026-05-25', label: 'Day 1',
    title: 'Day 1 — 啟程大阪',
    weather: {
      emoji: '☀️', temp: '24°C', desc: '舒適 · 初夏好天氣', rainPercent: 10,
      outfitTip: '👕 短袖 + 薄外套，室內外冷熱差大，隨時可穿脫',
    },
    events: [
      { id: id(), dayIndex: 0, time: '05:20', title: '桃園機場 T2 報到', category: 'transport', notes: '長榮建議出發前3小時抵達，早班機人潮多' },
      { id: id(), dayIndex: 0, time: '08:20', title: '長榮 BR132 起飛', category: 'transport', notes: '行李23kg × 1件，手提7kg，液體>100ml須託運' },
      { id: id(), dayIndex: 0, time: '11:55', title: '抵達關西機場 KIX', category: 'transport', notes: '入境後含檢疫、行李約需1小時', mapUrl: 'https://maps.google.com/?q=Kansai+International+Airport' },
      { id: id(), dayIndex: 0, time: '13:30', title: '南海電鐵 → 難波 → 心齋橋', category: 'transport', notes: '¥930 空港急行（約48分）+ ¥240 地鐵御堂筋線' },
      { id: id(), dayIndex: 0, time: '15:00', title: '日本橋電電城', category: 'sight', notes: '懷舊遊戲、動漫公仔、咒術迴戰周邊，約19:30陸續打烊', mapUrl: 'https://maps.google.com/?q=日本橋電電城+大阪' },
      { id: id(), dayIndex: 0, time: '18:00', title: '道頓堀固力果跑跑人', category: 'sight', notes: '建議走到河邊水上步道（Tombori River Walk）由下往上仰拍，六人合照最漂亮！', mapUrl: 'https://maps.google.com/?q=道頓堀+戎橋+大阪' },
      { id: id(), dayIndex: 0, time: '20:00', title: '🥩 力丸燒肉（已預約）', category: 'food', notes: '120分鐘プレミアム ¥4,488/人，6人含1小朋友，CHEN Tim 訂位', mapUrl: 'https://maps.google.com/?q=焼肉力丸+心斎橋' },
      { id: id(), dayIndex: 0, time: '22:30', title: '回 VIA INN Shinsaibashi', category: 'hotel', notes: '心齋橋站7號出口步行2分鐘', mapUrl: 'https://maps.google.com/?q=Via+Inn+Shinsaibashi+大阪' },
    ],
  },
  {
    dayIndex: 1, date: '2026-05-26', label: 'Day 2',
    title: 'Day 2 — 海之京都夢幻鐵道',
    weather: {
      emoji: '🌤️', temp: '20°C', desc: '海邊涼爽，海風強勁', rainPercent: 25,
      outfitTip: '🧥 洋蔥式穿搭 + 防風外套，帽子必備，搭船時很冷',
    },
    events: [
      { id: id(), dayIndex: 1, time: '06:40', title: '飯店大廳集合出發', category: 'transport', notes: '前一晚先在便利商店買好早餐帶上車！' },
      { id: id(), dayIndex: 1, time: '07:05', title: '地鐵至日本橋站 2號出口', category: 'transport', notes: '御堂筋線→難波→千日前線→日本橋，¥190', mapUrl: 'https://maps.google.com/?q=日本橋駅+大阪+2番出口' },
      { id: id(), dayIndex: 1, time: '07:15', title: 'Klook 導遊報到', category: 'transport', notes: '出示 Klook 憑證上車，確認人數' },
      { id: id(), dayIndex: 1, time: '10:00', title: '🚃 丹後海上觀光列車', category: 'sight', notes: '由良川橋樑 = 神隱少女真實場景！軌道彷彿懸浮於海面', mapUrl: 'https://maps.google.com/?q=西舞鶴駅+京都' },
      { id: id(), dayIndex: 1, time: '11:00', title: '天橋立 ViewLand 飛龍觀', category: 'sight', notes: '搭纜車登頂，傳統「跨下觀景」讓沙洲化作飛龍！午餐自理推薦海鮮丼', mapUrl: 'https://maps.google.com/?q=天橋立ビューランド' },
      { id: id(), dayIndex: 1, time: '14:30', title: '🕊️ 伊根舟屋 & 餵海鷗', category: 'sight', notes: '拿蝦味先餵食海鷗與老鷹，小朋友最期待！可搭遊覽船出海', mapUrl: 'https://maps.google.com/?q=伊根の舟屋+京都' },
      { id: id(), dayIndex: 1, time: '18:30', title: '返回大阪解散（日本橋站）', category: 'transport' },
      { id: id(), dayIndex: 1, time: '19:00', title: '🍜 鈍屋拉麵（心齋橋）', category: 'food', notes: '濃郁豚骨，吹一天海風後最療癒，營業至深夜', mapUrl: 'https://maps.google.com/?q=ずんどう屋+心斎橋' },
    ],
  },
  {
    dayIndex: 2, date: '2026-05-27', label: 'Day 3',
    title: 'Day 3 — 京都古都散策',
    weather: {
      emoji: '🌡️', temp: '29°C', desc: '京都盆地悶熱，紫外線強', rainPercent: 15,
      outfitTip: '🕶️ 排汗透氣夏裝 + 防曬乳 + 遮陽帽，穿整趟最耐走的鞋',
    },
    events: [
      { id: id(), dayIndex: 2, time: '08:00', title: '出發搭地鐵至淀屋橋', category: 'transport', notes: '御堂筋線 ¥240' },
      { id: id(), dayIndex: 2, time: '08:30', title: '淀屋橋轉京阪電車', category: 'transport', notes: '特急→普通 ¥430，車程約50分鐘' },
      { id: id(), dayIndex: 2, time: '09:30', title: '⛩ 伏見稻荷大社 千本鳥居', category: 'sight', notes: '往上走15分鐘到奧社奉拜所，人潮銳減、光影絕美！入口鳥居人多，建議直接往上走', mapUrl: 'https://maps.google.com/?q=伏見稲荷大社' },
      { id: id(), dayIndex: 2, time: '12:00', title: '🏛️ 清水寺 & 午餐', category: 'sight', notes: '推薦奧丹清水湯豆腐套餐 ¥3,500，座位多環境美', mapUrl: 'https://maps.google.com/?q=清水寺+京都' },
      { id: id(), dayIndex: 2, time: '14:00', title: '八坂庚申堂 → 三年坂 → 二年坂', category: 'sight', notes: '庚申堂彩球最吸睛！廣角低角度拍三年坂石板路效果最好', mapUrl: 'https://maps.google.com/?q=八坂庚申堂+京都' },
      { id: id(), dayIndex: 2, time: '15:30', title: '祇園花見小路漫步', category: 'sight', notes: '⚠️ 私人巷弄拍照罰款¥10,000，僅在主街拍。傍晚點燈後最有氣氛', mapUrl: 'https://maps.google.com/?q=祇園花見小路+京都' },
      { id: id(), dayIndex: 2, time: '17:30', title: '🍜 晚餐（祇園/河原町）', category: 'food', notes: '推薦：麵屋豬一（必比登）或 京極かねよ（鰻魚厚蛋丼）', mapUrl: 'https://maps.google.com/?q=麺屋猪一+京都' },
      { id: id(), dayIndex: 2, time: '18:30', title: '京阪返回大阪', category: 'transport', notes: '祇園四條→淀屋橋→地鐵心齋橋 ¥430' },
    ],
  },
  {
    dayIndex: 3, date: '2026-05-28', label: 'Day 4',
    title: 'Day 4 — 大阪港灣新世界',
    weather: {
      emoji: '⛅', temp: '26°C', desc: '大阪港灣海風清涼', rainPercent: 20,
      outfitTip: '👕 透氣短袖為主，聖瑪麗亞號遊船時套上防風薄外套',
    },
    events: [
      { id: id(), dayIndex: 3, time: '08:30', title: '搭地鐵至森之宮站', category: 'transport', notes: '長堀鶴見綠地線，今日全程刷大阪周遊卡 ¥0' },
      { id: id(), dayIndex: 3, time: '09:00', title: '🏯 大阪城公園', category: 'sight', notes: 'A組：小火車+御座船（周遊卡免費）/ B組：自由漫步拍照，天守閣搭電梯至8樓再逐層往下', mapUrl: 'https://maps.google.com/?q=大阪城+大阪' },
      { id: id(), dayIndex: 3, time: '12:15', title: '🦈 大阪海遊館', category: 'sight', notes: '⚠️ 不含在周遊卡內，需另購票。鯨鯊必看！', mapUrl: 'https://maps.google.com/?q=海遊館+大阪' },
      { id: id(), dayIndex: 3, time: '12:30', title: '🍳 北極星蛋包飯午餐', category: 'food', notes: '天保山購物中心內，約¥1,200', mapUrl: 'https://maps.google.com/?q=北極星+天保山+大阪' },
      { id: id(), dayIndex: 3, time: '14:15', title: '⛵ 聖瑪麗亞號 & 天保山摩天輪', category: 'sight', notes: '周遊卡免費！聖瑪麗亞原價¥1,600、摩天輪¥900，合省¥2,500', mapUrl: 'https://maps.google.com/?q=天保山大観覧車+大阪' },
      { id: id(), dayIndex: 3, time: '16:15', title: '通天閣 & 新世界懷舊', category: 'sight', notes: '周遊卡免費入場（原價¥1,000），懷舊街道超有氣氛', mapUrl: 'https://maps.google.com/?q=通天閣+大阪' },
      { id: id(), dayIndex: 3, time: '17:30', title: '🍢 八重勝串炸（新世界）', category: 'food', notes: '在地人極推平價老店，牛肉串、炸蝦必點，現場排隊', mapUrl: 'https://maps.google.com/?q=八重勝+新世界+大阪' },
      { id: id(), dayIndex: 3, time: '19:00', title: '搭地鐵返回心齋橋', category: 'transport', notes: '惠美須町→堺筋線→長堀橋→長堀鶴見綠地線→心齋橋' },
    ],
  },
  {
    dayIndex: 4, date: '2026-05-29', label: 'Day 5',
    title: 'Day 5 — 晨間快閃返台',
    weather: {
      emoji: '🌦️', temp: '25°C', desc: '留意短暫陣雨', rainPercent: 40,
      outfitTip: '👟 寬鬆舒適機場裝，帶輕便晴雨傘，方便安檢脫穿',
    },
    events: [
      { id: id(), dayIndex: 4, time: '09:00', title: '飯店退房，行李寄放', category: 'hotel', notes: '10:00前退房，行李可免費寄放至出發前取回' },
      { id: id(), dayIndex: 4, time: '09:15', title: '🦐 黑門市場海鮮早餐', category: 'food', notes: '丸善食肉神戶牛串 ¥2,000，現場立食。約9點陸續開店', mapUrl: 'https://maps.google.com/?q=黒門市場+大阪' },
      { id: id(), dayIndex: 4, time: '10:45', title: '返回飯店取行李', category: 'hotel' },
      { id: id(), dayIndex: 4, time: '11:15', title: '⚠️ 最晚出發！搭地鐵至難波', category: 'transport', notes: '心齋橋→難波 ¥190，千萬別拖延！' },
      { id: id(), dayIndex: 4, time: '11:30', title: '南海電鐵急行至關西機場', category: 'transport', notes: '難波→KIX ¥930，約48分鐘', mapUrl: 'https://maps.google.com/?q=Kansai+International+Airport' },
      { id: id(), dayIndex: 4, time: '12:20', title: 'KIX 捷星 GK55 報到', category: 'transport', notes: '⚠️ 手提嚴格限7kg，二次秤重！超重罰金極高，登機前整理好' },
      { id: id(), dayIndex: 4, time: '14:50', title: '捷星 GK55 起飛 🏠', category: 'transport', notes: '降落桃園 T1，注意接送航廈與去程不同' },
    ],
  },
]
