import { Link } from 'react-router-dom'
import { Star, ShoppingCart } from 'lucide-react'
import { Product } from '../../types'
import { formatCurrency } from '../../lib/utils'
import { useCart } from '../../context/CartContext'
import { toast } from 'sonner'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, product.moq)
    toast.success(`${product.name} added to cart`)
  }

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100)

  return (
    <Link to={`/dealer/product/${product.id}`} className="group">
      <div className="card overflow-hidden hover:shadow-card-hover transition-all">
        <div className="relative aspect-square bg-slate-100 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src =
                'https://via.placeholder.com/400?text=' + product.name
            }}
          />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {discount}% OFF
            </span>
          )}
          <button
            onClick={handleAdd}
            className="absolute bottom-3 right-3 bg-primary-800 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-xs text-slate-500 mb-1">{product.manufacturerName}</p>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-800">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 mb-2">
            <Star size={14} className="fill-accent-500 text-accent-500" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-slate-500">({product.totalReviews})</span>
          </div>
          <div className="flex items-baseline space-x-2 mb-3">
            <span className="text-lg font-bold text-primary-800">
              {formatCurrency(product.price)}
            </span>
            <span className="text-sm text-slate-400 line-through">
              {formatCurrency(product.mrp)}
            </span>
            <span className="text-xs text-slate-500">/ {product.unit}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>MOQ: {product.moq}</span>
            <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}