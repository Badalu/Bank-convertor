'use client'
import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface NavbarProps {
  user?: { email?: string } | null
}

export function Navbar({ user }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="hidden sm:block">BankConverter</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/tool" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Tool</Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Blog</Link>
          </div>

          {/* Auth */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard" className="hidden sm:block text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
                <button onClick={handleLogout} className="text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900">Sign in</Link>
                <Link href="/auth/signup" className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Get started
                </Link>
              </>
            )}
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1">
            <Link href="/tool" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Tool</Link>
            <Link href="/pricing" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Pricing</Link>
            <Link href="/blog" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Blog</Link>
            {user && <Link href="/dashboard" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Dashboard</Link>}
          </div>
        )}
      </nav>
    </header>
  )
}
