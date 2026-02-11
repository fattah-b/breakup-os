"use client"

import { useState, useCallback } from "react"

const pinkMemories = [
  "We were so perfect together, they just got scared...",
  "But they had such good taste in music...",
  "Remember that weekend in the mountains?",
  "They said I was the only one who understood them...",
]

const realityChecks = [
  "Reality: They left you on read for 8 hours regularly.",
  "Reality: You cried on your birthday because of them.",
  "Reality: They refused to label the relationship.",
  "Reality: Your friends actually hated them.",
  "Reality: They made you feel anxious more than safe.",
]

export function DebugLogTab() {
  const [memoryIndex, setMemoryIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [reality, setReality] = useState("")

  const revealTruth = useCallback(() => {
    const truth = realityChecks[Math.floor(Math.random() * realityChecks.length)]
    setReality(truth)
    setRevealed(true)
    setMemoryIndex((prev) => (prev + 1) % pinkMemories.length)
  }, [])

  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {"Step 4: Re-Write the Narrative \u270D\uFE0F"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {
            "Memory has a \u201CPink Tint\u201D filter. You remember the sunset dates but forget the waiting. Use the tool below to debug your memory logs."
          }
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* The Fantasy */}
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">{"\u{1F4AD}"}</div>
            <h3 className="font-bold text-rose-800 mb-3">
              {"The \u201CPink Tint\u201D Memory"}
            </h3>
            <p className="text-rose-900 italic mb-4 text-lg">
              {`\u201C${pinkMemories[memoryIndex]}\u201D`}
            </p>
            <div className="mt-auto">
              <span className="text-xs font-semibold text-rose-400 bg-card px-2 py-1 rounded">
                Status: Delusional
              </span>
            </div>
          </div>

          {/* The Reality */}
          <div className="bg-foreground border border-foreground/80 rounded-xl p-6 flex flex-col relative overflow-hidden text-card">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">{"\u26A0\uFE0F"}</div>
            <h3 className="font-bold text-card/70 mb-3">The System Log (Reality)</h3>
            <div className="min-h-[80px] flex items-center justify-center">
              {!revealed ? (
                <button
                  onClick={revealTruth}
                  className="bg-card/20 hover:bg-card/30 text-card/80 px-4 py-2 rounded-lg text-sm transition-colors shadow-lg border border-card/20"
                >
                  Click to Run Diagnostics
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-xl font-bold text-primary mb-2">
                    {"\u26A0\uFE0F"} ERROR FOUND
                  </p>
                  <p className="text-card text-lg">{reality}</p>
                  <button
                    onClick={revealTruth}
                    className="mt-4 text-xs text-card/50 hover:text-card underline"
                  >
                    Run another diagnostic
                  </button>
                </div>
              )}
            </div>
            <div className="mt-auto pt-4">
              <span className="text-xs font-semibold text-card/50 bg-foreground/80 px-2 py-1 rounded">
                Status: Accurate
              </span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
          <p className="text-sm text-yellow-800">
            <strong>Pro Tip:</strong> Open your Notes app right now. Create a list titled{" "}
            {"\u201CWhy It Didn\u2019t Work.\u201D"} Read it every time you want to text them at 2
            AM.
          </p>
        </div>
      </div>
    </section>
  )
}
