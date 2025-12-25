import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (supabaseInstance) {
    return supabaseInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseInstance
}

// Legacy export for backward compatibility
export const supabase = {
  from: (table: string) => getSupabase().from(table),
}

// Types for our database
export interface SavedSong {
  id: string
  title: string
  audio_url: string
  stream_url: string
  image_url?: string
  duration?: number
  style?: string
  prompt?: string
  task_id: string
  created_at: string
}
