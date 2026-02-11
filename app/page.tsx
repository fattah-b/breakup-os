"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { SystemUpdateTab } from "@/components/tabs/system-update"
import { FirewallDetoxTab } from "@/components/tabs/firewall-detox"
import { EnergyMonitorTab } from "@/components/tabs/energy-monitor"
import { DebugLogTab } from "@/components/tabs/debug-log"
import { MainCharacterTab } from "@/components/tabs/main-character"

const tabs: Record<string, React.ComponentType> = {
  "tab-update": SystemUpdateTab,
  "tab-detox": FirewallDetoxTab,
  "tab-energy": EnergyMonitorTab,
  "tab-narrative": DebugLogTab,
  "tab-prize": MainCharacterTab,
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("tab-update")
  const [moodValue, setMoodValue] = useState(20)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id)
  }, [])

  const ActiveComponent = tabs[activeTab]

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <header className="md:hidden bg-card p-4 border-b border-border flex justify-between items-center shadow-sm z-20">
        <h1 className="text-lg font-bold text-foreground">
          {"\u{1F494}"} Breakup OS v2.0
        </h1>
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {"\u2630"}
        </button>
      </header>

      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        moodValue={moodValue}
        onMoodChange={setMoodValue}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-background p-4 md:p-8 md:pb-24">
        <ActiveComponent />
      </main>
    </div>
  )
}
