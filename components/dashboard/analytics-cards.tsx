"use client"

import { DollarSign, ShoppingBag, Users, Package, TrendingUp, TrendingDown } from "lucide-react"

const cards = [
  {
    title: "Revenue",
    value: "$284,520",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
    subtitle: "vs last month",
  },
  {
    title: "Orders",
    value: "1,842",
    change: "+8.2%",
    trend: "up" as const,
    icon: ShoppingBag,
    subtitle: "vs last month",
  },
  {
    title: "Customers",
    value: "12,461",
    change: "+4.1%",
    trend: "up" as const,
    icon: Users,
    subtitle: "vs last month",
  },
  {
    title: "Products",
    value: "356",
    change: "-2.3%",
    trend: "down" as const,
    icon: Package,
    subtitle: "active listings",
  },
]

export default function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.title}
            className="group relative rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {card.title}
                </span>
                <span className="text-2xl font-semibold text-foreground tracking-tight">
                  {card.value}
                </span>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {card.trend === "up" ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" strokeWidth={1.5} />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-400" strokeWidth={1.5} />
              )}
              <span
                className={`text-xs font-medium ${
                  card.trend === "up" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {card.change}
              </span>
              <span className="text-xs text-muted-foreground">{card.subtitle}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
