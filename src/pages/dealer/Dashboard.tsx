import { Link } from 'react-router-dom'
import { ShoppingBag, Package, CreditCard, TrendingUp, ArrowRight, Clock, CheckCircle, Truck } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCardAdvanced from '../../components/business/StatCardAdvanced'
import OrderCard from '../../components/business/OrderCard'
import SalesChart from '../../components/business/SalesChart'
import ProductCard from '../../components/business/ProductCard'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mockOrders'
import { mockProducts } from '../../data/mockProducts'
import { formatCurrency } from '../../lib/utils'

export default function DealerDashboard() {
  const { user } = useAuth()
  const myOrders = mockOrders.filter((o) => o.dealerId === user?.id)
  const recentOrders = myOrders.slice(0, 3)
  const recommendedProducts = mockProducts.slice(0, 4)

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-2xl p-6 lg:p-8 text-white mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-primary-100">
              You've saved {formatCurrency(15000)} this month by shopping on DealConnect
            </p>
          </div>
          <Link
            to="/dealer/products"
            className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-lg flex items-center space-x-2 transition-all"
          >
            <ShoppingBag size={18} />
            <span>New Order</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCardAdvanced
          title="Total Orders"
          value={user?.totalOrders || 45}
          icon={ShoppingBag}
          trend={12}
          color="blue"
          subtitle="+5 this month"
        />
        <StatCardAdvanced
          title="Total Spent"
          value={formatCurrency(user?.totalSpent || 125000)}
          icon={TrendingUp}
          trend={8}
          color="green"
          subtitle="Last 30 days"
        />
        <StatCardAdvanced
          title="Credit Available"
          value={formatCurrency((user?.creditLimit || 50000) - (user?.creditUsed || 12500))}
          icon={CreditCard}
          color="amber"
          subtitle="of ₹50,000 limit"
        />
        <StatCardAdvanced
          title="Pending Orders"
          value={myOrders.filter((o) => o.status !== 'delivered').length}
          icon={Package}
          color="purple"
          subtitle="In transit"
        />
      </div>

      {/* Order Status Quick View */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Pending', count: 2, icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'Shipped', count: 3, icon: Truck, color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Delivered', count: 8, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
          { label: 'Cancelled', count: 0, icon: Package, color: 'text-red-600 bg-red-50' },
        ].map((item, i) => (
          <div key={i} className="card p-4 flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}>
              <item.icon size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold">{item.count}</div>
              <div className="text-xs text-slate-500">{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Spending Chart */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold">Spending Overview</h2>
            <p className="text-sm text-slate-500">Last 9 months trend</p>
          </div>
          <select className="input-field py-2 text-sm w-auto">
            <option>Last 9 months</option>
            <option>Last 6 months</option>
            <option>Last 3 months</option>
          </select>
        </div>
        <SalesChart type="area" />
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Orders</h2>
          <Link to="/dealer/orders" className="text-primary-800 font-medium text-sm flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {recentOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recommended For You</h2>
          <Link to="/dealer/products" className="text-primary-800 font-medium text-sm flex items-center space-x-1">
            <span>Browse All</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}