"use client"

import { NotificationProvider } from "./notification-context"
import { ToastContainer } from "./toast-container"
import { PurchaseSimulator } from "./purchase-simulator"
import type { ReactNode } from "react"

export function NotificationShell({ children }: { children: ReactNode }) {
  return (
    <NotificationProvider>
      <PurchaseSimulator />
      <ToastContainer />
      {children}
    </NotificationProvider>
  )
}
