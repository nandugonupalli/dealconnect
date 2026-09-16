import DashboardLayout from "../../components/layout/DashboardLayout"
import { useAuth } from "../../context/AuthContext"
export default function VendorSettings() {
  const { user } = useAuth()
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="card p-6"><p>Company: {user?.companyName}</p></div>
    </DashboardLayout>
  )
}
