import { Link } from 'react-router-dom'
import { 
  UserPlus, Search, ShoppingCart, Truck, CreditCard, 
  CheckCircle, ArrowRight, Package, Users, TrendingUp,
  Shield, Star, Clock, Zap
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { useState } from 'react'

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'dealer' | 'manufacturer'>('dealer')

  const dealerSteps = [
    {
      icon: UserPlus,
      title: 'Register Free',
      description: 'Sign up with your shop details and GST number. Verified in 24 hours.',
      color: 'blue'
    },
    {
      icon: Search,
      title: 'Browse Products',
      description: 'Explore 10,000+ products from verified manufacturers at wholesale prices.',
      color: 'green'
    },
    {
      icon: ShoppingCart,
      title: 'Place Order',
      description: 'Add products to cart, choose quantity, and checkout with multiple payment options.',
      color: 'purple'
    },
    {
      icon: Truck,
      title: 'Get Delivered',
      description: 'Fast delivery to your shop with real-time tracking. Same-day delivery available.',
      color: 'amber'
    }
  ]

  const manufacturerSteps = [
    {
      icon: UserPlus,
      title: 'Register Company',
      description: 'Sign up with company details, GST, and product categories.',
      color: 'blue'
    },
    {
      icon: Package,
      title: 'List Products',
      description: 'Add your products with prices, MOQ, and inventory. Bulk upload supported.',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Receive Orders',
      description: 'Get orders from thousands of dealers across India.',
      color: 'purple'
    },
    {
      icon: CreditCard,
      title: 'Get Paid',
      description: 'Receive payments within 7 days of successful delivery.',
      color: 'amber'
    }
  ]

  const currentSteps = activeTab === 'dealer' ? dealerSteps : manufacturerSteps

  const benefits = [
    { icon: Zap, title: 'Fast Delivery', description: 'Same-day delivery in metro cities' },
    { icon: Shield, title: 'Secure Payments', description: '100% secure payment gateway' },
    { icon: Star, title: 'Verified Sellers', description: 'Every manufacturer is GST verified' },
    { icon: Clock, title: '24/7 Support', description: 'Round-the-clock customer support' }
  ]

  const faqs = [
    {
      question: 'How do I register on DealConnect?',
      answer: 'Click on "Get Started", choose your role (Dealer or Manufacturer), fill in the required details, and verify your email and phone. Registration is completely free.'
    },
    {
      question: 'What are the payment options?',
      answer: 'We accept UPI, Net Banking, Credit/Debit Cards, and offer credit facility for verified dealers with 15-30 day payment terms.'
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 2-3 business days. Same-day delivery is available in select metro cities for orders placed before 11 AM.'
    },
    {
      question: 'Is there a minimum order quantity?',
      answer: 'Yes, each product has a minimum order quantity (MOQ) set by the manufacturer. This is clearly displayed on the product page.'
    },
    {
      question: 'What if I have a quality issue?',
      answer: 'We offer a hassle-free return policy. Raise a dispute within 48 hours of delivery, and we will resolve it or issue a full refund.'
    },
    {
      question: 'How do manufacturers get paid?',
      answer: 'Payments are settled to manufacturers within 7 working days of successful delivery. Our platform takes a small commission of 5-15% based on category.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-900 to-slate-900 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How DealConnect Works
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Simple, transparent, and efficient. Get started in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-xl p-1 shadow-lg border border-slate-200">
              <button
                onClick={() => setActiveTab('dealer')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'dealer'
                    ? 'bg-primary-800 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                For Dealers
              </button>
              <button
                onClick={() => setActiveTab('manufacturer')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'manufacturer'
                    ? 'bg-primary-800 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                For Manufacturers
              </button>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentSteps.map((step, index) => {
              const Icon = step.icon
              const colors = {
                blue: 'bg-blue-100 text-blue-700',
                green: 'bg-green-100 text-green-700',
                purple: 'bg-purple-100 text-purple-700',
                amber: 'bg-amber-100 text-amber-700',
              }
              return (
                <div
                  key={index}
                  className="card p-8 relative hover:shadow-card-hover transition-all"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary-800 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    {index + 1}
                  </div>
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${colors[step.color as keyof typeof colors]}`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose DealConnect?</h2>
          <p className="text-center text-slate-600 mb-12">Trusted by 250+ dealers across India</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center p-6 rounded-xl hover:bg-slate-50 transition-all">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-primary-800" size={28} />
                  </div>
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="card p-6 group cursor-pointer"
              >
                <summary className="font-semibold text-lg flex items-center justify-between list-none">
                  <span>{faq.question}</span>
                  <span className="text-primary-800 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                </summary>
                <p className="mt-4 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-primary-100 mb-8">Join hundreds of businesses already using DealConnect</p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-all"
          >
            <span>Create Free Account</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}