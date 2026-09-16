import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const socialIcons = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-800/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-800/20 rounded-full blur-3xl" />

      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-700 to-primary-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-xl font-bold text-white">DealConnect</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              India's smartest B2B marketplace connecting manufacturers directly with dealers.
            </p>
            <div className="flex space-x-3">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary-800 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/for-manufacturers', label: 'For Manufacturers' },
                { to: '/for-dealers', label: 'For Dealers' },
                { to: '/pricing', label: 'Pricing' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent-500 transition-all duration-300 rounded" />
                    <span className="ml-0 group-hover:ml-2 transition-all duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/contact', label: 'Contact Us' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Service' },
                { to: '/faq', label: 'FAQ' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent-500 transition-all duration-300 rounded" />
                    <span className="ml-0 group-hover:ml-2 transition-all duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              {[
                { icon: MapPin, text: '123 Business Park, New Delhi' },
                { icon: Phone, text: '+91 98765 43210' },
                { icon: Mail, text: 'hello@dealconnect.in' },
              ].map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <Icon size={18} className="flex-shrink-0 mt-0.5 text-accent-500" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm"
        >
          <p>© 2026 DealConnect. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center space-x-1">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-red-500"
            >
              ❤️
            </motion.span>
            <span>in India</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}