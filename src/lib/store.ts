import { create } from "zustand"
import type { Member, Expense, ChecklistItem, JournalPost } from "../types"

interface AppStore {
  activeDayIndex: number; setActiveDayIndex: (i: number) => void
  members: Member[]; setMembers: (m: Member[]) => void
  expenses: Expense[]; setExpenses: (e: Expense[]) => void
  checklistItems: ChecklistItem[]; setChecklistItems: (i: ChecklistItem[]) => void
  journalPosts: JournalPost[]; setJournalPosts: (p: JournalPost[]) => void
  rates: Record<string, number>; setRates: (r: Record<string, number>) => void
  isPinUnlocked: boolean; unlockPin: () => void; lockPin: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  activeDayIndex: 0, setActiveDayIndex: (i) => set({ activeDayIndex: i }),
 members: [
  { id: "m1", name: "Jingyi",  nickname: "靜怡", avatarColor: "#7B9E6B" },
  { id: "m2", name: "Chen",    nickname: "小陳", avatarColor: "#6B8FA8" },
  { id: "m3", name: "Mingshi", nickname: "名時", avatarColor: "#D4956A" },
  { id: "m4", name: "Jiahua",  nickname: "佳樺", avatarColor: "#C4735A" },
  { id: "m5", name: "Ziqi",    nickname: "子奇", avatarColor: "#9B6BB5" },
  { id: "m6", name: "Alun",    nickname: "阿侖", avatarColor: "#5A9BA8" },
],
  setMembers: (members) => set({ members }),
  expenses: [], setExpenses: (expenses) => set({ expenses }),
  checklistItems: [], setChecklistItems: (items) => set({ checklistItems: items }),
  journalPosts: [], setJournalPosts: (posts) => set({ journalPosts: posts }),
  rates: { JPY: 0.222, USD: 32.1, TWD: 1 }, setRates: (rates) => set({ rates }),
  isPinUnlocked: false, unlockPin: () => set({ isPinUnlocked: true }), lockPin: () => set({ isPinUnlocked: false }),
}))
