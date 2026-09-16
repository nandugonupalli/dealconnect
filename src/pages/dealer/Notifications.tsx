import { useState } from 'react'
import { Package, CreditCard, Info, Check } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'

export default function DealerNotifications() {
  const [filter, setFilter] = useState('all')

  const notifications = [
    { id: '1', title: 'Order Delivered', message: 'Order #DC-2024-0001 has been delivered to your shop', type: 'order', read: false, time: '2 hours ago' },
    { id: '2', title: 'Payment Received', message: 'Payment of ₹12,500 processed successfully', type: 'payment', read: false, time: '5 hours ago' },
    { id: '3', title: 'New Product Alert', message: '5 new products added in Grocery category', type: 'product', read: true, time: '1 day ago' },
    { id: '4', title: 'Order Confirmed', message: 'Order #DC-2024-0002 confirmed by manufacturer', type: 'order', read: true, time: '2 days ago' },
  ]

  const filtered = filter === 'all' ? notifications : notifications.filter((n) => n.type === filter)

  const icons = { order: Package, payment: CreditCard, product: Info, system: Info }
  const colors = {
    order: 'bg-blue-100 text-blue-700',
    payment: 'bg-green-100 text-green-700',
    product: 'bg-purple-100 text-purple-700',
    system: 'bg-slate-100 text-slate-700',
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-slate-600">Stay updated with your orders and payments</p>
        </div>
        <button className="btn-outline flex items-center space-x-2">
          <Check size={16} />
          <span>Mark all as read</span>
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'order', 'payment', 'product'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium text-sm capitalize whitespace-nowrap ${
              filter === f ? 'bg-primary-800 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((n) => {
          const Icon = icons[n.type as keyof typeof icons]
          return (
            <div key={n.id} className={`card p-4 flex items-start space-x-4 ${!n.read ? 'border-l-4 border-primary-800' : ''}`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colors[n.type as keyof typeof colors]}`}>
                <Icon size={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold">{n.title}</h3>
                  <span className="text-xs text-slate-400">{n.time}</span>
                </div>
                <p className="text-sm text-slate-600">{n.message}</p>
              </div>
            </div>
          )
        })}
      </div>
    </DashboardLayout>
  )
}