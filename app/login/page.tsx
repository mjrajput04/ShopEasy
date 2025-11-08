"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useAuth } from "@/app/auth/context"

type UserRole = "customer" | "asm"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!selectedRole) {
        setError("Please select a role to continue")
        setLoading(false)
        return
      }

      if (!email || !password) {
        setError("Please fill in all fields")
        setLoading(false)
        return
      }

      await login(email, password, selectedRole)

      if (selectedRole === "customer") {
        router.push("/customer/dashboard")
      } else if (selectedRole === "asm") {
        router.push("/asm/dashboard")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/" className="text-3xl font-bold text-foreground hover:text-accent transition font-serif">
              ShopEase
            </Link>
            <h1 className="text-4xl font-bold text-foreground mt-8 mb-3 font-serif">Login to Your Account</h1>
            <p className="text-lg text-muted-foreground">Select your account type and sign in</p>
          </div>

          {!selectedRole ? (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {[
                {
                  value: "customer" as UserRole,
                  title: "Customer",
                  icon: "🛍️",
                  desc: "Browse and purchase premium products",
                  features: ["Track orders", "View purchase history", "Manage preferences"],
                },
                {
                  value: "asm" as UserRole,
                  title: "Area Sales Manager",
                  icon: "👔",
                  desc: "Manage accounts and drive sales",
                  features: ["Manage inventory", "Process orders", "Customer management"],
                },
              ].map((option) => (
                <div
                  key={option.value}
                  onClick={() => setSelectedRole(option.value)}
                  className="bg-card border border-border rounded-lg p-8 cursor-pointer hover:shadow-xl hover:border-accent transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-5xl mb-4">{option.icon}</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 font-serif">{option.title}</h3>
                  <p className="text-muted-foreground mb-6">{option.desc}</p>
                  <div className="space-y-2 mb-6">
                    {option.features.map((feature, i) => (
                      <p key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="text-accent">✓</span> {feature}
                      </p>
                    ))}
                  </div>
                  <p className="text-accent font-semibold">Continue →</p>
                </div>
              ))}
            </div>
          ) : (
            /* Login form after role selection */
            <div className="max-w-md mx-auto">
              <button
                onClick={() => {
                  setSelectedRole(null)
                  setEmail("")
                  setPassword("")
                  setError("")
                }}
                className="text-accent hover:underline mb-6 flex items-center gap-2 text-sm font-semibold"
              >
                ← Change role
              </button>

              <div className="bg-card border border-border rounded-lg p-8">
                <div className="mb-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Logging in as</p>
                  <p className="text-xl font-bold text-foreground font-serif">
                    {selectedRole === "customer" ? "Customer" : "Area Sales Manager"}
                  </p>
                </div>

                <form onSubmit={handleLogin}>
                  {error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  {/* Demo Credentials */}
                  <div className="mb-6 p-3 bg-secondary rounded-lg text-xs text-muted-foreground">
                    <p className="font-semibold mb-2">Demo Credentials:</p>
                    <p>Email: demo@shopease.com</p>
                    <p>Password: demo123</p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
