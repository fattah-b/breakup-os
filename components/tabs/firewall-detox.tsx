"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"

const streakMessages = [
  "Even 1 hour counts.",
  "Okay, we\u2019re building momentum.",
  "Look at you, protecting your peace!",
  "They are literally fading from memory.",
  "Main Character Status Unlocked.",
]

const apps = [
  { name: "Instagram", icon: "\u{1F4F8}", defaultLabel: "Following" },
  { name: "TikTok", icon: "\u{1F3B5}", defaultLabel: "Following" },
  { name: "Number", icon: "\u{1F4F1}", defaultLabel: "Saved" },
]

export function FirewallDetoxTab() {
  const [days, setDays] = useState(0)
  const [blocked, setBlocked] = useState<boolean[]>(new Array(apps.length).fill(false))
  const [resetMsg, setResetMsg] = useState(false)

  const adjustDays = useCallback((amount: number) => {
    setDays((prev) => Math.max(0, prev + amount))
    setResetMsg(false)
  }, [])

  const resetStreak = useCallback(() => {
    setDays(0)
    setResetMsg(true)
  }, [])

  const toggleBlock = useCallback((index: number) => {
    setBlocked((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }, [])

  const msgIndex = Math.min(Math.floor(days / 3), streakMessages.length - 1)
  const currentMessage = resetMsg ? "Restarting the timer. You got this." : streakMessages[msgIndex]

  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {"Step 2: Firewall Settings (Detox) \u{1F6E1}\uFE0F"}
        </h2>
        <p className="text-muted-foreground mb-6">
          You cannot heal in the same environment that infected you. Checking their stories is a
          security breach. Activate your firewall now.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* No Contact Counter */}
          <div className="bg-secondary rounded-xl p-6 border border-border text-center">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              No-Contact Streak
            </h3>
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={() => adjustDays(-1)}
                className="w-10 h-10 rounded-full bg-card border border-border text-muted-foreground hover:bg-secondary text-xl"
              >
                -
              </button>
              <span className="text-6xl font-bold text-primary font-mono transition-transform">
                {days}
              </span>
              <button
                onClick={() => adjustDays(1)}
                className="w-10 h-10 rounded-full bg-card border border-border text-muted-foreground hover:bg-secondary text-xl"
              >
                +
              </button>
            </div>
            <p className="text-foreground font-medium">Days without a text</p>
            <p className="text-xs text-muted-foreground mt-2">{currentMessage}</p>
            <button
              onClick={resetStreak}
              className="mt-4 text-xs text-red-400 hover:text-red-600 underline"
            >
              Reset Streak (It happens)
            </button>
          </div>

          {/* App Permissions */}
          <div className="bg-secondary rounded-xl p-6 border border-border">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Revoke Access
            </h3>
            <div className="flex flex-col gap-4">
              {apps.map((app, i) => (
                <div key={app.name} className="flex justify-between items-center p-3 bg-card rounded-lg shadow-sm">
                  <span className="flex items-center gap-2">
                    <span className="text-xl">{app.icon}</span> {app.name}
                  </span>
                  <button
                    onClick={() => toggleBlock(i)}
                    className={cn(
                      "px-3 py-1 text-xs font-bold rounded-full border transition-colors hover:opacity-80",
                      blocked[i]
                        ? "bg-foreground text-card border-foreground/60"
                        : "bg-emerald-100 text-emerald-700 border-emerald-200"
                    )}
                  >
                    {blocked[i] ? "Blocked \u{1F6AB}" : app.defaultLabel}
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 italic text-center">
              *Simulation only. Go do it on your real phone.*
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
