// src/hooks/useWeather.ts
import { useState, useEffect } from "react"

const API_KEY = import.meta.env.VITE_OWM_API_KEY

// 各天預設座標
const DAY_COORDS = [
  { lat: 34.6937, lon: 135.5023 }, // Day 1 大阪
  { lat: 35.0116, lon: 135.7681 }, // Day 2 京都（舞鶴方向出發，回來是大阪，用京都折衷）
  { lat: 35.0116, lon: 135.7681 }, // Day 3 京都
  { lat: 34.6937, lon: 135.5023 }, // Day 4 大阪
  { lat: 34.6937, lon: 135.5023 }, // Day 5 大阪
]

const TRIP_DATES = [
  "2026-05-25",
  "2026-05-26",
  "2026-05-27",
  "2026-05-28",
  "2026-05-29",
]

export interface DayWeather {
  date: string
  emoji: string
  temp: string
  desc: string
  rainPercent: number
  outfitTip: string
  isLive?: boolean
}

function isInJapan(lat: number, lon: number): boolean {
  return lat >= 24 && lat <= 46 && lon >= 122 && lon <= 154
}

function toEmoji(id: number): string {
  if (id >= 200 && id < 300) return "⛈️"
  if (id >= 300 && id < 400) return "🌦️"
  if (id >= 500 && id < 600) return "🌧️"
  if (id >= 600 && id < 700) return "❄️"
  if (id >= 700 && id < 800) return "🌫️"
  if (id === 800) return "☀️"
  if (id <= 802) return "⛅"
  return "☁️"
}

function toOutfitTip(temp: number, rain: number): string {
  if (rain >= 50) return "☂️ 降雨機率高，務必帶傘，防水外套備著"
  if (temp >= 30) return "🕶️ 高溫悶熱，排汗透氣夏裝 + 防曬乳 + 遮陽帽"
  if (temp >= 26) return "👕 透氣短袖為主，隨身帶薄外套備用"
  if (temp >= 22) return "👕 短袖 + 薄外套，室內外溫差注意"
  if (temp >= 18) return "🧥 洋蔥式穿搭，早晚涼，防風外套必備"
  return "🧥 氣溫偏涼，建議穿外套，注意保暖"
}

async function fetchWeatherForCoords(lat: number, lon: number): Promise<Record<string, DayWeather>> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=40&lang=zh_tw`
  )
  const data = await res.json()
  const map: Record<string, DayWeather> = {}

  const byDate: Record<string, any[]> = {}
  for (const item of data.list) {
    const date = item.dt_txt.slice(0, 10)
    if (!byDate[date]) byDate[date] = []
    byDate[date].push(item)
  }

  for (const [date, items] of Object.entries(byDate)) {
    const noon = items.find((i: any) => i.dt_txt.includes("12:00")) ?? items[0]
    const temp = Math.round(noon.main.temp)
    const rain = Math.round((noon.pop ?? 0) * 100)
    map[date] = {
      date,
      emoji: toEmoji(noon.weather[0].id),
      temp: `${temp}°C`,
      desc: noon.weather[0].description,
      rainPercent: rain,
      outfitTip: toOutfitTip(temp, rain),
    }
  }
  return map
}

export function useWeather() {
  const [weatherMap, setWeatherMap] = useState<Record<string, DayWeather>>({})
  const [loading, setLoading] = useState(true)
  const [usingGPS, setUsingGPS] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        // Try GPS first
        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
        )
        const { latitude, longitude } = pos.coords

        if (isInJapan(latitude, longitude)) {
          // In Japan — use GPS for all days
          setUsingGPS(true)
          const wx = await fetchWeatherForCoords(latitude, longitude)
          setWeatherMap(wx)
        } else {
          throw new Error("Not in Japan")
        }
      } catch {
        // Not in Japan or GPS denied — fetch per-day coords
        setUsingGPS(false)
        const results: Record<string, DayWeather> = {}

        // Deduplicate coords to avoid redundant API calls
        const seen = new Map<string, Record<string, DayWeather>>()

        for (let i = 0; i < TRIP_DATES.length; i++) {
          const { lat, lon } = DAY_COORDS[i]
          const key = `${lat},${lon}`
          if (!seen.has(key)) {
            const wx = await fetchWeatherForCoords(lat, lon)
            seen.set(key, wx)
          }
          const wx = seen.get(key)!
          const date = TRIP_DATES[i]
          if (wx[date]) results[date] = wx[date]
        }

        setWeatherMap(results)
      }
      setLoading(false)
    }

    load()
  }, [])

  return { weatherMap, loading, usingGPS }
}
