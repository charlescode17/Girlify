"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCart } from "@/components/store/cart-context"

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
    isCartOpen,
    setIsCartOpen,
  } = useCart()

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isCartOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false)
    }
    if (isCartOpen) window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isCartOpen, setIsCartOpen])

  const handleWhatsApp = () => {
    const itemLines = items
      .map((item) => `- ${item.name} (x${item.quantity}) — $${item.price * item.quantity}`)
      .join("\n")
    const message = encodeURIComponent(
      `Hello Girlify, I would like to order:\n\n${itemLines}\n\nTotal: $${subtotal.toFixed(2)}`
    )
    window.open(`https://wa.me/?text=${message}`, "_blank")
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-[2px] transition-opacity duration-400 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-[70] w-[400px] max-w-[90vw] bg-card shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping bag"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-foreground" strokeWidth={1.5} />
              <span className="text-sm font-medium text-foreground tracking-wide">
                Shopping Bag ({totalItems})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 transition-colors hover:text-primary cursor-pointer"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Content */}
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-1 flex-col items-center justify-center px-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" strokeWidth={1} />
              </div>
              <p className="text-base font-medium text-foreground">Your cart is empty</p>
              <p className="mt-1 text-sm text-muted-foreground text-center">
                Browse our collection and add your favorites.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 rounded-lg bg-foreground px-8 py-3 text-sm font-medium tracking-widest uppercase text-card transition-colors duration-300 hover:bg-foreground/90 cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <ul className="flex flex-col gap-5">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      {/* Image */}
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div>
                          <h4 className="text-sm font-medium text-foreground truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            ${item.price}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          {/* Quantity */}
                          <div className="flex items-center gap-3 rounded-lg border border-border px-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 transition-colors hover:text-primary cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" strokeWidth={1.5} />
                            </button>
                            <span className="text-xs font-medium text-foreground min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 transition-colors hover:text-primary cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" strokeWidth={1.5} />
                            </button>
                          </div>
                          {/* Remove */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-destructive cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer / Checkout */}
              <div className="border-t border-border px-6 py-5">
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-base font-medium text-foreground">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button className="w-full rounded-lg bg-foreground py-3.5 text-sm font-medium tracking-widest uppercase text-card transition-colors duration-300 hover:bg-foreground/90 cursor-pointer">
                  Checkout on Website
                </button>

                {/* WhatsApp Button */}
                <button
                  onClick={handleWhatsApp}
                  className="mt-3 w-full rounded-lg border border-[#25D366] bg-[#25D366]/5 py-3.5 text-sm font-medium tracking-widest uppercase text-[#25D366] transition-colors duration-300 hover:bg-[#25D366] hover:text-card cursor-pointer"
                >
                  Order via WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  )
}
