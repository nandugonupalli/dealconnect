import DashboardLayout from '../../components/layout/DashboardLayout'
import { mockUsers } from '../../data/mockUsers'
import { formatCurrency } from '../../lib/utils'

export default function AdminManufacturers() {
  const vendors = mockUsers.filter((u) => u.role === 'manufacturer')

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Manufacturers</h1>
      <div className="card p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm">Name</th>
              <th className="text-left py-3 px-4 text-sm">Company</th>
              <th className="text-left py-3 px-4 text-sm">Products</th>
              <th className="text-left py-3 px-4 text-sm">Sales</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.id} className="border-b">
                <td className="py-3 px-4 font-medium">{v.name}</td>
                <td className="py-3 px-4">{v.companyName}</td>
                <td className="py-3 px-4">{v.totalProducts}</td>
                <td className="py-3 px-4">{formatCurrency(v.totalSales || 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}