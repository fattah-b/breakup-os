"use client"

import { useRef, useCallback, useState, type ReactNode } from "react"

interface InteractiveCardProps {
  children: ReactNode
  className?: string
  as?: "div" | "form"
  onSubmit?: (e: React.FormEvent) => void
}

export function InteractiveCard({
  children,
  className = "",
  as: Tag = "div",
  onSubmit,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const rafRef = useRef<number | null>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current
      if (!card) {
        rafRef.current = null
        return
      }

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -6
      const rotateY = ((x - centerX) / centerX) * 6

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      card.style.setProperty("--glow-x", `${x}px`)
      card.style.setProperty("--glow-y", `${y}px`)

      rafRef.current = null
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    const card = cardRef.current
    if (card) {
      card.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const formProps = Tag === "form" ? { onSubmit } : {}

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative will-change-transform"
      style={{
        transition: "transform 0.2s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Radial glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background:
            "radial-gradient(350px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(0,255,136,0.08), transparent 60%)",
        }}
      />

      {/* Border glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background:
            "radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(0,255,136,0.12), transparent 50%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <Tag className={className} {...formProps}>
        {children}
      </Tag>
    </div>
  )
}
