import { Link } from 'react-router-dom'
import { ShoppingBag, Package, CreditCard, TrendingUp } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/business/StatCard'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mockOrders'
import { formatCurrency, formatDate, getStatusColor } from '../../lib/utils'

export default function DealerDashboard() {
  const { user } = useAuth()
  const myOrders = mockOrders.filter((o) => o.dealerId === user?.id)

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Here's what's happening with your business today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Orders" value={user?.totalOrders || 0} icon={ShoppingBag} color="blue" />
        <StatCard title="Total Spent" value={formatCurrency(user?.totalSpent || 0)} icon={TrendingUp} color="green" />
        <StatCard title="Credit Available" value={formatCurrency((user?.creditLimit || 0) - (user?.creditUsed || 0))} icon={CreditCard} color="amber" />
        <StatCard title="Pending Orders" value={myOrders.filter((o) => o.status !== 'delivered').length} icon={Package} color="purple" />
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Orders</h2>
          <Link to="/dealer/orders" className="text-primary-800 font-medium text-sm">
            View All →
          </Link>
        </div>
        {myOrders.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No orders yet. Start shopping!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Items</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3 px-4 font-medium">{order.orderNumber}</td>
                    <td className="py-3 px-4 text-sm">{formatDate(order.createdAt)}</td>
                    <td className="py-3 px-4 text-sm">{order.items.length}</td>
                    <td className="py-3 px-4 font-medium">{formatCurrency(order.total)}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}