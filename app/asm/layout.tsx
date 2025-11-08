"use client"

import { useAuth } from "@/app/auth/context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ASMSidebar } from "@/components/asm-sidebar"

export default function ASMLayout({
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
      if (!user || user.role !== "asm") {
        router.push("/login")
      }
    }
  }, [user, isLoading, router, pathname, mounted])

  if (!mounted || isLoading || !user || user.role !== "asm") {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <ASMSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
