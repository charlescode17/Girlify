"use client"

import { ArrowUpRight } from "lucide-react"

const products = [
  { name: "Silk Evening Gown", category: "Dresses", sold: 124, revenue: "$304,200" },
  { name: "Cashmere Blazer Set", category: "Outerwear", sold: 98, revenue: "$185,220" },
  { name: "Leather Handbag — Noir", category: "Accessories", sold: 87, revenue: "$278,400" },
  { name: "Crystal Clutch — Limited", category: "Accessories", sold: 62, revenue: "$254,200" },
  { name: "Tailored Wool Coat", category: "Outerwear", sold: 56, revenue: "$155,680" },
]

export default function TopProducts() {
  const maxSold = Math.max(...products.map((p) => p.sold))

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Top Products</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Best sellers this month</p>
        </div>
        <button className="flex items-center gap-1 text-xs font-medium text-gold transition-colors duration-200 hover:text-gold-dim">
          View all
          <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex flex-col gap-5">
        {products.map((product, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-muted-foreground">
              {String(idx + 1).padStart(2, "0")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                <span className="text-sm font-medium text-foreground shrink-0 ml-3">
                  {product.revenue}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-500"
                    style={{ width: `${(product.sold / maxSold) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] text-muted-foreground shrink-0">
                  {product.sold} sold
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
