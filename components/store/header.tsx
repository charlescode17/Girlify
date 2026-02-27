"use client"

import { useState, useEffect } from "react"
import { Search, ShoppingBag } from "lucide-react"
import { useCart } from "@/components/store/cart-context"
import SidebarMenu from "@/components/store/sidebar-menu"
import SearchOverlay from "@/components/store/search-overlay"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { totalItems, setIsCartOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-[0_1px_0_0_var(--border)]"
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-5 md:px-10 lg:px-16">
          {/* Left — Menu Icon (2-line) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="group flex flex-col gap-[5px] p-2 -ml-2 cursor-pointer"
            aria-label="Open menu"
          >
            <span className="block h-[1.5px] w-5 bg-foreground transition-all duration-300 group-hover:w-6" />
            <span className="block h-[1.5px] w-4 bg-foreground transition-all duration-300 group-hover:w-6" />
          </button>

          {/* Center — Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-serif text-2xl md:text-[28px] tracking-[0.04em] text-foreground">
              <span className="text-primary">G</span>irlify
            </h1>
          </div>

          {/* Right — Icons */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1 transition-colors duration-200 hover:text-primary cursor-pointer"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 transition-colors duration-200 hover:text-primary cursor-pointer"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <SidebarMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
