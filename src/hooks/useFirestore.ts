import { useEffect } from "react"
import { collection, onSnapshot, addDoc, updateDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore"
import { db } from "../lib/firebase"
import { useAppStore } from "../lib/store"
import type { Expense, JournalPost } from "../types"

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

export async function toggleChecklistInFirestore(id: string, current: boolean) {
  return updateDoc(doc(db, "trips", TRIP_ID, "checklist", id), { isChecked: !current }).catch(() => {})
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
