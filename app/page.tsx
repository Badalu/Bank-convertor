import type { Metadata } from 'next'
import Link from 'next/link'
import { UploadTool } from '@/components/ui/upload-tool'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Bank Statement Converter - PDF to Excel & CSV Online Free',
  description: 'Convert bank statement PDF to Excel or CSV instantly. Free online bank statement converter. Extract transactions from any bank in seconds. No signup required.',
  keywords: 'bank statement converter, pdf to excel bank statement, convert bank statement to csv, bank statement analyzer, pdf bank statement to excel free',
}

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Parse hundreds of transactions in under 3 seconds. Our optimized engine handles any bank format.',
  },
  {
    icon: '🏦',
    title: 'Any Bank, Any Format',
    description: 'Works with PDF, CSV, and Excel statements from all major banks worldwide.',
  },
  {
    icon: '📊',
    title: 'Clean Data Output',
    description: 'Get perfectly formatted transactions with Date, Description, Debit, Credit, and Balance columns.',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Files are processed in memory and never stored. Your financial data stays private.',
  },
  {
    icon: '📥',
    title: 'Export Anywhere',
    description: 'Download as Excel (.xlsx) or CSV. Import directly into QuickBooks, Xero, or any accounting software.',
  },
  {
    icon: '🆓',
    title: 'Free to Try',
    description: 'No signup needed for the first 2 pages. Create a free account for 5 pages per day.',
  },
]

const steps = [
  { step: '01', title: 'Upload', desc: 'Drag & drop your PDF, CSV, or Excel bank statement.' },
  { step: '02', title: 'Parse', desc: 'Our engine instantly extracts all transactions.' },
  { step: '03', title: 'Review', desc: 'Preview transactions in a clean, organized table.' },
  { step: '04', title: 'Download', desc: 'Export as Excel or CSV with one click.' },
]

const faqs = [
  {
    q: 'Which banks are supported?',
    a: 'Our bank statement converter works with statements from all major banks including Chase, Bank of America, Wells Fargo, Citibank, HDFC, SBI, Barclays, HSBC, and hundreds more. If your bank exports PDF, CSV, or Excel statements, we can convert them.',
  },
  {
    q: 'Is my financial data secure?',
    a: 'Yes. Files are processed entirely in memory using server-side parsing. We never store your statement files on our servers. Your financial data is private and deleted immediately after conversion.',
  },
  {
    q: 'What file formats are supported?',
    a: 'We support PDF (.pdf), Excel (.xlsx, .xls), and CSV (.csv) bank statements. The tool automatically detects the format and applies the optimal parsing strategy.',
  },
  {
    q: 'How many transactions can it handle?',
    a: 'Our parser can handle statements with thousands of transactions. There\'s no limit on the number of transactions per file — only on the number of pages processed per day based on your plan.',
  },
  {
    q: 'Can I use this for accounting software?',
    a: 'Absolutely! The CSV and Excel exports are formatted to be directly importable into QuickBooks, Xero, FreshBooks, Wave, and most accounting tools.',
  },
  {
    q: 'What are the usage limits?',
    a: 'Guest users get 2 pages per day. Free accounts get 5 pages per day. Paid plans start at $9/month for 50 pages. See our pricing page for details.',
  },
]

export default async function Home() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Free to use · No signup required
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
              Bank Statement{' '}
              <span className="text-blue-600">Converter</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Convert PDF bank statements to Excel or CSV instantly.
              Extract transactions from any bank in seconds — free.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">✓ PDF to Excel</span>
              <span className="flex items-center gap-1">✓ PDF to CSV</span>
              <span className="flex items-center gap-1">✓ All banks supported</span>
              <span className="flex items-center gap-1">✓ 100% secure</span>
            </div>
          </div>

          {/* Upload Tool */}
          <UploadTool userId={user?.id} />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to convert bank statements</h2>
            <p className="mt-4 text-lg text-gray-600">The fastest online bank statement converter with professional-grade features.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all bg-white">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
            <p className="mt-4 text-gray-600">Convert your bank statement in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-3/4 w-1/2 h-0.5 bg-blue-200 z-0" />
                )}
                <div className="relative z-10 w-16 h-16 bg-blue-600 text-white text-lg font-bold rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Need more pages?</h2>
          <p className="mt-4 text-lg text-gray-600">Upgrade to a paid plan for higher limits and priority processing.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
              View Pricing Plans
            </Link>
            <Link href="/auth/signup" className="inline-flex items-center justify-center px-8 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Links */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Learn more</h2>
            <p className="mt-4 text-gray-600">Guides and tips for working with bank statements</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { slug: 'bank-statement-converter', title: 'Complete Guide to Bank Statement Converters', desc: 'Everything you need to know about converting bank statements to digital formats.' },
              { slug: 'pdf-to-excel-bank-statement', title: 'How to Convert PDF Bank Statement to Excel', desc: 'Step-by-step guide to converting PDF bank statements to Excel spreadsheets.' },
              { slug: 'convert-bank-statement-online', title: 'Best Tools to Convert Bank Statements Online', desc: 'Compare the top online tools for converting bank statements in 2024.' },
            ].map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-2">Blog</div>
                <h3 className="font-semibold text-gray-900 mb-2 leading-snug">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.desc}</p>
                <span className="text-blue-600 text-sm mt-3 inline-block">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-gray-100 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start converting bank statements for free</h2>
          <p className="text-blue-100 text-lg mb-8">No signup required. Upload your first statement in seconds.</p>
          <Link href="/tool" className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
            Try the Converter Now
          </Link>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'BankConverter',
            description: 'Online bank statement converter. Convert PDF to Excel or CSV instantly.',
            applicationCategory: 'FinanceApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            operatingSystem: 'Web Browser',
          }),
        }}
      />
    </div>
  )
}
