"use client"

import Link from "next/link"
import { useAuth } from "@/app/auth/context"
import { usePathname } from "next/navigation"

export function PanelSidebar() {
  const { user } = useAuth()
  const pathname = usePathname()

  const getMenuItems = () => {
    switch (user?.role) {
      case "admin":
        return [
          { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
          { label: "Users", href: "/admin/dashboard", icon: "👥" },
          { label: "Analytics", href: "/admin/dashboard", icon: "📈" },
          { label: "Settings", href: "/admin/dashboard", icon: "⚙️" },
        ]
      case "asm":
        return [
          { label: "Dashboard", href: "/asm/dashboard", icon: "📊" },
          { label: "Products", href: "/asm/products", icon: "📦" },
          { label: "Inventory", href: "/asm/inventory", icon: "📋" },
          { label: "Orders", href: "/asm/orders", icon: "🛒" },
          { label: "Customers", href: "/asm/customers", icon: "👥" },
        ]
      case "customer":
        return [
          { label: "Dashboard", href: "/customer/dashboard", icon: "📊" },
          { label: "Orders", href: "/customer/orders", icon: "📋" },
          { label: "Profile", href: "/customer/profile", icon: "👤" },
          { label: "Back to Store", href: "/", icon: "🛍️" },
        ]
      default:
        return []
    }
  }

  const menuItems = getMenuItems()

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">ShopEase</h2>
        <p className="text-sm text-muted-foreground mt-1 capitalize">{user?.role} Portal</p>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href.split("?")[0])
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive ? "bg-accent text-accent-foreground font-semibold" : "text-foreground hover:bg-secondary"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
        <div className="text-sm">
          <p className="text-muted-foreground">Logged in as</p>
          <p className="font-semibold text-foreground truncate">{user?.email}</p>
        </div>
      </div>
    </aside>
  )
}
