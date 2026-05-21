import type { Metadata } from 'next'
import Link from 'next/link'
import { UploadTool } from '@/components/ui/upload-tool'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Bank Statement Converter - PDF to Excel, CSV & Tally Online Free',
  description: 'Fastest online bank statement converter. Convert PDF statements to Excel, CSV, or Tally XML instantly. Extract transactions from any bank worldwide with 100% accuracy. Free to try.',
  keywords: 'bank statement converter, pdf to excel, bank statement to csv, tally xml converter, accounting data extraction, bank statement parser, automated accounting',
}

const faqs = [
  {
    q: 'How does the bank statement converter work?',
    a: 'Our tool uses advanced parsing algorithms to identify transaction tables within your PDF bank statements. It extracts the date, description, and amount for every transaction, then converts it into a structured format like Excel or CSV.',
  },
  {
    q: 'Is it safe to upload my bank statements?',
    a: 'Security is our top priority. We use industry-standard encryption, and your files are processed entirely in memory. They are never stored on our servers and are deleted immediately after the conversion is complete.',
  },
  {
    q: 'Can I convert PDF to Tally XML?',
    a: 'Yes! Our tool is unique because it supports direct export to Tally XML, allowing you to import your bank transactions directly into Tally without any manual entry.',
  },
  {
    q: 'What banks are supported?',
    a: 'We support statements from all major banks worldwide, including HDFC, SBI, ICICI, Axis, Chase, Wells Fargo, Bank of America, and more. If your statement has a clear table structure, our tool will handle it.',
  },
]

export default async function Home() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative container-xl">
          <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Trusted by 10,000+ Accountants
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight mb-8">
              Convert Bank Statements <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Instantly & Accurately
              </span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Extract transactions from PDF to Excel, CSV, or Tally XML in seconds. 
              Built for speed, accuracy, and enterprise-grade security.
            </p>
          </div>

          {/* Tool Container */}
          <div className="relative z-10 p-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl backdrop-blur-sm shadow-2xl animate-fade-in">
            <div className="bg-white rounded-[22px] p-6 sm:p-10">
              <UploadTool userId={user?.id} />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="container-xl">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
            Compatible with statements from
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mock Bank Logos */}
             <span className="text-xl font-bold text-slate-700">HDFC BANK</span>
             <span className="text-xl font-bold text-slate-700">SBI</span>
             <span className="text-xl font-bold text-slate-700">ICICI</span>
             <span className="text-xl font-bold text-slate-700">AXIS BANK</span>
             <span className="text-xl font-bold text-slate-700">CHASE</span>
             <span className="text-xl font-bold text-slate-700">HSBC</span>
          </div>
        </div>
      </section>

      {/* SEO & Value Prop Section */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Why use our Bank Statement <br />
                <span className="text-blue-600 font-mono italic text-2xl sm:text-3xl">parserEngine v2.4</span>
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Zero Manual Entry', desc: 'Save hours of manual data entry by converting complex PDF statements into clean, structured digital formats.' },
                  { title: 'Tally & ERP Ready', desc: 'Specially formatted XML exports that import directly into Tally, SAP, or QuickBooks without additional formatting.' },
                  { title: 'Any Bank, Any Format', desc: 'Our advanced OCR handles multi-page statements, varied date formats, and complex table layouts effortlessly.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600 font-bold">
                      0{i+1}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 blur-3xl" />
              <pre className="text-blue-400 text-sm font-mono overflow-x-auto">
                <code>{`// parseResult.json
{
  "bank": "HDFC_BANK",
  "period": "01-MAR-2024 to 31-MAR-2024",
  "transactions": [
    {
      "date": "2024-03-05",
      "description": "UPI-PAYMENT-TO-MERCHANT",
      "debit": 500.00,
      "credit": 0.00,
      "balance": 15420.50
    },
    ...
  ],
  "export_formats": ["CSV", "XLSX", "XML_TALLY"]
}`}</code>
              </pre>
              <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-slate-500 text-xs font-mono">Process: Done (2.4s)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container-xl max-w-4xl">
          <div className="prose max-w-none text-slate-700">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">The Most Accurate Bank Statement Converter Online</h2>
            <p className="text-lg leading-relaxed mb-6">
              In today&apos;s digital accounting world, manual data entry is a relic of the past. Our <strong>Bank Statement Converter</strong> is designed for professionals who value their time. Whether you are an individual managing personal finances or an accountant handling hundreds of clients, our tool provides the fastest way to turn PDF bank statements into <strong>Excel (XLSX)</strong>, <strong>CSV</strong>, or <strong>Tally XML</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3">PDF to Excel for Accountants</h3>
                <p className="text-sm text-slate-600">Export your statements to Excel with perfect column alignment. No merged cells, no messy formatting. Just clean data ready for analysis or reporting.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Tally XML Integration</h3>
                <p className="text-sm text-slate-600">Stop manually typing vouchers. Convert your bank statement to Tally XML and import thousands of transactions in seconds. Supports all major Indian banks.</p>
              </div>
            </div>
            <p className="mb-6">
              Our tool supports all major file formats including <strong>PDF, CSV, and XLSX</strong>. With our <strong>free bank statement converter</strong>, you can process up to 5 pages daily without a paid subscription. For enterprise users, our <strong>Business Plan</strong> offers API access and unlimited conversions.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white" id="faq">
        <div className="container-xl max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors list-none">
                  <span className="font-bold text-slate-900">{faq.q}</span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-open:rotate-180 transition-transform">
                    <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-950 text-white border-t border-slate-800">
        <div className="container-xl text-center">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to streamline your accounting?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who save 10+ hours every month with our automated bank statement parser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tool" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              Launch Converter Tool
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center px-8 py-4 border border-slate-800 text-slate-300 font-bold rounded-2xl hover:bg-slate-900 transition-all">
              View All Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
