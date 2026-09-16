import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCardAdvanced from '../../components/business/StatCardAdvanced'
import { DollarSign, Clock, TrendingUp, Download } from 'lucide-react'
import { formatCurrency, formatDate, getStatusColor } from '../../lib/utils'
import StatusBadge from '../../components/business/StatusBadge'

export default function VendorPayouts() {
  const payouts = [
    { id: 'PO-001', date: '2024-09-10', amount: 45000, status: 'paid', method: 'Bank Transfer', orders: 12 },
    { id: 'PO-002', date: '2024-09-03', amount: 38000, status: 'paid', method: 'Bank Transfer', orders: 10 },
    { id: 'PO-003', date: '2024-08-27', amount: 52000, status: 'paid', method: 'Bank Transfer', orders: 15 },
    { id: 'PO-004', date: '2024-09-16', amount: 28000, status: 'pending', method: 'Bank Transfer', orders: 8 },
  ]

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Payouts</h1>
          <p className="text-slate-600">Track your earnings and settlements</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Download size={16} />
          <span>Download Statement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCardAdvanced title="Total Earned" value={formatCurrency(850000)} icon={DollarSign} trend={23} color="green" />
        <StatCardAdvanced title="Pending Payout" value={formatCurrency(28000)} icon={Clock} color="amber" subtitle="Expected by Sep 18" />
        <StatCardAdvanced title="This Month" value={formatCurrency(125000)} icon={TrendingUp} trend={18} color="blue" />
      </div>

      <div className="card p-6 mb-8 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold mb-1">Next Payout</h3>
            <p className="text-sm text-slate-600">Scheduled for September 18, 2024</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary-800">{formatCurrency(28000)}</div>
            <div className="text-xs text-slate-500">8 orders</div>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold">Payout History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Payout ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Orders</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Method</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4 font-medium">{p.id}</td>
                  <td className="py-4 px-4 text-sm">{formatDate(p.date)}</td>
                  <td className="py-4 px-4 text-sm">{p.orders}</td>
                  <td className="py-4 px-4 font-bold text-primary-800">{formatCurrency(p.amount)}</td>
                  <td className="py-4 px-4 text-sm">{p.method}</td>
                  <td className="py-4 px-4">
                    <StatusBadge status={p.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}