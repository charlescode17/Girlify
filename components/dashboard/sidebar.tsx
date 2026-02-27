"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Grid3X3,
  Warehouse,
  Users,
  Megaphone,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LogOut,
} from "lucide-react"
import { clearAdminSession } from "@/components/admin/auth-gate"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Orders", icon: ShoppingBag },
  { label: "Products", icon: Package },
  { label: "Categories", icon: Grid3X3 },
  { label: "Inventory", icon: Warehouse },
  { label: "Customers", icon: Users },
  { label: "Marketing", icon: Megaphone },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const router = useRouter()

  const handleLogout = () => {
    clearAdminSession()
    router.refresh()
    window.location.reload()
  }

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold">
          <span className="text-sm font-bold text-[#121212] tracking-wide">G</span>
        </div>
        {!collapsed && (
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold tracking-widest text-foreground uppercase">
              Girlify
            </span>
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Admin Panel
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeItem === item.label
            const Icon = item.icon
            return (
              <button
                key={item.label}
                onClick={() => setActiveItem(item.label)}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                } ${collapsed ? "justify-center px-0" : ""}`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-gold" />
                )}
                <Icon
                  className={`h-[18px] w-[18px] shrink-0 transition-colors duration-200 ${
                    isActive ? "text-gold" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                  strokeWidth={1.5}
                />
                {!collapsed && <span>{item.label}</span>}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-sidebar-border p-3 flex flex-col gap-2">
        {/* View Store Link */}
        <Link
          href="/"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gold transition-all duration-200 hover:bg-secondary/50 ${
            collapsed ? "justify-center px-0" : ""
          }`}
        >
          <ExternalLink className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} />
          {!collapsed && <span>View Store</span>}
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive cursor-pointer ${
            collapsed ? "justify-center px-0" : ""
          }`}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} />
          {!collapsed && <span>Sign Out</span>}
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-lg py-2 text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground cursor-pointer"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          ) : (
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          )}
        </button>
      </div>
    </aside>
  )
}
