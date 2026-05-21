import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="container-xl py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-white mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              BankParser
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Enterprise-grade bank statement parsing for accountants and businesses worldwide.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
                <span className="text-xs">𝕏</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
                <span className="text-xs">in</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/tool" className="text-sm hover:text-white transition-colors">Converter Tool</Link></li>
              <li><Link href="/pricing" className="text-sm hover:text-white transition-colors">Pricing Plans</Link></li>
              <li><Link href="/api-docs" className="text-sm hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="/status" className="text-sm hover:text-white transition-colors">System Status</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="/blog" className="text-sm hover:text-white transition-colors">Learning Hub</Link></li>
              <li><Link href="/blog/pdf-to-excel-bank-statement" className="text-sm hover:text-white transition-colors">PDF to Excel Guide</Link></li>
              <li><Link href="/blog/tally-xml-guide" className="text-sm hover:text-white transition-colors">Tally XML Guide</Link></li>
              <li><Link href="/help" className="text-sm hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="text-sm hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs">© {new Date().getFullYear()} BankParser SaaS. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs">
            <span className="flex items-center gap-1.5 text-green-500">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
