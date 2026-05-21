import Razorpay from 'razorpay'

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export const RAZORPAY_PLANS = {
  starter: {
    planId: process.env.RAZORPAY_STARTER_PLAN_ID!,
    name: 'Starter',
    price: 900, // 900 INR or 9 USD (Razorpay expects amount in smallest unit)
    pages: 50,
    features: ['50 pages/month', 'PDF, CSV, Excel support', 'Excel & CSV export', 'Email support'],
  },
  pro: {
    planId: process.env.RAZORPAY_PRO_PLAN_ID!,
    name: 'Pro',
    price: 1900,
    pages: 200,
    features: ['200 pages/month', 'PDF, CSV, Excel support', 'Excel & CSV export', 'Priority support', 'API access'],
  },
  business: {
    planId: process.env.RAZORPAY_BUSINESS_PLAN_ID!,
    name: 'Business',
    price: 4900,
    pages: 1000,
    features: ['1000 pages/month', 'PDF, CSV, Excel support', 'Excel & CSV export', 'Dedicated support', 'API access', 'Team accounts'],
  },
}
