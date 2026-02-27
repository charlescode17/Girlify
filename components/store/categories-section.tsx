"use client"

import Image from "next/image"

const categories = [
  { name: "Knitwear", image: "/images/product-1.jpg", count: 24 },
  { name: "Bags", image: "/images/product-2.jpg", count: 18 },
  { name: "Jewelry", image: "/images/product-3.jpg", count: 32 },
  { name: "Shoes", image: "/images/product-4.jpg", count: 15 },
]

export default function CategoriesSection() {
  return (
    <section id="categories" className="bg-blush px-6 py-20 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Browse By
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground tracking-tight text-balance">
            Categories
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#shop"
              className="group relative aspect-[3/4] overflow-hidden rounded-lg"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-foreground/20 transition-colors duration-300 group-hover:bg-foreground/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
                <h3 className="text-base font-medium text-card tracking-wide">
                  {cat.name}
                </h3>
                <p className="text-xs text-card/70 mt-0.5">
                  {cat.count} pieces
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
