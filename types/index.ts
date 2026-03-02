export interface Transaction {
  date: string
  description: string
  debit: string
  credit: string
  balance: string
}

export interface ParseResult {
  transactions: Transaction[]
  pageCount: number
  fileName: string
  fileType: 'pdf' | 'csv' | 'excel'
}

export interface User {
  id: string
  email: string
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_customer_id: string
  stripe_subscription_id: string
  plan: 'starter' | 'pro' | 'business'
  status: string
  current_period_end: string
  pages_limit: number
  pages_used: number
}

export interface UsageLog {
  id: string
  user_id: string | null
  ip_address: string
  pages_parsed: number
  file_type: string
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  meta_title: string
  meta_description: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface Plan {
  id: string
  name: string
  slug: string
  price: number
  pages_limit: number
  stripe_price_id: string
  features: string[]
}

export const PLANS = {
  free: { pages_per_day: 5, label: 'Free' },
  guest: { pages_per_day: 2, label: 'Guest' },
  starter: { pages_per_month: 50, label: 'Starter', price: 9 },
  pro: { pages_per_month: 200, label: 'Pro', price: 19 },
  business: { pages_per_month: 1000, label: 'Business', price: 49 },
}
