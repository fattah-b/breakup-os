"use client"

import { useNotifications } from "./notification-context"
import { useEffect, useState } from "react"

function ToastItem({
  title,
  message,
  onDismiss,
}: {
  title: string
  message: string
  onDismiss: () => void
}) {
  const [exiting, setExiting] = useState(false)

  // Start exit animation 400ms before auto-dismiss (auto-dismiss is 5s total)
  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), 4600)
    return () => clearTimeout(timer)
  }, [])

  function handleDismiss() {
    setExiting(true)
    setTimeout(onDismiss, 300)
  }

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={handleDismiss}
      className={`pointer-events-auto cursor-pointer rounded-xl border border-border bg-card/95 
        p-4 shadow-lg shadow-black/30 backdrop-blur-sm transition-all duration-300 
        ${exiting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
      style={{ maxWidth: 340, minWidth: 280 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs text-primary">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-primary">{title}</p>
          <p className="mt-0.5 text-sm leading-snug text-foreground">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

export function ToastContainer() {
  const { notifications, dismiss } = useNotifications()

  return (
    <div
      aria-label="Notifications"
      className="pointer-events-none fixed top-4 right-4 z-[9999] flex flex-col gap-3"
    >
      {notifications.map((n) => (
        <ToastItem
          key={n.id}
          title={n.title}
          message={n.message}
          onDismiss={() => dismiss(n.id)}
        />
      ))}
    </div>
  )
}
