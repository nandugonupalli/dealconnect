import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCardAdvanced from '../../components/business/StatCardAdvanced'
import SalesChart from '../../components/business/SalesChart'
import { TrendingUp, DollarSign, Package, Users } from 'lucide-react'
import { formatCurrency } from '../../lib/utils'

export default function VendorAnalytics() {
  const topProducts = [
    { name: 'Basmati Rice Premium', sales: 24500, orders: 45, growth: 12 },
    { name: 'Sunflower Oil', sales: 18200, orders: 38, growth: 8 },
    { name: 'Tea Powder Premium', sales: 15600, orders: 28, growth: 15 },
    { name: 'Notebook 200 pages', sales: 12400, orders: 32, growth: -3 },
    { name: 'Detergent Powder', sales: 9800, orders: 25, growth: 6 },
  ]

  const topDealers = [
    { name: 'Ramesh Kirana Store', orders: 45, spent: 125000 },
    { name: 'Sharma Hardware', orders: 38, spent: 98000 },
    { name: 'Priya General Store', orders: 32, spent: 76000 },
    { name: 'Kumar Stores', orders: 28, spent: 65000 },
    { name: 'Singh Traders', orders: 24, spent: 54000 },
  ]

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-slate-600">Deep insights into your business performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCardAdvanced title="Revenue" value={formatCurrency(850000)} icon={DollarSign} trend={23} color="green" />
        <StatCardAdvanced title="Orders" value={1250} icon={Package} trend={15} color="blue" />
        <StatCardAdvanced title="Customers" value={250} icon={Users} trend={8} color="purple" />
        <StatCardAdvanced title="Avg Order" value={formatCurrency(680)} icon={TrendingUp} trend={5} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4">Revenue Trend</h2>
          <SalesChart type="area" height={280} />
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4">Orders Trend</h2>
          <SalesChart type="bar" height={280} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-800 text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.orders} orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatCurrency(p.sales)}</div>
                  <div className={`text-xs ${p.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {p.growth >= 0 ? '+' : ''}{p.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Dealers */}
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4">Top Dealers</h2>
          <div className="space-y-4">
            {topDealers.map((d, i) => (
              <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {d.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{d.name}</div>
                    <div className="text-xs text-slate-500">{d.orders} orders</div>
                  </div>
                </div>
                <div className="font-bold text-primary-800">{formatCurrency(d.spent)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}