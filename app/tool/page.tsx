import type { Metadata } from 'next'
import { UploadTool } from '@/components/ui/upload-tool'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Bank Statement Converter Tool - Free Online',
  description: 'Free online tool to convert bank statement PDF to Excel or CSV. Upload your statement and download converted file instantly.',
}

export default async function ToolPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Bank Statement Converter</h1>
          <p className="mt-3 text-gray-600">
            Upload your PDF, CSV, or Excel bank statement and download as Excel or CSV
          </p>
          {!user && (
            <p className="mt-2 text-sm text-amber-600">
              Guest users get 2 pages/day.{' '}
              <a href="/auth/signup" className="underline font-medium">Sign up free</a> for 5 pages/day.
            </p>
          )}
        </div>
        <UploadTool userId={user?.id} />
      </div>
    </div>
  )
}
