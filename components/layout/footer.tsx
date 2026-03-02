import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 mb-4">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              BankConverter
            </Link>
            <p className="text-sm text-gray-500">Convert bank statements instantly. Fast, secure, and easy.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/tool" className="text-sm text-gray-500 hover:text-gray-900">Converter Tool</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900">Blog</Link></li>
              <li><Link href="/blog/bank-statement-converter" className="text-sm text-gray-500 hover:text-gray-900">Bank Statement Guide</Link></li>
              <li><Link href="/blog/pdf-to-excel-bank-statement" className="text-sm text-gray-500 hover:text-gray-900">PDF to Excel</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/auth/signup" className="text-sm text-gray-500 hover:text-gray-900">Sign Up</Link></li>
              <li><Link href="/auth/login" className="text-sm text-gray-500 hover:text-gray-900">Login</Link></li>
              <li><a href="mailto:support@bankconverter.com" className="text-sm text-gray-500 hover:text-gray-900">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} BankConverter. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-gray-600">Privacy</Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-gray-600">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
