import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { UserRole } from '../../types'
import { toast } from 'sonner'
import { demoCredentials } from '../../data/mockUsers'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('dealer')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const success = await login(email, password, role)
    setLoading(false)
    if (success) {
      toast.success('Login successful!')
      if (role === 'dealer') navigate('/dealer/dashboard')
      else if (role === 'manufacturer') navigate('/vendor/dashboard')
      else navigate('/admin')
    } else {
      toast.error('Invalid credentials. Use demo credentials below.')
    }
  }

  const fillDemo = (cred: (typeof demoCredentials)[0]) => {
    setEmail(cred.email)
    setPassword(cred.password)
    setRole(cred.role.toLowerCase() as UserRole)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-primary-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">D</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">DealConnect</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-600">Sign in to continue</p>
        </div>

        <div className="card p-8">
          <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-lg">
            {(['dealer', 'manufacturer', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium capitalize transition-all ${
                  role === r ? 'bg-white shadow text-primary-800' : 'text-slate-600'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-800 font-medium">
              Register
            </Link>
          </p>
        </div>

        <div className="card p-4 mt-4 bg-slate-50">
          <p className="text-xs font-semibold text-slate-700 mb-2">
            DEMO CREDENTIALS (password: demo123)
          </p>
          <div className="space-y-1">
            {demoCredentials.map((c) => (
              <button
                key={c.email}
                onClick={() => fillDemo(c)}
                className="block w-full text-left text-xs text-slate-600 hover:text-primary-800 p-1 rounded hover:bg-white"
              >
                <span className="font-medium">{c.role}:</span> {c.email}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}