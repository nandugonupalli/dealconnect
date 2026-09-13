import { useParams } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { mockOrders } from '../../data/mockOrders'
import { formatCurrency, formatDateTime, getStatusColor } from '../../lib/utils'

export default function OrderDetail() {
  const { id } = useParams()
  const order = mockOrders.find((o) => o.id === id)

  if (!order) {
    return (
      <DashboardLayout>
        <p className="text-center py-16">Order not found</p>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-2">Order {order.orderNumber}</h1>
      <p className="text-slate-500 mb-6">Placed on {formatDateTime(order.createdAt)}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="font-bold mb-4">Order Timeline</h2>
            <div className="space-y-4">
              {order.timeline.map((t, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-primary-800 rounded-full mt-1.5" />
                  <div>
                    <p className="font-medium capitalize">{t.status}</p>
                    <p className="text-xs text-slate-500">{formatDateTime(t.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-bold mb-4">Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.productId} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-slate-500">
                      {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>
                  <p className="font-bold">{formatCurrency(item.subtotal)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="font-bold mb-4">Status</h2>
            <span
              className={`inline-block text-sm font-medium px-3 py-1 rounded border ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
            <p className="text-sm mt-3 text-slate-500">
              Payment: <span className="font-medium">{order.paymentStatus}</span>
            </p>
          </div>

          <div className="card p-6">
            <h2 className="font-bold mb-4">Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{formatCurrency(order.deliveryCharge)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">-{formatCurrency(order.discount)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-primary-800">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}