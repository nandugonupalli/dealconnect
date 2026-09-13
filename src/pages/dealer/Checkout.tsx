import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency } from '../../lib/utils'
import { toast } from 'sonner'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [payment, setPayment] = useState('UPI')
  const [address, setAddress] = useState('123 Main Market, Delhi')

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!')
    clearCart()
    navigate('/dealer/orders')
  }

  if (items.length === 0) {
    navigate('/dealer/cart')
    return null
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="font-bold text-lg mb-4">Delivery Address</h2>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-field"
              rows={3}
            />
          </div>

          <div className="card p-6">
            <h2 className="font-bold text-lg mb-4">Payment Method</h2>
            <div className="space-y-3">
              {['UPI', 'Bank Transfer', 'Credit'].map((method) => (
                <label key={method} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={payment === method}
                    onChange={(e) => setPayment(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-slate-600">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span className="text-primary-800">{formatCurrency(total)}</span>
          </div>
          <button onClick={handlePlaceOrder} className="btn-primary w-full">
            Place Order
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}