"use client"

import { Search, Filter, UserPlus, Mail, Calendar, TrendingUp } from "lucide-react"
import { useState } from "react"

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", orders: 12, spent: 1450, joinDate: "2024-01-15", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 8, spent: 980, joinDate: "2024-02-20", status: "active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", orders: 15, spent: 2100, joinDate: "2024-03-10", status: "active" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", orders: 5, spent: 650, joinDate: "2024-04-05", status: "inactive" },
  ]

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Customers</h1>
          <p className="text-muted-foreground mt-2">Manage customer accounts</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold flex items-center gap-2 hover:scale-105">
          <UserPlus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search customers..."
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Orders</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Total Spent</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Join Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-secondary/50 transition-all">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      {customer.name.charAt(0)}
                    </div>
                    <span className="text-sm text-foreground font-semibold">{customer.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {customer.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-foreground">{customer.orders}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-accent">${customer.spent}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {customer.joinDate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                      customer.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      customer.status === "active" ? "bg-green-500" : "bg-gray-500"
                    }`}></div>
                    {customer.status}
                  </span>
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
