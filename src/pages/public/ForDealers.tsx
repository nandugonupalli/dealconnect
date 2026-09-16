import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function ForDealers() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-6">For Dealers</h1>
        <p className="text-slate-600 text-lg">
          Get better prices, home delivery, and credit facilities.
        </p>
      </div>
      <Footer />
    </div>
  )
}