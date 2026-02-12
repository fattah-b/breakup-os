import Link from "next/link"

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1815] px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="rounded-2xl border border-[#2a2520] bg-[#211e1a] p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-900/20">
            <svg
              className="h-8 w-8 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#e8dfd5]">
            Something went wrong
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#a89a8c]">
            There was an error during authentication. Please try again.
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
