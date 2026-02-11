"use client"

import { useState, useCallback } from "react"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = ["#e7e5e4", "#10b981", "#a855f7", "#f59e0b"]
const LABELS = ["Obsessing over Ex", "Gym/Health", "Hobbies", "Friends"]

const defaultData = [90, 3, 3, 4]

const actionButtons = [
  { type: "gym", label: "Hit the Gym", sub: "+ Endorphins", icon: "\u{1F3CB}\uFE0F\u200D\u2642\uFE0F", bg: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200", textColor: "text-emerald-800", subColor: "text-emerald-600" },
  { type: "hobby", label: "New Hobby", sub: "+ Skill Gain", icon: "\u{1F9F6}", bg: "bg-purple-50 hover:bg-purple-100 border-purple-200", textColor: "text-purple-800", subColor: "text-purple-600" },
  { type: "friends", label: "Bestie Pivot", sub: "+ Support", icon: "\u{1F46F}\u200D\u2642\uFE0F", bg: "bg-amber-50 hover:bg-amber-100 border-amber-200", textColor: "text-amber-800", subColor: "text-amber-600" },
  { type: "skin", label: "Skincare", sub: "+ Glow Up", icon: "\u{1F9F4}", bg: "bg-blue-50 hover:bg-blue-100 border-blue-200", textColor: "text-blue-800", subColor: "text-blue-600" },
]

export function EnergyMonitorTab() {
  const [values, setValues] = useState([...defaultData])
  const [maxedOut, setMaxedOut] = useState(false)

  const chartData = LABELS.map((name, i) => ({
    name,
    value: values[i],
  }))

  const reallocate = useCallback((type: string) => {
    setValues((prev) => {
      if (prev[0] <= 10) {
        setMaxedOut(true)
        return prev
      }
      setMaxedOut(false)
      const next = [...prev]
      next[0] -= 10
      if (type === "gym" || type === "skin") next[1] += 10
      else if (type === "hobby") next[2] += 10
      else if (type === "friends") next[3] += 10
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setValues([...defaultData])
    setMaxedOut(false)
  }, [])

  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {"Step 3: Redirect Energy \u26A1"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {
            "A breakup creates a massive surplus of emotional energy. If you don\u2019t use it, it turns into anxiety. Reallocate your resources below."
          }
        </p>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2">
            <div className="w-full max-w-[500px] h-[300px] md:h-[350px] mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="55%"
                    outerRadius="80%"
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value}% Energy`, name]}
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #e7e5e4",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    wrapperStyle={{ fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <h3 className="font-semibold text-lg text-foreground">Available Actions</h3>
            <p className="text-sm text-muted-foreground">
              {"Click to move energy from \u201CObsessing\u201D to productive sectors."}
            </p>

            {maxedOut && (
              <p className="text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                You are officially over them! Maximum energy redirected.
              </p>
            )}

            <div className="grid grid-cols-2 gap-3">
              {actionButtons.map((btn) => (
                <button
                  key={btn.type}
                  onClick={() => reallocate(btn.type)}
                  className={`p-3 text-left border rounded-lg transition-colors ${btn.bg}`}
                >
                  <span className="text-2xl block mb-1">{btn.icon}</span>
                  <span className={`font-semibold text-sm ${btn.textColor}`}>{btn.label}</span>
                  <span className={`text-xs block mt-1 ${btn.subColor}`}>{btn.sub}</span>
                </button>
              ))}
            </div>
            <button
              onClick={reset}
              className="text-xs text-muted-foreground underline w-full text-center hover:text-foreground mt-2"
            >
              Reset Simulation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
