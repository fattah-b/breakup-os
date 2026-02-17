"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react"

export interface Notification {
  id: string
  title: string
  message: string
  icon?: string
  createdAt: number
}

interface NotificationContextType {
  notifications: Notification[]
  push: (n: Omit<Notification, "id" | "createdAt">) => void
  dismiss: (id: string) => void
  browserPermission: NotificationPermission | "default"
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider")
  return ctx
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [browserPermission, setBrowserPermission] =
    useState<NotificationPermission>("default")
  const permissionRequested = useRef(false)

  // Request browser notification permission once on mount
  useEffect(() => {
    if (permissionRequested.current) return
    permissionRequested.current = true

    if (typeof window === "undefined" || !("Notification" in window)) return

    if (Notification.permission === "granted" || Notification.permission === "denied") {
      setBrowserPermission(Notification.permission)
      return
    }

    Notification.requestPermission().then((perm) => {
      setBrowserPermission(perm)
    })
  }, [])

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const push = useCallback(
    (n: Omit<Notification, "id" | "createdAt">) => {
      const id = crypto.randomUUID()
      const notification: Notification = { ...n, id, createdAt: Date.now() }

      setNotifications((prev) => [...prev, notification])

      // Auto-dismiss after 5 seconds
      setTimeout(() => dismiss(id), 5000)

      // Fire browser notification if allowed
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        try {
          new window.Notification(n.title, {
            body: n.message,
            icon: n.icon || "/favicon.ico",
          })
        } catch {
          // Silently fail on mobile or restricted environments
        }
      }
    },
    [dismiss]
  )

  return (
    <NotificationContext.Provider
      value={{ notifications, push, dismiss, browserPermission }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
