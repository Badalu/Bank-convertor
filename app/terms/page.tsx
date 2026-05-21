import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms of Service and Conditions of Use for BankParser SaaS.',
}

export default function TermsPage() {
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
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Terms and Conditions</h1>
          <p className="mt-2 text-blue-100 text-sm sm:text-base">Last updated: May 20, 2026</p>
        </div>

        <div className="px-8 py-10 sm:py-12 prose prose-slate max-w-none space-y-8 text-gray-700">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">1. Agreement to Terms</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              Welcome to <strong>BankParser SaaS</strong> (referred to as &quot;we&quot;, &quot;us&quot;, &quot;our&quot;, or &quot;BankParser&quot;). 
              By accessing our website at <Link href="/" className="text-blue-600 hover:underline">bankconverter.com</Link> and utilizing our online bank statement conversion services, 
              you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you are prohibited from using our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">2. Description of Service</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              BankParser provides an automated cloud-based platform that converts uploaded bank statement files (PDF format) into structured Excel (.xlsx) and CSV sheets, and extracts transactions for accounting platforms such as Tally.
            </p>
            <p className="leading-relaxed text-sm sm:text-base">
              We offer free plans (up to 5 pages per day for logged-in accounts) and premium paid subscriptions (Starter, Pro, and Business tiers) with higher limits.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">3. User Accounts</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              To access advanced features and paid limits, you must create a secure account using your email. You are solely responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
              <li>Maintaining the confidentiality of your account credentials.</li>
              <li>All activities and statement uploads that occur under your account.</li>
              <li>Notifying us immediately at <a href="mailto:haribadal5@gmail.com" className="text-blue-600 hover:underline">haribadal5@gmail.com</a> if you suspect any unauthorized access.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">4. Payments, Billing, and Renewals</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              We use <strong>Razorpay</strong> as our primary secure payment gateway to process premium subscriptions. 
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
              <li><strong>Pricing:</strong> Premium plans are billed on a recurring monthly cycle as described on our Pricing Page.</li>
              <li><strong>Billing Cycle:</strong> Subscriptions renew automatically each month on the corresponding calendar date. You can cancel your subscription at any time through your Dashboard.</li>
              <li><strong>Taxes:</strong> All payments are processed securely, and applicable Indian/local taxes are calculated during checkout.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">5. Data Privacy & Security</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              Your uploaded financial files contain highly sensitive data. We prioritize the security of your data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
              <li>Uploaded bank statement PDFs are parsed instantly in memory or stored temporarily strictly for the parsing duration, and are automatically deleted thereafter.</li>
              <li>We do not store your raw bank statement documents long-term or sell any financial data.</li>
              <li>For complete details on data collection, please review our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">6. Prohibited Actions</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              When utilizing our platform, you agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
              <li>Attempt to disrupt, reverse-engineer, scan vulnerability, or compromise the security of our application servers.</li>
              <li>Abuse the API or conversion limits using automated web scraping scripts on free endpoints.</li>
              <li>Upload fraudulent or illegal bank statements.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">7. Limitation of Liability</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              In no event shall BankParser, its operators, or founders be liable for any direct, indirect, incidental, or consequential damages resulting from:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
              <li>Inaccuracies or parsing errors in converted Excel sheets. Users are strongly advised to audit and cross-verify parsed financial records before entering them into active accounting databases.</li>
              <li>Temporary downtime or system interruptions.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">8. Governing Law</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              These terms shall be governed by and construed in accordance with the laws of <strong>India</strong>. 
              Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in our principal place of business.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">9. Contact Information</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              If you have any questions, feedback, or concerns regarding our Terms and Conditions, please contact us at:
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
