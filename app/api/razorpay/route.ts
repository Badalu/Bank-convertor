import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { razorpay, RAZORPAY_PLANS } from '@/lib/razorpay'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { plan: planKey } = await request.json()
    const planConfig = RAZORPAY_PLANS[planKey as keyof typeof RAZORPAY_PLANS]

    if (!planConfig) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Create a subscription in Razorpay
    // Note: This requires Plan IDs to be created in your Razorpay Dashboard
    const subscription = await razorpay.subscriptions.create({
      plan_id: planConfig.planId,
      customer_notify: 1,
      total_count: 12, // 12 months for example
      notes: {
        userId: user.id,
        userEmail: user.email!,
        plan: planKey
      }
    })

    return NextResponse.json({
      subscriptionId: subscription.id,
      keyId: process.env.RAZORPAY_KEY_ID,
      amount: planConfig.price, // For display
      name: 'Bank Statement Converter',
      description: `${planConfig.name} Plan`,
      userEmail: user.email,
    })
  } catch (error: unknown) {
    console.error('Razorpay error:', error)
    const message = error instanceof Error ? error.message : 'Razorpay error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
