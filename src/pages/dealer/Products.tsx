import { useState } from 'react'
import { Search } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import ProductCard from '../../components/business/ProductCard'
import { mockProducts } from '../../data/mockProducts'
import { mockCategories } from '../../data/mockCategories'

export default function DealerProducts() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  const filtered = mockProducts
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => category === 'all' || p.category === category)

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Browse Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="font-bold mb-4">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => setCategory('all')}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                  category === 'all' ? 'bg-primary-800 text-white' : 'hover:bg-slate-100'
                }`}
              >
                All Products
              </button>
              {mockCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.name)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                    category === c.name ? 'bg-primary-800 text-white' : 'hover:bg-slate-100'
                  }`}
                >
                  {c.icon} {c.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field w-48">
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}