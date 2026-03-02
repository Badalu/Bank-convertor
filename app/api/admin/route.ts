import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'

async function checkAdmin() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return null
  }
  return user
}

export async function GET() {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createAdminClient()
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts })
}

export async function POST(request: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt,
      meta_title: body.meta_title || body.title,
      meta_description: body.meta_description || body.excerpt,
      published: body.published || false,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ post: data })
}

export async function PUT(request: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt,
      meta_title: body.meta_title || body.title,
      meta_description: body.meta_description || body.excerpt,
      published: body.published,
      updated_at: new Date().toISOString(),
    })
    .eq('id', body.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ post: data })
}

export async function DELETE(request: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await request.json()
  const supabase = createAdminClient()

  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
