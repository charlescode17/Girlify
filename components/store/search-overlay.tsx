"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { X, Loader2 } from "lucide-react"
import Image from "next/image"
import { products } from "@/lib/products"
import { useCart } from "@/components/store/cart-context"

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { addToCart } = useCart()

  // Simulate search loading
  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 400)
      return () => clearTimeout(timer)
    }
    setIsLoading(false)
  }, [query])

  // Focus on open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      setTimeout(() => inputRef.current?.focus(), 300)
    } else {
      document.body.style.overflow = ""
      setQuery("")
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

  const results = useMemo(() => {
    if (!query.trim()) return []
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-start justify-center transition-all duration-400 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Search Modal */}
      <div
        className={`relative mt-[10vh] w-full max-w-[600px] mx-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-6 opacity-0"
        }`}
      >
        <div className="rounded-xl bg-card shadow-2xl border border-border overflow-hidden">
          {/* Input */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full bg-transparent text-lg font-light text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            {isLoading && (
              <Loader2 className="h-5 w-5 text-primary animate-spin" strokeWidth={1.5} />
            )}
            <button
              onClick={onClose}
              className="p-1 transition-colors hover:text-primary cursor-pointer"
              aria-label="Close search"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Results */}
          {query.trim() && !isLoading && (
            <div className="max-h-[50vh] overflow-y-auto">
              {results.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-muted-foreground text-sm">No products found.</p>
                  <p className="text-muted-foreground/60 text-xs mt-1">
                    Try a different search term.
                  </p>
                </div>
              ) : (
                <ul>
                  {results.map((product) => (
                    <li key={product.id}>
                      <button
                        onClick={() => {
                          addToCart(product)
                          onClose()
                        }}
                        className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors duration-200 hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {product.category}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          ${product.price}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Empty state hint */}
          {!query.trim() && (
            <div className="px-6 py-8 text-center">
              <p className="text-muted-foreground text-sm">
                Start typing to discover our collection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
