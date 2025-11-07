"use client"

import { useAuth } from "@/app/auth/context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Footer } from "@/components/footer"

interface Product {
  id: number
  name: string
  price: number
  category: string
  sku: string
  stock: number
}

export default function ProductManagementPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<number | null>(null)
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Premium Wireless Headphones", price: 199, category: "Electronics", sku: "PWH-001", stock: 45 },
    { id: 2, name: "Luxury Leather Wallet", price: 89, category: "Accessories", sku: "LLW-001", stock: 120 },
    { id: 3, name: "Smart Watch Pro", price: 299, category: "Electronics", sku: "SWP-001", stock: 32 },
    { id: 4, name: "Designer Sunglasses", price: 159, category: "Accessories", sku: "DS-001", stock: 0 },
    { id: 5, name: "Premium Coffee Maker", price: 249, category: "Home", sku: "PCM-001", stock: 18 },
  ])

  useEffect(() => {
    setMounted(true)
    if (!isLoading && (!user || user.role !== "asm")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (!mounted || isLoading || !user || user.role !== "asm") {
    return null
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStockStatus = (stock: number) => {
    if (stock === 0) return "out-of-stock"
    if (stock < 20) return "low-stock"
    return "in-stock"
  }

  const getStockColor = (status: string) => {
    switch (status) {
      case "out-of-stock":
        return "bg-red-100 text-red-800"
      case "low-stock":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/asm/dashboard" className="text-accent hover:underline mb-4 inline-block text-sm">
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-foreground">Product Management</h1>
          </div>
          <div className="flex gap-3">
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
        </div>

        {/* Search and Add Button */}
        <div className="mb-8 flex gap-4">
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition whitespace-nowrap"
          >
            {showAddForm ? "Cancel" : "+ Add Product"}
          </button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Add New Product</h2>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                />
                <input
                  type="text"
                  placeholder="SKU"
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price"
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                />
                <select className="px-4 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>Select Category</option>
                  <option>Electronics</option>
                  <option>Accessories</option>
                  <option>Home</option>
                </select>
              </div>
              <input
                type="number"
                placeholder="Stock Quantity"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition"
              >
                Add Product
              </button>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-secondary">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Product Name</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">SKU</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Category</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Price</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Stock</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Status</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock)
                  return (
                    <tr key={product.id} className="border-b border-border hover:bg-secondary transition">
                      <td className="px-6 py-4 font-semibold text-foreground">{product.name}</td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">{product.sku}</td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">{product.category}</td>
                      <td className="px-6 py-4 font-semibold text-accent">${product.price}</td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-foreground">{product.stock}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStockColor(stockStatus)}`}>
                          {stockStatus === "out-of-stock"
                            ? "Out of Stock"
                            : stockStatus === "low-stock"
                              ? "Low Stock"
                              : "In Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => setEditingProduct(editingProduct === product.id ? null : product.id)}
                          className="text-accent hover:underline font-semibold mr-3"
                        >
                          Edit
                        </button>
                        <button className="text-red-600 hover:underline font-semibold">Delete</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
