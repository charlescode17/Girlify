"use client"

import { useState, useEffect, useRef } from "react"
import { Eye, EyeOff, Lock, User, ArrowLeft } from "lucide-react"
import Link from "next/link"

const ADMIN_CREDENTIALS = {
  email: "admin@girlify.com",
  password: "girlify2025",
}

const SESSION_KEY = "girlify_admin_auth"

function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  try {
    const session = sessionStorage.getItem(SESSION_KEY)
    if (!session) return false
    const parsed = JSON.parse(session)
    return parsed.authenticated === true && parsed.expiry > Date.now()
  } catch {
    return false
  }
}

function setSession() {
  const expiry = Date.now() + 4 * 60 * 60 * 1000
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ authenticated: true, expiry })
  )
}

export function clearAdminSession() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SESSION_KEY)
  }
}

interface AuthGateProps {
  children: React.ReactNode
}

export default function AuthGate({ children }: AuthGateProps) {
  const [authed, setAuthed] = useState<boolean | null>(null)

  useEffect(() => {
    setAuthed(isAuthenticated())
  }, [])

  if (authed === null) {
    return (
      <div className="dark">
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
        </div>
      </div>
    )
  }

  if (!authed) {
    return (
      <LoginForm
        onSuccess={() => {
          setSession()
          setAuthed(true)
        }}
      />
    )
  }

  return <>{children}</>
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate brief auth delay
    await new Promise((r) => setTimeout(r, 800))

    if (
      email.toLowerCase() === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      onSuccess()
    } else {
      setError("Invalid credentials. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="dark">
      <div className="flex min-h-screen bg-[#0E0E0E]">
        {/* Left decorative panel */}
        <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden items-center justify-center bg-[#141414]">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, #C6A75E 49px, #C6A75E 50px),
              repeating-linear-gradient(90deg, transparent, transparent 49px, #C6A75E 49px, #C6A75E 50px)`,
          }} />
          <div className="relative z-10 px-16 text-center">
            <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#1A1A1A]">
              <span className="font-serif text-3xl text-[#C6A75E]">G</span>
            </div>
            <h2 className="font-serif text-4xl tracking-[0.03em] text-[#E8E8E8]">
              Girlify
            </h2>
            <p className="mt-2 text-sm tracking-[0.2em] uppercase text-[#666]">
              Empire Control Center
            </p>
            <div className="mx-auto mt-10 h-px w-24 bg-[#C6A75E]/30" />
            <p className="mt-10 max-w-xs mx-auto text-sm leading-relaxed text-[#555]">
              Manage your luxury fashion empire with precision, clarity, and elegance.
            </p>
          </div>
        </div>

        {/* Right login form panel */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-16">
          {/* Back to store link */}
          <div className="absolute top-8 left-8 lg:left-auto lg:right-8">
            <Link
              href="/"
              className="group flex items-center gap-2 text-sm text-[#666] transition-colors duration-200 hover:text-[#C6A75E]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={1.5} />
              Back to Store
            </Link>
          </div>

          <div className="w-full max-w-[400px]">
            {/* Mobile logo */}
            <div className="mb-12 text-center lg:hidden">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#1A1A1A]">
                <span className="font-serif text-2xl text-[#C6A75E]">G</span>
              </div>
              <h2 className="font-serif text-2xl text-[#E8E8E8]">Girlify</h2>
            </div>

            {/* Heading */}
            <div className="mb-10">
              <h1 className="font-serif text-2xl tracking-[0.02em] text-[#E8E8E8]">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-[#666]">
                Sign in to access the admin dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Email field */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                    focusedField === "email" || email
                      ? "-top-2.5 text-xs text-[#C6A75E] bg-[#0E0E0E] px-1"
                      : "top-3.5 text-sm text-[#555]"
                  }`}
                >
                  Email address
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-4 top-3.5 h-4 w-4 transition-colors duration-200 ${
                      focusedField === "email" ? "text-[#C6A75E]" : "text-[#444]"
                    }`}
                    strokeWidth={1.5}
                  />
                  <input
                    ref={emailRef}
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-lg border border-[#2A2A2A] bg-transparent py-3.5 pl-12 pr-4 text-sm text-[#E8E8E8] outline-none transition-all duration-200 focus:border-[#C6A75E]/50 focus:shadow-[0_0_0_3px_rgba(198,167,94,0.08)]"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                    focusedField === "password" || password
                      ? "-top-2.5 text-xs text-[#C6A75E] bg-[#0E0E0E] px-1"
                      : "top-3.5 text-sm text-[#555]"
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute left-4 top-3.5 h-4 w-4 transition-colors duration-200 ${
                      focusedField === "password" ? "text-[#C6A75E]" : "text-[#444]"
                    }`}
                    strokeWidth={1.5}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-lg border border-[#2A2A2A] bg-transparent py-3.5 pl-12 pr-12 text-sm text-[#E8E8E8] outline-none transition-all duration-200 focus:border-[#C6A75E]/50 focus:shadow-[0_0_0_3px_rgba(198,167,94,0.08)]"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-[#444] transition-colors duration-200 hover:text-[#888] cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" strokeWidth={1.5} />
                    ) : (
                      <Eye className="h-4 w-4" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="rounded-lg border border-[#E04545]/20 bg-[#E04545]/5 px-4 py-3">
                  <p className="text-sm text-[#E04545]">{error}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || !email || !password}
                className="group relative mt-2 w-full overflow-hidden rounded-lg bg-[#C6A75E] py-3.5 text-sm font-medium tracking-wide text-[#0E0E0E] transition-all duration-300 hover:bg-[#D4B76A] hover:shadow-[0_4px_20px_rgba(198,167,94,0.25)] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
              >
                <span
                  className={`flex items-center justify-center gap-2 transition-all duration-300 ${
                    loading ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Sign In
                </span>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#0E0E0E]/30 border-t-[#0E0E0E]" />
                  </div>
                )}
              </button>
            </form>

            {/* Hint */}
            <div className="mt-8 rounded-lg border border-[#1E1E1E] bg-[#141414] px-4 py-3">
              <p className="text-xs text-[#555]">
                <span className="text-[#777]">Demo credentials:</span>{" "}
                admin@girlify.com / girlify2025
              </p>
            </div>

            {/* Footer */}
            <p className="mt-12 text-center text-xs text-[#444]">
              Protected area. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
