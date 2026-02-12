import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1815] px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="rounded-2xl border border-[#2a2520] bg-[#211e1a] p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#c9a87c]/20">
            <svg
              className="h-8 w-8 text-[#c9a87c]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#e8dfd5]">Check your email</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#a89a8c]">
            We sent you a confirmation link. Click it to activate your account
            and start your recovery journey.
          </p>
          <Link
            href="/auth/login"
            className="mt-6 inline-block rounded-lg bg-[#c9a87c] px-6 py-3 text-sm font-semibold text-[#1a1815] transition-colors hover:bg-[#d4b88a]"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
