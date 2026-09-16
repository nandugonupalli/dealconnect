import { Link } from 'react-router-dom'
import {
  UserPlus, Search, ShoppingCart, Truck, CreditCard,
  ArrowRight, Package, Users, Shield, Star, Clock, Zap,
  CheckCircle, Headphones, BarChart3, Award, Phone
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
      color: 'blue',
      details: ['Mobile verification', 'GST validation', 'Instant activation'],
    },
    {
      icon: Search,
      title: 'Browse Products',
      description: 'Explore 10,000+ products from verified manufacturers at wholesale prices.',
      color: 'green',
      details: ['Filter by category', 'Compare prices', 'Save favorites'],
    },
    {
      icon: ShoppingCart,
      title: 'Place Order',
      description: 'Add products to cart, choose quantity, and checkout with multiple payment options.',
      color: 'purple',
      details: ['MOQ-based ordering', 'UPI/Card/Credit', 'Instant confirmation'],
    },
    {
      icon: Truck,
      title: 'Get Delivered',
      description: 'Fast delivery to your shop with real-time tracking. Same-day delivery available.',
      color: 'amber',
      details: ['Live tracking', 'Free delivery', '48-hr returns'],
    },
  ]

  const manufacturerSteps = [
    {
      icon: UserPlus,
      title: 'Register Company',
      description: 'Sign up with company details, GST, and product categories. Verified in 24 hours.',
      color: 'blue',
      details: ['Company verification', 'GST validation', 'Bank account setup'],
    },
    {
      icon: Package,
      title: 'List Products',
      description: 'Add your products with prices, MOQ, and inventory. Bulk upload supported.',
      color: 'green',
      details: ['Bulk CSV upload', 'Auto-categorization', 'Image support'],
    },
    {
      icon: Users,
      title: 'Receive Orders',
      description: 'Get orders from thousands of dealers across India.',
      color: 'purple',
      details: ['Instant notifications', 'One-click accept', 'Order management'],
    },
    {
      icon: CreditCard,
      title: 'Get Paid',
      description: 'Receive payments within 7 days of successful delivery.',
      color: 'amber',
      details: ['7-day payout', 'Direct bank transfer', 'Auto-generated invoices'],
    },
  ]

  const currentSteps = activeTab === 'dealer' ? dealerSteps : manufacturerSteps

  const benefits = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Same-day delivery in metro cities, next-day everywhere else',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: '100% secure payment gateway with PCI-DSS compliance',
    },
    {
      icon: Star,
      title: 'Verified Sellers',
      description: 'Every manufacturer is GST-verified and quality-audited',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support via phone, chat, and WhatsApp',
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Track orders, spending, and savings with detailed reports',
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: '100% quality assurance with hassle-free returns',
    },
  ]

  const faqs = [
    {
      question: 'How do I register on DealConnect?',
      answer: 'Click on "Get Started", choose your role (Dealer or Manufacturer), fill in the required details, and verify your email and phone. Registration is completely free and takes less than 2 minutes.',
    },
    {
      question: 'What are the payment options?',
      answer: 'We accept UPI, Net Banking, Credit/Debit Cards, and offer credit facility for verified dealers with 15-30 day payment terms. COD is available for orders up to ₹10,000.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 2-3 business days. Same-day delivery is available in select metro cities for orders placed before 11 AM. You can track your order in real-time.',
    },
    {
      question: 'Is there a minimum order quantity?',
      answer: 'Yes, each product has a minimum order quantity (MOQ) set by the manufacturer. This is clearly displayed on the product page before you add to cart.',
    },
    {
      question: 'What if I have a quality issue?',
      answer: 'We offer a hassle-free return policy. Raise a dispute within 48 hours of delivery, and we will resolve it or issue a full refund. No questions asked.',
    },
    {
      question: 'How do manufacturers get paid?',
      answer: 'Payments are settled to manufacturers within 7 working days of successful delivery. Our platform takes a small commission of 5-15% based on category.',
    },
    {
      question: 'Is my data safe?',
      answer: 'Yes, we use bank-grade encryption and follow industry best practices for data security. Your information is never shared with third parties.',
    },
    {
      question: 'Can I cancel an order?',
      answer: 'Yes, orders can be cancelled before they are shipped. Once shipped, you can refuse delivery or raise a return request within 48 hours.',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* HERO                                                    */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-slate-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-6">
              <Clock size={16} />
              <span>Get started in just 2 minutes</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              How DealConnect Works
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              Simple, transparent, and efficient. From registration to delivery — here's how it all comes together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="group bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl"
              >
                <span>Get Started Free</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/pricing"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 flex items-center justify-center"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* TAB SWITCHER + STEPS                                     */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container-custom">
          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-xl p-1.5 shadow-lg border border-slate-200">
              <button
                onClick={() => setActiveTab('dealer')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'dealer'
                    ? 'bg-primary-800 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <ShoppingCart size={18} />
                  <span>For Dealers</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('manufacturer')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'manufacturer'
                    ? 'bg-primary-800 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Package size={18} />
                  <span>For Manufacturers</span>
                </span>
              </button>
            </div>
          </div>

          {/* Steps */}
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
                  className="card p-6 relative hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary-800 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 mt-2 ${colors[step.color as keyof typeof colors]}`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{step.description}</p>
                  <ul className="space-y-1.5 pt-4 border-t border-slate-100">
                    {step.details.map((detail, j) => (
                      <li key={j} className="flex items-center space-x-2 text-xs text-slate-500">
                        <CheckCircle size={12} className="text-green-600 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-primary-800 hover:bg-primary-900 text-white font-semibold px-8 py-4 rounded-lg transition-all"
            >
              <span>Create Your Free Account</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* BENEFITS                                                 */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose DealConnect?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Trusted by 250+ dealers and 30+ manufacturers across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={index}
                  className="group flex items-start space-x-4 p-6 rounded-xl hover:bg-slate-50 transition-all"
                >
                  <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary-800 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="text-primary-800 group-hover:text-white transition-colors" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* VIDEO / DEMO TEASER                                      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 lg:p-12 bg-gradient-to-br from-primary-800 to-primary-900 text-white text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="text-accent-400" size={32} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                See It In Action
              </h2>
              <p className="text-primary-100 mb-8 max-w-xl mx-auto">
                Watch how dealers and manufacturers use DealConnect to grow their business
              </p>
              <button className="inline-flex items-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-all">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full ml-0.5" />
                </div>
                <span>Watch 2-min Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FAQ                                                      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600">
              Everything you need to know about DealConnect
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={index} className="card p-5 group cursor-pointer">
                <summary className="font-semibold flex items-center justify-between list-none">
                  <span className="pr-4">{faq.question}</span>
                  <span className="text-primary-800 group-open:rotate-45 transition-transform text-2xl leading-none flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed text-sm">{faq.answer}</p>
              </details>
            ))}
          </div>

          {/* Still have questions */}
          <div className="text-center mt-12 p-8 rounded-xl bg-slate-50 border border-slate-200">
            <Headphones className="mx-auto text-primary-800 mb-3" size={32} />
            <h3 className="font-bold mb-2">Still have questions?</h3>
            <p className="text-slate-600 text-sm mb-4">
              Our team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-primary-800 hover:bg-primary-900 text-white font-medium px-5 py-2.5 rounded-lg text-sm"
              >
                <Phone size={16} />
                <span>Contact Support</span>
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2.5 rounded-lg text-sm"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FINAL CTA                                                */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-primary-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already using DealConnect to save money and grow faster
          </p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            <span>Create Free Account</span>
            <ArrowRight size={20} />
          </Link>
          <div className="flex items-center justify-center space-x-6 text-sm text-primary-200 mt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-accent-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-accent-400" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}