import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart, LogOut, Sun, Moon, Sparkles } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../context/ThemeContext'
import { getInitials } from '../../lib/utils'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Track scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/for-manufacturers', label: 'For Manufacturers' },
    { to: '/for-dealers', label: 'For Dealers' },
    { to: '/pricing', label: 'Pricing' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm dark:bg-slate-900/90 dark:border-slate-800'
          : 'bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-primary-800 to-primary-900 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-bold text-xl">D</span>
              </motion.div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                DealConnect
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link key={link.to} to={link.to} className="relative">
                  <motion.span
                    whileHover={{ y: -2 }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors block ${
                      isActive
                        ? 'text-primary-800 dark:text-primary-400'
                        : 'text-slate-600 hover:text-primary-800 dark:text-slate-300'
                    }`}
                  >
                    {link.label}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-800 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {user ? (
              <>
                {/* Cart */}
                {user.role === 'dealer' && (
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      to="/dealer/cart"
                      className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors block"
                    >
                      <ShoppingCart size={20} />
                      <AnimatePresence>
                        {totalItems > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                          >
                            {totalItems}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                )}

                {/* Profile Dropdown */}
                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-800 to-primary-900 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md">
                      {getInitials(user.name)}
                    </div>
                  </motion.button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                    <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <div className="p-1">
                      <Link
                        to={dashboardPath}
                        className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-red-50 text-red-600 flex items-center space-x-2 transition-colors"
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
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-primary-800 dark:text-slate-300 font-medium px-4 py-2 transition-colors"
                >
                  Login
                </Link>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/register"
                    className="group relative btn-primary text-sm py-2 flex items-center space-x-2 overflow-hidden"
                  >
                    <Sparkles size={16} className="relative z-10" />
                    <span className="relative z-10">Get Started</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-500 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-slate-200 dark:border-slate-700"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                  },
                }}
                className="py-4 flex flex-col space-y-1"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.to}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      to={link.to}
                      className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg block transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2"
                >
                  {user ? (
                    <>
                      <Link
                        to={dashboardPath}
                        className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg block"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg block"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="btn-primary text-center block"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}