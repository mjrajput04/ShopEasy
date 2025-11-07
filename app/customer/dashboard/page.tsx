"use client"

import { useAuth } from "@/app/auth/context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"


interface Order {
  id: string
  date: string
  total: number
  status: "completed" | "pending" | "shipped"
  items: number
}

export default function CustomerDashboard() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (!mounted || isLoading || !user) {
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Customer Portal</h1>
            <p className="text-muted-foreground mt-2">Welcome back, {user.email}</p>
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

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Active Orders", value: "3", icon: "📦" },
            { label: "Total Spent", value: "$1,250", icon: "💳" },
            { label: "Loyalty Points", value: "1,250", icon: "⭐" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-2xl mb-3">🛍️</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Continue Shopping</h3>
              <p className="text-muted-foreground">Explore our full product catalog</p>
            </Link>
            <Link
              href="/customer/orders"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-2xl mb-3">📋</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">View Order History</h3>
              <p className="text-muted-foreground">Check all your past and current orders</p>
            </Link>
          </div>
        </section>

        {/* Recent Orders Preview */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Orders</h2>
            <Link href="/customer/orders" className="text-accent hover:underline text-sm font-semibold">
              View All
            </Link>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-secondary">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Order ID</th>
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Date</th>
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Status</th>
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "#ORD-001", date: "Nov 5, 2025", status: "completed", total: "$349.99" },
                    { id: "#ORD-002", date: "Oct 28, 2025", status: "shipped", total: "$299.50" },
                    { id: "#ORD-003", date: "Oct 15, 2025", status: "completed", total: "$600.00" },
                  ].map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-secondary transition">
                      <td className="px-6 py-4 font-semibold text-foreground">{order.id}</td>
                      <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-accent">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>


    </main>
  )
}
