import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="text-slate-600 mb-6">The page you are looking for doesn't exist.</p>
        <Link to="/" className="btn-primary inline-block">
          Go Home
        </Link>
      </div>
    </div>
  )
}