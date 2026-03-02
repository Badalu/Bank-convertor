import { NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminClient = createAdminClient()

    // Get subscription
    const { data: subscription } = await adminClient
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    // Get daily usage
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { data: logs } = await adminClient
      .from('usage_logs')
      .select('pages_parsed, file_type, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    const todayLogs = logs?.filter(l => new Date(l.created_at) >= today) || []
    const dailyUsed = todayLogs.reduce((sum, l) => sum + l.pages_parsed, 0)

    return NextResponse.json({
      subscription,
      dailyUsed,
      recentLogs: logs?.slice(0, 10) || [],
    })
  } catch (error) {
    console.error('Usage error:', error)
    return NextResponse.json({ error: 'Failed to fetch usage' }, { status: 500 })
  }
}
