import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Check if the teacher has already set up their profile
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: teacher } = await supabase
          .from('teachers')
          .select('id')
          .eq('id', user.id)
          .single()

        if (teacher) {
          return NextResponse.redirect(`${origin}/dashboard`)
        } else {
          return NextResponse.redirect(`${origin}/profile/setup`)
        }
      }
    }
  }

  // Something went wrong — send back to login
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}
