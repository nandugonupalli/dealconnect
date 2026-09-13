import { Users, Package, ShoppingBag, DollarSign } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/business/StatCard'
import { formatCurrency } from '../../lib/utils'

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Active Dealers" value={250} icon={Users} color="blue" />
        <StatCard title="Manufacturers" value={30} icon={Package} color="green" />
        <StatCard title="Total Orders" value={5000} icon={ShoppingBag} color="amber" />
        <StatCard title="Monthly GMV" value={formatCurrency(5000000)} icon={DollarSign} color="purple" />
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            'Dealer ABC placed order #1234 - ₹2,500',
            'Manufacturer XYZ added 5 products',
            'Payment settled to Manufacturer PQR - ₹45,000',
          ].map((a, i) => (
            <div key={i} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-primary-800 rounded-full" />
              <span className="text-sm">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}