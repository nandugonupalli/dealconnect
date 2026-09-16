import { useState, useRef, useEffect } from 'react'
import { Bell, Package, CreditCard, Info, X, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Notification {
  id: string
  title: string
  message: string
  type: 'order' | 'payment' | 'product' | 'system'
  read: boolean
  createdAt: string
  link?: string
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Order Delivered',
      message: 'Order #DC-2024-0001 has been delivered',
      type: 'order',
      read: false,
      createdAt: '2 hours ago',
      link: '/dealer/orders/order_1',
    },
    {
      id: '2',
      title: 'Payment Received',
      message: 'Payment of ₹12,500 received from Ramesh Kirana Store',
      type: 'payment',
      read: false,
      createdAt: '5 hours ago',
    },
    {
      id: '3',
      title: 'New Product Added',
      message: '5 new products added in Grocery category',
      type: 'product',
      read: true,
      createdAt: '1 day ago',
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const icons = {
    order: Package,
    payment: CreditCard,
    product: Info,
    system: Info,
  }

  const colors = {
    order: 'bg-blue-100 text-blue-700',
    payment: 'bg-green-100 text-green-700',
    product: 'bg-purple-100 text-purple-700',
    system: 'bg-slate-100 text-slate-700',
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-bold">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-primary-800 hover:underline flex items-center space-x-1"
              >
                <Check size={12} />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                No notifications
              </div>
            ) : (
              notifications.map((n) => {
                const Icon = icons[n.type]
                return (
                  <div
                    key={n.id}
                    className={`flex items-start space-x-3 p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer ${
                      !n.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                    }`}
                    onClick={() => markAsRead(n.id)}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors[n.type]}`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="font-medium text-sm">{n.title}</div>
                        {!n.read && <div className="w-2 h-2 bg-primary-800 rounded-full flex-shrink-0 mt-1.5" />}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{n.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{n.createdAt}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <div className="p-3 border-t border-slate-200 dark:border-slate-700 text-center">
            <button className="text-sm text-primary-800 font-medium hover:underline">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  )
}