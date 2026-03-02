# BankConverter SaaS

A production-ready Next.js 14 SaaS for converting bank statements from PDF/CSV/Excel to Excel/CSV.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Payments**: Stripe
- **Deployment**: Vercel

## Features

- ⚡ Instant PDF/CSV/Excel bank statement parsing
- 📊 Transaction preview table (Date, Description, Debit, Credit, Balance)
- 📥 Download as Excel or CSV
- 🔐 Supabase authentication
- 💳 Stripe subscription billing
- 📝 SEO-optimized homepage + blog
- 🗂 Admin CMS for blog management
- 📈 Usage tracking with limits per plan

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repo>
cd bank-statement-converter
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase/schema.sql`
3. Copy your project URL and API keys from Settings > API

### 3. Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Create 3 products with monthly recurring prices:
   - Starter: $9/month
   - Pro: $19/month  
   - Business: $49/month
3. Copy price IDs for each product
4. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`
5. Copy webhook signing secret

### 4. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

STRIPE_SECRET_KEY=sk_live_xxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx

STRIPE_STARTER_PRICE_ID=price_xxxx
STRIPE_PRO_PRICE_ID=price_xxxx
STRIPE_BUSINESS_PRICE_ID=price_xxxx

NEXT_PUBLIC_SITE_URL=https://yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

### 5. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Add all environment variables in Vercel dashboard under Project Settings > Environment Variables.

### 6. Configure Supabase Auth

In Supabase Dashboard > Authentication > URL Configuration:
- Site URL: `https://yourdomain.com`
- Redirect URLs: `https://yourdomain.com/auth/callback`

## Development

```bash
npm run dev
```

## Usage Limits

| Plan | Limit | Price |
|------|-------|-------|
| Guest (no login) | 2 pages/day | Free |
| Free (logged in) | 5 pages/day | Free |
| Starter | 50 pages/month | $9/mo |
| Pro | 200 pages/month | $19/mo |
| Business | 1000 pages/month | $49/mo |

## Admin CMS

Access at `/admin` with the email set in `ADMIN_EMAIL`.

## API Endpoints

- `POST /api/parse-statement` — Parse uploaded file
- `POST /api/stripe` — Create checkout or billing portal session
- `POST /api/webhooks/stripe` — Stripe webhook handler
- `GET /api/usage` — Get current user usage
- `GET/POST/PUT/DELETE /api/admin` — Blog post management

## File Parsing Support

- **PDF**: Uses `pdf-parse` to extract text, then pattern recognition for transactions
- **CSV**: Custom parser with column auto-detection
- **Excel**: Uses `xlsx` library with header row detection

## Project Structure

```
app/
├── api/              # API routes
├── auth/             # Login, signup, callback
├── admin/            # CMS (admin only)
├── blog/             # Blog pages
├── dashboard/        # User dashboard
├── pricing/          # Pricing page
├── tool/             # Converter tool page
└── page.tsx          # SEO homepage

components/
├── layout/           # Navbar, Footer
└── ui/               # Button, UploadTool, TransactionTable

lib/
├── supabase/         # Client, server, middleware
├── parser.ts         # PDF/CSV/Excel parsing
├── stripe.ts         # Stripe helpers
├── usage.ts          # Usage tracking
└── utils.ts          # Utilities

supabase/
└── schema.sql        # Database schema
```
