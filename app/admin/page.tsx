import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminCMS } from './cms-client'

export default async function AdminPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/')
  }

  return <AdminCMS />
}
