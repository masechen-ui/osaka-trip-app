// src/components/Schedule/SchedulePage.tsx
import { useState, useMemo } from 'react'
import { useAppStore } from '../../lib/store'
import { SCHEDULE_DATA } from '../../data/scheduleData'
import type { EventCategory } from '../../types'

const TAG_STYLES: Record<EventCategory, string> = {
  sight:     'bg-tag-sight text-green-700',
  food:      'bg-tag-food text-amber-700',
  transport: 'bg-tag-transport text-blue-700',
  hotel:     'bg-tag-hotel text-purple-700',
}
const DOT_COLORS: Record<EventCategory, string> = {
  sight:     '#7B9E6B',
  food:      '#D4956A',
  transport: '#6B8FA8',
  hotel:     '#9B6BB5',
}
const CAT_LABELS: Record<EventCategory, string> = {
  sight: '景點', food: '美食', transport: '交通', hotel: '住宿',
}
const YOUBI = ['日', '月', '火', '水', '木', '金', '土']
const ZH_DAY = ['週日', '週一', '週二', '週三', '週四', '週五', '週六']

function getDayOfWeek(dateStr: string) {
  const d = new Date(dateStr)
  const idx = d.getDay()
  return { youbi: YOUBI[idx] + '曜日', zh: ZH_DAY[idx] }
}

export default function SchedulePage() {
  const { activeDayIndex, setActiveDayIndex } = useAppStore()
  const [openEvent, setOpenEvent] = useState<string | null>(null)

  const day = useMemo(() => SCHEDULE_DATA[activeDayIndex], [activeDayIndex])

  const daysUntil = useMemo(() => {
    const depart = new Date('2026-05-25')
    return Math.max(0, Math.ceil((depart.getTime() - new Date().getTime()) / 86400000))
  }, [])

  function toggleEvent(id: string) {
    setOpenEvent(prev => prev === id ? null : id)
  }

  return (
    <div className="p-4 pb-6">
      {daysUntil > 0 && (
        <div className="bg-stamp text-white rounded-2xl p-3 mb-4 text-center shadow-card flex items-center justify-center gap-2">
          <span className="font-journal text-3xl font-bold">{daysUntil}</span>
          <span className="text-sm">天後就要出發囉！✈</span>
        </div>
      )}

      {/* Date chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {SCHEDULE_DATA.map((d, i) => {
          const { youbi, zh } = getDayOfWeek(d.date)
          return (
            <button
              key={i}
              onClick={() => { setActiveDayIndex(i); setOpenEvent(null) }}
              className={`min-w-[56px] rounded-[14px] border-2 flex flex-col items-center py-1.5 px-1
                transition-all active:scale-95 shadow-card-sm flex-shrink-0 cursor-pointer
                ${activeDayIndex === i
                  ? 'bg-accent border-accent text-white shadow-none'
                  : 'bg-card border-border text-text'}`}
            >
              <span className="text-lg font-bold leading-none">{d.date.slice(-2)}</span>
              <span className="text-[9px] opacity-75 mt-0.5">{d.label}</span>
              <span className="text-[9px] opacity-70">{youbi.slice(0, 1)}曜</span>
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
        {/* Outfit suggestion */}
        <div className="mt-2 bg-[#F0F7EC] rounded-lg px-3 py-1.5 text-xs text-[#2A6A2A]">
          {day.weather.outfitTip}
        </div>
      </div>

      {/* Day title */}
      <h2 className="font-journal text-lg text-stamp mb-3">📍 {day.title}</h2>

      {/* Timeline */}
      <div className="relative pl-7">
        <div
          className="absolute left-[9px] top-0 bottom-0 w-0.5"
          style={{ background: 'repeating-linear-gradient(to bottom,#E5DECE 0,#E5DECE 6px,transparent 6px,transparent 12px)' }}
        />
        {day.events.map((event) => (
          <div key={event.id} className="relative mb-3">
            <div
              className="absolute -left-6 top-3 w-3 h-3 rounded-full border-2 border-card"
              style={{ background: DOT_COLORS[event.category] }}
            />
            <div
              className="bg-card border-[1.5px] border-border rounded-[14px] p-3 shadow-card-sm cursor-pointer active:scale-[.98] transition-transform"
              onClick={() => toggleEvent(event.id)}
            >
              <div className="text-[11px] text-muted mb-0.5">{event.time}</div>
              <div className="text-sm font-medium">{event.title}</div>
              <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-1.5 ${TAG_STYLES[event.category]}`}>
                {CAT_LABELS[event.category]}
              </span>

              {/* Expandable detail */}
              {openEvent === event.id && (
                <div className="mt-2 pt-2 border-t border-border">
                  {event.notes && (
                    <p className="text-xs text-muted leading-relaxed mb-2">{event.notes}</p>
                  )}
                  {event.mapUrl && (
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-accent-3 text-white text-xs px-3 py-1.5 rounded-lg"
                      onClick={e => e.stopPropagation()}
                    >
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
}
