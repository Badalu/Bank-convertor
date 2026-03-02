import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const STRIPE_PLANS = {
  starter: {
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    name: 'Starter',
    price: 9,
    pages: 50,
    features: ['50 pages/month', 'PDF, CSV, Excel support', 'Excel & CSV export', 'Email support'],
  },
  pro: {
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    name: 'Pro',
    price: 19,
    pages: 200,
    features: ['200 pages/month', 'PDF, CSV, Excel support', 'Excel & CSV export', 'Priority support', 'API access'],
  },
  business: {
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID!,
    name: 'Business',
    price: 49,
    pages: 1000,
    features: ['1000 pages/month', 'PDF, CSV, Excel support', 'Excel & CSV export', 'Dedicated support', 'API access', 'Team accounts'],
  },
}

export async function createCheckoutSession({
  userId,
  userEmail,
  priceId,
  successUrl,
  cancelUrl,
}: {
  userId: string
  userEmail: string
  priceId: string
  successUrl: string
  cancelUrl: string
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: userEmail,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId },
    allow_promotion_codes: true,
  })
  return session
}

export async function createPortalSession(customerId: string, returnUrl: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
  return session
}
