import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-xl font-bold text-white">DealConnect</span>
            </div>
            <p className="text-sm">
              India's smartest B2B marketplace connecting manufacturers directly with dealers.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/how-it-works" className="hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/for-manufacturers" className="hover:text-white">
                  For Manufacturers
                </Link>
              </li>
              <li>
                <Link to="/for-dealers" className="hover:text-white">
                  For Dealers
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📍 123 Business Park, New Delhi</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ hello@dealconnect.in</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          <p>© 2024 DealConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}