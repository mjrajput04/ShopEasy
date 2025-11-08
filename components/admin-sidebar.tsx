"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/app/auth/context"
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  UserCog, 
  ShoppingCart, 
  Package, 
  Settings, 
  LogOut,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import { useState } from "react"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => 
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    )
  }

  const menuItems = [
    { 
      label: "Dashboard", 
      href: "/admin/dashboard", 
      icon: LayoutDashboard 
    },
    { 
      label: "Analytics", 
      href: "/admin/analytics", 
      icon: BarChart3 
    },
    { 
      label: "Customers", 
      href: "/admin/customers", 
      icon: Users 
    },
    { 
      label: "ASM Users", 
      href: "/admin/asm-users", 
      icon: UserCog 
    },
    { 
      label: "Orders", 
      href: "/admin/orders", 
      icon: ShoppingCart 
    },
    { 
      label: "Products", 
      href: "/admin/products", 
      icon: Package 
    },
    { 
      label: "Settings", 
      href: "/admin/settings", 
      icon: Settings 
    },
  ]

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-border">
        <Link href="/admin/dashboard">
          <h2 className="text-xl font-bold text-foreground">ShopEase</h2>
          <p className="text-sm text-muted-foreground mt-1">Admin Panel</p>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive 
                    ? "bg-primary text-primary-foreground font-semibold" 
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition text-foreground hover:bg-secondary w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
