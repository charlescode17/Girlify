"use client"

import { useState } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import TopBar from "@/components/dashboard/top-bar"
import AuthGate from "@/components/admin/auth-gate"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <AuthGate>
      <div className="dark">
        <div className="flex min-h-screen bg-background text-foreground">
          <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
          <div
            className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${
              collapsed ? "ml-[72px]" : "ml-[260px]"
            }`}
          >
            <TopBar />
            <main className="flex-1 p-8">{children}</main>
          </div>
        </div>
      </div>
    </AuthGate>
  )
}
