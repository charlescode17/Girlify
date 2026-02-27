"use client"

import { Search, Bell, ChevronDown } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function TopBar() {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-8">
      {/* Left: Page title */}
      <div>
        <h1 className="text-lg font-semibold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-xs text-muted-foreground">Welcome back, Alexandra</p>
      </div>

      {/* Right: Search, Notifications, Profile */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div
          className={`hidden md:flex items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-200 ${
            searchFocused
              ? "border-gold/50 bg-secondary w-72"
              : "border-border bg-secondary/50 w-56"
          }`}
        >
          <Search className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        {/* Notifications */}
        <button className="relative flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground cursor-pointer">
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.5} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold" />
        </button>

        {/* Profile */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg py-1.5 pl-1.5 pr-3 transition-colors duration-200 hover:bg-secondary"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold">
            <span className="text-xs font-semibold text-[#121212]">AK</span>
          </div>
          <div className="hidden text-left md:block">
            <p className="text-sm font-medium text-foreground leading-tight">Alexandra K.</p>
            <p className="text-[11px] text-muted-foreground">Brand Director</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
        </Link>
      </div>
    </header>
  )
}
