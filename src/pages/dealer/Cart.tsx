import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useCart } from '../../context/CartContext'
import { formatCurrency } from '../../lib/utils'
import EmptyState from '../../components/common/EmptyState'

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal, deliveryCharge, total } = useCart()

  if (items.length === 0) {
    return (
      <DashboardLayout>
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Browse products and add items to your cart."
          action={{ label: 'Browse Products', onClick: () => (window.location.href = '/dealer/products') }}
        />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="card p-4 flex gap-4">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-lg"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = 'https://via.placeholder.com/100'
                }}
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{item.product.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{item.product.manufacturerName}</p>
                <p className="font-bold text-primary-800">
                  {formatCurrency(item.price)} / {item.product.unit}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="p-1 border rounded hover:bg-slate-100"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="p-1 border rounded hover:bg-slate-100"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Delivery</span>
              <span className="font-medium">
                {deliveryCharge === 0 ? 'FREE' : formatCurrency(deliveryCharge)}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary-800">{formatCurrency(total)}</span>
            </div>
          </div>
          <Link to="/dealer/checkout" className="btn-primary w-full block text-center">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}