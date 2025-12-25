import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const SUNO_API_URL = 'https://api.sunoapi.org/api/v1/generate/record-info'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const taskId = searchParams.get('taskId')
    const sunoId = searchParams.get('sunoId') // Specific song ID within the task

    if (!taskId) {
      return NextResponse.json(
        { success: false, error: 'taskId is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.SUNO_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'SUNO_API_KEY not configured' },
        { status: 500 }
      )
    }

    // Call Suno API to get fresh URLs
    const response = await fetch(`${SUNO_API_URL}?taskId=${taskId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    })

    const data = await response.json()

    if (data.code !== 200) {
      return NextResponse.json(
        { success: false, error: data.msg || 'Failed to refresh from Suno' },
        { status: 400 }
      )
    }

    const result = data.data
    const sunoData = result.response?.sunoData || result.songs || result.data || []

    if (!sunoData.length) {
      return NextResponse.json(
        { success: false, error: 'No song data found' },
        { status: 404 }
      )
    }

    // Find the correct song - match by sunoId if provided, otherwise use first
    let song = sunoData[0]
    if (sunoId) {
      const matchingSong = sunoData.find((s: { id: string }) => s.id === sunoId)
      if (matchingSong) {
        song = matchingSong
      }
    }

    // Prefer direct Suno CDN URLs (sourceAudioUrl) as they're more reliable
    // The proxy URLs (musicfile.api.box) sometimes don't work
    const freshUrls = {
      audioUrl: song.sourceAudioUrl || song.audioUrl || song.audio_url,
      streamUrl: song.sourceStreamAudioUrl || song.sourceAudioUrl || song.audioUrl,
      imageUrl: song.sourceImageUrl || song.imageUrl || song.image_url,
    }

    // Update only this specific song in the database (match by suno_id if available)
    const updateQuery = supabase
      .from('songs')
      .update({
        audio_url: freshUrls.audioUrl,
        stream_url: freshUrls.streamUrl || freshUrls.audioUrl,
        image_url: freshUrls.imageUrl,
      })

    // If sunoId provided, update only that song; otherwise update by task_id
    const { error: updateError } = sunoId
      ? await updateQuery.eq('suno_id', sunoId)
      : await updateQuery.eq('task_id', taskId)

    if (updateError) {
      console.error('Failed to update URLs in database:', updateError)
      // Still return fresh URLs even if DB update fails
    }

    return NextResponse.json({
      success: true,
      ...freshUrls,
    })

  } catch (error) {
    console.error('Refresh song error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to refresh song URLs' },
      { status: 500 }
    )
  }
}
