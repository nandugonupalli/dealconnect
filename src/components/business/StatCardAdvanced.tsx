import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../../lib/utils'

interface StatCardAdvancedProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: number
  trendLabel?: string
  color?: 'blue' | 'green' | 'amber' | 'purple' | 'red'
  subtitle?: string
}

export default function StatCardAdvanced({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  color = 'blue',
  subtitle,
}: StatCardAdvancedProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    green: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    red: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }

  return (
    <div className="card p-6 hover:shadow-card-hover transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-3 rounded-lg', colors[color])}>
          <Icon size={24} />
        </div>
        {trend !== undefined && (
          <div
            className={cn(
              'flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full',
              trend >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            )}
          >
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-sm text-slate-500 dark:text-slate-400 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{value}</p>
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      {trendLabel && <p className="text-xs text-slate-500 mt-2">{trendLabel}</p>}
    </div>
  )
}
