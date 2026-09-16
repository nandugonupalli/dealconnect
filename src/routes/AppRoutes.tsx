import { Routes, Route, Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'

import Home from '../pages/public/Home'
import HowItWorks from '../pages/public/HowItWorks'
import ForManufacturers from '../pages/public/ForManufacturers'
import ForDealers from '../pages/public/ForDealers'
import Pricing from '../pages/public/Pricing'
import Login from '../pages/public/Login'
import Register from '../pages/public/Register'
import NotFound from '../pages/public/NotFound'

import DealerDashboard from '../pages/dealer/Dashboard'
import DealerProducts from '../pages/dealer/Products'
import ProductDetail from '../pages/dealer/ProductDetail'
import Cart from '../pages/dealer/Cart'
import Checkout from '../pages/dealer/Checkout'
import DealerOrders from '../pages/dealer/Orders'
import OrderDetail from '../pages/dealer/OrderDetail'
import DealerPayments from '../pages/dealer/Payments'
import DealerSettings from '../pages/dealer/Settings'

import VendorDashboard from '../pages/vendor/Dashboard'
import VendorProducts from '../pages/vendor/Products'
import AddProduct from '../pages/vendor/AddProduct'
import VendorOrders from '../pages/vendor/Orders'
import VendorPayouts from '../pages/vendor/Payouts'
import VendorAnalytics from '../pages/vendor/Analytics'

import AdminDashboard from '../pages/admin/Dashboard'
import AdminDealers from '../pages/admin/Dealers'
import AdminManufacturers from '../pages/admin/Manufacturers'
import AdminOrders from '../pages/admin/Orders'
import AdminPayments from '../pages/admin/Payments'
import DealerReviews from '../pages/dealer/Reviews'
import DealerNotifications from '../pages/dealer/Notifications'
import DealerSupport from '../pages/dealer/Support'
import VendorReviews from '../pages/vendor/Reviews'
import VendorSettings from '../pages/vendor/Settings'
import AdminAnalytics from '../pages/admin/Analytics'
import AdminSettings from '../pages/admin/Settings'

function Protected({ children, role }: { children: ReactNode; role: string }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800" />
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== role) {
    if (user.role === 'dealer') return <Navigate to="/dealer/dashboard" replace />
    if (user.role === 'manufacturer') return <Navigate to="/vendor/dashboard" replace />
    return <Navigate to="/admin" replace />
  }
  return <>{children}</>
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/for-manufacturers" element={<ForManufacturers />} />
      <Route path="/for-dealers" element={<ForDealers />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dealer/dashboard" element={<Protected role="dealer"><DealerDashboard /></Protected>} />
      <Route path="/dealer/products" element={<Protected role="dealer"><DealerProducts /></Protected>} />
      <Route path="/dealer/product/:id" element={<Protected role="dealer"><ProductDetail /></Protected>} />
      <Route path="/dealer/cart" element={<Protected role="dealer"><Cart /></Protected>} />
      <Route path="/dealer/checkout" element={<Protected role="dealer"><Checkout /></Protected>} />
      <Route path="/dealer/orders" element={<Protected role="dealer"><DealerOrders /></Protected>} />
      <Route path="/dealer/orders/:id" element={<Protected role="dealer"><OrderDetail /></Protected>} />
      <Route path="/dealer/payments" element={<Protected role="dealer"><DealerPayments /></Protected>} />
      <Route path="/dealer/settings" element={<Protected role="dealer"><DealerSettings /></Protected>} />
      <Route path="/dealer/reviews" element={<Protected role="dealer"><DealerReviews /></Protected>} />
      <Route path="/dealer/notifications" element={<Protected role="dealer"><DealerNotifications /></Protected>} />
      <Route path="/dealer/support" element={<Protected role="dealer"><DealerSupport /></Protected>} />

      <Route path="/vendor/dashboard" element={<Protected role="manufacturer"><VendorDashboard /></Protected>} />
      <Route path="/vendor/products" element={<Protected role="manufacturer"><VendorProducts /></Protected>} />
      <Route path="/vendor/products/add" element={<Protected role="manufacturer"><AddProduct /></Protected>} />
      <Route path="/vendor/orders" element={<Protected role="manufacturer"><VendorOrders /></Protected>} />
      <Route path="/vendor/payouts" element={<Protected role="manufacturer"><VendorPayouts /></Protected>} />
      <Route path="/vendor/reviews" element={<Protected role="manufacturer"><VendorReviews /></Protected>} />
      <Route path="/vendor/settings" element={<Protected role="manufacturer"><VendorSettings /></Protected>} />
      <Route path="/vendor/analytics" element={<Protected role="manufacturer"><VendorAnalytics /></Protected>} />

      <Route path="/admin" element={<Protected role="admin"><AdminDashboard /></Protected>} />
      <Route path="/admin/dealers" element={<Protected role="admin"><AdminDealers /></Protected>} />
      <Route path="/admin/manufacturers" element={<Protected role="admin"><AdminManufacturers /></Protected>} />
      <Route path="/admin/analytics" element={<Protected role="admin"><AdminAnalytics /></Protected>} />
      <Route path="/admin/settings" element={<Protected role="admin"><AdminSettings /></Protected>} />
      <Route path="/admin/orders" element={<Protected role="admin"><AdminOrders /></Protected>} />
      <Route path="/admin/payments" element={<Protected role="admin"><AdminPayments /></Protected>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}