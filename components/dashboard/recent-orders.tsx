"use client"

const orders = [
  {
    id: "ORD-7291",
    customer: "Sophia Laurent",
    product: "Silk Evening Gown",
    amount: "$2,450",
    status: "Delivered",
    date: "Feb 19, 2026",
  },
  {
    id: "ORD-7290",
    customer: "Isabella Chen",
    product: "Cashmere Blazer Set",
    amount: "$1,890",
    status: "Shipped",
    date: "Feb 19, 2026",
  },
  {
    id: "ORD-7289",
    customer: "Olivia Rodriguez",
    product: "Leather Handbag — Noir",
    amount: "$3,200",
    status: "Pending",
    date: "Feb 18, 2026",
  },
  {
    id: "ORD-7288",
    customer: "Emma Blackwell",
    product: "Tailored Wool Coat",
    amount: "$2,780",
    status: "Delivered",
    date: "Feb 18, 2026",
  },
  {
    id: "ORD-7287",
    customer: "Aria Whitmore",
    product: "Crystal Clutch — Limited",
    amount: "$4,100",
    status: "Cancelled",
    date: "Feb 17, 2026",
  },
  {
    id: "ORD-7286",
    customer: "Charlotte Dupont",
    product: "Satin Midi Dress",
    amount: "$1,650",
    status: "Shipped",
    date: "Feb 17, 2026",
  },
]

type Status = "Pending" | "Shipped" | "Delivered" | "Cancelled"

const statusStyles: Record<Status, string> = {
  Pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Shipped: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Delivered: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Cancelled: "bg-red-500/15 text-red-400 border-red-500/20",
}

export default function RecentOrders() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Recent Orders</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Latest transactions across all channels</p>
        </div>
        <button className="text-xs font-medium text-gold transition-colors duration-200 hover:text-gold-dim">
          View all
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Order ID
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Customer
              </th>
              <th className="hidden px-6 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground md:table-cell">
                Product
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Amount
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="hidden px-6 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground lg:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border/50 transition-colors duration-200 hover:bg-secondary/30 last:border-0"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gold font-mono">{order.id}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground">{order.customer}</span>
                </td>
                <td className="hidden px-6 py-4 md:table-cell">
                  <span className="text-sm text-muted-foreground">{order.product}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-foreground">{order.amount}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                      statusStyles[order.status as Status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="hidden px-6 py-4 lg:table-cell">
                  <span className="text-sm text-muted-foreground">{order.date}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
