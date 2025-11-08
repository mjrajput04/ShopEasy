"use client"

import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "../../globals.css"
import { AuthProvider } from "../../auth/context"
import { Sidebar, SidebarProvider, SidebarBody, SidebarLink, SidebarNav, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function ASMDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isIsMobile } = useIsMobile()
  return (
    <AuthProvider>
      <SidebarProvider defaultOpen={!isIsMobile}>
        <div className="flex">
          <Sidebar className="bg-black text-white" style={{ backgroundColor: 'black', color: 'white' }} collapsible={isIsMobile}>
            <SidebarHeader>
              <Link href="/asm/dashboard" className="flex h-14 items-center justify-center">
                <p className="text-lg font-semibold text-black">ASM Dashboard</p>
              </Link>
            </SidebarHeader>
            <SidebarBody className="flex flex-col gap-y-2">
              <SidebarLink href="/asm/products">
                Product Management
              </SidebarLink>
              <SidebarLink href="/asm/inventory">
                Stock Management
              </SidebarLink>
              <SidebarLink href="/asm/orders">
                Order Management
              </SidebarLink>
              <SidebarLink href="/asm/customers">
                Customer Accounts
              </SidebarLink>
            </SidebarBody>
          </Sidebar>
          <main className="flex-1">
            {isIsMobile && (
              <div className="p-2">
                <SidebarTrigger />
              </div>
            )}
            {children}
          </main>
        </div>
      </SidebarProvider>
      <Analytics />
    </AuthProvider>
  )
}