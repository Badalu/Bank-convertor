import { createClient, createAdminClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ManageSubscriptionButton } from './manage-sub-button'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { success?: string }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const adminClient = createAdminClient()

  // Get subscription
  const { data: subscription } = await adminClient
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  // Get today's usage
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { data: logs } = await adminClient
    .from('usage_logs')
    .select('pages_parsed, file_type, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const todayLogs = logs?.filter(l => new Date(l.created_at) >= today) || []
  const dailyUsed = todayLogs.reduce((sum, l) => sum + l.pages_parsed, 0)

  const isPaid = !!subscription
  const pagesLimit = subscription?.pages_limit || 5
  const pagesUsed = isPaid ? subscription.pages_used : dailyUsed
  const pagesRemaining = Math.max(0, pagesLimit - pagesUsed)
  const usagePercent = Math.min(100, Math.round((pagesUsed / pagesLimit) * 100))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {searchParams.success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
            🎉 Subscription activated successfully! You can now convert more pages.
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">{user.email}</p>
          </div>
          <Link href="/tool">
            <Button>Convert Statement</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Plan Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">Current Plan</div>
            <div className="text-2xl font-bold text-gray-900 capitalize">
              {subscription?.plan || 'Free'}
            </div>
            {!isPaid && (
              <Link href="/pricing" className="text-sm text-blue-600 hover:underline mt-1 block">
                Upgrade plan →
              </Link>
            )}
            {isPaid && (
              <div className="text-xs text-gray-500 mt-1">
                Renews {new Date(subscription.current_period_end).toLocaleDateString()}
              </div>
            )}
          </div>

          {/* Usage Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">
              Pages Used {isPaid ? '(This Month)' : '(Today)'}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {pagesUsed} <span className="text-gray-400 text-lg">/ {pagesLimit}</span>
            </div>
            <div className="mt-3 bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${usagePercent > 80 ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">{pagesRemaining} pages remaining</div>
          </div>

          {/* Actions Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-3">Quick Actions</div>
            <div className="space-y-2">
              <Link href="/tool" className="block w-full text-center py-2 px-4 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                Upload Statement
              </Link>
              {isPaid ? (
                <ManageSubscriptionButton />
              ) : (
                <Link href="/pricing" className="block w-full text-center py-2 px-4 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                  Upgrade Plan
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Recent Activity</h2>
          {logs && logs.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {logs.slice(0, 10).map((log, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600 uppercase">{log.file_type?.slice(0, 3)}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{log.file_type?.toUpperCase()} Statement</div>
                      <div className="text-xs text-gray-500">
                        {new Date(log.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{log.pages_parsed} page{log.pages_parsed !== 1 ? 's' : ''}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No activity yet.</p>
              <Link href="/tool" className="text-blue-600 text-sm hover:underline mt-1 block">
                Upload your first statement →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
