-- BankConverter SaaS - Supabase Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── SUBSCRIPTIONS TABLE ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'pro', 'business')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due', 'trialing')),
  current_period_end TIMESTAMPTZ,
  pages_limit INTEGER NOT NULL DEFAULT 50,
  pages_used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ─── USAGE LOGS TABLE ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address TEXT NOT NULL,
  pages_parsed INTEGER NOT NULL DEFAULT 1,
  file_type TEXT NOT NULL DEFAULT 'pdf' CHECK (file_type IN ('pdf', 'csv', 'excel')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── BLOG POSTS TABLE ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  meta_title TEXT,
  meta_description TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── PLANS TABLE (reference) ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price INTEGER NOT NULL,
  pages_limit INTEGER NOT NULL,
  stripe_price_id TEXT,
  features JSONB DEFAULT '[]',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default plans
INSERT INTO plans (name, slug, price, pages_limit, features) VALUES
  ('Starter', 'starter', 900, 50, '["50 pages/month", "PDF, CSV, Excel support", "Excel & CSV export", "Email support"]'),
  ('Pro', 'pro', 1900, 200, '["200 pages/month", "PDF, CSV, Excel support", "Excel & CSV export", "Priority support", "API access"]'),
  ('Business', 'business', 4900, 1000, '["1000 pages/month", "PDF, CSV, Excel support", "Excel & CSV export", "Dedicated support", "API access", "Team accounts"]')
ON CONFLICT (slug) DO NOTHING;

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Subscriptions: users can see their own
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Usage logs: users can see their own
CREATE POLICY "Users can view own usage"
  ON usage_logs FOR SELECT
  USING (auth.uid() = user_id);

-- Blog posts: anyone can read published posts
CREATE POLICY "Anyone can read published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

-- ─── INDEXES ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_ip ON usage_logs(ip_address);
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON usage_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_sub ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- ─── UPDATED_AT TRIGGER ───────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
