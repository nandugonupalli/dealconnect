import { Link } from 'react-router-dom'
import { Check, X, ArrowRight, Crown, Zap, Building2 } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { useState } from 'react'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const commissionTiers = [
    { category: 'Grocery & Food', commission: '5%', volume: 'High volume, low margin' },
    { category: 'Home Care', commission: '8%', volume: 'Steady demand' },
    { category: 'Stationery', commission: '10%', volume: 'Regular repeat orders' },
    { category: 'Hardware', commission: '12%', volume: 'Higher margins' },
    { category: 'Electronics', commission: '15%', volume: 'Premium pricing' },
    { category: 'Specialty Items', commission: 'Custom', volume: 'Contact for rates' },
  ]

  const plans = [
    {
      name: 'Basic',
      icon: Zap,
      price: 0,
      description: 'Perfect for new dealers',
      features: [
        { text: 'Browse all products', included: true },
        { text: 'Place unlimited orders', included: true },
        { text: 'Standard delivery', included: true },
        { text: 'Email support', included: true },
        { text: 'Credit facility', included: false },
        { text: 'Priority delivery', included: false },
        { text: 'Dedicated manager', included: false },
      ],
      cta: 'Get Started Free',
      popular: false,
      color: 'slate',
    },
    {
      name: 'Pro',
      icon: Crown,
      price: billingCycle === 'monthly' ? 499 : 4990,
      description: 'Best for growing businesses',
      features: [
        { text: 'Everything in Basic', included: true },
        { text: 'Credit facility up to ₹50,000', included: true },
        { text: 'Priority delivery', included: true },
        { text: 'Phone + WhatsApp support', included: true },
        { text: 'Bulk order discounts', included: true },
        { text: 'Dedicated manager', included: false },
        { text: 'Custom pricing', included: false },
      ],
      cta: 'Upgrade to Pro',
      popular: true,
      color: 'primary',
    },
    {
      name: 'Enterprise',
      icon: Building2,
      price: 'Custom',
      description: 'For large businesses',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Credit limit up to ₹5,00,000', included: true },
        { text: 'Same-day delivery', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Custom pricing', included: true },
        { text: 'API access', included: true },
        { text: 'Priority 24/7 support', included: true },
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'dark',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-900 to-slate-900 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            No hidden fees. Pay only for what you use. Start free, upgrade as you grow.
          </p>
        </div>
      </section>

      {/* Commission Rates */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">Commission Rates</h2>
          <p className="text-center text-slate-600 mb-12">
            For manufacturers — our commission varies by product category
          </p>
          <div className="card overflow-hidden max-w-4xl mx-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold">Category</th>
                  <th className="text-left py-4 px-6 font-semibold">Commission</th>
                  <th className="text-left py-4 px-6 font-semibold">Note</th>
                </tr>
              </thead>
              <tbody>
                {commissionTiers.map((tier, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-6 font-medium">{tier.category}</td>
                    <td className="py-4 px-6">
                      <span className="text-primary-800 font-bold text-lg">{tier.commission}</span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{tier.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Plan</h2>
          <p className="text-center text-slate-600 mb-8">For dealers — upgrade to unlock more features</p>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'monthly' ? 'bg-white shadow text-primary-800' : 'text-slate-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'yearly' ? 'bg-white shadow text-primary-800' : 'text-slate-600'
                }`}
              >
                Yearly <span className="text-xs text-green-600 ml-1">Save 17%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => {
              const Icon = plan.icon
              return (
                <div
                  key={i}
                  className={`card p-8 relative ${
                    plan.popular ? 'border-2 border-primary-800 shadow-xl lg:-mt-4 lg:mb-4' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-800 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon className="text-primary-800" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-slate-500">{plan.description}</p>
                    </div>
                  </div>

                  <div className="mb-6 pb-6 border-b border-slate-200">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-slate-900">
                        {typeof plan.price === 'number' ? `₹${plan.price}` : plan.price}
                      </span>
                      {typeof plan.price === 'number' && plan.price > 0 && (
                        <span className="text-slate-500 ml-2">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start space-x-3 text-sm">
                        {feature.included ? (
                          <Check size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X size={18} className="text-slate-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-slate-700' : 'text-slate-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/register"
                    className={`block text-center py-3 px-6 rounded-lg font-medium transition-all ${
                      plan.popular
                        ? 'bg-primary-800 text-white hover:bg-primary-900'
                        : 'border-2 border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-primary-100 mb-8">Talk to our team to find the right plan for you</p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg"
          >
            <span>Contact Sales</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}