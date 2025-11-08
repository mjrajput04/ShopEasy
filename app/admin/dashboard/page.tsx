"use client"

import { useAuth } from "@/app/auth/context"
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Package, ArrowUpRight, Clock } from "lucide-react"

export default function AdminDashboard() {
  const { user } = useAuth()

  const analyticsData = {
    totalUsers: 1247,
    totalOrders: 3892,
    totalRevenue: 487250,
    averageOrderValue: 125.2,
    userGrowth: 12.5,
    orderGrowth: 8.3,
    revenueGrowth: 15.2,
  }

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back, {user?.email}</p>
      </div>

      <div className="space-y-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 opacity-80" />
              <div className="bg-white/20 rounded-lg px-3 py-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">{analyticsData.userGrowth}%</span>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-1">Total Users</p>
            <p className="text-4xl font-bold">{analyticsData.totalUsers.toLocaleString()}</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <ShoppingCart className="w-8 h-8 opacity-80" />
              <div className="bg-white/20 rounded-lg px-3 py-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">{analyticsData.orderGrowth}%</span>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-1">Total Orders</p>
            <p className="text-4xl font-bold">{analyticsData.totalOrders.toLocaleString()}</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 opacity-80" />
              <div className="bg-white/20 rounded-lg px-3 py-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">{analyticsData.revenueGrowth}%</span>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-1">Total Revenue</p>
            <p className="text-4xl font-bold">${(analyticsData.totalRevenue / 1000).toFixed(1)}K</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 opacity-80" />
              <div className="bg-white/20 rounded-lg px-3 py-1">
                <span className="text-sm font-semibold">AVG</span>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-1">Avg Order Value</p>
            <p className="text-4xl font-bold">${analyticsData.averageOrderValue.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                { action: "New order placed", user: "John Doe", time: "5 min ago", color: "bg-green-500" },
                { action: "New customer registered", user: "Jane Smith", time: "15 min ago", color: "bg-blue-500" },
                { action: "Product updated", user: "Admin", time: "1 hour ago", color: "bg-purple-500" },
                { action: "Order shipped", user: "Bob Wilson", time: "2 hours ago", color: "bg-orange-500" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 hover:bg-secondary/50 p-2 rounded-lg transition-colors">
                  <div className={`w-2 h-2 rounded-full ${activity.color} mt-2`}></div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Quick Stats
            </h2>
            <div className="space-y-4">
              {[
                { label: "Pending Orders", value: "23", change: "+5", trend: "up" },
                { label: "Low Stock Items", value: "8", change: "-2", trend: "down" },
                { label: "Active Customers", value: "892", change: "+45", trend: "up" },
                { label: "Support Tickets", value: "12", change: "-3", trend: "down" },
              ].map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
                  <p className="text-foreground font-medium">{stat.label}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <div className={`flex items-center gap-1 text-sm font-semibold ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {stat.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
