import { Link } from 'react-router-dom'
import { Package, Truck, CheckCircle, XCircle, Clock, MapPin } from 'lucide-react'
import { Order } from '../../types'
import { formatCurrency, formatDate, getStatusColor } from '../../lib/utils'

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  processing: Package,
  shipped: Truck,
  'out-for-delivery': Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
  returned: XCircle,
}

export default function OrderCard({ order, linkPrefix = '/dealer/orders' }: { order: Order; linkPrefix?: string }) {
  const StatusIcon = statusIcons[order.status] || Package

  return (
    <Link
      to={`${linkPrefix}/${order.id}`}
      className="block card p-5 hover:shadow-card-hover transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="font-bold text-lg">{order.orderNumber}</div>
          <div className="text-sm text-slate-500">{formatDate(order.createdAt)}</div>
        </div>
        <span className={`text-xs font-medium px-3 py-1.5 rounded-full border flex items-center space-x-1 ${getStatusColor(order.status)}`}>
          <StatusIcon size={12} />
          <span className="capitalize">{order.status.replace('-', ' ')}</span>
        </span>
      </div>

      <div className="flex items-center space-x-3 mb-4 overflow-hidden">
        {order.items.slice(0, 4).map((item, i) => (
          <div key={i} className="w-12 h-12 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden">
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-full h-full object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = 'https://via.placeholder.com/50'
              }}
            />
          </div>
        ))}
        {order.items.length > 4 && (
          <div className="w-12 h-12 rounded-lg bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-500">
            +{order.items.length - 4}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="text-sm text-slate-600">
          {order.items.length} item{order.items.length > 1 ? 's' : ''}
        </div>
        <div className="text-lg font-bold text-primary-800">
          {formatCurrency(order.total)}
        </div>
      </div>
    </Link>
  )
}