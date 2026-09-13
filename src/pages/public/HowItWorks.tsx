import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-6">How It Works</h1>
        <p className="text-slate-600 text-lg">
          Learn how DealConnect connects manufacturers and dealers seamlessly.
        </p>
      </div>
      <Footer />
    </div>
  )
}