import DashboardLayout from '../../components/layout/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

export default function DealerSettings() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="card p-6 max-w-2xl">
        <h2 className="font-bold mb-4">Profile Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" defaultValue={user?.name} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" defaultValue={user?.email} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input type="tel" defaultValue={user?.phone} className="input-field" />
          </div>
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>
    </DashboardLayout>
  )
}