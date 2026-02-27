"use client"

import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { products } from "@/lib/products"
import { useCart } from "@/components/store/cart-context"

export default function ProductGrid() {
  const { addToCart } = useCart()

  return (
    <section id="shop" className="px-6 py-20 md:px-10 lg:px-16">
      {/* Section Header */}
      <div className="mb-14 text-center">
        <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Curated Selection
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground tracking-tight text-balance">
          Our Collection
        </h2>
        <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Each piece is chosen to embody timeless elegance and contemporary refinement.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {products.map((product) => (
          <article
            key={product.id}
            className="group cursor-pointer"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Quick add overlay */}
              <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(product)
                  }}
                  className="flex items-center gap-2 rounded-lg bg-card/95 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-foreground shadow-lg transition-all duration-300 hover:bg-primary hover:text-primary-foreground cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                  Add to Bag
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="mt-4 flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-foreground leading-snug">
                  {product.name}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {product.category}
                </p>
              </div>
              <span className="text-sm font-medium text-foreground">
                ${product.price}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
