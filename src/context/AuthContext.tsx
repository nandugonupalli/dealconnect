import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, UserRole, RegisterData } from '../types'
import { mockUsers } from '../data/mockUsers'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  register: (data: RegisterData) => Promise<boolean>
  updateProfile: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('dealconnect_user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        localStorage.removeItem('dealconnect_user')
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (user) localStorage.setItem('dealconnect_user', JSON.stringify(user))
    else localStorage.removeItem('dealconnect_user')
  }, [user])

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    const found = mockUsers.find((u) => u.email === email && u.role === role)
    if (found && password === 'demo123') {
      setUser(found)
      setLoading(false)
      return true
    }
    setLoading(false)
    return false
  }

  const register = async (data: RegisterData) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      gstNumber: data.gstNumber,
      verified: true,
      createdAt: new Date().toISOString(),
      ...(data.role === 'dealer' && {
        shopName: data.shopName,
        creditLimit: 25000,
        creditUsed: 0,
        totalOrders: 0,
        totalSpent: 0,
      }),
      ...(data.role === 'manufacturer' && {
        companyName: data.companyName,
        rating: 0,
        totalProducts: 0,
        totalSales: 0,
      }),
    }
    setUser(newUser)
    setLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('dealconnect_user')
  }

  const updateProfile = (data: Partial<User>) => {
    if (user) setUser({ ...user, ...data })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}