"use client"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const navItems = [
  { id: "tab-update", label: "1. System Update", icon: "\u{1F504}" },
  { id: "tab-detox", label: "2. Firewall / Detox", icon: "\u{1F6E1}\uFE0F" },
  { id: "tab-energy", label: "3. Energy Monitor", icon: "\u26A1" },
  { id: "tab-narrative", label: "4. Debug Log", icon: "\u{1F4DD}" },
  { id: "tab-prize", label: "5. Main Character", icon: "\u{1F3C6}" },
]

function getMoodLabel(val: number) {
  if (val < 25) return { text: "Critical Failure", color: "text-muted-foreground" }
  if (val < 50) return { text: "Safe Mode", color: "text-amber-500" }
  if (val < 80) return { text: "Rebooting...", color: "text-blue-500" }
  return { text: "Operational", color: "text-emerald-500" }
}

interface SidebarProps {
  activeTab: string
  onTabChange: (id: string) => void
  moodValue: number
  onMoodChange: (val: number) => void
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({
  activeTab,
  onTabChange,
  moodValue,
  onMoodChange,
  isOpen,
  onClose,
}: SidebarProps) {
  const mood = getMoodLabel(moodValue)
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <nav
      className={cn(
        "bg-card w-full md:w-64 flex-shrink-0 border-r border-border h-full flex flex-col",
        "absolute md:relative z-10 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="p-6 border-b border-border hidden md:block">
        <h1 className="text-xl font-bold text-primary tracking-tight">
          {"\u{1F494}"} Breakup OS{" "}
          <span className="text-xs text-muted-foreground font-normal">v2.0</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          System Status: <span className={cn("font-medium", mood.color)}>{mood.text}</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onTabChange(item.id)
              onClose()
            }}
            className={cn(
              "w-full text-left px-6 py-3 text-sm font-medium text-muted-foreground",
              "hover:bg-secondary transition-colors flex items-center gap-3",
              "border-l-4 border-transparent",
              activeTab === item.id && "bg-accent text-accent-foreground border-l-primary"
            )}
          >
            <span>{item.icon}</span> {item.label}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleSignOut}
          className="w-full rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          Sign Out
        </button>
      </div>

      <div className="p-4 bg-secondary border-t border-border">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
          Current Vibe
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={moodValue}
          onChange={(e) => onMoodChange(Number(e.target.value))}
          className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Rotting</span>
          <span>Thriving</span>
        </div>
      </div>
    </nav>
  )
}
