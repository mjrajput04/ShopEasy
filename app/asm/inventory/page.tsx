"use client"

import { useAuth } from "@/app/auth/context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Footer } from "@/components/footer"

interface InventoryItem {
  id: number
  name: string
  sku: string
  currentStock: number
  minThreshold: number
  maxCapacity: number
  lastUpdated: string
}

export default function InventoryPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      sku: "PWH-001",
      currentStock: 45,
      minThreshold: 20,
      maxCapacity: 100,
      lastUpdated: "2025-11-07",
    },
    {
      id: 2,
      name: "Luxury Leather Wallet",
      sku: "LLW-001",
      currentStock: 120,
      minThreshold: 50,
      maxCapacity: 200,
      lastUpdated: "2025-11-06",
    },
    {
      id: 3,
      name: "Smart Watch Pro",
      sku: "SWP-001",
      currentStock: 12,
      minThreshold: 25,
      maxCapacity: 80,
      lastUpdated: "2025-11-07",
    },
    {
      id: 4,
      name: "Designer Sunglasses",
      sku: "DS-001",
      currentStock: 0,
      minThreshold: 15,
      maxCapacity: 60,
      lastUpdated: "2025-11-05",
    },
    {
      id: 5,
      name: "Premium Coffee Maker",
      sku: "PCM-001",
      currentStock: 8,
      minThreshold: 10,
      maxCapacity: 50,
      lastUpdated: "2025-11-04",
    },
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

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getInventoryStatus = (current: number, min: number, max: number) => {
    if (current === 0) return "out-of-stock"
    if (current < min) return "low-stock"
    if (current > max * 0.9) return "overstocked"
    return "optimal"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "out-of-stock":
        return "bg-red-100 text-red-800"
      case "low-stock":
        return "bg-yellow-100 text-yellow-800"
      case "overstocked":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  const handleStockUpdate = (id: number, newStock: number) => {
    setInventory(
      inventory.map((item) =>
        item.id === id
          ? { ...item, currentStock: newStock, lastUpdated: new Date().toISOString().split("T")[0] }
          : item,
      ),
    )
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
            <h1 className="text-4xl font-bold text-foreground">Stock Management</h1>
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

        {/* Inventory Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Items", value: inventory.length },
            {
              label: "Low Stock",
              value: inventory.filter(
                (i) => getInventoryStatus(i.currentStock, i.minThreshold, i.maxCapacity) === "low-stock",
              ).length,
            },
            { label: "Out of Stock", value: inventory.filter((i) => i.currentStock === 0).length },
            { label: "Total Units", value: inventory.reduce((sum, i) => sum + i.currentStock, 0) },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Inventory Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-secondary">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Product</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">SKU</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Current</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Min/Max</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Status</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Last Updated</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => {
                  const status = getInventoryStatus(item.currentStock, item.minThreshold, item.maxCapacity)
                  return (
                    <tr key={item.id} className="border-b border-border hover:bg-secondary transition">
                      <td className="px-6 py-4 font-semibold text-foreground">{item.name}</td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">{item.sku}</td>
                      <td className="px-6 py-4 font-bold text-foreground">{item.currentStock}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {item.minThreshold} / {item.maxCapacity}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                          {status === "out-of-stock" && "Out of Stock"}
                          {status === "low-stock" && "Low Stock"}
                          {status === "overstocked" && "Overstocked"}
                          {status === "optimal" && "Optimal"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{item.lastUpdated}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleStockUpdate(item.id, item.currentStock + 10)}
                          className="px-3 py-1 bg-accent text-accent-foreground rounded text-sm font-semibold hover:opacity-90 transition"
                        >
                          +10
                        </button>
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
