// src/hooks/useWeather.ts
import { useState, useEffect } from "react"

// Osaka coordinates
const LAT = 34.6937
const LON = 135.5023
const API_KEY = import.meta.env.VITE_OWM_API_KEY

export interface DayWeather {
  date: string        // "2026-05-25"
  emoji: string
  temp: string        // "24°C"
  desc: string
  rainPercent: number
  outfitTip: string
}

function toEmoji(weatherId: number, pod: string): string {
  if (weatherId >= 200 && weatherId < 300) return "⛈️"
  if (weatherId >= 300 && weatherId < 400) return "🌦️"
  if (weatherId >= 500 && weatherId < 600) return "🌧️"
  if (weatherId >= 600 && weatherId < 700) return "❄️"
  if (weatherId >= 700 && weatherId < 800) return "🌫️"
  if (weatherId === 800) return pod === "n" ? "🌙" : "☀️"
  if (weatherId === 801 || weatherId === 802) return "⛅"
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

export function useWeather() {
  const [weatherMap, setWeatherMap] = useState<Record<string, DayWeather>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&cnt=40`
    )
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, DayWeather> = {}

        // Group by date, pick noon reading or first available
        const byDate: Record<string, any[]> = {}
        for (const item of data.list) {
          const date = item.dt_txt.slice(0, 10)
          if (!byDate[date]) byDate[date] = []
          byDate[date].push(item)
        }

        for (const [date, items] of Object.entries(byDate)) {
          // Prefer 12:00 reading
          const noon = items.find((i: any) => i.dt_txt.includes("12:00")) ?? items[0]
          const temp = Math.round(noon.main.temp)
          const rain = Math.round((noon.pop ?? 0) * 100)
          const weatherId = noon.weather[0].id
          const pod = noon.sys?.pod ?? "d"

          map[date] = {
            date,
            emoji: toEmoji(weatherId, pod),
            temp: `${temp}°C`,
            desc: noon.weather[0].description,
            rainPercent: rain,
            outfitTip: toOutfitTip(temp, rain),
          }
        }

        setWeatherMap(map)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { weatherMap, loading }
}
