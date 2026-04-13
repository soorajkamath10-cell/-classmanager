import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProfileSetupForm } from '@/components/profile/profile-setup-form'

export default async function ProfileSetupPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // If profile already exists, skip setup
  const { data: teacher } = await supabase
    .from('teachers')
    .select('id')
    .eq('id', user.id)
    .single()

  if (teacher) redirect('/dashboard')

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <ProfileSetupForm email={user.email ?? ''} />
    </main>
  )
}
