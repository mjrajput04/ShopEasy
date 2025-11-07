"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productId = searchParams.get("productId")
  const quantity = searchParams.get("quantity") || "1"

  const [step, setStep] = useState<"phone" | "otp" | "success">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [generatedOtp, setGeneratedOtp] = useState("")

  const handleGetOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone) return
    // Simulate OTP generation
    const simulatedOtp = "123456"
    setGeneratedOtp(simulatedOtp)
    setStep("otp")
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp === generatedOtp) {
      setStep("success")
    } else {
      alert("Invalid OTP. Try 123456")
    }
  }

  if (step === "phone") {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-md mx-auto px-4 py-20">
          <Link href="/" className="text-accent hover:underline mb-8 inline-block">
            ← Back to products
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-8">Complete Your Purchase</h1>

          <form onSubmit={handleGetOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition"
            >
              Get OTP
            </button>
          </form>

          <div className="mt-6 p-4 bg-secondary rounded-lg text-sm text-muted-foreground">
            <p>
              Demo mode: Use any phone number to get OTP code: <strong>123456</strong>
            </p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (step === "otp") {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-md mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold text-foreground mb-2">Verify OTP</h1>
          <p className="text-muted-foreground mb-8">Enter the code sent to {phone}</p>

          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">OTP Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent text-center tracking-widest"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition"
            >
              Verify OTP
            </button>
          </form>

          <div className="mt-6 p-4 bg-secondary rounded-lg text-sm text-muted-foreground">
            <p>
              OTP Code: <strong>123456</strong>
            </p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="mb-8 text-6xl">✓</div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Purchase Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your order. Your confirmation has been sent to your phone.
        </p>

        <Link href="/customer/portal">
          <button className="w-full py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition mb-4">
            View Your Orders
          </button>
        </Link>

        <Link href="/" className="text-accent hover:underline">
          Continue shopping
        </Link>
      </div>
      <Footer />
    </main>
  )
}
