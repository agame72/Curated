import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          Curated
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/account" className="text-sm text-gray-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">Account</Link>
        </nav>
      </div>
    </header>
  )
}
