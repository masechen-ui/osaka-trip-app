// src/lib/store.ts
import { create } from 'zustand'
import type { Member, Expense, ChecklistItem, JournalPost } from '../types'

interface AppStore {
  currentUserId: string | null
  setCurrentUserId: (id: string | null) => void

  activeDayIndex: number
  setActiveDayIndex: (i: number) => void

  members: Member[]
  setMembers: (members: Member[]) => void

  expenses: Expense[]
  setExpenses: (expenses: Expense[]) => void
  addExpense: (expense: Expense) => void

  checklistItems: ChecklistItem[]
  setChecklistItems: (items: ChecklistItem[]) => void
  toggleChecklistItem: (id: string) => void

  journalPosts: JournalPost[]
  setJournalPosts: (posts: JournalPost[]) => void

  rates: Record<string, number>
  setRates: (rates: Record<string, number>) => void

  isPinUnlocked: boolean
  unlockPin: () => void
  lockPin: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  currentUserId: null,
  setCurrentUserId: (id) => set({ currentUserId: id }),

  activeDayIndex: 0,
  setActiveDayIndex: (i) => set({ activeDayIndex: i }),

  members: [
    { id: 'm1', name: '靜怡', nickname: '靜怡', avatarColor: '#7B9E6B' },
    { id: 'm2', name: '小陳', nickname: '小陳', avatarColor: '#6B8FA8' },
    { id: 'm3', name: '名時', nickname: '名時', avatarColor: '#D4956A' },
    { id: 'm4', name: '佳樺', nickname: '佳樺', avatarColor: '#C4735A' },
    { id: 'm5', name: '子奇', nickname: '子奇', avatarColor: '#9B6BB5' },
    { id: 'm6', name: '阿侖', nickname: '阿侖', avatarColor: '#5A9BA8' },
  ],
  setMembers: (members) => set({ members }),

  expenses: [],
  setExpenses: (expenses) => set({ expenses }),
  addExpense: (expense) => set((s) => ({ expenses: [...s.expenses, expense] })),

  checklistItems: [],
  setChecklistItems: (items) => set({ checklistItems: items }),
  toggleChecklistItem: (id) => set((s) => ({
    checklistItems: s.checklistItems.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    ),
  })),

  journalPosts: [],
  setJournalPosts: (posts) => set({ journalPosts: posts }),

  rates: { JPY: 0.222, USD: 32.1, TWD: 1 },
  setRates: (rates) => set({ rates }),

  isPinUnlocked: false,
  unlockPin: () => set({ isPinUnlocked: true }),
  lockPin: () => set({ isPinUnlocked: false }),
}))
