import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "../../globals.css"
import { AuthProvider } from "../../auth/context"

export const metadata: Metadata = {
  title: "Customer Dashboard - ShopEase",
  description: "Customer portal for ShopEase",
}

export default function CustomerDashboardLayout({
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