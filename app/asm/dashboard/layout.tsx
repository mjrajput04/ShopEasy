import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "../../globals.css"
import { AuthProvider } from "../../auth/context"

export const metadata: Metadata = {
  title: "ASM Dashboard - ShopEase",
  description: "Account Service Manager portal for ShopEase",
}

export default function ASMDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      {children}
      <Analytics />
    </AuthProvider>
  )
}