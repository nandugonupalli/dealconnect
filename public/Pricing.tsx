import { Link } from 'react-router-dom'
import { Check, X, ArrowRight, Crown, Zap, Building2, Shield, Headphones, TrendingUp, Star } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { useState } from 'react'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const commissionTiers = [
    { category: 'Grocery & Food', commission: '5%', volume: 'High volume, low margin', icon: '🛒' },
    { category: 'Home Care', commission: '8%', volume: 'Steady demand', icon: '🏠' },
    { category: 'Stationery', commission: '10%', volume: 'Regular repeat orders', icon: '✏️' },
    { category: 'Hardware', commission: '12%', volume: 'Higher margins', icon: '🔧' },
    { category: 'Electronics', commission: '15%', volume: 'Premium pricing', icon: '⚡' },
    { category: 'Specialty Items', commission: 'Custom', volume: 'Contact for rates', icon: '⭐' },
  ]

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: 0,
      description: 'Perfect for new dealers',
      features: [
        { text: 'Browse all products', included: true },
        { text: 'Place unlimited orders', included: true },
        { text: 'Standard delivery', included: true },
        { text: 'Email support', included: true },
        { text: 'Basic analytics', included: true },
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
        { text: 'Everything in Starter', included: true },
        { text: 'Credit facility up to ₹50,000', included: true },
        { text: 'Priority delivery', included: true },
        { text: 'Phone + WhatsApp support', included: true },
        { text: 'Bulk order discounts', included: true },
        { text: 'Advanced analytics', included: true },
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
        { text: 'Custom integrations', included: true },
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'dark',
    },
  ]

  const faqs = [
    {
      q: 'Do I need to pay to register?',
      a: 'No, registration is completely free. You can browse, place orders, and use the platform without paying any fees.',
    },
    {
      q: 'What is the Pro plan?',
      a: 'The Pro plan is for growing dealers who need extra features like credit facility, priority delivery, and bulk discounts. Cancel anytime.',
    },
    {
      q: 'How does the commission work?',
      a: 'For manufacturers, we charge a small commission (5-15%) on each successful order. This is deducted automatically from your payout.',
    },
    {
      q: 'Is there a setup fee?',
      a: 'No setup fees for either dealers or manufacturers. You only pay when you use premium features or make sales.',
    },
    {
      q: 'Can I change plans anytime?',
      a: 'Yes! Upgrade or downgrade your plan anytime. Changes take effect from the next billing cycle.',
    },
    {
      q: 'Do you offer refunds?',
      a: 'Yes, we offer a 7-day money-back guarantee on all paid plans. No questions asked.',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* HERO                                                    */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-slate-900 text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-6">
            <Shield size={16} />
            <span>No hidden fees. Ever.</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Start free, upgrade as you grow. No setup fees, no hidden charges, cancel anytime.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* COMMISSION RATES                                         */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              For Manufacturers
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Commission Rates</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Commission varies by product category to keep your margins healthy
            </p>
          </div>

          <div className="card overflow-hidden max-w-4xl mx-auto">
            <table className="w-full">
              <thead className="bg-primary-800 text-white">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold">Category</th>
                  <th className="text-left py-4 px-6 font-semibold">Commission</th>
                  <th className="text-left py-4 px-6 font-semibold">Note</th>
                </tr>
              </thead>
              <tbody>
                {commissionTiers.map((tier, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-6 font-medium flex items-center space-x-2">
                      <span className="text-xl">{tier.icon}</span>
                      <span>{tier.category}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-primary-800 font-bold text-lg">{tier.commission}</span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{tier.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-sm text-slate-500 mt-4">
            Volume discounts available for manufacturers with ₹10L+ monthly sales
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* PRICING PLANS                                            */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              For Dealers
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Upgrade to unlock premium features. All plans include free registration.
            </p>
          </div>

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
                Yearly
                <span className="text-xs text-green-600 ml-2 px-2 py-0.5 bg-green-50 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => {
              const Icon = plan.icon
              return (
                <div
                  key={i}
                  className={`card p-8 relative transition-all ${
                    plan.popular
                      ? 'border-2 border-primary-800 shadow-2xl lg:-mt-4 lg:mb-4'
                      : 'hover:shadow-card-hover'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-800 to-primary-900 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center space-x-1">
                      <Star size={12} className="fill-accent-400 text-accent-400" />
                      <span>MOST POPULAR</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      plan.popular ? 'bg-primary-800' : 'bg-slate-100'
                    }`}>
                      <Icon className={plan.popular ? 'text-white' : 'text-slate-700'} size={26} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-slate-500">{plan.description}</p>
                    </div>
                  </div>

                  <div className="mb-6 pb-6 border-b border-slate-200">
                    <div className="flex items-baseline">
                      {typeof plan.price === 'number' ? (
                        <>
                          <span className="text-4xl font-bold text-slate-900">
                            ₹{plan.price.toLocaleString('en-IN')}
                          </span>
                          {plan.price > 0 && (
                            <span className="text-slate-500 ml-2">
                              /{billingCycle === 'monthly' ? 'month' : 'year'}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                      )}
                    </div>
                    {plan.price === 0 && (
                      <p className="text-sm text-green-600 mt-2 font-medium">
                        ✓ Free forever
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start space-x-3 text-sm">
                        {feature.included ? (
                          <Check size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X size={18} className="text-slate-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-slate-700' : 'text-slate-400 line-through'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/register"
                    className={`block text-center py-3 px-6 rounded-lg font-medium transition-all ${
                      plan.popular
                        ? 'bg-primary-800 text-white hover:bg-primary-900 shadow-lg'
                        : 'border-2 border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Money back guarantee */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-green-50 border border-green-200 rounded-full text-green-800 text-sm">
              <Shield size={18} />
              <span className="font-medium">7-day money-back guarantee on all paid plans</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* COMPARISON TABLE                                         */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare Plans</h2>
            <p className="text-slate-600">See what's included in each plan</p>
          </div>

          <div className="card overflow-x-auto max-w-4xl mx-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-6 font-semibold">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold">Starter</th>
                  <th className="text-center py-4 px-6 font-semibold bg-primary-50 text-primary-800">Pro</th>
                  <th className="text-center py-4 px-6 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Place orders', starter: true, pro: true, ent: true },
                  { feature: 'Standard delivery', starter: true, pro: true, ent: true },
                  { feature: 'Email support', starter: true, pro: true, ent: true },
                  { feature: 'Priority delivery', starter: false, pro: true, ent: true },
                  { feature: 'Credit facility', starter: false, pro: '₹50K', ent: '₹5L' },
                  { feature: 'Bulk discounts', starter: false, pro: true, ent: true },
                  { feature: 'Dedicated manager', starter: false, pro: false, ent: true },
                  { feature: 'API access', starter: false, pro: false, ent: true },
                  { feature: '24/7 support', starter: false, pro: 'Phone', ent: 'Priority' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-6 font-medium">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {row.starter === true ? <Check size={18} className="text-green-600 inline" /> :
                       row.starter === false ? <X size={18} className="text-slate-300 inline" /> :
                       <span className="text-sm">{row.starter}</span>}
                    </td>
                    <td className="py-4 px-6 text-center bg-primary-50">
                      {row.pro === true ? <Check size={18} className="text-green-600 inline" /> :
                       row.pro === false ? <X size={18} className="text-slate-300 inline" /> :
                       <span className="text-sm font-medium">{row.pro}</span>}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {row.ent === true ? <Check size={18} className="text-green-600 inline" /> :
                       row.ent === false ? <X size={18} className="text-slate-300 inline" /> :
                       <span className="text-sm">{row.ent}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FAQ                                                      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing Questions</h2>
            <p className="text-slate-600">Answers to common questions about our pricing</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="card p-5 group cursor-pointer">
                <summary className="font-semibold flex items-center justify-between list-none">
                  <span className="pr-4">{faq.q}</span>
                  <span className="text-primary-800 group-open:rotate-45 transition-transform text-2xl leading-none flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FINAL CTA                                                */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-primary-800 via-primary-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Talk to our team to find the right plan for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <Headphones size={20} />
                <span>Contact Sales</span>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/30"
              >
                <span>Start Free Trial</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}