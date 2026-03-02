import { createAdminClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export async function getClientIP(): Promise<string> {
  const headersList = headers()
  const forwarded = headersList.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip') || 'unknown'
  return ip
}

export async function checkUsageLimit(userId: string | null, pageCount: number): Promise<{
  allowed: boolean
  remaining: number
  limit: number
  plan: string
}> {
  const supabase = createAdminClient()
  const ip = await getClientIP()

  if (!userId) {
    // Guest: 2 pages per day
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { data: logs } = await supabase
      .from('usage_logs')
      .select('pages_parsed')
      .is('user_id', null)
      .eq('ip_address', ip)
      .gte('created_at', today.toISOString())

    const used = logs?.reduce((sum, l) => sum + l.pages_parsed, 0) || 0
    const limit = 2
    const remaining = Math.max(0, limit - used)

    return {
      allowed: remaining >= pageCount,
      remaining,
      limit,
      plan: 'guest',
    }
  }

  // Check subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()

  if (subscription) {
    const remaining = Math.max(0, subscription.pages_limit - subscription.pages_used)
    return {
      allowed: remaining >= pageCount,
      remaining,
      limit: subscription.pages_limit,
      plan: subscription.plan,
    }
  }

  // Free logged-in user: 5 pages per day
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { data: logs } = await supabase
    .from('usage_logs')
    .select('pages_parsed')
    .eq('user_id', userId)
    .gte('created_at', today.toISOString())

  const used = logs?.reduce((sum, l) => sum + l.pages_parsed, 0) || 0
  const limit = 5
  const remaining = Math.max(0, limit - used)

  return {
    allowed: remaining >= pageCount,
    remaining,
    limit,
    plan: 'free',
  }
}

export async function recordUsage(userId: string | null, pageCount: number, fileType: string) {
  const supabase = createAdminClient()
  const ip = await getClientIP()

  await supabase.from('usage_logs').insert({
    user_id: userId,
    ip_address: ip,
    pages_parsed: pageCount,
    file_type: fileType,
  })

  if (userId) {
    // Update subscription usage if exists
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('id, pages_used')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()

    if (sub) {
      await supabase
        .from('subscriptions')
        .update({ pages_used: sub.pages_used + pageCount })
        .eq('id', sub.id)
    }
  }
}
