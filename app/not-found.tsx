import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page not found</h2>
        <p className="text-gray-600 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
          Go home
        </Link>
      </div>
    </div>
  )
}
