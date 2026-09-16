import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Package, TrendingUp, DollarSign, ShoppingBag, ArrowRight, Plus,
  AlertTriangle, Clock, CheckCircle, Truck, Building2, Star,
  BarChart3, Users, Zap, Eye
} from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCardAdvanced from '../../components/business/StatCardAdvanced'
import SalesChart from '../../components/business/SalesChart'
import StatusBadge from '../../components/business/StatusBadge'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../context/OrderContext'
import { mockProducts } from '../../data/mockProducts'
import { ORDER_STATUS_CONFIG } from '../../data/mockOrders'
import { formatCurrency, formatDateTime } from '../../lib/utils'

export default function VendorDashboard() {
  const { user } = useAuth()
  const { orders } = useOrders()

  // Filter orders for this manufacturer
  const myOrders = orders.filter((o) => o.manufacturerId === 'vendor_1')
  const myProducts = mockProducts.filter((p) => p.manufacturerId === 'vendor_1')
  const lowStockProducts = myProducts.filter((p) => p.stock < 100)

  // Workflow-aware order counts
  const pendingOrders = myOrders.filter((o) =>
    ['confirmed', 'sent-to-manufacturer'].includes(o.status)
  )
  const atHubOrders = myOrders.filter((o) => o.status === 'at-hub')
  const completedOrders = myOrders.filter((o) => o.status === 'delivered')
  const inProgressOrders = myOrders.filter((o) =>
    !['delivered', 'cancelled', 'rejected', 'returned'].includes(o.status)
  )

  // Revenue calculations
  const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.manufacturerPayout || o.total * 0.95), 0)
  const monthRevenue = completedOrders
    .filter((o) => {
      const orderDate = new Date(o.createdAt)
      const now = new Date()
      return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear()
    })
    .reduce((sum, o) => sum + (o.manufacturerPayout || o.total * 0.95), 0)

  const topProducts = myProducts.slice(0, 5)

  return (
    <DashboardLayout>
      {/* ═══════════════════════════════════════════════════════ */}
      {/* WELCOME BANNER                                           */}
      {/* ═══════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-secondary-700 via-secondary-800 to-slate-900 rounded-2xl p-6 lg:p-8 text-white mb-8 overflow-hidden"
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-secondary-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-medium mb-3">
              <Star size={12} className="text-accent-400" />
              <span>Top Seller This Month</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Welcome, {user?.companyName || user?.name}! 📊
            </h1>
            <p className="text-secondary-100">
              Your sales grew by 23% this month. Keep it up!
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/vendor/analytics"
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-3 rounded-lg flex items-center space-x-2 backdrop-blur border border-white/20 transition-all"
            >
              <BarChart3 size={18} />
              <span>Analytics</span>
            </Link>
            <Link
              to="/vendor/products/add"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-5 py-3 rounded-lg flex items-center space-x-2 transition-all shadow-lg"
            >
              <Plus size={18} />
              <span>Add Product</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* STATS GRID                                               */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCardAdvanced
          title="Total Sales"
          value={formatCurrency(totalRevenue || 850000)}
          icon={DollarSign}
          trend={23}
          color="green"
          subtitle="Lifetime revenue"
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
          value={pendingOrders.length}
          icon={ShoppingBag}
          trend={pendingOrders.length > 0 ? 10 : 0}
          color="amber"
          subtitle="Awaiting fulfillment"
        />
        <StatCardAdvanced
          title="This Month"
          value={formatCurrency(monthRevenue || 125000)}
          icon={TrendingUp}
          trend={18}
          color="purple"
          subtitle="Current month"
        />
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* WORKFLOW STATUS                                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Order Status</h2>
            <p className="text-sm text-slate-500">Track your orders at each stage</p>
          </div>
          <Link to="/vendor/orders" className="text-primary-800 text-sm font-medium flex items-center space-x-1">
            <span>View all</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { status: 'confirmed', label: 'To Ship', icon: Clock, color: 'text-blue-600 bg-blue-50' },
            { status: 'sent-to-manufacturer', label: 'In Production', icon: Package, color: 'text-indigo-600 bg-indigo-50' },
            { status: 'at-hub', label: 'At Hub', icon: Building2, color: 'text-teal-600 bg-teal-50' },
            { status: 'delivered', label: 'Completed', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
          ].map((item, i) => {
            const count = myOrders.filter((o) => o.status === item.status).length
            const Icon = item.icon
            return (
              <motion.div
                key={item.status}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${item.color}`}>
                  <Icon size={20} />
                </div>
                <div className="text-2xl font-bold mb-1">{count}</div>
                <div className="text-xs text-slate-500 font-medium">{item.label}</div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LOW STOCK ALERT                                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      {lowStockProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-5 mb-8 border-l-4 border-amber-500 bg-gradient-to-r from-amber-50 to-white"
        >
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="text-amber-600" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 mb-1">Low Stock Alert</h3>
              <p className="text-sm text-amber-800 mb-3">
                {lowStockProducts.length} product{lowStockProducts.length > 1 ? 's' : ''} running low on stock. Restock to avoid missed sales.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {lowStockProducts.slice(0, 3).map((p) => (
                  <span key={p.id} className="text-xs px-2 py-1 bg-white border border-amber-200 rounded-full text-amber-800">
                    {p.name} ({p.stock})
                  </span>
                ))}
                {lowStockProducts.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-amber-100 rounded-full text-amber-800 font-medium">
                    +{lowStockProducts.length - 3} more
                  </span>
                )}
              </div>
              <Link
                to="/vendor/products"
                className="text-sm font-medium text-amber-900 hover:underline inline-flex items-center space-x-1"
              >
                <span>Update inventory</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SALES CHART                                              */}
      {/* ═══════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="card p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold">Sales Performance</h2>
            <p className="text-sm text-slate-500">Revenue trend over time</p>
          </div>
          <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
            <button className="px-3 py-1.5 text-sm rounded-md bg-white shadow text-primary-800 font-medium">
              Sales
            </button>
            <button className="px-3 py-1.5 text-sm rounded-md text-slate-600 hover:text-slate-900">
              Orders
            </button>
          </div>
        </div>
        <SalesChart type="area" />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* TWO COLUMNS                                              */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">Recent Orders</h2>
              <p className="text-xs text-slate-500">{myOrders.length} total orders</p>
            </div>
            <Link
              to="/vendor/orders"
              className="text-primary-800 text-sm font-medium flex items-center space-x-1 hover:underline"
            >
              <span>View all</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {myOrders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto text-slate-300 mb-3" size={48} />
              <p className="text-slate-500 text-sm">No orders yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Orders will appear here once dealers order your products
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Order
                    </th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Dealer
                    </th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Amount
                    </th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {myOrders.slice(0, 5).map((order, i) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.05 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3 px-2">
                        <div className="font-medium text-sm">{order.orderNumber}</div>
                        <div className="text-xs text-slate-400">
                          {formatDateTime(order.createdAt).split(',')[0]}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="text-sm text-slate-700">{order.dealerShopName}</div>
                        <div className="text-xs text-slate-400">{order.dealerName}</div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="font-bold text-primary-800">
                          {formatCurrency(order.total)}
                        </div>
                        <div className="text-xs text-slate-400">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <StatusBadge status={order.status} size="sm" />
                      </td>
                      <td className="py-3 px-2">
                        <Link
                          to="/vendor/orders"
                          className="text-slate-400 hover:text-primary-800 transition-colors"
                        >
                          <Eye size={16} />
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Top Products</h2>
            <Link to="/vendor/products" className="text-xs text-primary-800 hover:underline">
              Manage
            </Link>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-center space-x-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  i === 0 ? 'bg-yellow-100 text-yellow-800' :
                  i === 1 ? 'bg-slate-100 text-slate-700' :
                  i === 2 ? 'bg-amber-100 text-amber-800' :
                  'bg-primary-100 text-primary-800'
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{product.name}</div>
                  <div className={`text-xs ${
                    product.stock < 100 ? 'text-red-500' : 'text-slate-500'
                  }`}>
                    {product.stock} in stock
                  </div>
                </div>
                <div className="text-sm font-bold text-primary-800">
                  {formatCurrency(product.price)}
                </div>
              </motion.div>
            ))}
            {topProducts.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-sm">
                No products yet
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-blue-700 mb-1">In Progress</div>
                <div className="text-xl font-bold text-blue-900">
                  {inProgressOrders.length}
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-xs text-green-700 mb-1">Completed</div>
                <div className="text-xl font-bold text-green-900">
                  {completedOrders.length}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}