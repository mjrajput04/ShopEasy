"use client"

import type React from "react"

import { useAuth } from "@/app/auth/context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Footer } from "@/components/footer"

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
  })

  useEffect(() => {
    setMounted(true)
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (!mounted || isLoading || !user) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEditing(false)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link href="/customer/dashboard" className="text-accent hover:underline mb-4 inline-block text-sm">
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-foreground">My Profile</h1>
          </div>
          <button
            onClick={() => {
              logout()
              router.push("/")
            }}
            className="px-6 py-2 bg-secondary text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto bg-accent rounded-full flex items-center justify-center text-2xl font-bold text-accent-foreground mb-4">
                  {formData.firstName[0]}
                  {formData.lastName[0]}
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {formData.firstName} {formData.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="space-y-2 border-t border-border pt-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">MEMBER SINCE</p>
                  <p className="text-foreground font-semibold">July 2024</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">LOYALTY TIER</p>
                  <p className="text-foreground font-semibold">Gold</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="md:col-span-2">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Personal Information</h2>
                <button
                  onClick={() => setEditing(!editing)}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition text-sm"
                >
                  {editing ? "Cancel" : "Edit"}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Address Fields */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!editing}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
                  />
                </div>

                {/* City, State, Zip */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Zip Code</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                {editing && (
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Save Changes
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
