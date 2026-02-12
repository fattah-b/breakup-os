"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1815] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#e8dfd5]">
            BreakupOS
          </h1>
          <p className="mt-2 text-sm text-[#a89a8c]">
            Welcome back. Log in to continue your recovery.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5 rounded-2xl border border-[#2a2520] bg-[#211e1a] p-8"
        >
          {error && (
            <div className="rounded-lg border border-red-800/50 bg-red-900/20 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#c4b8ab]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[#3a342d] bg-[#1a1815] px-4 py-3 text-[#e8dfd5] placeholder-[#6b5f53] outline-none transition-colors focus:border-[#c9a87c] focus:ring-1 focus:ring-[#c9a87c]"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#c4b8ab]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
              className="w-full rounded-lg border border-[#3a342d] bg-[#1a1815] px-4 py-3 text-[#e8dfd5] placeholder-[#6b5f53] outline-none transition-colors focus:border-[#c9a87c] focus:ring-1 focus:ring-[#c9a87c]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#c9a87c] px-4 py-3 text-sm font-semibold text-[#1a1815] transition-colors hover:bg-[#d4b88a] disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-center text-sm text-[#a89a8c]">
            {"Don't have an account? "}
            <Link
              href="/auth/sign-up"
              className="font-medium text-[#c9a87c] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
