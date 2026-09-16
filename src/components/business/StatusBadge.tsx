import { getStatusColor } from '../../lib/utils'

interface StatusBadgeProps {
  status: string
  size?: 'sm' | 'md' | 'lg'
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border capitalize ${sizes[size]} ${getStatusColor(status)}`}
    >
      {status.replace('-', ' ')}
    </span>
  )
}