"use client"

import { useAuth } from "@/app/auth/context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Footer } from "@/components/footer"

export default function AdminDashboard() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    setMounted(true)
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/admin/login")
    }
  }, [user, isLoading, router])

  if (!mounted || isLoading || !user || user.role !== "admin") {
    return null
  }

  const analyticsData = {
    totalUsers: 1247,
    totalOrders: 3892,
    totalRevenue: 487250,
    averageOrderValue: 125.2,
    userGrowth: 12.5,
    orderGrowth: 8.3,
    revenueGrowth: 15.2,
  }

  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "customer", joinDate: "2024-01-15", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "asm", joinDate: "2024-02-20", status: "active" },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "customer",
      joinDate: "2024-03-10",
      status: "active",
    },
  ]

  const salesByCategory = [
    { category: "Electronics", sales: 156400, orders: 1245, growth: 12.5 },
    { category: "Accessories", sales: 124300, orders: 892, growth: 8.2 },
    { category: "Home", sales: 98650, orders: 756, growth: 5.1 },
  ]

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">System Administration & Analytics</p>
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

        <div className="border-b border-border mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-2 font-semibold border-b-2 transition ${
                activeTab === "overview"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-2 font-semibold border-b-2 transition ${
                activeTab === "users"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`py-4 px-2 font-semibold border-b-2 transition ${
                activeTab === "analytics"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Admin Metrics */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground text-sm mb-2">Total Users</p>
                <p className="text-3xl font-bold text-foreground">{analyticsData.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600 font-semibold mt-2">+{analyticsData.userGrowth}% this month</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground text-sm mb-2">Total Orders</p>
                <p className="text-3xl font-bold text-foreground">{analyticsData.totalOrders.toLocaleString()}</p>
                <p className="text-sm text-green-600 font-semibold mt-2">+{analyticsData.orderGrowth}% this month</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground text-sm mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-foreground">${(analyticsData.totalRevenue / 1000).toFixed(1)}K</p>
                <p className="text-sm text-green-600 font-semibold mt-2">+{analyticsData.revenueGrowth}% this month</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground text-sm mb-2">Avg Order Value</p>
                <p className="text-3xl font-bold text-foreground">${analyticsData.averageOrderValue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground font-semibold mt-2">per transaction</p>
              </div>
            </div>

            {/* Admin Controls */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "User Management", desc: "Manage users and permissions" },
                  { title: "System Settings", desc: "Configure system-wide settings" },
                  { title: "Analytics & Reports", desc: "View comprehensive analytics" },
                  { title: "Security & Audit", desc: "Monitor security and audit logs" },
                ].map((control) => (
                  <div
                    key={control.title}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-2">{control.title}</h3>
                    <p className="text-muted-foreground">{control.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">User Management</h2>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold">
                Add User
              </button>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Join Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-secondary transition">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-secondary text-foreground rounded-full text-xs font-semibold capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.joinDate}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button className="text-accent hover:underline font-semibold">Edit</button>
                          <button className="text-red-600 hover:underline font-semibold">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Sales Analytics</h2>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-6">Sales by Category</h3>
              <div className="space-y-4">
                {salesByCategory.map((item, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{item.category}</p>
                        <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-accent">${(item.sales / 1000).toFixed(1)}K</p>
                        <p className="text-sm text-green-600 font-semibold">+{item.growth}%</p>
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-accent rounded-full h-2"
                        style={{ width: `${(item.sales / analyticsData.totalRevenue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Top Customers</h3>
                <div className="space-y-3">
                  {[
                    { name: "Sarah Johnson", orders: 24, spent: 3240 },
                    { name: "Michael Chen", orders: 18, spent: 2890 },
                    { name: "Emily Davis", orders: 15, spent: 2145 },
                  ].map((customer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between pb-3 border-b border-border last:border-0"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.orders} orders</p>
                      </div>
                      <p className="font-bold text-accent">${customer.spent.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  {[
                    { label: "Conversion Rate", value: "3.2%", change: "+0.5%" },
                    { label: "Cart Abandonment", value: "28.4%", change: "-2.1%" },
                    { label: "Customer Retention", value: "72.1%", change: "+4.3%" },
                  ].map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between pb-3 border-b border-border last:border-0"
                    >
                      <p className="text-foreground font-medium">{metric.label}</p>
                      <div className="text-right">
                        <p className="font-bold text-lg text-foreground">{metric.value}</p>
                        <p className="text-sm text-green-600 font-semibold">{metric.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
