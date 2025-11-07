"use client"

import { useAuth } from "@/app/auth/context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Footer } from "@/components/footer"

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  date: string
  total: number
  status: "completed" | "pending" | "shipped"
  items: OrderItem[]
}

export default function OrderHistoryPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending" | "shipped">("all")
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // Mock order data
  const orders: Order[] = [
    {
      id: "#ORD-001",
      date: "Nov 5, 2025",
      status: "completed",
      total: 349.99,
      items: [
        { id: 1, name: "Premium Wireless Headphones", price: 199, quantity: 1 },
        { id: 6, name: "Silk Scarf Collection", price: 49, quantity: 3 },
      ],
    },
    {
      id: "#ORD-002",
      date: "Oct 28, 2025",
      status: "shipped",
      total: 299.5,
      items: [{ id: 3, name: "Smart Watch Pro", price: 299, quantity: 1 }],
    },
    {
      id: "#ORD-003",
      date: "Oct 15, 2025",
      status: "completed",
      total: 600.0,
      items: [{ id: 9, name: "High-End Camera", price: 599, quantity: 1 }],
    },
    {
      id: "#ORD-004",
      date: "Sep 30, 2025",
      status: "completed",
      total: 428.0,
      items: [
        { id: 2, name: "Luxury Leather Wallet", price: 89, quantity: 1 },
        { id: 4, name: "Designer Sunglasses", price: 159, quantity: 1 },
        { id: 8, name: "Designer Lamp", price: 180, quantity: 1 },
      ],
    },
  ]

  const filteredOrders = filterStatus === "all" ? orders : orders.filter((o) => o.status === filterStatus)

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

  if (!mounted || isLoading || !user) {
    return null
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
            <h1 className="text-4xl font-bold text-foreground">Order History</h1>
            <p className="text-muted-foreground mt-2">View and manage all your orders</p>
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

        {/* Filter Section */}
        <div className="mb-8 flex gap-2 flex-wrap">
          {[
            { label: "All Orders", value: "all" },
            { label: "Completed", value: "completed" },
            { label: "Shipped", value: "shipped" },
            { label: "Pending", value: "pending" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterStatus(filter.value as typeof filterStatus)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterStatus === filter.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-secondary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Order Header */}
                <button
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary transition"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div>
                      <p className="font-semibold text-foreground">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right ml-auto">
                      <p className="font-bold text-accent">${order.total.toFixed(2)}</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <span className="ml-4 text-muted-foreground">{expandedOrder === order.id ? "−" : "+"}</span>
                </button>

                {/* Order Details */}
                {expandedOrder === order.id && (
                  <div className="border-t border-border px-6 py-4 bg-secondary">
                    <h4 className="font-semibold text-foreground mb-4">Order Items</h4>
                    <div className="space-y-3 mb-6">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <div>
                            <p className="text-foreground font-medium">{item.name}</p>
                            <p className="text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex gap-3 flex-wrap">
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition">
                        Track Order
                      </button>
                      <button className="px-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-background transition">
                        Reorder
                      </button>
                      <button className="px-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-background transition">
                        View Invoice
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <p className="text-muted-foreground text-lg mb-4">No orders found</p>
              <Link href="/" className="text-accent hover:underline font-semibold">
                Start shopping
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
