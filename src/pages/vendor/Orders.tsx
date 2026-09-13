import DashboardLayout from '../../components/layout/DashboardLayout'
import { mockOrders } from '../../data/mockOrders'
import { formatCurrency, formatDate, getStatusColor } from '../../lib/utils'

export default function VendorOrders() {
  const orders = mockOrders.filter((o) => o.manufacturerId === 'vendor_1')

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <div className="card p-6">
        {orders.length === 0 ? (
          <p className="text-center py-8 text-slate-500">No orders yet.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm">Order</th>
                <th className="text-left py-3 px-4 text-sm">Dealer</th>
                <th className="text-left py-3 px-4 text-sm">Date</th>
                <th className="text-left py-3 px-4 text-sm">Amount</th>
                <th className="text-left py-3 px-4 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b">
                  <td className="py-3 px-4 font-medium">{o.orderNumber}</td>
                  <td className="py-3 px-4 text-sm">{o.dealerName}</td>
                  <td className="py-3 px-4 text-sm">{formatDate(o.createdAt)}</td>
                  <td className="py-3 px-4 font-medium">{formatCurrency(o.total)}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  )
}