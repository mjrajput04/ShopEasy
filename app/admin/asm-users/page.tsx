"use client"

import { Search, Filter, UserPlus, Mail, MapPin, Users, Calendar } from "lucide-react"
import { useState } from "react"

export default function ASMUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const asmUsers = [
    { id: 1, name: "Mike Anderson", email: "mike@shopease.com", territory: "North Region", customers: 45, joinDate: "2023-06-15", status: "active" },
    { id: 2, name: "Lisa Chen", email: "lisa@shopease.com", territory: "South Region", customers: 38, joinDate: "2023-08-20", status: "active" },
    { id: 3, name: "David Brown", email: "david@shopease.com", territory: "East Region", customers: 52, joinDate: "2023-09-10", status: "active" },
    { id: 4, name: "Emma Wilson", email: "emma@shopease.com", territory: "West Region", customers: 41, joinDate: "2023-10-05", status: "inactive" },
  ]

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ASM Users</h1>
          <p className="text-muted-foreground mt-2">Manage Area Sales Managers</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold flex items-center gap-2 hover:scale-105">
          <UserPlus className="w-5 h-5" />
          Add ASM User
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search ASM users..."
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Territory</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Customers</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Join Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {asmUsers.map((user) => (
              <tr key={user.id} className="hover:bg-secondary/50 transition-all">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-foreground font-semibold">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold text-foreground">{user.territory}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-sm font-bold text-foreground">{user.customers}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {user.joinDate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                      user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      user.status === "active" ? "bg-green-500" : "bg-gray-500"
                    }`}></div>
                    {user.status}
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
