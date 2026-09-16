import { Link } from 'react-router-dom'
import { 
  TrendingUp, Users, DollarSign, Package, 
  ArrowRight, CheckCircle, BarChart3, Shield,
  Zap, Globe, Truck
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function ForManufacturers() {
  const stats = [
    { value: '250+', label: 'Active Dealers' },
    { value: '5,000+', label: 'Orders Monthly' },
    { value: '₹5Cr+', label: 'Monthly GMV' },
    { value: '7 Days', label: 'Payment Cycle' },
  ]

  const benefits = [
    {
      icon: Users,
      title: 'Reach Thousands of Dealers',
      description: 'Get access to 250+ verified dealers across India. Expand your customer base without hiring a sales team.'
    },
    {
      icon: Zap,
      title: 'Zero Marketing Cost',
      description: 'We bring customers to you. No need to spend on advertising, SEO, or sales outreach.'
    },
    {
      icon: Shield,
      title: 'Guaranteed Payments',
      description: 'Get paid on time, every time. We handle collections and ensure secure payments within 7 days.'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track sales, monitor inventory, and understand demand patterns with our powerful dashboard.'
    },
    {
      icon: Truck,
      title: 'Logistics Support',
      description: 'We handle delivery and logistics. Focus on manufacturing while we handle the rest.'
    },
    {
      icon: Globe,
      title: 'Pan-India Reach',
      description: 'Sell to dealers across 20+ cities. Our network ensures your products reach everywhere.'
    },
  ]

  const steps = [
    { step: '01', title: 'Register Your Company', description: 'Sign up with your company details, GST number, and product categories.' },
    { step: '02', title: 'List Your Products', description: 'Add products with prices, MOQ, and stock. Bulk upload supported.' },
    { step: '03', title: 'Receive Orders', description: 'Get notified about new orders from dealers across the country.' },
    { step: '04', title: 'Ship & Get Paid', description: 'Ship orders and receive payment within 7 days of delivery.' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-900 to-slate-900 text-white py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-accent-500/20 text-accent-400 rounded-full text-sm font-medium mb-4">
                For Manufacturers
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Grow Your Business. Reach More Dealers.
              </h1>
              <p className="text-xl text-slate-200 mb-8">
                Join India's fastest-growing B2B marketplace and connect with 250+ dealers who are looking for quality products like yours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Register as Manufacturer</span>
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/how-it-works"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-bold text-accent-400">{stat.value}</div>
                      <div className="text-sm text-slate-300 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Mobile */}
      <section className="py-8 bg-white border-b border-slate-200 lg:hidden">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-primary-800">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Sell on DealConnect?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Everything you need to grow your business, all in one platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <div key={i} className="card p-6 hover:shadow-card-hover transition-all">
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="text-primary-800" size={26} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-slate-600 text-sm">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How to Start */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Selling in 4 Easy Steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-primary-100 mb-4">{step.step}</div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 text-primary-300" size={24} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="card p-8 lg:p-12 bg-gradient-to-br from-primary-50 to-secondary-50">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-5xl mb-4">🎯</div>
              <blockquote className="text-2xl font-medium text-slate-800 mb-6 italic">
                "DealConnect helped me reach 50+ new dealers in just 3 months. My sales grew 4x compared to last year."
              </blockquote>
              <div className="font-bold">Amit Patel</div>
              <div className="text-slate-600 text-sm">Founder, ABC Industries</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="text-xl text-primary-100 mb-8">Join 30+ manufacturers already selling on DealConnect</p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg"
          >
            <span>Register Now — It's Free</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}