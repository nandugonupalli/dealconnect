import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, CheckCircle, Package, Truck, Search, User, AlertCircle, XCircle, Eye } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatusBadge from '../../components/business/StatusBadge'
import { useOrders } from '../../context/OrderContext'
import { ORDER_STATUS_CONFIG } from '../../data/mockOrders'
import { OrderStatus } from '../../types'
import { formatCurrency, formatDateTime, getInitials } from '../../lib/utils'
import { toast } from 'sonner'

const TEAM_MEMBERS = ['Team Member A', 'Team Member B', 'Team Member C']

export default function AdminOrders() {
  const { orders, updateOrderStatus, assignOrder, addNote } = useOrders()
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = orders
    .filter((o) => filter === 'all' || o.status === filter)
    .filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        o.dealerShopName.toLowerCase().includes(search.toLowerCase())
    )

  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order Management</h1>
        <p className="text-slate-600">Process orders and move them through the workflow</p>
      </div>

      {/* Urgent Alert */}
      {statusCounts['call-pending'] > 0 && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card p-4 mb-6 border-l-4 border-orange-500 bg-orange-50"
        >
          <div className="flex items-center space-x-3">
            <AlertCircle className="text-orange-600 animate-pulse" size={24} />
            <div className="flex-1">
              <div className="font-bold text-orange-900">
                {statusCounts['call-pending']} order{statusCounts['call-pending'] > 1 ? 's' : ''} need confirmation calls
              </div>
              <div className="text-sm text-orange-700">
                Click "Start Call" to begin the workflow
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { status: 'placed', label: 'New Orders', color: 'bg-blue-50 text-blue-800' },
          { status: 'call-pending', label: 'Need Call', color: 'bg-orange-50 text-orange-800' },
          { status: 'at-hub', label: 'At Hub', color: 'bg-teal-50 text-teal-800' },
          { status: 'out-for-delivery', label: 'Delivering', color: 'bg-amber-50 text-amber-800' },
        ].map((item) => (
          <button
            key={item.status}
            onClick={() => setFilter(item.status as OrderStatus)}
            className={`p-4 rounded-xl text-left transition-all hover:scale-105 ${item.color} ${
              filter === item.status ? 'ring-2 ring-primary-800' : ''
            }`}
          >
            <div className="text-2xl mb-1">{ORDER_STATUS_CONFIG[item.status].icon}</div>
            <div className="text-2xl font-bold">{statusCounts[item.status] || 0}</div>
            <div className="text-xs font-medium">{item.label}</div>
          </button>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as OrderStatus | 'all')}
          className="input-field w-64"
        >
          <option value="all">All ({orders.length})</option>
          {Object.entries(ORDER_STATUS_CONFIG).map(([k, c]) => (
            <option key={k} value={k}>
              {c.icon} {c.label} ({statusCounts[k] || 0})
            </option>
          ))}
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filtered.map((order, i) => {
          const config = ORDER_STATUS_CONFIG[order.status]
          const isExpanded = expanded === order.id

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`card p-5 ${
                order.status === 'call-pending' ? 'border-l-4 border-orange-500' : ''
              }`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${config.bgColor}`}>
                    {config.icon}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{order.orderNumber}</div>
                    <div className="text-xs text-slate-500">{formatDateTime(order.createdAt)}</div>
                  </div>
                </div>
                <StatusBadge status={order.status} />
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-sm">
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-slate-400" />
                  <span className="font-medium">{order.dealerShopName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-slate-400" />
                  <a href={`tel:${order.dealerPhone}`} className="text-primary-800 hover:underline">
                    {order.dealerPhone}
                  </a>
                </div>
                <div className="text-right font-bold text-primary-800 text-lg">
                  {formatCurrency(order.total)}
                </div>
              </div>

              {/* Action Buttons — WORKFLOW */}
              <div className="flex flex-wrap gap-2 mb-3">
                {(order.status === 'placed' || order.status === 'team-notified') && (
                  <button
                    onClick={() => {
                      updateOrderStatus(order.id, 'call-pending', 'Queued for call', 'Admin')
                      toast.success('Moved to call-pending')
                    }}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center space-x-2"
                  >
                    <Phone size={16} />
                    <span>Start Call</span>
                  </button>
                )}

                {order.status === 'call-pending' && (
                  <>
                    <button
                      onClick={() => {
                        updateOrderStatus(order.id, 'call-done', 'Call completed', 'Admin')
                        toast.success('Call marked done')
                      }}
                      className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium py-2.5 rounded-lg"
                    >
                      ☑️ Mark Call Done
                    </button>
                  </>
                )}

                {order.status === 'call-done' && (
                  <>
                    <button
                      onClick={() => {
                        updateOrderStatus(order.id, 'confirmed', 'Confirmed by team', 'Admin')
                        toast.success('Order confirmed!')
                      }}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center space-x-2"
                    >
                      <CheckCircle size={16} />
                      <span>Confirm Order</span>
                    </button>
                    <button
                      onClick={() => {
                        updateOrderStatus(order.id, 'rejected', 'Rejected', 'Admin')
                        toast.error('Order rejected')
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2.5 rounded-lg"
                    >
                      <XCircle size={16} />
                    </button>
                  </>
                )}

                {order.status === 'confirmed' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(order.id, 'sent-to-manufacturer', 'Sent to manufacturer', 'Admin')
                      toast.success('Sent to manufacturer')
                    }}
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center space-x-2"
                  >
                    <Package size={16} />
                    <span>Send to Manufacturer</span>
                  </button>
                )}

                {order.status === 'sent-to-manufacturer' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(order.id, 'at-hub', 'Arrived at hub', 'Admin')
                      toast.success('Marked at hub')
                    }}
                    className="flex-1 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium py-2.5 rounded-lg"
                  >
                    🏢 Mark Arrived at Hub
                  </button>
                )}

                {order.status === 'at-hub' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(order.id, 'quality-checked', 'QC passed', 'Admin')
                      toast.success('QC passed!')
                    }}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2.5 rounded-lg"
                  >
                    ✅ Quality Check Done
                  </button>
                )}

                {order.status === 'quality-checked' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(order.id, 'out-for-delivery', 'Out for delivery', 'Admin')
                      toast.success('Out for delivery!')
                    }}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center space-x-2"
                  >
                    <Truck size={16} />
                    <span>Start Delivery</span>
                  </button>
                )}

                {order.status === 'out-for-delivery' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(order.id, 'delivered', 'Delivered', 'Admin')
                      toast.success('Delivered!')
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center space-x-2"
                  >
                    <CheckCircle size={16} />
                    <span>Mark Delivered</span>
                  </button>
                )}

                {order.status === 'delivered' && (
                  <div className="flex-1 text-center py-2.5 text-green-600 font-medium">
                    ✅ Order Complete
                  </div>
                )}

                {/* Expand toggle */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : order.id)}
                  className="text-sm text-primary-800 hover:underline flex items-center space-x-1 px-3"
                >
                  <Eye size={14} />
                  <span>{isExpanded ? 'Hide' : 'Details'}</span>
                </button>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="pt-4 border-t border-slate-200 mt-4 space-y-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-slate-500 block mb-1">
                        Assign To
                      </label>
                      <select
                        value={order.assignedTo || ''}
                        onChange={(e) => assignOrder(order.id, e.target.value)}
                        className="input-field py-2 text-sm"
                      >
                        <option value="">-- Select --</option>
                        {TEAM_MEMBERS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 block mb-1">
                        Team Notes
                      </label>
                      <input
                        type="text"
                        defaultValue={order.teamNotes}
                        onBlur={(e) => addNote(order.id, 'teamNotes', e.target.value)}
                        className="input-field py-2 text-sm"
                        placeholder="Add notes..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-2">
                      Items ({order.items.length})
                    </label>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-slate-600">
                            {item.productName} × {item.quantity} {item.unit}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(item.subtotal)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}

        {filtered.length === 0 && (
          <div className="card p-12 text-center">
            <Package size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No orders found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}