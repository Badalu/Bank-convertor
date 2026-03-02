import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

// Static blog content for default posts
const staticPosts: Record<string, { title: string; metaTitle: string; metaDescription: string; content: string; date: string }> = {
  'bank-statement-converter': {
    title: 'Complete Guide to Bank Statement Converters in 2024',
    metaTitle: 'Bank Statement Converter Guide 2024 - Complete Overview',
    metaDescription: 'Everything about converting bank statements. Learn how to convert PDF bank statements to Excel or CSV with the best free online tools.',
    date: '2024-01-15',
    content: `
<h2>What is a Bank Statement Converter?</h2>
<p>A bank statement converter is a tool that transforms bank statements from PDF, image, or proprietary formats into structured, editable formats like Excel (.xlsx) or CSV. These tools use parsing algorithms to identify transaction data including dates, descriptions, amounts, and balances.</p>

<h2>Why Convert Bank Statements?</h2>
<p>Bank statements arrive in PDF format from most financial institutions, making them difficult to analyze or import into accounting software. Converting them to Excel or CSV enables:</p>
<ul>
<li>Easy sorting and filtering of transactions</li>
<li>Import into accounting software like QuickBooks or Xero</li>
<li>Budget analysis and expense tracking</li>
<li>Tax preparation and documentation</li>
<li>Financial reporting and reconciliation</li>
</ul>

<h2>Types of Bank Statement Formats</h2>
<p>Bank statements typically come in three formats:</p>
<ul>
<li><strong>PDF</strong> – Most common. Requires OCR or layout-based parsing to extract data.</li>
<li><strong>CSV</strong> – Text-based, easiest to parse. Many banks offer direct CSV exports.</li>
<li><strong>Excel (XLSX/XLS)</strong> – Spreadsheet format with structured data.</li>
</ul>

<h2>How Our Bank Statement Converter Works</h2>
<p>Our tool uses a multi-step parsing process:</p>
<ol>
<li>File upload and format detection</li>
<li>Content extraction using format-specific parsers</li>
<li>Transaction pattern recognition using date and amount detection</li>
<li>Data structuring into Date, Description, Debit, Credit, Balance columns</li>
<li>Export to Excel or CSV</li>
</ol>

<h2>Supported Banks</h2>
<p>Our converter works with statements from Chase, Bank of America, Wells Fargo, Citibank, US Bank, Capital One, TD Bank, HSBC, Barclays, and hundreds of international banks. The tool automatically adapts to different statement layouts.</p>

<h2>Tips for Best Results</h2>
<ul>
<li>Use the original PDF from your bank, not a scanned copy</li>
<li>CSV exports from your bank will give the cleanest results</li>
<li>If PDF parsing isn't perfect, try downloading a CSV directly from your bank portal</li>
<li>Check the preview table before downloading to ensure accuracy</li>
</ul>

<h2>Privacy and Security</h2>
<p>Your financial data is sensitive. Our tool processes files entirely in server memory with no permanent storage. Files are deleted immediately after conversion. We use HTTPS for all transfers.</p>
    `,
  },
  'pdf-to-excel-bank-statement': {
    title: 'How to Convert PDF Bank Statement to Excel: Step-by-Step',
    metaTitle: 'PDF to Excel Bank Statement Converter - Free Online Tool',
    metaDescription: 'Learn how to convert PDF bank statements to Excel format. Step-by-step guide with free online converter tool.',
    date: '2024-01-20',
    content: `
<h2>Why Convert PDF Bank Statements to Excel?</h2>
<p>PDF bank statements are read-only documents that can't be sorted, filtered, or imported into accounting software. Converting to Excel transforms your bank data into a powerful spreadsheet you can analyze.</p>

<h2>Step-by-Step: Convert PDF to Excel</h2>
<ol>
<li><strong>Download your bank statement as PDF</strong> from your online banking portal.</li>
<li><strong>Visit BankConverter</strong> and click "Upload Statement".</li>
<li><strong>Drag and drop</strong> your PDF file or click to browse.</li>
<li><strong>Preview transactions</strong> in the instant preview table.</li>
<li><strong>Click "Download Excel"</strong> to get your .xlsx file.</li>
</ol>

<h2>What Data is Extracted?</h2>
<p>Our PDF to Excel converter extracts:</p>
<ul>
<li><strong>Date</strong> – Transaction date in consistent format</li>
<li><strong>Description</strong> – Merchant name or transaction details</li>
<li><strong>Debit</strong> – Money out of your account</li>
<li><strong>Credit</strong> – Money into your account</li>
<li><strong>Balance</strong> – Running account balance</li>
</ul>

<h2>Common Issues and Solutions</h2>
<p><strong>Problem:</strong> Transactions not detected properly.</p>
<p><strong>Solution:</strong> Download a CSV version from your bank instead of PDF. Most banks offer CSV export in their account settings.</p>

<p><strong>Problem:</strong> Dates appear in wrong format.</p>
<p><strong>Solution:</strong> This is a display issue only. The data is correct and can be reformatted in Excel.</p>

<h2>Importing into Accounting Software</h2>
<p>After converting your bank statement to Excel, you can import it into:</p>
<ul>
<li>QuickBooks – Use the Import Bank Transactions feature</li>
<li>Xero – Go to Bank Accounts → Import Statement</li>
<li>Wave – Accounting → Transactions → Import</li>
<li>FreshBooks – Can import CSV format</li>
</ul>
    `,
  },
  'convert-bank-statement-online': {
    title: 'Best Online Tools to Convert Bank Statements in 2024',
    metaTitle: 'Convert Bank Statement Online Free - Best Tools 2024',
    metaDescription: 'Compare the best online bank statement converter tools. Free and paid options to convert PDF to Excel or CSV.',
    date: '2024-02-01',
    content: `
<h2>The Need for Online Bank Statement Converters</h2>
<p>Managing bank statements manually is time-consuming. Online bank statement converters automate the extraction of transaction data, saving hours of manual data entry.</p>

<h2>Key Features to Look For</h2>
<ul>
<li><strong>Speed</strong> – Processing should take seconds, not minutes</li>
<li><strong>Accuracy</strong> – All transactions correctly identified with proper amounts</li>
<li><strong>Format support</strong> – Handle PDF, CSV, and Excel inputs</li>
<li><strong>Export options</strong> – Download as Excel and CSV</li>
<li><strong>Security</strong> – No permanent storage of financial data</li>
<li><strong>Price</strong> – Free tier available for occasional use</li>
</ul>

<h2>BankConverter Features</h2>
<p>Our tool stands out with:</p>
<ul>
<li>Instant parsing (under 3 seconds for most files)</li>
<li>Support for PDF, CSV, and Excel inputs</li>
<li>Clean 5-column output: Date, Description, Debit, Credit, Balance</li>
<li>Free tier: 2 pages/day without login, 5 pages/day with free account</li>
<li>No data storage – 100% privacy</li>
<li>Works with any bank worldwide</li>
</ul>

<h2>When to Use CSV vs PDF Input</h2>
<p>If your bank offers a CSV export (most do), always use that instead of PDF. CSV parsing is faster and more accurate because the data is already structured. PDF requires pattern recognition which may have edge cases with unusual statement layouts.</p>

<h2>Pricing Comparison</h2>
<p>Our plans start at $9/month for 50 pages – perfect for freelancers and small businesses. Enterprise users processing thousands of pages monthly should consider our Business plan at $49/month for 1000 pages.</p>

<h2>Getting the Most from Your Converted Data</h2>
<p>Once you have your transactions in Excel or CSV:</p>
<ul>
<li>Use Excel pivot tables to categorize spending</li>
<li>Create charts to visualize cash flow trends</li>
<li>Filter by date range for period analysis</li>
<li>Import into accounting software for bookkeeping</li>
</ul>
    `,
  },
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const adminClient = createAdminClient()
  const { data: post } = await adminClient
    .from('blog_posts')
    .select('meta_title, meta_description, title, excerpt')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (post) {
    return {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
    }
  }

  const staticPost = staticPosts[params.slug]
  if (staticPost) {
    return {
      title: staticPost.metaTitle,
      description: staticPost.metaDescription,
    }
  }

  return { title: 'Blog Post' }
}

