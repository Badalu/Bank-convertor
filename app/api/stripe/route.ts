import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createCheckoutSession, createPortalSession, STRIPE_PLANS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { plan, action } = await request.json()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    if (action === 'portal') {
      // Get customer ID from subscription
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('stripe_customer_id')
        .eq('user_id', user.id)
        .single()

      if (!sub?.stripe_customer_id) {
        return NextResponse.json({ error: 'No subscription found' }, { status: 404 })
      }

      const session = await createPortalSession(sub.stripe_customer_id, `${siteUrl}/dashboard`)
      return NextResponse.json({ url: session.url })
    }

    // Create checkout
    const planConfig = STRIPE_PLANS[plan as keyof typeof STRIPE_PLANS]
    if (!planConfig) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const session = await createCheckoutSession({
      userId: user.id,
      userEmail: user.email!,
      priceId: planConfig.priceId,
      successUrl: `${siteUrl}/dashboard?success=true`,
      cancelUrl: `${siteUrl}/pricing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: unknown) {
    console.error('Stripe error:', error)
    const message = error instanceof Error ? error.message : 'Stripe error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
