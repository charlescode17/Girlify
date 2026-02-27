import AnalyticsCards from "@/components/dashboard/analytics-cards"
import RevenueChart from "@/components/dashboard/revenue-chart"
import RecentOrders from "@/components/dashboard/recent-orders"
import TopProducts from "@/components/dashboard/top-products"

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <AnalyticsCards />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <RevenueChart />
        </div>
        <div className="xl:col-span-2">
          <TopProducts />
        </div>
      </div>

      <RecentOrders />
    </div>
  )
}
