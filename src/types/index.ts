// ═══════════════════════════════════════════════════════════
// USER TYPES
// ═══════════════════════════════════════════════════════════

export type UserRole = 'dealer' | 'manufacturer' | 'admin' | 'team' | 'hub'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  verified: boolean
  createdAt: string
  avatar?: string

  // Dealer-specific
  shopName?: string
  creditLimit?: number
  creditUsed?: number
  totalOrders?: number
  totalSpent?: number
  deliveryAddress?: Address

  // Manufacturer-specific
  companyName?: string
  rating?: number
  totalProducts?: number
  totalSales?: number
  categories?: string[]

  // Team member-specific
  teamRole?: 'caller' | 'qc' | 'logistics' | 'manager'
  hubLocation?: string
  assignedOrders?: number
  completedOrders?: number

  // Common
  gstNumber?: string
  address?: string
  isActive?: boolean
}

// ═══════════════════════════════════════════════════════════
// ADDRESS
// ═══════════════════════════════════════════════════════════

export interface Address {
  id: string
  label: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
  landmark?: string
  phone?: string
}

// ═══════════════════════════════════════════════════════════
// PRODUCT
// ═══════════════════════════════════════════════════════════

export interface Product {
  id: string
  name: string
  description: string
  category: string
  subCategory?: string
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
  status: 'active' | 'inactive' | 'pending' | 'out-of-stock'
  tags?: string[]
  createdAt: string
  updatedAt?: string
}

// ═══════════════════════════════════════════════════════════
// CATEGORY
// ═══════════════════════════════════════════════════════════

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  productCount: number
  description?: string
}

// ═══════════════════════════════════════════════════════════
// CART
// ═══════════════════════════════════════════════════════════

export interface CartItem {
  productId: string
  product: Product
  quantity: number
  price: number
}

// ═══════════════════════════════════════════════════════════
// ORDER STATUS — Custom Workflow
// ═══════════════════════════════════════════════════════════
//
// WORKFLOW:
// 1. Dealer places order           → 'placed'
// 2. Team gets notified             → 'team-notified'
// 3. Queued for confirmation call   → 'call-pending'
// 4. Call completed                 → 'call-done'
// 5. Team confirms order            → 'confirmed'
// 6. Order placed with manufacturer → 'sent-to-manufacturer'
// 7. Manufacturer ships to hub      → 'at-hub'
// 8. Quality check passed at hub    → 'quality-checked'
// 9. Out for delivery to dealer     → 'out-for-delivery'
// 10. Delivered to dealer           → 'delivered'
//
// OR cancelled/rejected at any point → 'cancelled' | 'rejected'
// ═══════════════════════════════════════════════════════════

export type OrderStatus =
  | 'placed'                // Dealer just placed order
  | 'team-notified'         // Team notified about new order
  | 'call-pending'          // Waiting for confirmation call
  | 'call-done'             // Call completed, awaiting confirm
  | 'confirmed'             // Team confirmed with dealer
  | 'sent-to-manufacturer'  // Order placed with manufacturer
  | 'at-hub'                // Received at platform hub
  | 'quality-checked'       // QC verified at hub
  | 'out-for-delivery'      // Being delivered to dealer
  | 'delivered'             // Delivered successfully
  | 'cancelled'             // Cancelled by dealer/team
  | 'rejected'              // Rejected by team
  | 'returned'              // Returned by dealer

// ═══════════════════════════════════════════════════════════
// PAYMENT
// ═══════════════════════════════════════════════════════════

export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'partial'
  | 'failed'
  | 'refunded'

export type PaymentMethod =
  | 'UPI'
  | 'Bank Transfer'
  | 'Card'
  | 'Credit'
  | 'Cash on Delivery'
  | 'NEFT'
  | 'RTGS'

// ═══════════════════════════════════════════════════════════
// ORDER ITEMS
// ═══════════════════════════════════════════════════════════

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  mrp?: number
  unit: string
  subtotal: number
  category?: string
}

// ═══════════════════════════════════════════════════════════
// ORDER TIMELINE
// ═══════════════════════════════════════════════════════════

export interface OrderTimeline {
  status: OrderStatus
  timestamp: string
  note?: string
  by?: string             // Who performed the action
  byRole?: UserRole
  metadata?: Record<string, any>
}

// ═══════════════════════════════════════════════════════════
// ORDER — Complete type with team workflow fields
// ═══════════════════════════════════════════════════════════

export interface Order {
  // Identity
  id: string
  orderNumber: string

  // Dealer info
  dealerId: string
  dealerName: string
  dealerPhone: string
  dealerShopName: string
  dealerGST?: string

  // Manufacturer info (assigned after team confirms)
  manufacturerId?: string
  manufacturerName?: string
  manufacturerPhone?: string

  // Team member info
  assignedTo?: string                // Team member name
  assignedToId?: string              // Team member ID
  hubLocation?: string               // Hub where QC happens

  // Items
  items: OrderItem[]

  // Amounts
  subtotal: number
  deliveryCharge: number
  discount: number
  tax?: number
  total: number
  commission: number                 // Platform commission
  manufacturerPayout?: number        // Amount to pay manufacturer

  // Status
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
  paymentReference?: string          // UPI/Transaction ID

  // Delivery
  deliveryAddress: Address
  estimatedDelivery: string
  actualDelivery?: string
  deliveryPartner?: string
  trackingNumber?: string

  // Team notes (workflow-specific)
  teamNotes?: string                 // General internal notes
  callNotes?: string                 // Confirmation call notes
  confirmationCallNote?: string      // Alias for callNotes
  qualityCheckNote?: string          // QC notes
  manufacturerNote?: string          // Note sent to manufacturer
  dealerNote?: string                // Note to dealer

