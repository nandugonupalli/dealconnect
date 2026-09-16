import { Link } from 'react-router-dom'
import { 
  TrendingUp, IndianRupee, Truck, Clock, Shield,
  ArrowRight, Star, CreditCard, Smartphone
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function ForDealers() {
  const benefits = [
    {
      icon: IndianRupee,
      title: 'Save 10-25% on Every Order',
      description: 'Buy directly from manufacturers and cut out middlemen. Wholesale prices guaranteed.',
    },
    {
      icon: Truck,
      title: 'Home Delivery',
      description: 'Get products delivered to your shop. Same-day delivery in metro cities.',
    },
    {
      icon: CreditCard,
      title: 'Credit Facility',
      description: 'Buy now, pay later. Get up to ₹50,000 credit with 15-30 day payment terms.',
    },
    {
      icon: Shield,
      title: 'Verified Manufacturers',
      description: 'All manufacturers are GST-verified. Quality and authenticity guaranteed.',
    },
    {
      icon: Clock,
      title: 'Save 10+ Hours Weekly',
      description: 'No more traveling to markets. Order anytime, from anywhere.',
    },
    {
      icon: Smartphone,
      title: 'Easy Ordering',
      description: 'Order from phone, track in real-time, reorder in one click.',
    },
  ]

  const steps = [
    { step: '1', title: 'Register Free', description: 'Sign up in 2 minutes with your shop details' },
    { step: '2', title: 'Browse Products', description: 'Explore 10,000+ products at wholesale rates' },
    { step: '3', title: 'Place Order', description: 'Add to cart, choose payment, done!' },
    { step: '4', title: 'Get Delivered', description: 'Receive at your shop with tracking' },
  ]

  const testimonials = [
    {
      name: 'Ramesh Kumar',
      shop: 'Ramesh Kirana Store, Delhi',
      text: 'I save ₹15,000 every month by ordering through DealConnect. The delivery is always on time.',
      rating: 5,
    },
    {
      name: 'Suresh Sharma',
      shop: 'Sharma Hardware, Mumbai',
      text: 'Best part is the credit facility. I can stock up during peak season without worrying about cash flow.',
      rating: 5,
    },
    {
      name: 'Priya Singh',
      shop: 'Priya General Store, Bangalore',
      text: 'No more standing in wholesale markets. I order from my phone and get delivery next day.',
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-700 via-secondary-800 to-slate-900 text-white py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium mb-4">
              For Dealers & Shopkeepers
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Stock Your Shop. <span className="text-accent-400">Save More.</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Buy directly from manufacturers at wholesale prices. Save 10-25% on every order with free delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-all"
              >
                <span>Start Shopping Free</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/how-it-works"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 flex items-center justify-center"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why 250+ Dealers Trust Us</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We make it easy for you to stock your shop with quality products at the best prices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <div key={i} className="card p-6 hover:shadow-card-hover transition-all">
                  <div className="w-14 h-14 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="text-secondary-700" size={26} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-slate-600 text-sm">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Saving in 4 Steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-primary-800 text-white rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Dealers Across India</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={18} className="fill-accent-500 text-accent-500" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">"{t.text}"</p>
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.shop}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Save Money?</h2>
          <p className="text-xl text-secondary-100 mb-8">Join free, start ordering, and save 10-25% on every purchase</p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg"
          >
            <span>Register Free — No Fees</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}