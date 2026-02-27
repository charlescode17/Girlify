"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { X, LayoutDashboard } from "lucide-react"

const menuItems = [
  { label: "Home", href: "#" },
  { label: "Shop", href: "#shop" },
  { label: "Categories", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Login", href: "#login" },
]

interface SidebarMenuProps {
  open: boolean
  onClose: () => void
}

export default function SidebarMenu({ open, onClose }: SidebarMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [open, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-[2px] transition-opacity duration-400 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-[70] w-[320px] max-w-[85vw] bg-card shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-border">
            <span className="font-serif text-xl tracking-[0.04em] text-foreground">
              <span className="text-primary">G</span>irlify
            </span>
            <button
              onClick={onClose}
              className="p-1 transition-colors duration-200 hover:text-primary cursor-pointer"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-8 py-10">
            <ul className="flex flex-col gap-1">
              {menuItems.map((item, index) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-center py-3 text-foreground transition-all duration-300 hover:text-primary"
                    style={{
                      transitionDelay: open ? `${index * 60 + 100}ms` : "0ms",
                      opacity: open ? 1 : 0,
                      transform: open ? "translateX(0)" : "translateX(-12px)",
                    }}
                  >
                    <span className="text-lg font-light tracking-wide">{item.label}</span>
                    <span className="ml-auto h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-8" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer with Admin Link */}
          <div className="border-t border-border px-8 py-6">
            <Link
              href="/admin"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-primary transition-all duration-200 hover:bg-secondary/50"
            >
              <LayoutDashboard className="h-[18px] w-[18px]" strokeWidth={1.5} />
              <span>Admin Panel</span>
            </Link>
            <p className="mt-4 text-xs text-muted-foreground tracking-widest uppercase">
              Curated for You
            </p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Luxury fashion, redefined.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