  // Rejection/Cancellation
  rejectionReason?: string
  cancellationReason?: string

  // Timestamps for each stage (optional, for analytics)
  placedAt: string
  teamNotifiedAt?: string
  callPendingAt?: string
  callDoneAt?: string
  confirmedAt?: string
  sentToManufacturerAt?: string
  atHubAt?: string
  qualityCheckedAt?: string
  outForDeliveryAt?: string
  deliveredAt?: string
  cancelledAt?: string
  rejectedAt?: string

  // System
  createdAt: string
  updatedAt: string
  priority?: 'low' | 'normal' | 'high' | 'urgent'

  // Timeline (full audit log)
  timeline: OrderTimeline[]
}

// ═══════════════════════════════════════════════════════════
// TEAM NOTIFICATIONS
// ═══════════════════════════════════════════════════════════

export type NotificationType =
  | 'new-order'              // New order placed
  | 'call-needed'            // Need to call dealer
  | 'manufacturer-confirmed' // Manufacturer accepted
  | 'manufacturer-arrived'   // Package arrived at hub
  | 'quality-check-needed'   // QC required
  | 'quality-check-done'     // QC passed
  | 'delivery-due'           // Ready to deliver
  | 'payment-received'       // Payment credited
  | 'dealer-complaint'       // Dealer issue
  | 'system'                 // System alert

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface TeamNotification {
  id: string
  type: NotificationType
  orderId?: string
  orderNumber?: string
  title: string
  message: string
  priority: NotificationPriority
  read: boolean
  readBy?: string
  actionUrl?: string
  createdAt: string
  expiresAt?: string
}

// ═══════════════════════════════════════════════════════════
// HUB / WAREHOUSE
// ═══════════════════════════════════════════════════════════

export interface Hub {
  id: string
  name: string
  address: Address
  manager: string
  managerPhone: string
  capacity: number
  currentStock: number
  isActive: boolean
  workingHours: string
}

export interface HubInventory {
  hubId: string
  productId: string
  productName: string
  quantity: number
  reserved: number
  available: number
  lastUpdated: string
}

// ═══════════════════════════════════════════════════════════
// TEAM MEMBER
// ═══════════════════════════════════════════════════════════

export interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  teamRole: 'caller' | 'qc' | 'logistics' | 'manager'
  hubLocation?: string
  isActive: boolean
  assignedOrders: number
  completedOrders: number
  avgResolutionTime?: number         // In minutes
  createdAt: string
}

// ═══════════════════════════════════════════════════════════
// REGISTRATION
// ═══════════════════════════════════════════════════════════

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
  categories?: string[]
  pincode?: string
}

// ═══════════════════════════════════════════════════════════
// ANALYTICS / DASHBOARD STATS
// ═══════════════════════════════════════════════════════════

export interface DashboardStats {
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  cancelledOrders: number
  totalRevenue: number
  todayRevenue: number
  monthlyRevenue: number
  avgOrderValue: number
  pendingCalls: number
  ordersAtHub: number
  ordersOutForDelivery: number
  totalDealers: number
  totalManufacturers: number
  topProducts?: { productName: string; quantity: number; revenue: number }[]
  revenueByCategory?: { category: string; revenue: number }[]
}

// ═══════════════════════════════════════════════════════════
// FILTER / SEARCH
// ═══════════════════════════════════════════════════════════

export interface OrderFilters {
  status?: OrderStatus | 'all'
  search?: string
  dealerId?: string
  manufacturerId?: string
  assignedTo?: string
  dateFrom?: string
  dateTo?: string
  minAmount?: number
  maxAmount?: number
  priority?: NotificationPriority
}

export interface ProductFilters {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  manufacturerId?: string
  inStock?: boolean
  sortBy?: 'price-low' | 'price-high' | 'popular' | 'newest' | 'rating'
}

// ═══════════════════════════════════════════════════════════
// API RESPONSE
// ═══════════════════════════════════════════════════════════

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// ═══════════════════════════════════════════════════════════
// WORKFLOW CONFIGURATION
// ═══════════════════════════════════════════════════════════

export interface StatusConfig {
  label: string
  description: string
  color: string          // Tailwind text color class
  bgColor: string        // Tailwind bg color class
  icon: string           // Emoji icon
  nextStatus: OrderStatus | null
  actionLabel?: string   // Button label for team
  isTeamAction: boolean  // Does team need to act?
  estimatedHours: number // Expected time in this state
}

// ═══════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════

export const ORDER_WORKFLOW_STEPS: OrderStatus[] = [
  'placed',
  'team-notified',
  'call-pending',
  'call-done',
  'confirmed',
  'sent-to-manufacturer',
  'at-hub',
  'quality-checked',
  'out-for-delivery',
  'delivered',
]

export const STATUS_LABELS: Record<OrderStatus, string> = {
  'placed': 'Order Placed',
  'team-notified': 'Team Notified',
  'call-pending': 'Call Pending',
  'call-done': 'Call Done',
  'confirmed': 'Confirmed',
  'sent-to-manufacturer': 'With Manufacturer',
  'at-hub': 'At Hub',
  'quality-checked': 'Quality Checked',
  'out-for-delivery': 'Out for Delivery',
  'delivered': 'Delivered',
  'cancelled': 'Cancelled',
  'rejected': 'Rejected',
  'returned': 'Returned',
}

export const HUB_LOCATIONS = [
  'Delhi Hub',
  'Mumbai Hub',
  'Bangalore Hub',
  'Hyderabad Hub',
  'Chennai Hub',
]

export const TEAM_ROLES = {
  caller: 'Confirmation Caller',
  qc: 'Quality Checker',
  logistics: 'Logistics Coordinator',
  manager: 'Team Manager',
} as const