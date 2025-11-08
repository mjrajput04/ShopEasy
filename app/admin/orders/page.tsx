"use client"

import { Search, Filter, Download, Plus, Package, Calendar, DollarSign } from "lucide-react"
import { useState } from "react"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const orders = [
    { id: "ORD-001", customer: "John Doe", items: 3, total: 299.99, status: "delivered", date: "2024-01-15" },
    { id: "ORD-002", customer: "Jane Smith", items: 2, total: 149.50, status: "processing", date: "2024-01-16" },
    { id: "ORD-003", customer: "Bob Johnson", items: 5, total: 499.99, status: "shipped", date: "2024-01-17" },
    { id: "ORD-004", customer: "Sarah Wilson", items: 1, total: 79.99, status: "pending", date: "2024-01-18" },
    { id: "ORD-005", customer: "Mike Brown", items: 4, total: 359.99, status: "delivered", date: "2024-01-19" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Orders</h1>
          <p className="text-muted-foreground mt-2">Manage all customer orders</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-secondary text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition font-semibold flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold flex items-center gap-2 hover:scale-105">
            <Plus className="w-5 h-5" />
            Create Order
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <button className="px-6 py-3 bg-secondary text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        <table className="w-full">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Items</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Total</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-secondary/50 transition-all">
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-foreground bg-secondary px-3 py-1 rounded">{order.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                      {order.customer.charAt(0)}
                    </div>
                    <span className="text-sm text-foreground font-medium">{order.customer}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold text-foreground">{order.items}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-bold text-foreground">${order.total}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize inline-flex items-center gap-1 ${getStatusColor(order.status)}`}>
                    <div className={`w-2 h-2 rounded-full ${
                      order.status === "delivered" ? "bg-green-500" :
                      order.status === "shipped" ? "bg-blue-500" :
                      order.status === "processing" ? "bg-yellow-500" : "bg-gray-500"
                    }`}></div>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {order.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-accent hover:bg-accent hover:text-white rounded transition font-semibold text-sm">View</button>
                    <button className="px-3 py-1 text-accent hover:bg-accent hover:text-white rounded transition font-semibold text-sm">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
