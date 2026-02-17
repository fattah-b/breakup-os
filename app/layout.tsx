import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { NeonBeam } from "@/components/neon-beam"
import { NotificationShell } from "@/components/notifications/notification-shell"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Breakup OS v2.0 | Survival Interface",
  description:
    "Your personal operating system for surviving and thriving after a breakup. Gamified healing with energy tracking, no-contact streaks, and narrative rewriting.",
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <NeonBeam />
        <NotificationShell>
          <div className="relative" style={{ zIndex: 1 }}>
            {children}
          </div>
        </NotificationShell>
      </body>
    </html>
  )
}
