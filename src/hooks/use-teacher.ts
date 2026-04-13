'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Teacher } from '@/types/database'

export function useTeacher() {
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTeacher() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        setError(error.message)
      } else {
        setTeacher(data)
      }

      setLoading(false)
    }

    fetchTeacher()
  }, [])

  return { teacher, loading, error }
}
