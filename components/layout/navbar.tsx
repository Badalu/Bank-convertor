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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
      <nav className="container-xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 group">
            <div className="w-9 h-9 bg-slate-900 text-white rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/10">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="hidden sm:block tracking-tight text-lg">Bank<span className="text-blue-600">Parser</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: 'Converter Tool', href: '/tool' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'API Docs', href: '/api-docs' },
              { label: 'Guides', href: '/blog' },
            ].map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard" className="hidden sm:inline-flex items-center text-sm font-semibold text-slate-700 hover:text-blue-600 px-3 py-2">
                  My Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-sm font-bold text-slate-900 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="hidden sm:inline-flex text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2">
                  Login
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="text-sm font-bold px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                >
                  Get Started
                </Link>
              </>
            )}
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 space-y-1 animate-fade-in">
            {[
              { label: 'Converter Tool', href: '/tool' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Blog', href: '/blog' },
            ].map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl"
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Link href="/dashboard" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl">
                Dashboard
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
