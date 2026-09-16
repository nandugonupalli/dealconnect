import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Phone } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../context/OrderContext'
import { formatCurrency } from '../../lib/utils'

export default function Checkout() {
  const { items, total, subtotal, deliveryCharge, clearCart } = useCart()
  const { user } = useAuth()
  const { placeOrder } = useOrders()
  const navigate = useNavigate()
  const [payment, setPayment] = useState('UPI')
  const [address, setAddress] = useState('123 Main Market, Delhi')
  const [placing, setPlacing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const handlePlaceOrder = async () => {
    if (items.length === 0) return
    setPlacing(true)
    await new Promise((r) => setTimeout(r, 800))

    try {
      const newOrder = placeOrder({
        dealerId: user?.id || 'dealer_1',
        dealerName: user?.name || 'Dealer',
        dealerPhone: user?.phone || '9876543210',
        dealerShopName: user?.shopName || 'My Shop',
        items: items.map((item) => ({
          productId: item.productId,
          productName: item.product.name,
          productImage: item.product.images[0],
          quantity: item.quantity,
          price: item.price,
          unit: item.product.unit,
          subtotal: item.price * item.quantity,
        })),
        subtotal,
        deliveryCharge,
        discount: 0,
        total,
        paymentStatus: payment === 'Credit' ? 'pending' : 'paid',
        paymentMethod: payment as any,
        deliveryAddress: {
          id: 'addr_1',
          label: 'Shop',
          line1: address,
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001',
          isDefault: true,
        },
      })

      setOrderNumber(newOrder.orderNumber)
      setShowSuccess(true)
      clearCart()

      setTimeout(() => navigate('/dealer/orders'), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setPlacing(false)
    }
  }

  if (items.length === 0 && !showSuccess) {
    navigate('/dealer/cart')
    return null
  }

  if (showSuccess) {
    return (
      <DashboardLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center py-12"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={56} />
          </div>
          <h1 className="text-3xl font-bold mb-3">Order Placed! 🎉</h1>
          <p className="text-slate-600 mb-6">
            Order <span className="font-bold text-primary-800">{orderNumber}</span> placed successfully.
          </p>
          <div className="card p-6 text-left mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <Phone className="text-primary-800" size={20} />
              <span className="font-bold">Our team will call you within 30 minutes</span>
            </div>
            <p className="text-sm text-slate-600">
              Then we'll confirm your order and process it. Track status in "My Orders".
            </p>
          </div>
          <p className="text-sm text-slate-500">Redirecting to orders...</p>
        </motion.div>
      </DashboardLayout>
    )
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
              {['UPI', 'Bank Transfer', 'Credit', 'Cash on Delivery'].map((method) => (
                <label
                  key={method}
                  className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-slate-50 border border-slate-200"
                >
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
          <h2 className="font-bold text-lg mb-4">Summary</h2>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="truncate pr-2">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span className="text-primary-800">{formatCurrency(total)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={placing}
            className="btn-primary w-full"
          >
            {placing ? 'Placing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}