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

// Storage bucket name
const SONGS_BUCKET = 'songs'

// Upload audio file to Supabase Storage
export async function uploadAudioFile(
  sunoId: string,
  audioBuffer: ArrayBuffer
): Promise<string | null> {
  try {
    const client = getSupabase()
    const fileName = `audio/${sunoId}.mp3`

    const { error } = await client.storage
      .from(SONGS_BUCKET)
      .upload(fileName, audioBuffer, {
        contentType: 'audio/mpeg',
        upsert: true,
      })

    if (error) {
      console.error('Audio upload error:', error)
      return null
    }

    // Get public URL
    const { data } = client.storage
      .from(SONGS_BUCKET)
      .getPublicUrl(fileName)

    return data.publicUrl
  } catch (error) {
    console.error('Upload audio error:', error)
    return null
  }
}

// Upload image file to Supabase Storage
export async function uploadImageFile(
  sunoId: string,
  imageBuffer: ArrayBuffer,
  contentType: string = 'image/jpeg'
): Promise<string | null> {
  try {
    const client = getSupabase()
    const extension = contentType.includes('png') ? 'png' : 'jpg'
    const fileName = `images/${sunoId}.${extension}`

    const { error } = await client.storage
      .from(SONGS_BUCKET)
      .upload(fileName, imageBuffer, {
        contentType,
        upsert: true,
      })

    if (error) {
      console.error('Image upload error:', error)
      return null
    }

    // Get public URL
    const { data } = client.storage
      .from(SONGS_BUCKET)
      .getPublicUrl(fileName)

    return data.publicUrl
  } catch (error) {
    console.error('Upload image error:', error)
    return null
  }
}

// Download file from URL and return as ArrayBuffer
export async function downloadFile(url: string): Promise<ArrayBuffer | null> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error('Download failed:', response.status, response.statusText)
      return null
    }
    return await response.arrayBuffer()
  } catch (error) {
    console.error('Download error:', error)
    return null
  }
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
  suno_id?: string
  created_at: string
}
