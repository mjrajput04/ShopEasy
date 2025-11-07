"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"

interface User {
  email: string
  userType: string
}

interface Product {
  id: number
  name: string
  price: number
  stock: number
}

interface Order {
  id: number
  customerName: string
  productName: string
  quantity: number
  total: number
  date: string
}

const dummyProducts: Product[] = [
  { id: 1, name: "Premium Wireless Headphones", price: 199, stock: 45 },
  { id: 2, name: "Luxury Leather Wallet", price: 89, stock: 120 },
  { id: 3, name: "Smart Watch Pro", price: 299, stock: 32 },
  { id: 4, name: "Designer Sunglasses", price: 159, stock: 67 },
]

const dummyOrders: Order[] = [
  {
    id: 1,
    customerName: "Alice Johnson",
    productName: "Wireless Headphones",
    quantity: 2,
    total: 398,
    date: "2025-11-05",
  },
  { id: 2, customerName: "Bob Smith", productName: "Leather Wallet", quantity: 3, total: 267, date: "2025-11-04" },
  { id: 3, customerName: "Carol Davis", productName: "Smart Watch", quantity: 1, total: 299, date: "2025-11-03" },
]

export default function ASMPortalPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders">("overview")
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, stock: 0 })

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (!storedUser) {
      router.push("/login")
      return
    }
    const parsedUser = JSON.parse(storedUser)
    if (parsedUser.userType !== "asm") {
      router.push("/login")
      return
    }
    setUser(parsedUser)
  }, [router])

  if (!user) return null

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Product "${newProduct.name}" added successfully!`)
    setNewProduct({ name: "", price: 0, stock: 0 })
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">ASM Portal</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {["overview", "products", "orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                activeTab === tab
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground text-sm mb-2">Total Products</p>
              <p className="text-4xl font-bold text-accent">{dummyProducts.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground text-sm mb-2">Total Orders</p>
              <p className="text-4xl font-bold text-accent">{dummyOrders.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground text-sm mb-2">Total Revenue</p>
              <p className="text-4xl font-bold text-accent">${dummyOrders.reduce((sum, o) => sum + o.total, 0)}</p>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Add Product Form */}
            <section className="bg-card border border-border rounded-lg p-6 h-fit">
              <h2 className="text-2xl font-bold text-foreground mb-6">Add New Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Price</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Add Product
                </button>
              </form>
            </section>

            {/* Products List */}
            <section className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Current Products</h2>
              <div className="space-y-3">
                {dummyProducts.map((product) => (
                  <div key={product.id} className="border border-border rounded-lg p-4 hover:bg-secondary transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      <span className="text-accent font-bold">${product.price}</span>
                    </div>
                    <p className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                      Stock: {product.stock}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Order History</h2>
            <div className="space-y-3">
              {dummyOrders.map((order) => (
                <div key={order.id} className="border border-border rounded-lg p-4 hover:bg-secondary transition">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-semibold text-foreground">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Product & Qty</p>
                      <p className="font-semibold text-foreground">
                        {order.productName} (x{order.quantity})
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-semibold text-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-lg font-bold text-accent">${order.total}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  )
}
