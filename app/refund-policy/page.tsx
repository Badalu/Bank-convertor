import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund and Cancellation Policy',
  description: 'Refund, replacement, and cancellation rules for BankParser SaaS.',
}

export default function RefundPolicyPage() {
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
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Refund and Cancellation Policy</h1>
          <p className="mt-2 text-blue-100 text-sm sm:text-base">Last updated: May 20, 2026</p>
        </div>

        <div className="px-8 py-10 sm:py-12 prose prose-slate max-w-none space-y-8 text-gray-700">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">1. 30-Day Money-Back Guarantee</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              At <strong>BankParser SaaS</strong>, we strive to build high-accuracy financial extraction utilities. 
              We offer a complete <strong>30-day money-back guarantee</strong> for all our premium plans (Starter, Pro, and Business tiers). 
              If our parsing engine does not successfully extract transactions from your bank statements or if you are not fully satisfied, we will issue a full refund.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">2. Eligibility for Refunds</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              To be eligible for a refund, you must meet the following criteria:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
              <li>Your refund request must be received within <strong>30 calendar days</strong> of your initial purchase or subscription billing date.</li>
              <li>Requests must be sent directly to our support email <a href="mailto:haribadal5@gmail.com" className="text-blue-600 hover:underline">haribadal5@gmail.com</a>.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">3. Subscription Cancellation</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              You can cancel your subscription at any time:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
              <li><strong>Self-Service Cancellation:</strong> You can cancel your active monthly plan anytime by logging into your account and clicking &quot;Cancel Subscription&quot; inside the Dashboard.</li>
              <li><strong>Effective Date:</strong> Upon cancellation, your paid limits (pages quota) will remain active and usable until the end of your current active billing cycle. You will not be charged again.</li>
              <li><strong>No Automatic Fees:</strong> Once canceled, no subsequent automated renewals will be processed on your card/payment source via Razorpay.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">4. Refund Processing Time</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              Once you submit a refund request:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
              <li>Our support team will review the transaction details within <strong>24 to 48 hours</strong>.</li>
              <li>Approved refunds are initiated immediately back to the original source of payment (Credit Card, Debit Card, UPI, Net Banking, or Wallet) via our secure gateway <strong>Razorpay</strong>.</li>
              <li>It typically takes <strong>5 to 7 working days</strong> for the refunded amount to reflect in your bank statement, depending on your bank&apos;s internal clearing procedures.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">5. Support and Dispute Resolution</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              If you have any difficulty cancelling a subscription, or if you face a duplicate charge or failed transaction issue, please email our support address. We are dedicated to ensuring a hassle-free checkout experience.
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
