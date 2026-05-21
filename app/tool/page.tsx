import type { Metadata } from 'next'
import { UploadTool } from '@/components/ui/upload-tool'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Bank Statement Converter Tool - Free Online',
  description: 'Free online tool to convert bank statement PDF to Excel or CSV. Upload your statement and download converted file instantly.',
}

export default async function ToolPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-24">
      <div className="container-xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-semibold mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Live & Functional Parser v2.4
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Universal Bank Statement Converter
            </h1>
            <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
              Drop your PDF, CSV, or Excel statement below. Our engine will automatically 
              structure your data into a clean, accounting-ready format.
            </p>
            {!user && (
              <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl">
                <span className="text-amber-700 text-sm font-medium">
                  Guest user limits: 2 pages/day.
                </span>
                <Link href="/auth/signup" className="text-amber-800 text-sm font-bold underline hover:no-underline">
                  Sign up for 5 free pages →
                </Link>
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
            <div className="p-6 sm:p-10">
              <UploadTool userId={user?.id} />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🔒', title: 'Private Processing', desc: 'In-memory processing. Files are never stored.' },
              { icon: '📈', title: 'High Accuracy', desc: 'Handles complex table spans and multi-line descriptions.' },
              { icon: '🚀', title: 'Instant Export', desc: 'Download as Excel, CSV, or Tally XML immediately.' },
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{feature.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
