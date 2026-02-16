"use client"

export function NeonBeam() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Primary beam */}
      <div className="neon-beam neon-beam-1" />
      {/* Secondary beam (offset for depth) */}
      <div className="neon-beam neon-beam-2" />
      {/* Ambient glow */}
      <div className="neon-ambient" />
    </div>
  )
}
