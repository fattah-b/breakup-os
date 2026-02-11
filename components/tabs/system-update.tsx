"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"

const checklistItems = [
  "Ate cereal for dinner",
  "Watched same show x10",
  "Cried in the shower",
  "Drank water today",
]

function getProgressState(percentage: number) {
  if (percentage < 30) return { color: "bg-primary", message: "Installing Grief Drivers..." }
  if (percentage < 70) return { color: "bg-amber-400", message: "Processing Emotions..." }
  return { color: "bg-emerald-500", message: "Update Nearly Complete. Ready for Reboot." }
}

export function SystemUpdateTab() {
  const [checked, setChecked] = useState<boolean[]>(new Array(checklistItems.length).fill(false))

  const toggle = useCallback((index: number) => {
    setChecked((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }, [])

  const count = checked.filter(Boolean).length
  const percentage = Math.round((count / checklistItems.length) * 100)
  const progress = getProgressState(percentage)

  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {"Step 1: Accept the \u201CSoftware Update\u201D \u{1F504}"}
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {
            "Think of this breakup like a mandatory OS update. It\u2019s annoying, it glitches, and your system feels slow. But the patch is necessary to fix bugs and improve security. Do not force a restart\u2014let the loading bar fill up."
          }
        </p>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Installation Progress</span>
            <span className="text-sm font-medium text-primary">{percentage}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-4">
            <div
              className={cn("h-4 rounded-full transition-all duration-1000", progress.color)}
              style={{ width: `${Math.max(percentage, 5)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Update Status: {progress.message}
          </p>
        </div>

        <h3 className="font-semibold text-lg text-foreground mb-4">
          {"The \u201CRot Era\u201D Checklist"}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          It is okay to do nothing. Tick these off to prove you are surviving.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {checklistItems.map((item, i) => (
            <label
              key={i}
              className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors"
            >
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => toggle(i)}
                className="h-5 w-5 rounded accent-primary"
              />
              <span className="text-foreground">{item}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  )
}
