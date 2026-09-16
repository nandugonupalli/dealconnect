import { Link } from 'react-router-dom'
import { Package, TrendingUp, DollarSign, ShoppingBag, ArrowRight, Plus, AlertTriangle } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCardAdvanced from '../../components/business/StatCardAdvanced'
import SalesChart from '../../components/business/SalesChart'
import StatusBadge from '../../components/business/StatusBadge'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mockOrders'
import { mockProducts } from '../../data/mockProducts'
import { formatCurrency, formatDate } from '../../lib/utils'

export default function VendorDashboard() {
  const { user } = useAuth()
  const myProducts = mockProducts.filter((p) => p.manufacturerId === 'vendor_1')
  const myOrders = mockOrders.filter((o) => o.manufacturerId === 'vendor_1')
  const lowStockProducts = myProducts.filter((p) => p.stock < 100)

  const topProducts = myProducts.slice(0, 5)

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-secondary-700 to-secondary-900 rounded-2xl p-6 lg:p-8 text-white mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Welcome, {user?.companyName || user?.name}! 📊
            </h1>
            <p className="text-secondary-100">
              Your sales grew by 23% this month. Keep it up!
            </p>
          </div>
          <Link
            to="/vendor/products/add"
            className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-lg flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCardAdvanced
          title="Total Sales"
          value={formatCurrency(user?.totalSales || 850000)}
          icon={DollarSign}
          trend={23}
          color="green"
          subtitle="Last 30 days"
        />
        <StatCardAdvanced
          title="Active Products"
          value={myProducts.length}
          icon={Package}
          color="blue"
          subtitle={`${lowStockProducts.length} low stock`}
        />
        <StatCardAdvanced
          title="Pending Orders"
          value={myOrders.filter((o) => o.status === 'pending').length}
          icon={ShoppingBag}
          trend={-5}
          color="amber"
          subtitle="Needs attention"
        />
        <StatCardAdvanced
          title="Rating"
          value={`${user?.rating || 4.5} ⭐`}
          icon={TrendingUp}
          trend={2}
          color="purple"
          subtitle="Based on 120 reviews"
        />
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="card p-4 mb-8 border-l-4 border-amber-500 bg-amber-50">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 mb-1">Low Stock Alert</h3>
              <p className="text-sm text-amber-800 mb-2">
                {lowStockProducts.length} product{lowStockProducts.length > 1 ? 's' : ''} running low on stock
              </p>
              <Link to="/vendor/products" className="text-sm font-medium text-amber-900 hover:underline">
                Update inventory →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Sales Chart */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold">Sales Performance</h2>
            <p className="text-sm text-slate-500">Revenue trend over time</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-sm rounded-lg bg-primary-800 text-white">Sales</button>
            <button className="px-3 py-1.5 text-sm rounded-lg text-slate-600 hover:bg-slate-100">Orders</button>
          </div>
        </div>
        <SalesChart type="area" />
      </div>

      {/* Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Recent Orders</h2>
            <Link to="/vendor/orders" className="text-primary-800 text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-2 text-xs font-medium text-slate-500 uppercase">Order</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-slate-500 uppercase">Dealer</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-slate-500 uppercase">Amount</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium text-sm">{order.orderNumber}</td>
                    <td className="py-3 px-2 text-sm text-slate-600">{order.dealerName}</td>
                    <td className="py-3 px-2 font-medium">{formatCurrency(order.total)}</td>
                    <td className="py-3 px-2">
                      <StatusBadge status={order.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4">Top Products</h2>
          <div className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={product.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{product.name}</div>
                  <div className="text-xs text-slate-500">{product.stock} in stock</div>
                </div>
                <div className="text-sm font-bold text-primary-800">
                  {formatCurrency(product.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}