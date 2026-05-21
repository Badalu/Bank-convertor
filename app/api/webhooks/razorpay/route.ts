import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const PLAN_PAGES: Record<string, number> = {
  'starter': 50,
  'pro': 200,
  'business': 1000,
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('x-razorpay-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest('hex')

  if (signature !== expectedSignature) {
    console.error('Razorpay Webhook: Invalid signature')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const event = JSON.parse(body)
  const supabase = createAdminClient()

  try {
    switch (event.event) {
      case 'subscription.activated':
      case 'subscription.charged': {
        const subscription = event.payload.subscription.entity
        const payment = event.payload.payment?.entity
        const notes = subscription.notes || {}
        const userId = notes.userId
        const planKey = notes.plan || 'starter'

        if (!userId) {
          console.error('Razorpay Webhook: userId missing in notes')
          break
        }

        // Calculate end date (default 30 days if not provided)
        const endDate = subscription.current_end 
          ? new Date(subscription.current_end * 1000).toISOString()
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

        await supabase.from('subscriptions').upsert({
          user_id: userId,
          razorpay_customer_id: subscription.customer_id,
          razorpay_subscription_id: subscription.id,
          razorpay_payment_id: payment?.id || null,
          plan: planKey,
          status: 'active',
          current_period_end: endDate,
          pages_limit: PLAN_PAGES[planKey] || 50,
          pages_used: 0,
        }, { onConflict: 'user_id' })
        
        break
      }

      case 'subscription.cancelled':
      case 'subscription.halted': {
        const subscription = event.payload.subscription.entity
        await supabase.from('subscriptions')
          .update({ status: 'cancelled' })
          .eq('razorpay_subscription_id', subscription.id)
        break
      }
    }
  } catch (error) {
    console.error('Razorpay Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
