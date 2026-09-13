import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color?: 'blue' | 'green' | 'amber' | 'purple'
}

export default function StatCard({ title, value, icon: Icon, color = 'blue' }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    amber: 'bg-amber-50 text-amber-700',
    purple: 'bg-purple-50 text-purple-700',
  }
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon size={24} />
        </div>
      </div>
      <h3 className="text-sm text-slate-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  )
}