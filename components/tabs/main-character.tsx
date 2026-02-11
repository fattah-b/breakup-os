"use client"

import { useState, useCallback } from "react"

const affirmations = [
  "My value doesn\u2019t drop just because someone didn\u2019t know how to appreciate the investment.",
  "I am the lead character, this was just plot development.",
  "I am protecting my peace like it\u2019s a VIP section.",
  "The trash took itself out.",
  "I am attracting, not chasing.",
]

export function MainCharacterTab() {
  const [text, setText] = useState(affirmations[0])
  const [fading, setFading] = useState(false)

  const generate = useCallback(() => {
    setFading(true)
    setTimeout(() => {
      const rand = affirmations[Math.floor(Math.random() * affirmations.length)]
      setText(rand)
      setFading(false)
    }, 300)
  }, [])

  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border text-center">
        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
          {"\u{1F3C6}"}
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">You Are The Prize</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          {
            "The breakup wasn\u2019t a rejection; it was a redirection. You aren\u2019t starting over from scratch, you\u2019re starting from experience."
          }
        </p>

        <div className="bg-gradient-to-r from-rose-50 to-indigo-50 p-1 rounded-2xl max-w-lg mx-auto shadow-lg transform transition-transform hover:scale-105 duration-300">
          <div className="bg-card rounded-xl p-8 border border-card/50">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
              Main Character Energy
            </h3>
            <p
              className="text-xl md:text-2xl font-serif text-foreground font-medium leading-relaxed transition-opacity duration-300"
              style={{ opacity: fading ? 0 : 1 }}
            >
              {`\u201C${text}\u201D`}
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={generate}
                className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <span>{"\u2728"}</span> Generate New Mantra
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-muted-foreground text-sm">
          <p>System reboot complete. Welcome to Version 2.0.</p>
        </div>
      </div>
    </section>
  )
}
