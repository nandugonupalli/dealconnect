import DashboardLayout from '../../components/layout/DashboardLayout'
import { mockUsers } from '../../data/mockUsers'
import { formatCurrency } from '../../lib/utils'

export default function AdminDealers() {
  const dealers = mockUsers.filter((u) => u.role === 'dealer')

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dealers</h1>
      <div className="card p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm">Name</th>
              <th className="text-left py-3 px-4 text-sm">Shop</th>
              <th className="text-left py-3 px-4 text-sm">Orders</th>
              <th className="text-left py-3 px-4 text-sm">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {dealers.map((d) => (
              <tr key={d.id} className="border-b">
                <td className="py-3 px-4 font-medium">{d.name}</td>
                <td className="py-3 px-4">{d.shopName}</td>
                <td className="py-3 px-4">{d.totalOrders}</td>
                <td className="py-3 px-4">{formatCurrency(d.totalSpent || 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}