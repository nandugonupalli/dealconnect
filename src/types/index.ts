export type UserRole = 'dealer' | 'manufacturer' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  verified: boolean
  createdAt: string
  shopName?: string
  companyName?: string
  gstNumber?: string
  creditLimit?: number
  creditUsed?: number
  totalOrders?: number
  totalSpent?: number
  rating?: number
  totalProducts?: number
  totalSales?: number
}

export interface Address {
  id: string
  label: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

export interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  mrp: number
  unit: string
  moq: number
  stock: number
  images: string[]
  manufacturerId: string
  manufacturerName: string
  rating: number
  totalReviews: number
  specifications: { key: string; value: string }[]
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  productCount: number
}

export interface CartItem {
  productId: string
  product: Product
  quantity: number
  price: number
}

export type OrderStatus =
  | 'pending' | 'confirmed' | 'processing' | 'shipped'
  | 'out-for-delivery' | 'delivered' | 'cancelled' | 'returned'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  subtotal: number
}

export interface Order {
  id: string
  orderNumber: string
  dealerId: string
  dealerName: string
  manufacturerId: string
  manufacturerName: string
  items: OrderItem[]
  subtotal: number
  deliveryCharge: number
  discount: number
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: string
  deliveryAddress: Address
  estimatedDelivery: string
  createdAt: string
  updatedAt: string
  timeline: { status: OrderStatus; timestamp: string; note?: string }[]
}

export interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
  role: UserRole
  shopName?: string
  companyName?: string
  address?: string
  gstNumber?: string
}