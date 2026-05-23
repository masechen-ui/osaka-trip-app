export type EventCategory = "sight" | "food" | "transport" | "hotel"

export interface ScheduleEvent {
  id: string; dayIndex: number; time: string; title: string; category: EventCategory
  notes?: string; mapUrl?: string
}
export interface DaySchedule {
  dayIndex: number; date: string; label: string; title: string
  weather: { emoji: string; temp: string; desc: string; rainPercent: number; outfitTip: string }
  events: ScheduleEvent[]
}
export type Currency = "TWD" | "JPY" | "USD"
export type ExpenseCategory = "transport" | "food" | "sight" | "shopping" | "hotel" | "other"
export interface Expense {
  id: string; title: string; amount: number; currency: Currency
  category: ExpenseCategory; paidBy: string; splitWith: string[]; date: string
}
export interface Member { id: string; name: string; nickname: string; avatarColor: string }
export interface ChecklistItem { id: string; label: string; isChecked: boolean; badge?: string }
export interface JournalPost {
  id: string; authorId: string; authorName: string; dayIndex: number
  content: string; photoUrls: string[]; createdAt: number; likes: string[]
}
export interface FoodItem {
  id: string
  name: string
  area: string
  category: string
  priority: "must" | "recommend" | "maybe"
  note: string
  visited: boolean
  createdAt: number
}
