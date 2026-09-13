import DashboardLayout from '../../components/layout/DashboardLayout'
import { formatCurrency } from '../../lib/utils'
import StatCard from '../../components/business/StatCard'
import { DollarSign, Clock, TrendingUp } from 'lucide-react'

export default function VendorPayouts() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Payouts</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Earned" value={formatCurrency(850000)} icon={DollarSign} color="green" />
        <StatCard title="Pending" value={formatCurrency(45000)} icon={Clock} color="amber" />
        <StatCard title="This Month" value={formatCurrency(125000)} icon={TrendingUp} color="blue" />
      </div>

      <div className="card p-6">
        <h2 className="font-bold mb-4">Recent Payouts</h2>
        <p className="text-slate-500 text-center py-8">No payouts yet.</p>
      </div>
    </DashboardLayout>
  )
}