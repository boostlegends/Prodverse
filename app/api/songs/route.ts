import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Fetch all saved songs
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, songs: data })
  } catch (error) {
    console.error('Fetch songs error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch songs' },
      { status: 500 }
    )
  }
}

// POST - Save a new song
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, audioUrl, streamUrl, imageUrl, duration, style, prompt, taskId, sunoId } = body

    if (!title || !audioUrl || !taskId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('songs')
      .insert({
        title,
        audio_url: audioUrl,
        stream_url: streamUrl || audioUrl,
        image_url: imageUrl,
        duration: duration ? Math.round(duration) : null,
        style,
        prompt,
        task_id: taskId,
        suno_id: sunoId,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, song: data })
  } catch (error) {
    console.error('Save song error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save song' },
      { status: 500 }
    )
  }
}
