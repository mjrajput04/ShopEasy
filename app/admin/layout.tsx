"use client"

import { useAuth } from "@/app/auth/context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading) {
      // Allow access to login page without authentication
      if (pathname === "/admin/login") {
        return
      }
      
      // Redirect to login if not authenticated or not admin
      if (!user || user.role !== "admin") {
        router.push("/admin/login")
      }
    }
  }, [user, isLoading, router, pathname, mounted])

  // Show login page without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Show loading or redirect
  if (!mounted || isLoading || !user || user.role !== "admin") {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
