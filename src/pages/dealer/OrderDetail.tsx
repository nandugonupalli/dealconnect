import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone, Package } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import OrderTimeline from '../../components/business/OrderTimeline'
import StatusBadge from '../../components/business/StatusBadge'
import { useOrders } from '../../context/OrderContext'
import { formatCurrency, formatDateTime } from '../../lib/utils'

export default function OrderDetail() {
  const { id } = useParams()
  const { orders } = useOrders()
  const order = orders.find((o) => o.id === id)

  if (!order) {
    return (
      <DashboardLayout>
        <div className="text-center py-16">
          <Package size={48} className="text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Order not found</p>
          <Link to="/dealer/orders" className="btn-primary mt-4 inline-block">
            Back to Orders
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <Link to="/dealer/orders" className="inline-flex items-center space-x-2 text-slate-600 hover:text-primary-800 mb-6">
        <ArrowLeft size={18} />
        <span>Back to Orders</span>
      </Link>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Order {order.orderNumber}</h1>
            <p className="text-slate-500">Placed on {formatDateTime(order.createdAt)}</p>
          </div>
          <StatusBadge status={order.status} size="lg" />
        </div>

        {/* Progress bar */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Progress</span>
            <span className="text-sm font-medium">
              {Math.round(
                ((order.timeline.length) / 10) * 100
              )}%
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(order.timeline.length / 10) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-primary-800 to-secondary-600"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 card p-6">
          <h2 className="font-bold text-lg mb-6">Order Timeline</h2>
          <OrderTimeline order={order} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Need help? */}
          <div className="card p-4 bg-blue-50 border border-blue-200">
            <Phone className="text-blue-600 mb-2" size={20} />
            <h3 className="font-bold text-blue-900 mb-1">Need Help?</h3>
            <p className="text-sm text-blue-800 mb-3">
              Call us at +91 98765 43210
            </p>
            <a href="tel:+919876543210" className="btn-primary text-sm w-full text-center block">
              Call Support
            </a>
          </div>

          {/* Items */}
          <div className="card p-6">
            <h2 className="font-bold mb-4">Items ({order.items.length})</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center space-x-3">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-12 h-12 rounded-lg object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = 'https://via.placeholder.com/50'
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{item.productName}</div>
                    <div className="text-xs text-slate-500">
                      {item.quantity} × {formatCurrency(item.price)}
                    </div>
                  </div>
                  <div className="text-sm font-medium">{formatCurrency(item.subtotal)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="card p-6">
            <h2 className="font-bold mb-4">Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Delivery</span>
                <span>{order.deliveryCharge === 0 ? 'FREE' : formatCurrency(order.deliveryCharge)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Discount</span>
                <span className="text-green-600">-{formatCurrency(order.discount)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary-800">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="card p-6">
            <h2 className="font-bold mb-3">Delivery Address</h2>
            <div className="text-sm text-slate-600 space-y-1">
              <div>{order.deliveryAddress.line1}</div>
              <div>{order.deliveryAddress.city}, {order.deliveryAddress.state}</div>
              <div>PIN: {order.deliveryAddress.pincode}</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}