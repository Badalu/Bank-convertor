import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and data safety guidelines for BankParser SaaS.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-white">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 text-sm font-semibold transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-blue-100 text-sm sm:text-base">Last updated: May 20, 2026</p>
        </div>

        <div className="px-8 py-10 sm:py-12 prose prose-slate max-w-none space-y-8 text-gray-700">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">1. Overview</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              At <strong>BankParser SaaS</strong> (referred to as &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we are committed to protecting the privacy and confidentiality of the financial files and personal information you entrust to us. 
              This Privacy Policy details how we collect, process, utilize, and protect your information when you visit <Link href="/" className="text-blue-600 hover:underline">bankconverter.com</Link> and convert bank statement documents.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">2. Information We Collect and Process</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              To provide a fast and secure statement conversion service, we collect and process the following types of information:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
              <li>
                <strong>Account Credentials:</strong> When you register an account, we collect your email address via <strong>Supabase Auth</strong>.
              </li>
              <li>
                <strong>Financial Statements (Uploads):</strong> When you upload a bank statement PDF for parsing, our conversion engine processes the document <em>in memory</em>. 
                <strong className="text-gray-900"> We do not store your statement files long-term.</strong> Once the parsing is complete and the Excel/CSV file is generated, the temporary data is permanently discarded.
              </li>
              <li>
                <strong>Usage and Subscription Logs:</strong> We track subscription status, the count of pages processed, and file types to enforce usage limits and handle monthly quotas.
              </li>
              <li>
                <strong>Technical Diagnostics:</strong> We record your IP address and basic device information to prevent automated system abuse, trace errors, and manage server security.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">3. Payment Information</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              Payment security is highly critical. All monthly billing and subscription transactions are processed directly by our secure third-party gateway <strong>Razorpay</strong>. 
              We do not collect, store, or process any credit card numbers, CVVs, or Net Banking credentials on our servers. Razorpay processes all checkout details in full compliance with PCI-DSS standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">4. Third-Party Integrations</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              We coordinate with vetted, industry-leading infrastructure partners to power our application:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
              <li><strong>Supabase:</strong> For secure database management, user tables, and encrypted authentication keys.</li>
              <li><strong>Vercel:</strong> For cloud hosting, Edge Functions, and server analytics.</li>
              <li><strong>Razorpay:</strong> For subscription creation and secure payment verification.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">5. Data Security Measures</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              We employ strict industry-standard technical measures to protect your data from unauthorized access or alteration:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
              <li>All statement uploads and user sessions are encrypted in transit using Secure Socket Layer (SSL/HTTPS) technology.</li>
              <li>Row-Level Security (RLS) is active across our database layers, ensuring users can only access their own respective usage records.</li>
              <li>Automated deletion of processed bank statements.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">6. Your Rights</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              You possess complete rights to access, update, or completely delete your personal details. If you wish to permanently delete your BankParser account and clear your email registration, please contact our support team at <a href="mailto:haribadal5@gmail.com" className="text-blue-600 hover:underline">haribadal5@gmail.com</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">7. Contact Information</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              If you have any questions or security concerns regarding this Privacy Policy, please feel free to reach out:
            </p>
            <p className="mt-2 text-sm sm:text-base font-semibold text-gray-900 bg-gray-50 p-4 rounded-2xl border border-gray-100 inline-block">
              Email: <a href="mailto:haribadal5@gmail.com" className="text-blue-600 hover:underline">haribadal5@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
