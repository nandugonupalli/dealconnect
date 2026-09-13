import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/business/StatCard'
import { DollarSign, Clock } from 'lucide-react'
import { formatCurrency } from '../../lib/utils'

export default function AdminPayments() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Commission Earned" value={formatCurrency(250000)} icon={DollarSign} color="green" />
        <StatCard title="Pending Settlements" value={formatCurrency(75000)} icon={Clock} color="amber" />
        <StatCard title="Total GMV" value={formatCurrency(5000000)} icon={DollarSign} color="blue" />
      </div>

      <div className="card p-6">
        <h2 className="font-bold mb-4">Pending Manufacturer Payouts</h2>
        <p className="text-slate-500 text-center py-8">All payouts settled.</p>
      </div>
    </DashboardLayout>
  )
}