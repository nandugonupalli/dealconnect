import DashboardLayout from '../../components/layout/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mockOrders'
import { formatCurrency, formatDate, getStatusColor } from '../../lib/utils'

export default function DealerPayments() {
  const { user } = useAuth()
  const myOrders = mockOrders.filter((o) => o.dealerId === user?.id)

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Payments</h1>
      <div className="card p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm">Order</th>
              <th className="text-left py-3 px-4 text-sm">Date</th>
              <th className="text-left py-3 px-4 text-sm">Amount</th>
              <th className="text-left py-3 px-4 text-sm">Method</th>
              <th className="text-left py-3 px-4 text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="py-3 px-4">{o.orderNumber}</td>
                <td className="py-3 px-4 text-sm">{formatDate(o.createdAt)}</td>
                <td className="py-3 px-4 font-medium">{formatCurrency(o.total)}</td>
                <td className="py-3 px-4 text-sm">{o.paymentMethod}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(o.paymentStatus)}`}>
                    {o.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}