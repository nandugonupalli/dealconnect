import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { toast } from 'sonner'

export default function AddProduct() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'Grocery',
    price: '',
    mrp: '',
    unit: 'kg',
    moq: '10',
    stock: '100',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Product added successfully!')
    navigate('/vendor/products')
  }

  const update = (k: string, v: string) => setForm({ ...form, [k]: v })

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>
      <div className="card p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="input-field"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            className="input-field"
            rows={3}
            required
          />
          <select
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            className="input-field"
          >
            <option>Grocery</option>
            <option>Hardware</option>
            <option>Electronics</option>
            <option>Stationery</option>
            <option>Food & Beverages</option>
            <option>Home Care</option>
          </select>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => update('price', e.target.value)}
              className="input-field"
              required
            />
            <input
              type="number"
              placeholder="MRP"
              value={form.mrp}
              onChange={(e) => update('mrp', e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Unit (kg/L/pc)"
              value={form.unit}
              onChange={(e) => update('unit', e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              placeholder="MOQ"
              value={form.moq}
              onChange={(e) => update('moq', e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => update('stock', e.target.value)}
              className="input-field"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Add Product
          </button>
        </form>
      </div>
    </DashboardLayout>
  )
}