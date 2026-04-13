import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: teacher } = await supabase
    .from('teachers')
    .select('name, subject')
    .eq('id', user!.id)
    .single()

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Welcome, {teacher?.name} 👋
      </h1>
      <p className="text-muted-foreground">
        Your {teacher?.subject} dashboard is ready. Students, sessions, and
        attendance tracking are coming in the next phases.
      </p>
    </div>
  )
}
