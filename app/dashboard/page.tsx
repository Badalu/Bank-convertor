import { createClient, createAdminClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ManageSubscriptionButton } from './manage-sub-button'

export const dynamic = 'force-dynamic'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { success?: string }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Debug: Not Logged In</h1>
          <p className="text-slate-600 mb-6">
            The server does not see a valid session for you. This is why the dashboard is not loading.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/auth/login" className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold">
              Go to Login Page
            </Link>
            <p className="text-xs text-slate-400">URL: /dashboard</p>
          </div>
        </div>
      </div>
    )
  }

  const adminClient = createAdminClient()

  // Get subscription
  const { data: subscription } = await adminClient
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  // Get recent activity
  const { data: logs } = await adminClient
    .from('usage_logs')
    .select('pages_parsed, file_type, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  // Calculate daily usage
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayLogs = logs?.filter(l => new Date(l.created_at) >= today) || []
  const dailyUsed = todayLogs.reduce((sum, l) => sum + l.pages_parsed, 0)

  const isPaid = subscription?.status === 'active' || subscription?.status === 'activated'
  const pagesLimit = subscription?.pages_limit || 5
  const pagesUsed = isPaid ? (subscription.pages_used || 0) : dailyUsed
  const pagesRemaining = Math.max(0, pagesLimit - pagesUsed)
  const usagePercent = Math.min(100, Math.round((pagesUsed / pagesLimit) * 100))

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-xl py-12">
        {searchParams.success && (
          <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-700 flex items-center gap-3 animate-fade-in">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Subscription activated! Your limits have been increased.</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Account Dashboard</h1>
            <div className="mt-2 flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase">
                {user.email?.[0]}
              </div>
              <span className="text-slate-500 font-medium">{user.email}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/tool">
              <Button size="lg" className="rounded-xl shadow-lg shadow-blue-500/20">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                New Conversion
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Plan Status */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col justify-between group hover:border-blue-500/30 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Plan Status</span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isPaid ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                  {isPaid ? 'Premium' : 'Standard'}
                </span>
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-2 capitalize">
                {subscription?.plan || 'Free Tier'}
              </h3>
              <p className="text-slate-500 text-sm">
                {isPaid ? `Renews on ${new Date(subscription.current_period_end).toLocaleDateString()}` : 'Limited daily processing pages'}
              </p>
            </div>
            {!isPaid && (
              <Link href="/pricing" className="mt-8 text-sm font-bold text-blue-600 flex items-center group-hover:gap-2 transition-all">
                Upgrade to Premium <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            )}
          </div>

          {/* Usage Analytics */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 hover:border-blue-500/30 transition-all">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resource Usage</span>
              <span className="text-xs font-bold text-slate-900">{usagePercent}%</span>
            </div>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-4xl font-extrabold text-slate-900">{pagesUsed}</span>
              <span className="text-slate-400 font-bold mb-1">/ {pagesLimit} pages</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden mb-4">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${usagePercent > 85 ? 'bg-rose-500' : 'bg-blue-600'}`}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <p className="text-slate-500 text-xs">
              {pagesRemaining} pages remaining in your current cycle.
            </p>
          </div>

          {/* Integration Status */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 block">Quick Support</span>
            <h3 className="text-xl font-bold mb-4">Need a custom bank format?</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Our engineering team can add support for any bank statement in 24 hours.
            </p>
            <a href="mailto:support@bankparser.com" className="inline-flex items-center text-sm font-bold text-blue-400 hover:text-blue-300">
              Contact Engineering →
            </a>
          </div>
        </div>

        {/* Recent Conversions */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Recent Conversions</h2>
            <Link href="/tool" className="text-xs font-bold text-blue-600 hover:underline">View All</Link>
          </div>
          {logs && logs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pages</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map((log, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-600">
                            {log.file_type?.toUpperCase().slice(0, 3)}
                          </div>
                          <span className="text-sm font-bold text-slate-700 capitalize">{log.file_type} Statement</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-sm text-slate-600">{log.pages_parsed} pages</td>
                      <td className="px-8 py-4 text-xs text-slate-500 font-mono">
                        {new Date(log.created_at).toLocaleDateString()} {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-8 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                          <span className="w-1 h-1 bg-green-500 rounded-full" />
                          Success
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-8 py-16 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-500 text-sm">No recent activity detected on your account.</p>
              <Link href="/tool">
                <Button variant="outline" size="sm" className="mt-6 rounded-xl">Start your first conversion</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
