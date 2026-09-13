import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mockOrders'
import { formatCurrency, formatDate, getStatusColor } from '../../lib/utils'

export default function DealerOrders() {
  const { user } = useAuth()
  const myOrders = mockOrders.filter((o) => o.dealerId === user?.id)

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="card p-6">
        {myOrders.length === 0 ? (
          <p className="text-center py-8 text-slate-500">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {myOrders.map((order) => (
              <Link
                key={order.id}
                to={`/dealer/orders/${order.id}`}
                className="block border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-card transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">{order.orderNumber}</span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{formatDate(order.createdAt)}</span>
                  <span className="font-bold text-primary-800">{formatCurrency(order.total)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}