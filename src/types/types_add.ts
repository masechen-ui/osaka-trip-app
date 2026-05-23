// ✅ 貼到 src/types/index.ts — 加在現有型別的最後面

export interface FoodItem {
  id: string
  name: string
  area: string          // 區域，e.g. "道頓堀"
  category: string      // 分類，e.g. "海鮮"
  priority: 'must' | 'recommend' | 'maybe'
  note: string
  visited: boolean
  createdAt: number
}
