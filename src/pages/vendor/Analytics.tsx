import DashboardLayout from '../../components/layout/DashboardLayout'

export default function VendorAnalytics() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="card p-6">
        <h2 className="font-bold mb-4">Sales Performance</h2>
        <p className="text-slate-500 text-center py-16">
          Analytics will appear once you have sales data.
        </p>
      </div>
    </DashboardLayout>
  )
}