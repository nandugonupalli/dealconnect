import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import {
  TrendingUp, Users, DollarSign, Package,
  ArrowRight, CheckCircle, BarChart3, Shield,
  Zap, Globe, Truck, Building2, Target, Award,
  LineChart, Percent, Headphones, Rocket
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

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

export default function ForManufacturers() {
  const stats = [
    { value: 250, suffix: '+', label: 'Active Dealers', icon: Users },
    { value: 5000, suffix: '+', label: 'Orders Monthly', icon: Package },
    { value: 5, prefix: '₹', suffix: 'Cr+', label: 'Monthly GMV', icon: TrendingUp },
    { value: 7, suffix: ' Days', label: 'Payment Cycle', icon: DollarSign },
  ]

  const benefits = [
    {
      icon: Users,
      title: 'Reach Thousands of Dealers',
      description: 'Get access to 250+ verified dealers across India. Expand your customer base without hiring a sales team.',
      highlight: '250+ dealers',
    },
    {
      icon: Zap,
      title: 'Zero Marketing Cost',
      description: 'We bring customers to you. No need to spend on advertising, SEO, or sales outreach.',
      highlight: 'Save ₹2L+/year',
    },
    {
      icon: Shield,
      title: 'Guaranteed Payments',
      description: 'Get paid on time, every time. We handle collections and ensure secure payments within 7 days.',
      highlight: '7-day payout',
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track sales, monitor inventory, and understand demand patterns with our powerful dashboard.',
      highlight: 'Live insights',
    },
    {
      icon: Truck,
      title: 'Logistics Support',
      description: 'We handle delivery and logistics. Focus on manufacturing while we handle the rest.',
      highlight: 'Pan-India delivery',
    },
    {
      icon: Globe,
      title: 'Pan-India Reach',
      description: 'Sell to dealers across 20+ cities. Our network ensures your products reach everywhere.',
      highlight: '20+ cities',
    },
  ]

  const steps = [
    {
      step: '01',
      title: 'Register Your Company',
      description: 'Sign up with your company details, GST number, and product categories. Verified in 24 hours.',
      icon: Building2,
    },
    {
      step: '02',
      title: 'List Your Products',
      description: 'Add products with prices, MOQ, and stock. Bulk upload via CSV supported.',
      icon: Package,
    },
    {
      step: '03',
      title: 'Receive Orders',
      description: 'Get notified about new orders from dealers across the country. Accept or reject in one click.',
      icon: Target,
    },
    {
      step: '04',
      title: 'Ship & Get Paid',
      description: 'Ship orders and receive payment within 7 days of delivery. Track everything in your dashboard.',
      icon: DollarSign,
    },
  ]

  const successStories = [
    {
      company: 'ABC Industries',
      founder: 'Amit Patel',
      text: 'DealConnect helped me reach 50+ new dealers in just 3 months. My sales grew 4x compared to last year. The platform handles everything — I just focus on production.',
      growth: '4x',
      period: 'in 3 months',
      category: 'Grocery & Food',
    },
    {
      company: 'XYZ Traders',
      founder: 'Priya Singh',
      text: 'I was spending ₹50,000/month on marketing and sales team. Now I spend nothing and reach more dealers through DealConnect. It\'s a game changer.',
      growth: '₹6L',
      period: 'annual savings',
      category: 'Hardware',
    },
    {
      company: 'PQR Electronics',
      founder: 'Ravi Kumar',
      text: 'Payments are always on time. No more chasing dealers for money. The 7-day payout cycle is exactly what small manufacturers need.',
      growth: '100%',
      period: 'on-time payments',
      category: 'Electronics',
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
                <span>30+ manufacturers already selling</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Grow Your Business.{' '}
                <span className="text-accent-400">Reach More Dealers.</span>
              </h1>
              <p className="text-xl text-slate-200 mb-8 leading-relaxed">
                Join India's fastest-growing B2B marketplace and connect with 250+ dealers who are looking for quality products like yours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/register"
                  className="group bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>Register as Manufacturer</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 flex items-center justify-center"
                >
                  See How It Works
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={18} className="text-accent-400" />
                  <span>Zero listing fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={18} className="text-accent-400" />
                  <span>7-day payouts</span>
                </div>
              </div>
            </div>

            {/* Analytics preview card */}
            <div className="hidden lg:block relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-xs text-slate-300">This month</div>
                    <div className="text-3xl font-bold">₹8,45,200</div>
                  </div>
                  <div className="flex items-center space-x-1 px-3 py-1.5 bg-green-500/20 text-green-300 rounded-full text-sm">
                    <TrendingUp size={16} />
                    <span>+23%</span>
                  </div>
                </div>

                {/* Mini chart */}
                <div className="flex items-end justify-between h-32 mb-4 gap-2">
                  {[35, 45, 40, 55, 50, 65, 70].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-accent-500 to-accent-400 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                  {[
                    { label: 'Orders', value: '42' },
                    { label: 'Dealers', value: '28' },
                    { label: 'Rating', value: '4.7⭐' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="font-bold">{stat.value}</div>
                      <div className="text-xs text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* STATS                                                    */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="text-primary-800" size={22} />
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
            <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              Why Sell With Us
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need to Grow
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              From finding dealers to getting paid — we handle it all
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <div
                  key={i}
                  className="group card p-6 hover:shadow-card-hover hover:border-primary-300 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-primary-100 group-hover:bg-primary-800 rounded-xl flex items-center justify-center transition-colors">
                      <Icon className="text-primary-800 group-hover:text-white transition-colors" size={26} />
                    </div>
                    <span className="text-xs px-2 py-1 bg-accent-50 text-accent-700 rounded-full font-medium">
                      {benefit.highlight}
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
            <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              Get Started
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Start Selling in 4 Easy Steps
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              From registration to first order in under 48 hours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="relative group">
                  <div className="absolute -top-6 left-6 text-7xl font-bold text-primary-100 group-hover:text-primary-200 transition-colors">
                    {step.step}
                  </div>
                  <div className="relative bg-white rounded-xl p-6 border border-slate-200 hover:border-primary-300 hover:shadow-card-hover transition-all">
                    <div className="w-14 h-14 bg-primary-800 rounded-xl flex items-center justify-center mb-4 mt-8">
                      <Icon className="text-white" size={26} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SUCCESS STORIES                                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
              Success Stories
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Manufacturers Growing with DealConnect
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Real results from real manufacturers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, i) => (
              <div key={i} className="card p-6 hover:shadow-card-hover transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-800 rounded-xl flex items-center justify-center text-white font-bold">
                    {story.company.charAt(0)}
                  </div>
                  <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                    {story.category}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-primary-800">{story.growth}</div>
                  <div className="text-xs text-slate-500">{story.period}</div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">
                  "{story.text}"
                </p>
                <div className="pt-4 border-t border-slate-100">
                  <div className="font-bold text-sm">{story.founder}</div>
                  <div className="text-xs text-slate-500">{story.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* COMMISSION TABLE                                         */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Commission Structure</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              No hidden fees. Commission varies by category to keep your margins healthy
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary-800 text-white">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold">Category</th>
                    <th className="text-left py-4 px-6 font-semibold">Commission</th>
                    <th className="text-left py-4 px-6 font-semibold">Settlement</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { cat: 'Grocery & Food', comm: '5%', settle: 'T+7 days' },
                    { cat: 'Home Care', comm: '8%', settle: 'T+7 days' },
                    { cat: 'Stationery', comm: '10%', settle: 'T+7 days' },
                    { cat: 'Hardware', comm: '12%', settle: 'T+7 days' },
                    { cat: 'Electronics', comm: '15%', settle: 'T+7 days' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 px-6 font-medium">{row.cat}</td>
                      <td className="py-4 px-6">
                        <span className="text-primary-800 font-bold text-lg">{row.comm}</span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">{row.settle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm text-slate-500 mt-4">
              Volume discounts available for manufacturers with ₹10L+ monthly sales
            </p>
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
              { icon: Shield, label: 'Secure Payments' },
              { icon: Award, label: 'GST Verified' },
              { icon: LineChart, label: 'Real-time Analytics' },
              { icon: Headphones, label: '24/7 Support' },
              { icon: Rocket, label: 'Fast Payouts' },
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
      {/* FINAL CTA                                                */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-primary-800 via-primary-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join 30+ manufacturers already selling on DealConnect. Registration is free, no listing fees, and you can start selling in 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span>Register Now — It's Free</span>
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
            <div className="flex items-center justify-center space-x-6 text-sm text-primary-200">
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-accent-400" />
                <span>Zero listing fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-accent-400" />
                <span>7-day payouts</span>
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