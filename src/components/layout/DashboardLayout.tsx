import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingBag, Package, CreditCard, Settings,
  BarChart3, Users, FileText, LogOut, Menu
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { cn } from '../../lib/utils'
import Navbar from './Navbar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getMenuItems = () => {
    if (user?.role === 'dealer') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dealer/dashboard' },
        { icon: ShoppingBag, label: 'Browse Products', path: '/dealer/products' },
        { icon: Package, label: 'My Orders', path: '/dealer/orders' },
        { icon: CreditCard, label: 'Payments', path: '/dealer/payments' },
        { icon: Settings, label: 'Settings', path: '/dealer/settings' },
      ]
    }
    if (user?.role === 'manufacturer') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/vendor/dashboard' },
        { icon: Package, label: 'My Products', path: '/vendor/products' },
        { icon: ShoppingBag, label: 'Orders', path: '/vendor/orders' },
        { icon: CreditCard, label: 'Payouts', path: '/vendor/payouts' },
        { icon: BarChart3, label: 'Analytics', path: '/vendor/analytics' },
      ]
    }
    if (user?.role === 'admin') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Users, label: 'Dealers', path: '/admin/dealers' },
        { icon: FileText, label: 'Manufacturers', path: '/admin/manufacturers' },
        { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
        { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
      ]
    }
    return []
  }

  const menuItems = getMenuItems()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <div className="flex">
        <aside
          className={cn(
            'fixed lg:sticky top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-transform lg:translate-x-0 overflow-y-auto',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/admin' && location.pathname.startsWith(item.path))
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-800 text-white'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-8"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 min-w-0">
          <div className="p-4 lg:p-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mb-4 p-2 rounded-lg bg-white dark:bg-slate-800 shadow"
            >
              <Menu size={20} />
            </button>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}