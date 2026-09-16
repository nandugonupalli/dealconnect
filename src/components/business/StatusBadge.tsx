import { ORDER_STATUS_CONFIG } from '../../data/mockOrders'

interface StatusBadgeProps {
  status: string
  size?: 'sm' | 'md' | 'lg'
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = ORDER_STATUS_CONFIG[status]
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  }

  if (!config) {
    return (
      <span className={`inline-flex items-center font-medium rounded-full border ${sizes[size]} bg-slate-100 text-slate-800 border-slate-200 capitalize`}>
        {status.replace('-', ' ')}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center space-x-1 font-medium rounded-full border capitalize ${sizes[size]} ${config.bgColor} ${config.color}`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  )
}