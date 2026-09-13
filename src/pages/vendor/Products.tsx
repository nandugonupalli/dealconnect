import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { mockProducts } from '../../data/mockProducts'
import { formatCurrency } from '../../lib/utils'

export default function VendorProducts() {
  const products = mockProducts.filter((p) => p.manufacturerId === 'vendor_1')

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Products</h1>
        <Link to="/vendor/products/add" className="btn-primary flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Product</span>
        </Link>
      </div>

      <div className="card p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm">Product</th>
              <th className="text-left py-3 px-4 text-sm">Price</th>
              <th className="text-left py-3 px-4 text-sm">Stock</th>
              <th className="text-left py-3 px-4 text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="py-3 px-4 flex items-center space-x-3">
                  <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded object-cover" />
                  <span className="font-medium">{p.name}</span>
                </td>
                <td className="py-3 px-4">{formatCurrency(p.price)}</td>
                <td className="py-3 px-4">{p.stock}</td>
                <td className="py-3 px-4">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {p.status}
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