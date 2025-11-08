"use client"

import { BarChart3, TrendingUp, Users, DollarSign, ShoppingBag, ArrowUpRight } from "lucide-react"

export default function AnalyticsPage() {
  const salesByCategory = [
    { category: "Electronics", sales: 156400, orders: 1245, growth: 12.5 },
    { category: "Accessories", sales: 124300, orders: 892, growth: 8.2 },
    { category: "Home", sales: 98650, orders: 756, growth: 5.1 },
  ]

  const totalRevenue = 487250

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Analytics</h1>
        <p className="text-muted-foreground mt-2">Sales and performance analytics</p>
      </div>

      <div className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-accent" />
            Sales by Category
          </h3>
          <div className="space-y-6">
            {salesByCategory.map((item, index) => (
              <div key={index} className="border-b border-border pb-6 last:border-0 hover:bg-secondary/30 p-4 rounded-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-lg text-foreground">{item.category}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <ShoppingBag className="w-4 h-4" />
                      {item.orders} orders
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-2xl text-accent">${(item.sales / 1000).toFixed(1)}K</p>
                    <p className="text-sm text-green-600 font-semibold flex items-center gap-1 justify-end">
                      <TrendingUp className="w-4 h-4" />
                      +{item.growth}%
                    </p>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-accent to-primary rounded-full h-3 transition-all duration-500 hover:opacity-80"
                    style={{ width: `${(item.sales / totalRevenue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-accent" />
              Top Customers
            </h3>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", orders: 24, spent: 3240, rank: 1 },
                { name: "Michael Chen", orders: 18, spent: 2890, rank: 2 },
                { name: "Emily Davis", orders: 15, spent: 2145, rank: 3 },
              ].map((customer, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 pb-4 border-b border-border last:border-0 hover:bg-secondary/50 p-3 rounded-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                    {customer.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.orders} orders</p>
                  </div>
                  <p className="font-bold text-xl text-accent">${customer.spent.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-accent" />
              Performance Metrics
            </h3>
            <div className="space-y-4">
              {[
                { label: "Conversion Rate", value: "3.2%", change: "+0.5%", positive: true },
                { label: "Cart Abandonment", value: "28.4%", change: "-2.1%", positive: true },
                { label: "Customer Retention", value: "72.1%", change: "+4.3%", positive: true },
              ].map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between pb-4 border-b border-border last:border-0 hover:bg-secondary/50 p-3 rounded-lg transition-all"
                >
                  <p className="text-foreground font-semibold">{metric.label}</p>
                  <div className="text-right">
                    <p className="font-bold text-2xl text-foreground">{metric.value}</p>
                    <p className={`text-sm font-semibold flex items-center gap-1 justify-end ${
                      metric.positive ? "text-green-600" : "text-red-600"
                    }`}>
                      <ArrowUpRight className="w-4 h-4" />
                      {metric.change}
                    </p>
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
