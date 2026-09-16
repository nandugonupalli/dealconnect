import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import {
  TrendingUp, IndianRupee, Truck, Clock, Shield,
  ArrowRight, Star, CreditCard, Smartphone,
  CheckCircle, Award, Users, Package, Headphones,
  Percent, Zap, Calendar, Building2
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

// ────────────────────────────────────────────────────────────
// Animated Counter Component
// ────────────────────────────────────────────────────────────
function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }: {
  end: number; duration?: number; prefix?: string; suffix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = Date.now()
          const tick = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) requestAnimationFrame(tick)
          }
          tick()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  )
}

// ────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────
export default function ForDealers() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const benefits = [
    {
      icon: IndianRupee,
      title: 'Save 10-25% on Every Order',
      description: 'Buy directly from manufacturers and cut out middlemen. Wholesale prices guaranteed on every product.',
      stats: 'Avg. savings ₹15,000/month',
    },
    {
      icon: Truck,
      title: 'Free Home Delivery',
      description: 'Get products delivered to your shop. Same-day delivery in metro cities, next-day everywhere else.',
      stats: 'Delivered to 20+ cities',
    },
    {
      icon: CreditCard,
      title: 'Credit Facility',
      description: 'Buy now, pay later. Get up to ₹50,000 credit with 15-30 day payment terms. No interest for 15 days.',
      stats: 'Pre-approved in 24 hours',
    },
    {
      icon: Shield,
      title: '100% Verified Manufacturers',
      description: 'All manufacturers are GST-verified and quality-audited. Every product comes with a quality guarantee.',
      stats: 'GST + Quality verified',
    },
    {
      icon: Clock,
      title: 'Save 10+ Hours Weekly',
      description: 'No more traveling to wholesale markets. Order anytime from your phone, day or night.',
      stats: 'Order 24/7',
    },
    {
      icon: Smartphone,
      title: 'Easy Mobile Ordering',
      description: 'Order from your phone, track in real-time, reorder your favorites in one click.',
      stats: 'Works on any device',
    },
  ]

  const stats = [
    { value: 250, suffix: '+', label: 'Active Dealers', icon: Users },
    { value: 10000, suffix: '+', label: 'Products', icon: Package },
    { value: 15000, prefix: '₹', label: 'Avg. Monthly Savings', icon: TrendingUp },
    { value: 98, suffix: '%', label: 'On-Time Delivery', icon: Truck },
  ]

  const steps = [
    {
      step: '1',
      title: 'Register Free',
      description: 'Sign up in 2 minutes with your shop details and GST number. No fees, no commitments.',
      icon: Users,
    },
    {
      step: '2',
      title: 'Browse Products',
      description: 'Explore 10,000+ products at wholesale rates. Filter by category, price, or brand.',
      icon: Package,
    },
    {
      step: '3',
      title: 'Place Order',
      description: 'Add to cart, choose payment method (UPI/Credit/COD), and checkout in seconds.',
      icon: CreditCard,
    },
    {
      step: '4',
      title: 'Get Delivered',
      description: 'Track your order in real-time and receive at your shop. Free returns within 48 hours.',
      icon: Truck,
    },
  ]

  const testimonials = [
    {
      name: 'Ramesh Kumar',
      shop: 'Ramesh Kirana Store',
      city: 'Delhi',
      text: 'I save ₹15,000 every month by ordering through DealConnect. The delivery is always on time, and the quality is consistent.',
      rating: 5,
      savings: '₹15,000/month',
    },
    {
      name: 'Suresh Sharma',
      shop: 'Sharma Hardware',
      city: 'Mumbai',
      text: 'Best part is the credit facility. I can stock up during peak season without worrying about cash flow. Game changer for my business.',
      rating: 5,
      savings: '₹22,000/month',
    },
    {
      name: 'Priya Singh',
      shop: 'Priya General Store',
      city: 'Bangalore',
      text: 'No more standing in wholesale markets for hours. I order from my phone and get delivery next day. My time is better spent with customers.',
      rating: 5,
      savings: '₹18,000/month',
    },
    {
      name: 'Mohammed Khan',
      shop: 'Khan Electronics',
      city: 'Hyderabad',
      text: 'The mobile app makes it so easy to browse and compare products. I can check real-time prices and stock while sitting in my shop.',
      rating: 5,
      savings: '₹25,000/month',
    },
  ]

  const faqs = [
    {
      q: 'How quickly can I start ordering?',
      a: 'Immediately! Register with your shop details, verify your email and phone (takes 2 minutes), and start browsing. Your account is activated instantly.',
    },
    {
      q: 'Is there any registration fee?',
      a: 'No, registration is completely free. You only pay for the products you order. There are no hidden charges or monthly fees.',
    },
    {
      q: 'What if I don\'t like a product?',
      a: 'We offer free returns within 48 hours of delivery. If the product doesn\'t meet your expectations, raise a return request and we\'ll pick it up and refund you.',
    },
    {
      q: 'Do you offer credit to new dealers?',
      a: 'Yes! New dealers can apply for credit up to ₹25,000 after the first 3 successful orders. Established dealers get up to ₹50,000 credit limit.',
    },
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* HERO                                                    */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-secondary-700 via-secondary-800 to-slate-900 text-white py-20 lg:py-28 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
                <span>Trusted by 250+ dealers across India</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Stock Your Shop.{' '}
                <span className="text-accent-400">Save More.</span>
              </h1>
              <p className="text-xl text-slate-200 mb-8 leading-relaxed">
                Buy directly from manufacturers at wholesale prices. Save 10-25% on every order with free delivery and credit facility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/register"
                  className="group bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>Start Shopping Free</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 flex items-center justify-center transition-all"
                >
                  How It Works
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={18} className="text-accent-400" />
                  <span>No registration fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={18} className="text-accent-400" />
                  <span>Free returns</span>
                </div>
              </div>
            </div>

            {/* Hero right - floating card */}
            <div className="hidden lg:block relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-300">This month savings</div>
                      <div className="text-2xl font-bold">₹18,500</div>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">
                    +23%
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    { name: 'Basmati Rice', qty: '50 kg', amount: '₹4,250' },
                    { name: 'Sunflower Oil', qty: '20 L', amount: '₹2,900' },
                    { name: 'Tea Powder', qty: '10 kg', amount: '₹2,200' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm bg-white/5 rounded-lg p-3">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-slate-400">{item.qty}</div>
                      </div>
                      <div className="font-bold text-accent-400">{item.amount}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs text-slate-300">Order #DC-2024-0234</div>
                  <div className="flex items-center space-x-1 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>In Transit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* STATS BAR                                                */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="text-secondary-700" size={22} />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">
                    <AnimatedCounter
                      end={stat.value}
                      prefix={stat.prefix || ''}
                      suffix={stat.suffix || ''}
                    />
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* BENEFITS                                                 */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-4">
              Why DealConnect
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why 250+ Dealers Trust Us
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              We make it easy for you to stock your shop with quality products at the best prices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <div
                  key={i}
                  className="group card p-6 hover:shadow-card-hover hover:border-secondary-300 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-secondary-100 group-hover:bg-secondary-700 rounded-xl flex items-center justify-center transition-colors">
                      <Icon className="text-secondary-700 group-hover:text-white transition-colors" size={26} />
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                      {benefit.stats}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* STEPS                                                    */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-4">
              Get Started
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Start Saving in 4 Steps
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              From registration to your first delivery in under 24 hours
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-secondary-200 via-secondary-400 to-secondary-200" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={i} className="text-center relative">
                    <div className="relative inline-block mb-6">
                      <div className="w-24 h-24 bg-white border-4 border-secondary-100 rounded-full flex items-center justify-center mx-auto relative z-10 group-hover:border-secondary-700 transition-all">
                        <Icon className="text-secondary-700" size={32} />
                      </div>
                      <div className="absolute -top-1 -right-1 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-20">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-secondary-700 hover:bg-secondary-800 text-white font-semibold px-8 py-4 rounded-lg transition-all"
            >
              <span>Create Free Account</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SAVINGS CALCULATOR TEASER                                */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-secondary-50 via-white to-primary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
                💰 Savings Calculator
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                See How Much You Can Save
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                On average, dealers save 15-20% on their monthly purchases by switching from traditional wholesale markets to DealConnect.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { label: 'Monthly purchase volume', value: '₹1,00,000' },
                  { label: 'Traditional wholesale price', value: '100%' },
                  { label: 'DealConnect price', value: '82%' },
                  { label: 'Your monthly savings', value: '₹18,000', highlight: true },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      item.highlight
                        ? 'bg-accent-50 border-2 border-accent-200'
                        : 'bg-white border border-slate-200'
                    }`}
                  >
                    <span className="text-slate-700 font-medium">{item.label}</span>
                    <span className={`font-bold ${item.highlight ? 'text-accent-700 text-xl' : 'text-slate-900'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 text-secondary-700 font-semibold hover:text-secondary-800"
              >
                <span>Start saving today</span>
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="relative">
              <div className="card p-8 bg-gradient-to-br from-secondary-700 to-secondary-900 text-white shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <Percent className="text-accent-400" size={32} />
                  <div>
                    <div className="text-sm text-secondary-200">Average savings</div>
                    <div className="text-3xl font-bold">15-20%</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    'Cut out middlemen',
                    'Buy directly from manufacturers',
                    'Volume discounts automatically applied',
                    'No travel costs to wholesale markets',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <CheckCircle className="text-accent-400 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 text-xs text-secondary-200">
                  * Based on average order values from 250+ active dealers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* TESTIMONIALS                                             */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-4">
              Success Stories
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Loved by Dealers Across India
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Real stories from real dealers growing their business with DealConnect
            </p>
          </div>

          {/* Featured testimonial */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="card p-8 lg:p-12 bg-gradient-to-br from-secondary-50 to-primary-50 border-2 border-secondary-100">
              <div className="flex mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={24} className="fill-accent-500 text-accent-500" />
                ))}
              </div>
              <blockquote className="text-xl lg:text-2xl font-medium text-slate-800 mb-6 italic">
                "{testimonials[activeTestimonial].text}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary-700 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonials[activeTestimonial].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonials[activeTestimonial].name}</div>
                    <div className="text-sm text-slate-600">
                      {testimonials[activeTestimonial].shop}, {testimonials[activeTestimonial].city}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-secondary-700">
                    {testimonials[activeTestimonial].savings}
                  </div>
                  <div className="text-xs text-slate-500">Monthly savings</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full transition-all ${
                  i === activeTestimonial ? 'w-8 bg-secondary-700' : 'w-2 bg-slate-300'
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* TRUST BADGES                                             */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-70">
            {[
              { icon: Shield, label: '100% Secure' },
              { icon: Award, label: 'GST Verified' },
              { icon: Truck, label: 'Fast Delivery' },
              { icon: Headphones, label: '24/7 Support' },
              { icon: TrendingUp, label: 'Best Prices' },
            ].map((badge, i) => {
              const Icon = badge.icon
              return (
                <div key={i} className="flex items-center space-x-2 text-slate-600">
                  <Icon size={24} />
                  <span className="font-medium">{badge.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FAQ                                                      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Questions</h2>
            <p className="text-slate-600">Everything you need to know before you start</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="card p-6 group cursor-pointer">
                <summary className="font-semibold text-lg flex items-center justify-between list-none">
                  <span>{faq.q}</span>
                  <span className="text-secondary-700 group-open:rotate-45 transition-transform text-2xl leading-none flex-shrink-0 ml-4">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FINAL CTA                                                */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-secondary-700 via-secondary-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Save Money?
            </h2>
            <p className="text-xl text-secondary-100 mb-8">
              Join 250+ dealers already saving ₹15,000+ every month. Registration is free, and you can start ordering in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span>Register Free — No Fees</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/30"
              >
                <Headphones size={20} />
                <span>Talk to Sales</span>
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-secondary-200">
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-accent-400" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-accent-400" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-accent-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}