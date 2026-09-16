import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Order, OrderStatus, TeamNotification } from '../types'
import { mockOrders } from '../data/mockOrders'
import { toast } from 'sonner'

interface OrderContextType {
  orders: Order[]
  notifications: TeamNotification[]
  placeOrder: (data: Partial<Order>) => Order
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string, by?: string) => void
  assignOrder: (orderId: string, teamMember: string) => void
  addNote: (orderId: string, field: 'teamNotes' | 'confirmationCallNote' | 'qualityCheckNote', note: string) => void
  markNotificationRead: (id: string) => void
  getOrdersByStatus: (status: OrderStatus) => Order[]
  getDealerOrders: (dealerId: string) => Order[]
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [notifications, setNotifications] = useState<TeamNotification[]>([])

  // Load from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('dealconnect_orders')
    const savedNotifs = localStorage.getItem('dealconnect_notifications')

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch {
        setOrders(mockOrders)
      }
    } else {
      setOrders(mockOrders)
    }

    if (savedNotifs) {
      try {
        setNotifications(JSON.parse(savedNotifs))
      } catch {
        setNotifications([])
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('dealconnect_orders', JSON.stringify(orders))
    }
  }, [orders])

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('dealconnect_notifications', JSON.stringify(notifications))
    }
  }, [notifications])

  // ═══════════════════════════════════════════════════════════
  // PLACE ORDER
  // ═══════════════════════════════════════════════════════════
  const placeOrder = (data: Partial<Order>): Order => {
    const now = new Date().toISOString()
    const orderNumber = `DC-2026-${String(orders.length + 1).padStart(4, '0')}`

    const newOrder: Order = {
      id: `order_${Date.now()}`,
      orderNumber,
      dealerId: data.dealerId || 'dealer_1',
      dealerName: data.dealerName || 'Dealer',
      dealerPhone: data.dealerPhone || '9876543210',
      dealerShopName: data.dealerShopName || 'My Shop',
      items: data.items || [],
      subtotal: data.subtotal || 0,
      deliveryCharge: data.deliveryCharge || 0,
      discount: data.discount || 0,
      tax: 0,
      total: data.total || 0,
      commission: Math.round((data.total || 0) * 0.05),
      manufacturerPayout: Math.round((data.total || 0) * 0.95),
      status: 'placed',
      paymentStatus: data.paymentStatus || 'pending',
      paymentMethod: data.paymentMethod || 'UPI',
      deliveryAddress: data.deliveryAddress || {
        id: 'addr_1',
        label: 'Shop',
        line1: '123 Main Market',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        isDefault: true,
      },
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      placedAt: now,
      createdAt: now,
      updatedAt: now,
      priority: 'normal',
      timeline: [
        {
          status: 'placed',
          timestamp: now,
          note: 'Order placed by dealer',
          by: data.dealerName || 'Dealer',
          byRole: 'dealer',
        },
      ],
    }

    setOrders((prev) => [newOrder, ...prev])

    // Team notification
    const notification: TeamNotification = {
      id: `notif_${Date.now()}`,
      type: 'new-order',
      orderId: newOrder.id,
      orderNumber: newOrder.orderNumber,
      title: '🆕 New Order Received',
      message: `${newOrder.dealerShopName} placed order ${orderNumber} for ₹${newOrder.total.toLocaleString('en-IN')}`,
      priority: 'high',
      read: false,
      createdAt: now,
    }

    setNotifications((prev) => [notification, ...prev])

    // Auto-advance to team-notified
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === newOrder.id
            ? {
                ...o,
                status: 'team-notified',
                teamNotifiedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                timeline: [
                  ...o.timeline,
                  {
                    status: 'team-notified',
                    timestamp: new Date().toISOString(),
                    note: 'Team notified about new order',
                    by: 'System',
                  },
                ],
              }
            : o
        )
      )
    }, 500)

    toast.success(`Order ${orderNumber} placed!`)
    return newOrder
  }

  // ═══════════════════════════════════════════════════════════
  // UPDATE STATUS
  // ═══════════════════════════════════════════════════════════
  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string, by?: string) => {
    const now = new Date().toISOString()

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order

        return {
          ...order,
          status,
          updatedAt: now,
          timeline: [
            ...order.timeline,
            { status, timestamp: now, note, by: by || 'Admin' },
          ],
        }
      })
    )
  }

  const assignOrder = (orderId: string, teamMember: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, assignedTo: teamMember } : o))
    )
    toast.success(`Assigned to ${teamMember}`)
  }

  const addNote = (
    orderId: string,
    field: 'teamNotes' | 'confirmationCallNote' | 'qualityCheckNote',
    note: string
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, [field]: note } : o))
    )
  }

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getOrdersByStatus = (status: OrderStatus) =>
    orders.filter((o) => o.status === status)

  const getDealerOrders = (dealerId: string) =>
    orders.filter((o) => o.dealerId === dealerId)

  return (
    <OrderContext.Provider
      value={{
        orders,
        notifications,
        placeOrder,
        updateOrderStatus,
        assignOrder,
        addNote,
        markNotificationRead,
        getOrdersByStatus,
        getDealerOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrders must be used within OrderProvider')
  return ctx
}