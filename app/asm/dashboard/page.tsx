"use client"

import { useAuth } from "@/app/auth/context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function ASMDashboard() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isLoading && (!user || user.role !== "asm")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (!mounted || isLoading || !user || user.role !== "asm") {
    return null
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground">ASM Dashboard</h1>
            <p className="text-muted-foreground mt-2">Account Service Manager Portal</p>
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
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Accounts Managed", value: "24", icon: "👥" },
            { label: "Pending Orders", value: "8", icon: "📋" },
            { label: "Total Revenue", value: "$45,200", icon: "💰" },
            { label: "Avg Satisfaction", value: "4.8★", icon: "⭐" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-6">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Management Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Management Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Product Management",
                desc: "Add, edit, and manage product listings",
                link: "/asm/products",
              },
              {
                title: "Stock Management",
                desc: "Monitor and update inventory levels",
                link: "/asm/inventory",
              },
              {
                title: "Order Management",
                desc: "Process and track customer orders",
                link: "/asm/orders",
              },
              {
                title: "Customer Accounts",
                desc: "Manage customer profiles and settings",
                link: "/asm/customers",
              },
            ].map((tool) => (
              <Link
                key={tool.title}
                href={tool.link}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{tool.title}</h3>
                <p className="text-muted-foreground">{tool.desc}</p>
                <div className="mt-4 text-accent font-semibold text-sm">View →</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="divide-y divide-border">
              {[
                { action: "Order #ORD-045 completed", time: "2 hours ago", type: "completed" },
                { action: "Inventory updated for Smart Watch Pro", time: "5 hours ago", type: "inventory" },
                { action: "New customer account created", time: "1 day ago", type: "customer" },
                { action: "Order #ORD-044 shipped", time: "2 days ago", type: "shipped" },
              ].map((activity, i) => (
                <div key={i} className="p-4 hover:bg-secondary transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                    <span className="px-3 py-1 bg-secondary text-foreground text-xs font-semibold rounded-full">
                      {activity.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>


    </main>
  )
}
