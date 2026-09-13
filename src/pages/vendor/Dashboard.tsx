import { Package, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/business/StatCard'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency } from '../../lib/utils'

export default function VendorDashboard() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Sales" value={formatCurrency(user?.totalSales || 0)} icon={DollarSign} color="green" />
        <StatCard title="Active Products" value={user?.totalProducts || 0} icon={Package} color="blue" />
        <StatCard title="Pending Orders" value={0} icon={ShoppingBag} color="amber" />
        <StatCard title="Rating" value={`${user?.rating || 0} ⭐`} icon={TrendingUp} color="purple" />
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <p className="text-slate-500 text-center py-8">
          Start adding products to see analytics here.
        </p>
      </div>
    </DashboardLayout>
  )
}