import { useEffect } from "react"
import { useAppStore } from "../lib/store"

export function useExchangeRate() {
  const setRates = useAppStore((s) => s.setRates)
  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/TWD")
      .then((r) => r.json())
      .then((d) => setRates({ JPY: parseFloat((1 / d.rates.JPY).toFixed(4)), USD: parseFloat((1 / d.rates.USD).toFixed(2)), TWD: 1 }))
      .catch(() => {})
  }, [setRates])
}

export function toTWD(amount: number, currency: string, rates: Record<string, number>): number {
  if (currency === "TWD") return amount
  return amount * (rates[currency] ?? 1)
}

export function convertCurrency(amount: number, from: string, to: string, rates: Record<string, number>): number {
  const twd = toTWD(amount, from, rates)
  if (to === "TWD") return twd
  return twd / (rates[to] ?? 1)
}
