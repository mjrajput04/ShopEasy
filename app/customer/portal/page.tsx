"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Footer } from "@/components/footer"

interface User {
  email: string
  userType: string
}

interface Order {
  id: number
  productName: string
  price: number
  quantity: number
  date: string
  status: "Delivered" | "Processing" | "Shipped"
}

const dummyOrders: Order[] = [
  {
    id: 1,
    productName: "Premium Wireless Headphones",
    price: 199,
    quantity: 1,
    date: "2025-11-01",
    status: "Delivered",
  },
  { id: 2, productName: "Designer Sunglasses", price: 159, quantity: 2, date: "2025-11-03", status: "Shipped" },
  { id: 3, productName: "Leather Backpack", price: 149, quantity: 1, date: "2025-11-05", status: "Processing" },
]

export default function CustomerPortalPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [accountInfo, setAccountInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "",
    phone: "+1 (555) 123-4567",
  })

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (!storedUser) {
      router.push("/login")
      return
    }
    const parsedUser = JSON.parse(storedUser)
    if (parsedUser.userType !== "customer") {
      router.push("/login")
      return
    }
    setUser(parsedUser)
    setAccountInfo((prev) => ({ ...prev, email: parsedUser.email }))
  }, [router])

  if (!user) return null

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">Customer Portal</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
              <h3 className="font-bold text-foreground mb-6">Navigation</h3>
              <nav className="space-y-3">
                <button className="w-full text-left px-4 py-2 bg-accent text-accent-foreground rounded font-semibold">
                  Orders
                </button>
                <button className="w-full text-left px-4 py-2 text-muted-foreground hover:bg-secondary rounded transition">
                  Account Settings
                </button>
                <Link href="/" className="block px-4 py-2 text-muted-foreground hover:bg-secondary rounded transition">
                  Continue Shopping
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Order History */}
            <section className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Order History</h2>

              {dummyOrders.length > 0 ? (
                <div className="space-y-4">
                  {dummyOrders.map((order) => (
                    <div key={order.id} className="border border-border rounded-lg p-4 hover:bg-secondary transition">
                      <div className="grid md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Product</p>
                          <p className="font-semibold text-foreground">{order.productName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Qty & Price</p>
                          <p className="font-semibold text-foreground">
                            {order.quantity} x ${order.price}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-semibold text-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Status</p>
                          <span
                            className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No orders yet.</p>
              )}
            </section>

            {/* Account Information */}
            <section className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">First Name</label>
                  <input
                    type="text"
                    value={accountInfo.firstName}
                    readOnly
                    className="w-full px-4 py-2 border border-border rounded-lg bg-secondary text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Last Name</label>
                  <input
                    type="text"
                    value={accountInfo.lastName}
                    readOnly
                    className="w-full px-4 py-2 border border-border rounded-lg bg-secondary text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Email</label>
                  <input
                    type="email"
                    value={accountInfo.email}
                    readOnly
                    className="w-full px-4 py-2 border border-border rounded-lg bg-secondary text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Phone</label>
                  <input
                    type="tel"
                    value={accountInfo.phone}
                    readOnly
                    className="w-full px-4 py-2 border border-border rounded-lg bg-secondary text-foreground"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
