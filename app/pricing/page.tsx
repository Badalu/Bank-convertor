'use client'
import { useState } from 'react'
import { STRIPE_PLANS } from '@/lib/stripe'

const plans = [
  {
    key: 'starter',
    name: 'Starter',
    price: 9,
    pages: 50,
    features: [
      '50 pages per month',
      'PDF, CSV, Excel support',
      'Excel & CSV export',
      'Email support',
      'All bank formats',
    ],
    popular: false,
  },
  {
    key: 'pro',
    name: 'Pro',
    price: 19,
    pages: 200,
    features: [
      '200 pages per month',
      'PDF, CSV, Excel support',
      'Excel & CSV export',
      'Priority support',
      'All bank formats',
      'API access',
    ],
    popular: true,
  },
  {
    key: 'business',
    name: 'Business',
    price: 49,
    pages: 1000,
    features: [
      '1000 pages per month',
      'PDF, CSV, Excel support',
      'Excel & CSV export',
      'Dedicated support',
      'All bank formats',
      'API access',
      'Team accounts',
    ],
    popular: false,
  },
]

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleUpgrade = async (planKey: string) => {
    setLoading(planKey)
    try {
      const res = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planKey, action: 'checkout' }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else if (res.status === 401) {
        window.location.href = '/auth/login?redirect=/pricing'
      } else {
        alert(data.error || 'Failed to start checkout')
      }
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900">Simple, transparent pricing</h1>
          <p className="mt-4 text-xl text-gray-600">Start free. Upgrade when you need more.</p>

          {/* Free tier highlight */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Free: 2 pages/day without login · 5 pages/day with free account
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map(plan => (
            <div
              key={plan.key}
              className={`relative bg-white rounded-2xl border-2 p-8 flex flex-col ${
                plan.popular ? 'border-blue-600 shadow-xl' : 'border-gray-100 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{plan.pages} pages per month</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.key)}
                disabled={loading === plan.key}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === plan.key ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Loading...
                  </span>
                ) : `Get ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-gray-600 text-sm">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            30-day money-back guarantee · Cancel anytime · Secure payment via Stripe
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Compare plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Feature</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Free</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Starter</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-blue-700">Pro</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Business</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Monthly pages', '5/day', '50', '200', '1000'],
                  ['PDF support', '✓', '✓', '✓', '✓'],
                  ['CSV & Excel support', '✓', '✓', '✓', '✓'],
                  ['Excel export', '✓', '✓', '✓', '✓'],
                  ['CSV export', '✓', '✓', '✓', '✓'],
                  ['Email support', '—', '✓', '✓', '✓'],
                  ['Priority support', '—', '—', '✓', '✓'],
                  ['API access', '—', '—', '✓', '✓'],
                  ['Team accounts', '—', '—', '—', '✓'],
                ].map(([feature, free, starter, pro, business], i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-700">{feature}</td>
                    <td className="px-6 py-3 text-center text-sm text-gray-600">{free}</td>
                    <td className="px-6 py-3 text-center text-sm text-gray-600">{starter}</td>
                    <td className="px-6 py-3 text-center text-sm font-medium text-blue-700">{pro}</td>
                    <td className="px-6 py-3 text-center text-sm text-gray-600">{business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
