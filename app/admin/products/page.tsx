"use client"

import { Search, Filter, Plus, Package, DollarSign, TrendingUp, AlertCircle } from "lucide-react"
import { useState } from "react"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const products = [
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: 99.99, stock: 45, status: "active" },
    { id: 2, name: "Smart Watch", category: "Electronics", price: 199.99, stock: 23, status: "active" },
    { id: 3, name: "Leather Wallet", category: "Accessories", price: 49.99, stock: 67, status: "active" },
    { id: 4, name: "Coffee Maker", category: "Home", price: 79.99, stock: 12, status: "active" },
    { id: 5, name: "Backpack", category: "Accessories", price: 59.99, stock: 0, status: "out_of_stock" },
  ]

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Products</h1>
          <p className="text-muted-foreground mt-2">Manage product catalog</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold flex items-center gap-2 hover:scale-105">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Product Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-secondary/50 transition-all">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm text-foreground font-semibold">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-secondary rounded-full text-xs font-semibold text-foreground">{product.category}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-bold text-foreground">${product.price}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {product.stock === 0 ? (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    ) : product.stock < 20 ? (
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    )}
                    <span className={`text-sm font-bold ${
                      product.stock === 0 ? "text-red-600" :
                      product.stock < 20 ? "text-yellow-600" : "text-green-600"
                    }`}>{product.stock}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize inline-flex items-center gap-1 ${
                      product.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      product.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}></div>
                    {product.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-accent hover:bg-accent hover:text-white rounded transition font-semibold text-sm">Edit</button>
                    <button className="px-3 py-1 text-red-600 hover:bg-red-600 hover:text-white rounded transition font-semibold text-sm">Delete</button>
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
