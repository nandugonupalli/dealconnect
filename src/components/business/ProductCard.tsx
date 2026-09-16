import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/dealer/product/${product.id}`} className="block group">
        <div className="card overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary-200">
          <div className="relative aspect-square bg-slate-100 overflow-hidden">
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              onError={(e) => {
                ;(e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/400?text=' + product.name
              }}
            />

            {/* Discount Badge */}
            {discount > 0 && (
              <motion.span
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-3 left-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg"
              >
                {discount}% OFF
              </motion.span>
            )}

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAdd}
              initial={{ scale: 0, rotate: -180 }}
              whileHover={{ scale: 1.15, rotate: 0 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-3 right-3 bg-primary-800 text-white p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary-900"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </motion.button>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-4">
            <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">
              {product.manufacturerName}
            </p>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-800 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-3">
              <Star size={14} className="fill-accent-500 text-accent-500" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-slate-500">({product.totalReviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-2 mb-3">
              <span className="text-lg font-bold text-primary-800">
                {formatCurrency(product.price)}
              </span>
              <span className="text-sm text-slate-400 line-through">
                {formatCurrency(product.mrp)}
              </span>
              <span className="text-xs text-slate-500">/ {product.unit}</span>
            </div>

            {/* MOQ + Stock */}
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">MOQ: {product.moq}</span>
              <span
                className={
                  product.stock > 0
                    ? 'text-green-600 font-medium'
                    : 'text-red-600 font-medium'
                }
              >
                {product.stock > 0 ? '✓ In Stock' : '✗ Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}