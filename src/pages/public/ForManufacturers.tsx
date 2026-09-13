import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function ForManufacturers() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-6">For Manufacturers</h1>
        <p className="text-slate-600 text-lg">
          Reach thousands of dealers across India with zero marketing cost.
        </p>
      </div>
      <Footer />
    </div>
  )
}