export default async function BlogPostPage({ params }: Props) {
  const adminClient = createAdminClient()
  const { data: dbPost } = await adminClient
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  const staticPost = staticPosts[params.slug]

  if (!dbPost && !staticPost) notFound()

  const post = dbPost ? {
    title: dbPost.title,
    content: dbPost.content,
    date: dbPost.created_at,
  } : {
    title: staticPost!.title,
    content: staticPost!.content,
    date: staticPost!.date,
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          {' → '}
          <Link href="/blog" className="hover:text-gray-900">Blog</Link>
          {' → '}
          <span className="text-gray-900">{post.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="text-sm text-blue-600 font-medium mb-3">{formatDate(post.date)}</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
        </div>

        {/* Content */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
          <h3 className="font-bold text-gray-900 mb-2">Try the Bank Statement Converter</h3>
          <p className="text-gray-600 text-sm mb-4">Convert your PDF bank statement to Excel or CSV in seconds. Free to try.</p>
          <Link href="/tool" className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-700 transition-colors">
            Convert Statement Now →
          </Link>
        </div>

        {/* Internal links */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-4">Related Articles</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(staticPosts)
              .filter(([slug]) => slug !== params.slug)
              .map(([slug, p]) => (
                <Link key={slug} href={`/blog/${slug}`} className="text-sm text-blue-600 hover:underline">
                  → {p.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(staticPosts).map(slug => ({ slug }))
}
