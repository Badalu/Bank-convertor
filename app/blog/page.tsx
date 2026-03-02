import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog - Bank Statement Converter Tips & Guides',
  description: 'Learn how to convert bank statements, tips for PDF to Excel conversion, and guides for managing your financial data.',
}

// Default blog posts (shown before any are added via CMS)
const defaultPosts = [
  {
    slug: 'bank-statement-converter',
    title: 'Complete Guide to Bank Statement Converters in 2024',
    excerpt: 'Everything you need to know about converting bank statements from PDF to Excel or CSV. Learn about the best tools, methods, and tips.',
    created_at: '2024-01-15',
  },
  {
    slug: 'pdf-to-excel-bank-statement',
    title: 'How to Convert PDF Bank Statement to Excel: Step-by-Step Guide',
    excerpt: 'A detailed walkthrough of converting your PDF bank statements to Excel spreadsheets for accounting and analysis.',
    created_at: '2024-01-20',
  },
  {
    slug: 'convert-bank-statement-online',
    title: 'Best Online Tools to Convert Bank Statements in 2024',
    excerpt: 'Compare the top online tools available for converting bank statements. Features, pricing, and ease of use.',
    created_at: '2024-02-01',
  },
]

export default async function BlogPage() {
  const adminClient = createAdminClient()
  const { data: posts } = await adminClient
    .from('blog_posts')
    .select('slug, title, excerpt, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const allPosts = (posts && posts.length > 0) ? posts : defaultPosts

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
          <p className="mt-4 text-xl text-gray-600">Tips, guides, and resources for bank statement conversion.</p>
        </div>

        <div className="space-y-6">
          {allPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all bg-white"
            >
              <div className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-2">
                {formatDate(post.created_at)}
              </div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
              <span className="text-blue-600 text-sm mt-3 inline-block group-hover:translate-x-1 transition-transform">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
