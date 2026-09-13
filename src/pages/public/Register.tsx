import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { UserRole } from '../../types'
import { toast } from 'sonner'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'dealer' as UserRole,
    shopName: '',
    companyName: '',
    gstNumber: '',
  })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await register(formData)
    setLoading(false)
    toast.success('Registration successful!')
    if (formData.role === 'dealer') navigate('/dealer/dashboard')
    else navigate('/vendor/dashboard')
  }

  const update = (field: string, value: string) =>
    setFormData({ ...formData, [field]: value })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-primary-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">D</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">DealConnect</span>
          </Link>
          <h1 className="text-2xl font-bold">Create Your Account</h1>
        </div>

        <div className="card p-8">
          <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-lg">
            {(['dealer', 'manufacturer'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => update('role', r)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  formData.role === r ? 'bg-white shadow text-primary-800' : 'text-slate-600'
                }`}
              >
                {r === 'dealer' ? 'I am a Dealer' : 'I am a Manufacturer'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => update('name', e.target.value)}
              className="input-field"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => update('email', e.target.value)}
              className="input-field"
              required
            />
            <input
              type="tel"
              placeholder="Phone (10 digits)"
              value={formData.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="input-field"
              required
            />
            {formData.role === 'dealer' ? (
              <input
                type="text"
                placeholder="Shop Name"
                value={formData.shopName}
                onChange={(e) => update('shopName', e.target.value)}
                className="input-field"
                required
              />
            ) : (
              <input
                type="text"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={(e) => update('companyName', e.target.value)}
                className="input-field"
                required
              />
            )}
            <input
              type="text"
              placeholder="GST Number (optional)"
              value={formData.gstNumber}
              onChange={(e) => update('gstNumber', e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password (min 6 chars)"
              value={formData.password}
              onChange={(e) => update('password', e.target.value)}
              className="input-field"
              required
              minLength={6}
            />
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-800 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}