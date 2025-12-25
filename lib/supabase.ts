import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
