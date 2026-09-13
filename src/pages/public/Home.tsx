import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Shield, TrendingUp, Users, Package } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { mockCategories } from '../../data/mockCategories'
import { mockProducts } from '../../data/mockProducts'
import ProductCard from '../../components/business/ProductCard'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-gradient-to-br from-primary-800 via-primary-900 to-slate-900 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              India's Smartest <span className="text-accent-400">B2B Marketplace</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Connect manufacturers directly with local dealers. Better prices, reliable delivery, zero inventory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Start as Dealer</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/register"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 transition-all flex items-center justify-center space-x-2"
              >
                <span>Start as Manufacturer</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: '250+', label: 'Active Dealers' },
              { icon: Package, value: '30+', label: 'Manufacturers' },
              { icon: TrendingUp, value: '5,000+', label: 'Orders Delivered' },
              { icon: Shield, value: '95%', label: 'On-Time Delivery' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="mx-auto mb-3 text-primary-800" size={32} />
                <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">How It Works</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Get started in 3 simple steps
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: '1. Register Free', desc: 'Sign up as a dealer or manufacturer in just 2 minutes.' },
              { icon: Package, title: '2. Browse Products', desc: 'Explore thousands of products at wholesale prices.' },
              { icon: Truck, title: '3. Get Delivered', desc: 'Reliable delivery to your doorstep with tracking.' },
            ].map((step, i) => (
              <div key={i} className="card p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="text-primary-800" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockCategories.map((cat) => (
              <Link
                key={cat.id}
                to="/dealer/products"
                className="card p-6 text-center hover:shadow-card-hover transition-all"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-slate-900 text-sm">{cat.name}</h3>
                <p className="text-xs text-slate-500">{cat.productCount} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Featured Products</h2>
            <Link
              to="/dealer/products"
              className="text-primary-800 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to grow your business?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Join 250+ dealers already saving money with DealConnect
          </p>
          <Link
            to="/register"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-all"
          >
            Join Now — It's Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}