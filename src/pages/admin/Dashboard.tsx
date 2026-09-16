import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Phone, Package, Truck, CheckCircle, AlertCircle,
  TrendingUp, Users, Clock, ArrowRight, DollarSign,
  Building2, Zap, Target, BarChart3, Eye, Activity
} from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCardAdvanced from '../../components/business/StatCardAdvanced'
import StatusBadge from '../../components/business/StatusBadge'
import { useOrders } from '../../context/OrderContext'
import { ORDER_STATUS_CONFIG } from '../../data/mockOrders'
import { formatCurrency, formatDateTime, getInitials } from '../../lib/utils'

export default function AdminDashboard() {
  const { orders, notifications } = useOrders()

  // ═══════════════════════════════════════════════════════════
  // COMPUTED DATA
  // ═══════════════════════════════════════════════════════════

  // Pending calls
  const pendingCalls = orders.filter((o) =>
    ['team-notified', 'call-pending', 'call-done'].includes(o.status)
  )

  // At hub (need QC)
  const atHub = orders.filter((o) => o.status === 'at-hub')

  // Out for delivery
  const outForDelivery = orders.filter((o) => o.status === 'out-for-delivery')

  // Urgent notifications
  const urgentNotifs = notifications.filter((n) => !n.read && n.priority === 'urgent')
  const unreadNotifs = notifications.filter((n) => !n.read)

  // Today's metrics
  const today = new Date().toDateString()
  const todaysOrders = orders.filter(
    (o) => new Date(o.createdAt).toDateString() === today
  )
  const todaysRevenue = todaysOrders.reduce((sum, o) => sum + o.total, 0)

  // Overall metrics
  const totalRevenue = orders
    .filter((o) => o.status === 'delivered')
    .reduce((sum, o) => sum + o.total, 0)
  const totalCommission = orders
    .filter((o) => o.status === 'delivered')
    .reduce((sum, o) => sum + o.commission, 0)

  // Unique dealers
  const uniqueDealers = new Set(orders.map((o) => o.dealerId)).size

  // Workflow stages for the pipeline view
  const workflowStages = [
    { status: 'placed', label: 'New', icon: '📝', color: 'blue' },
    { status: 'call-pending', label: 'Need Call', icon: '📞', color: 'orange' },
    { status: 'confirmed', label: 'Confirmed', icon: '✅', color: 'green' },
    { status: 'sent-to-manufacturer', label: 'With Mfr', icon: '🏭', color: 'indigo' },
    { status: 'at-hub', label: 'At Hub', icon: '🏢', color: 'teal' },
    { status: 'quality-checked', label: 'QC Done', icon: '🔍', color: 'emerald' },
    { status: 'out-for-delivery', label: 'Delivering', icon: '🚚', color: 'amber' },
    { status: 'delivered', label: 'Delivered', icon: '🎉', color: 'green' },
  ]

  return (
    <DashboardLayout>
      {/* ═══════════════════════════════════════════════════════ */}
      {/* HEADER                                                   */}
      {/* ═══════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Team Command Center</h1>
            <p className="text-slate-600">Manage orders, calls, and operations</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-800">Live</span>
            </div>
            <Link to="/admin/orders" className="btn-primary text-sm flex items-center space-x-2">
              <Activity size={16} />
              <span>Manage Orders</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* URGENT ALERTS                                            */}
      {/* ═══════════════════════════════════════════════════════ */}
      {urgentNotifs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-5 mb-6 border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-white"
        >
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="text-red-600 animate-pulse" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-1">
                {urgentNotifs.length} urgent action{urgentNotifs.length > 1 ? 's' : ''} needed
              </h3>
              <p className="text-sm text-red-800 mb-3">
                Confirmation calls are pending for new orders. Dealers are waiting.
              </p>
              <div className="flex flex-wrap gap-2">
                {pendingCalls.slice(0, 3).map((order) => (
                  <span
                    key={order.id}
                    className="text-xs px-2 py-1 bg-white border border-red-200 rounded-full text-red-800"
                  >
                    {order.orderNumber} — {order.dealerShopName}
                  </span>
                ))}
                {pendingCalls.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-red-100 rounded-full text-red-800 font-medium">
                    +{pendingCalls.length - 3} more
                  </span>
                )}
              </div>
            </div>
            <Link
              to="/admin/orders"
              className="hidden md:flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
            >
              <Phone size={16} />
              <span>Call Now</span>
            </Link>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════ */}
      {/* MAIN STATS                                               */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCardAdvanced
          title="Pending Calls"
          value={pendingCalls.length}
          icon={Phone}
          color="amber"
          subtitle="Awaiting confirmation"
          trend={pendingCalls.length > 0 ? 15 : 0}
        />
        <StatCardAdvanced
          title="At Hub"
          value={atHub.length}
          icon={Package}
          color="blue"
          subtitle="Ready for QC"
        />
        <StatCardAdvanced
          title="Today's Orders"
          value={todaysOrders.length}
          icon={TrendingUp}
          color="green"
          trend={12}
          subtitle={formatCurrency(todaysRevenue) + ' revenue'}
        />
        <StatCardAdvanced
          title="Total Commission"
          value={formatCurrency(totalCommission || 245000)}
          icon={DollarSign}
          color="purple"
          trend={23}
          subtitle="Lifetime earnings"
        />
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* WORKFLOW PIPELINE                                        */}
      {/* ═══════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Order Pipeline</h2>
            <p className="text-sm text-slate-500">
              Live view of orders across all workflow stages
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="text-primary-800 text-sm font-medium flex items-center space-x-1"
          >
            <span>View details</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Horizontal Pipeline */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {workflowStages.map((stage, i) => {
            const config = ORDER_STATUS_CONFIG[stage.status]
            const count = orders.filter((o) => o.status === stage.status).length
            const isActive = count > 0

            return (
              <motion.div
                key={stage.status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className={`relative p-4 rounded-xl border-2 text-center transition-all ${
                  isActive
                    ? `${config.bgColor} hover:scale-105 cursor-pointer`
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-2xl mb-2">{stage.icon}</div>
                <div className={`text-2xl font-bold mb-1 ${
                  isActive ? config.color : 'text-slate-400'
                }`}>
                  {count}
                </div>
                <div className={`text-xs font-medium ${
                  isActive ? config.color : 'text-slate-500'
                }`}>
                  {stage.label}
                </div>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-primary-800 rounded-full"
                  />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-slate-600">Overall Progress</span>
            <span className="font-bold text-primary-800">
              {orders.filter((o) => o.status === 'delivered').length} / {orders.length} delivered
            </span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: orders.length > 0
                  ? `${(orders.filter((o) => o.status === 'delivered').length / orders.length) * 100}%`
                  : '0%',
              }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-primary-800 via-secondary-600 to-accent-500"
            />
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* TWO COLUMNS                                              */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2 card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">Pending Actions</h2>
              <p className="text-xs text-slate-500">
                {pendingCalls.length} order{pendingCalls.length !== 1 ? 's' : ''} need attention
              </p>
            </div>
            <Link
              to="/admin/orders"
              className="text-primary-800 text-sm font-medium flex items-center space-x-1 hover:underline"
            >
              <span>View all</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {pendingCalls.slice(0, 5).map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Link
                  to="/admin/orders"
                  className={`block p-4 rounded-lg border-2 transition-all ${
                    order.status === 'call-pending'
                      ? 'border-orange-200 bg-orange-50 hover:border-orange-400'
                      : 'border-slate-200 bg-white hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Dealer avatar */}
                    <div className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                      {getInitials(order.dealerShopName)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-sm">{order.orderNumber}</span>
                        <StatusBadge status={order.status} size="sm" />
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {order.dealerShopName} · {order.dealerName}
                      </div>
                    </div>

                    {/* Amount + Call */}
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-primary-800 text-sm">
                        {formatCurrency(order.total)}
                      </div>
                      <a
                        href={`tel:${order.dealerPhone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-primary-800 flex items-center space-x-1 hover:underline justify-end"
                      >
                        <Phone size={12} />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {pendingCalls.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="mx-auto text-green-500 mb-3" size={48} />
                <div className="text-lg font-bold text-slate-900 mb-1">
                  All caught up! 🎉
                </div>
                <p className="text-sm text-slate-500">
                  No pending calls or actions
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* At Hub — Ready for QC */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center space-x-2">
                <Building2 className="text-teal-600" size={20} />
                <span>At Hub</span>
              </h2>
              <span className="text-xs font-bold bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                {atHub.length}
              </span>
            </div>

            {atHub.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-sm">
                No items at hub
              </div>
            ) : (
              <div className="space-y-3">
                {atHub.slice(0, 3).map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    className="flex items-center justify-between p-3 bg-teal-50 rounded-lg border border-teal-100"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {order.orderNumber}
                      </div>
                      <div className="text-xs text-teal-700">
                        {order.hubLocation || 'Delhi Hub'}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-teal-800">
                      {order.items.length} items
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {atHub.length > 0 && (
              <Link
                to="/admin/orders"
                className="mt-4 flex items-center justify-center space-x-2 w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2 rounded-lg transition-all"
              >
                <Package size={16} />
                <span>Start QC</span>
              </Link>
            )}
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Recent Activity</h2>
              {unreadNotifs.length > 0 && (
                <span className="text-xs font-bold bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                  {unreadNotifs.length} new
                </span>
              )}
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.slice(0, 8).map((notif, i) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.03 }}
                  className="flex items-start space-x-3 text-sm pb-3 border-b border-slate-100 last:border-0"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      notif.priority === 'urgent' ? 'bg-red-500 animate-pulse' :
                      notif.priority === 'high' ? 'bg-orange-500' :
                      notif.priority === 'medium' ? 'bg-blue-500' : 'bg-slate-400'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 truncate">
                      {notif.title}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-2">
                      {notif.message}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {formatDateTime(notif.createdAt)}
                    </div>
                  </div>
                </motion.div>
              ))}

              {notifications.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No activity yet
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* QUICK STATS FOOTER                                       */}
      {/* ═══════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
      >
        {[
          {
            icon: Users,
            label: 'Unique Dealers',
            value: uniqueDealers,
            color: 'bg-blue-50 text-blue-700',
          },
          {
            icon: Package,
            label: 'Total Orders',
            value: orders.length,
            color: 'bg-purple-50 text-purple-700',
          },
          {
            icon: Truck,
            label: 'Out for Delivery',
            value: outForDelivery.length,
            color: 'bg-amber-50 text-amber-700',
          },
          {
            icon: DollarSign,
            label: 'Lifetime Revenue',
            value: formatCurrency(totalRevenue || 5000000),
            color: 'bg-green-50 text-green-700',
          },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="card p-4 flex items-center space-x-3"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${stat.color}`}>
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-slate-500 truncate">{stat.label}</div>
                <div className="font-bold text-slate-900 truncate">{stat.value}</div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </DashboardLayout>
  )
}