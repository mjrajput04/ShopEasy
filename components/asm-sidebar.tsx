"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/app/auth/context"
import { 
  LayoutDashboard, 
  Package, 
  Warehouse, 
  ShoppingCart, 
  Users, 
  LogOut
} from "lucide-react"

export function ASMSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const menuItems = [
    { 
      label: "Dashboard", 
      href: "/asm/dashboard", 
      icon: LayoutDashboard 
    },
    { 
      label: "Products", 
      href: "/asm/products", 
      icon: Package 
    },
    { 
      label: "Inventory", 
      href: "/asm/inventory", 
      icon: Warehouse 
    },
    { 
      label: "Orders", 
      href: "/asm/orders", 
      icon: ShoppingCart 
    },
    { 
      label: "Customers", 
      href: "/asm/customers", 
      icon: Users 
    },
  ]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-border">
        <Link href="/asm/dashboard">
          <h2 className="text-xl font-bold text-foreground">ShopEase</h2>
          <p className="text-sm text-muted-foreground mt-1">ASM Panel</p>
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
