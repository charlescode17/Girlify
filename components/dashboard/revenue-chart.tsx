"use client"

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 18200, orders: 145 },
  { month: "Feb", revenue: 21400, orders: 168 },
  { month: "Mar", revenue: 19800, orders: 152 },
  { month: "Apr", revenue: 24600, orders: 189 },
  { month: "May", revenue: 28100, orders: 215 },
  { month: "Jun", revenue: 26500, orders: 201 },
  { month: "Jul", revenue: 31200, orders: 242 },
  { month: "Aug", revenue: 29800, orders: 228 },
  { month: "Sep", revenue: 33400, orders: 256 },
  { month: "Oct", revenue: 36100, orders: 278 },
  { month: "Nov", revenue: 38900, orders: 295 },
  { month: "Dec", revenue: 42500, orders: 318 },
]

const GOLD = "#C6A75E"
const GOLD_DIM = "#A08840"

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
  }>
  label?: string
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-xl">
        <p className="text-xs font-medium text-muted-foreground mb-1.5">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-semibold text-foreground">
            {entry.dataKey === "revenue"
              ? `$${entry.value.toLocaleString()}`
              : entry.value.toLocaleString()}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              {entry.dataKey === "revenue" ? "revenue" : "orders"}
            </span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function RevenueChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Revenue Overview</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Monthly revenue for 2025</p>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
            <span className="text-xs text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#8A8A8A" }} />
            <span className="text-xs text-muted-foreground">Orders</span>
          </div>
        </div>
      </div>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueData}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={GOLD} stopOpacity={0.2} />
                <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#2E2E2E"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8A8A8A", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8A8A8A", fontSize: 11 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={GOLD}
              strokeWidth={2}
              fill="url(#goldGradient)"
              dot={false}
              activeDot={{
                r: 4,
                fill: GOLD,
                stroke: "#1E1E1E",
                strokeWidth: 2,
              }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke={GOLD_DIM}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="transparent"
              dot={false}
              activeDot={{
                r: 3,
                fill: GOLD_DIM,
                stroke: "#1E1E1E",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
