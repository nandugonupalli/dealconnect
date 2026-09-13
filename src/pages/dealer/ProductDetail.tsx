import { useParams, useNavigate } from 'react-router-dom'
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { mockProducts } from '../../data/mockProducts'
import { formatCurrency } from '../../lib/utils'
import { useCart } from '../../context/CartContext'
import { toast } from 'sonner'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const product = mockProducts.find((p) => p.id === id)
  const [qty, setQty] = useState(product?.moq || 1)

  if (!product) {
    return (
      <DashboardLayout>
        <div className="text-center py-16">
          <p>Product not found</p>
        </div>
      </DashboardLayout>
    )
  }

  const handleAdd = () => {
    addItem(product, qty)
    toast.success('Added to cart!')
    navigate('/dealer/cart')
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full aspect-square object-cover"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = 'https://via.placeholder.com/600'
            }}
          />
        </div>

        <div>
          <p className="text-sm text-slate-500 mb-2">{product.manufacturerName}</p>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center space-x-2 mb-4">
            <Star size={20} className="fill-accent-500 text-accent-500" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-slate-500 text-sm">({product.totalReviews} reviews)</span>
          </div>

          <div className="flex items-baseline space-x-3 mb-6">
            <span className="text-3xl font-bold text-primary-800">
              {formatCurrency(product.price)}
            </span>
            <span className="text-lg text-slate-400 line-through">
              {formatCurrency(product.mrp)}
            </span>
            <span className="text-sm text-slate-500">/ {product.unit}</span>
          </div>

          <p className="text-slate-600 mb-6">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="card p-4">
              <p className="text-xs text-slate-500">MOQ</p>
              <p className="font-bold">{product.moq} {product.unit}</p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-slate-500">In Stock</p>
              <p className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQty(Math.max(product.moq, qty - 1))}
                className="p-2 border rounded-lg hover:bg-slate-100"
              >
                <Minus size={18} />
              </button>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="input-field w-24 text-center"
                min={product.moq}
              />
              <button
                onClick={() => setQty(qty + 1)}
                className="p-2 border rounded-lg hover:bg-slate-100"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          <button onClick={handleAdd} className="btn-primary w-full flex items-center justify-center space-x-2">
            <ShoppingCart size={20} />
            <span>Add to Cart — {formatCurrency(product.price * qty)}</span>
          </button>

          <div className="mt-8">
            <h3 className="font-bold mb-3">Specifications</h3>
            <table className="w-full text-sm">
              <tbody>
                {product.specifications.map((s, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2 text-slate-500">{s.key}</td>
                    <td className="py-2 font-medium">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}