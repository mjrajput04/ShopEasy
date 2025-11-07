"use client"

import { useAuth } from "@/app/auth/context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"


interface Order {
  id: string
  date: string
  total: number
  status: "completed" | "pending" | "shipped"
  items: number
}

export default function CustomerDashboard() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (!mounted || isLoading || !user) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
          {/* Header Skeleton */}
          <div className="mb-12 flex items-center justify-between">
            <div>
              <Skeleton className="h-10 w-64 mb-2" />
              <Skeleton className="h-5 w-48" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>

          {/* Key Metrics Skeleton */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>

          {/* Quick Actions Skeleton */}
          <div className="mb-12">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-36" />
              <Skeleton className="h-36" />
            </div>
          </div>

          {/* Recent Orders Skeleton */}
          <div>
            <Skeleton className="h-8 w-48 mb-6" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </main>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Header */}
        <Card className="mb-12">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-4xl font-bold">Customer Portal</CardTitle>
              <CardDescription className="mt-2 flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user.email ? user.email.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
                Welcome back, {user.email}
              </CardDescription>
            </div>
            <Button
              onClick={() => {
                logout()
                router.push("/")
              }}
              variant="outline"
            >
              Logout
            </Button>
          </CardHeader>
        </Card>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Active Orders", value: "3", icon: "📦" },
            { label: "Total Spent", value: "$1,250", icon: "💳" },
            { label: "Loyalty Points", value: "1,250", icon: "⭐" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <span className="text-2xl">{stat.icon}</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/" passHref>
              <Card className="hover:shadow-lg transition cursor-pointer">
                <CardHeader>
                  <div className="text-2xl mb-3">🛍️</div>
                  <CardTitle className="text-lg font-semibold">Continue Shopping</CardTitle>
                  <CardDescription>Explore our full product catalog</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/customer/orders" passHref>
              <Card className="hover:shadow-lg transition cursor-pointer">
                <CardHeader>
                  <div className="text-2xl mb-3">📋</div>
                  <CardTitle className="text-lg font-semibold">View Order History</CardTitle>
                  <CardDescription>Check all your past and current orders</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>

        {/* Recent Orders Preview */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Orders</h2>
            <Link href="/customer/orders" className="text-accent hover:underline text-sm font-semibold">
              View All
            </Link>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Order ID</TableHead>
                  <TableHead className="text-left">Date</TableHead>
                  <TableHead className="text-left">Status</TableHead>
                  <TableHead className="text-left">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: "#ORD-001", date: "Nov 5, 2025", status: "completed", total: "$349.99" },
                  { id: "#ORD-002", date: "Oct 28, 2025", status: "shipped", total: "$299.50" },
                  { id: "#ORD-003", date: "Oct 15, 2025", status: "completed", total: "$600.00" },
                ].map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-semibold">{order.id}</TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-accent">{order.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>
      </div>
    </main>
  )
}
