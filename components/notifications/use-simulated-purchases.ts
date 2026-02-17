"use client"

import { useEffect, useRef } from "react"
import { useNotifications } from "./notification-context"

const SIMULATED_PURCHASES = [
  {
    delay: 3000,
    title: "BreakupOS",
    message: "Adli dari Kajang beli Set Susu Lazz 3 pax",
  },
  {
    delay: 9000,
    title: "BreakupOS",
    message: "Maisarah sedang membeli Sawanah Koko 1kg",
  },
  {
    delay: 18000,
    title: "BreakupOS",
    message: "Hafiz dari Shah Alam beli Minyak Herba 2 botol",
  },
  {
    delay: 28000,
    title: "BreakupOS",
    message: "Aisyah baru sahaja membeli Set Penjagaan Diri Premium",
  },
]

export function useSimulatedPurchases() {
  const { push } = useNotifications()
  const firedRef = useRef(false)

  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true

    const timers = SIMULATED_PURCHASES.map(({ delay, title, message }) =>
      setTimeout(() => push({ title, message }), delay)
    )

    return () => timers.forEach(clearTimeout)
  }, [push])
}
