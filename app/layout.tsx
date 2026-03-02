import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { createClient } from '@/lib/supabase/server'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Bank Statement Converter - PDF to Excel & CSV Online',
    template: '%s | BankConverter',
  },
  description: 'Convert bank statements from PDF, Excel, or CSV instantly. Extract transactions, preview data, and download in Excel or CSV format. Fast, secure, free to try.',
  keywords: ['bank statement converter', 'pdf to excel bank statement', 'convert bank statement to csv', 'statement to excel tool', 'bank statement analyzer', 'pdf bank statement converter online'],
  authors: [{ name: 'BankConverter' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'BankConverter',
    title: 'Bank Statement Converter - PDF to Excel & CSV',
    description: 'Convert bank statements instantly. Extract transactions from PDF, CSV, or Excel.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bank Statement Converter',
    description: 'Convert bank statements instantly. Extract transactions from PDF, CSV, or Excel.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <Navbar user={user} />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
