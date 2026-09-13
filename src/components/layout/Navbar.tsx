import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, ShoppingCart, LogOut, Sun, Moon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../context/ThemeContext'
import { getInitials } from '../../lib/utils'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const dashboardPath =
    user?.role === 'dealer'
      ? '/dealer/dashboard'
      : user?.role === 'manufacturer'
      ? '/vendor/dashboard'
      : '/admin'

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">DealConnect</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/how-it-works" className="text-slate-600 hover:text-primary-800 dark:text-slate-300 font-medium">
              How It Works
            </Link>
            <Link to="/for-manufacturers" className="text-slate-600 hover:text-primary-800 dark:text-slate-300 font-medium">
              For Manufacturers
            </Link>
            <Link to="/for-dealers" className="text-slate-600 hover:text-primary-800 dark:text-slate-300 font-medium">
              For Dealers
            </Link>
            <Link to="/pricing" className="text-slate-600 hover:text-primary-800 dark:text-slate-300 font-medium">
              Pricing
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {user ? (
              <>
                {user.role === 'dealer' && (
                  <Link
                    to="/dealer/cart"
                    className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <ShoppingCart size={20} />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                    <div className="w-8 h-8 bg-primary-800 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {getInitials(user.name)}
                    </div>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <div className="p-1">
                      <Link
                        to={dashboardPath}
                        className="block px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-red-50 text-red-600 flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-primary-800 font-medium">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700 flex flex-col space-y-3">
            <Link to="/how-it-works" className="px-4 py-2 hover:bg-slate-100 rounded-lg">
              How It Works
            </Link>
            <Link to="/for-manufacturers" className="px-4 py-2 hover:bg-slate-100 rounded-lg">
              For Manufacturers
            </Link>
            <Link to="/for-dealers" className="px-4 py-2 hover:bg-slate-100 rounded-lg">
              For Dealers
            </Link>
            <Link to="/pricing" className="px-4 py-2 hover:bg-slate-100 rounded-lg">
              Pricing
            </Link>
            {user ? (
              <>
                <Link to={dashboardPath} className="px-4 py-2 hover:bg-slate-100 rounded-lg">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 hover:bg-slate-100 rounded-lg">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-center">
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}