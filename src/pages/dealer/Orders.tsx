import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, Truck, Phone, ArrowRight } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatusBadge from '../../components/business/StatusBadge'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../context/OrderContext'
import { ORDER_STATUS_CONFIG } from '../../data/mockOrders'
import { formatCurrency, formatDate } from '../../lib/utils'
import { OrderStatus } from '../../types'

const FILTER_TABS: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Orders' },
  { value: 'placed', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'at-hub', label: 'Ready to Pack' },
  { value: 'out-for-delivery', label: 'Delivering' },
  { value: 'delivered', label: 'Delivered' },
]

export default function DealerOrders() {
  const { user } = useAuth()
  const { orders } = useOrders()
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')

  const myOrders = orders.filter((o) => o.dealerId === (user?.id || 'dealer_1'))
  const filtered = filter === 'all' ? myOrders : myOrders.filter((o) => o.status === filter)

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-slate-600">Track your orders in real-time</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {FILTER_TABS.map((tab) => {
          const count =
            tab.value === 'all'
              ? myOrders.length
              : myOrders.filter((o) => o.status === tab.value).length

          return (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                filter === tab.value
                  ? 'bg-primary-800 text-white shadow'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Orders */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <Package size={48} className="text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">No orders yet</h3>
          <p className="text-slate-500 mb-6">
            {filter === 'all'
              ? 'Start shopping to see your orders here'
              : 'No orders in this status'}
          </p>
          <Link to="/dealer/products" className="btn-primary inline-block">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order, i) => {
            const config = ORDER_STATUS_CONFIG[order.status]
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/dealer/orders/${order.id}`}
                  className="block card p-5 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Status Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${config.bgColor}`}>
                      {config.icon}
                    </div>

                    {/* Order Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-lg">{order.orderNumber}</span>
                        <StatusBadge status={order.status} size="sm" />
                      </div>
                      <div className="text-sm text-slate-500 mb-1">
                        {config.description}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-slate-400">
                        <span>{formatDate(order.createdAt)}</span>
                        <span>•</span>
                        <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-xl font-bold text-primary-800">
                        {formatCurrency(order.total)}
                      </div>
                      {order.status === 'call-pending' && (
                        <div className="text-xs text-orange-600 flex items-center justify-end space-x-1 mt-1">
                          <Phone size={12} />
                          <span>Call incoming</span>
                        </div>
                      )}
                    </div>

                    <ArrowRight className="text-slate-400 hidden md:block" size={20} />
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-500">Progress</span>
                      <span className="text-xs font-medium text-primary-800">
                        {getProgressPercent(order.status)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressPercent(order.status)}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-primary-800 to-secondary-600"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      )}
    </DashboardLayout>
  )
}

function getProgressPercent(status: OrderStatus): number {
  const steps: Record<OrderStatus, number> = {
    'placed': 10,
    'team-notified': 20,
    'call-pending': 30,
    'call-done': 40,
    'confirmed': 50,
    'sent-to-manufacturer': 60,
    'at-hub': 70,
    'quality-checked': 80,
    'out-for-delivery': 90,
    'delivered': 100,
    'cancelled': 0,
    'rejected': 0,
    'returned': 0,
  }
  return steps[status] || 0
}