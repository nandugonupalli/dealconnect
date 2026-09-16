import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const mockData = [
  { month: 'Jan', sales: 45000, orders: 12 },
  { month: 'Feb', sales: 52000, orders: 15 },
  { month: 'Mar', sales: 48000, orders: 14 },
  { month: 'Apr', sales: 61000, orders: 18 },
  { month: 'May', sales: 55000, orders: 16 },
  { month: 'Jun', sales: 67000, orders: 21 },
  { month: 'Jul', sales: 72000, orders: 24 },
  { month: 'Aug', sales: 68000, orders: 22 },
  { month: 'Sep', sales: 85000, orders: 28 },
]

interface SalesChartProps {
  type?: 'line' | 'bar' | 'area'
  data?: any[]
  height?: number
}

export default function SalesChart({ type = 'area', data = mockData, height = 300 }: SalesChartProps) {
  const commonProps = {
    data,
    margin: { top: 10, right: 10, left: 0, bottom: 0 },
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
          <YAxis stroke="#64748B" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Bar dataKey="sales" fill="#1E40AF" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
          <YAxis stroke="#64748B" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Line type="monotone" dataKey="sales" stroke="#1E40AF" strokeWidth={2} dot={{ fill: '#1E40AF', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart {...commonProps}>
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
        <YAxis stroke="#64748B" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Area type="monotone" dataKey="sales" stroke="#1E40AF" strokeWidth={2} fill="url(#colorSales)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}