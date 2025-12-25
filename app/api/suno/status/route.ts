import { NextRequest, NextResponse } from 'next/server'

// Correct endpoint for querying generation status
const SUNO_API_URL = 'https://api.sunoapi.org/api/v1/generate/record-info'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const taskId = searchParams.get('taskId')

    if (!taskId) {
      return NextResponse.json(
        { error: 'taskId is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.SUNO_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'SUNO_API_KEY not configured' },
        { status: 500 }
      )
    }

    // Call Suno API to check status
    const response = await fetch(`${SUNO_API_URL}?taskId=${taskId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    })

    const data = await response.json()

    // Log the response for debugging
    console.log('Suno status response:', JSON.stringify(data, null, 2))

    if (data.code !== 200) {
      return NextResponse.json(
        { error: data.msg || 'Suno API error', code: data.code },
        { status: 400 }
      )
    }

    const result = data.data

    // Map status to a simpler format
    // Suno statuses: SUCCESS, PENDING, PROCESSING, FAILED (uppercase)
    let status: 'pending' | 'processing' | 'completed' | 'failed' = 'processing'

    const sunoStatus = (result.status || '').toUpperCase()
    if (sunoStatus === 'SUCCESS' || sunoStatus === 'COMPLETE' || sunoStatus === 'COMPLETED') {
      status = 'completed'
    } else if (sunoStatus === 'ERROR' || sunoStatus === 'FAILED') {
      status = 'failed'
    } else if (sunoStatus === 'PENDING' || sunoStatus === 'QUEUED') {
      status = 'pending'
    } else if (sunoStatus === 'PROCESSING' || sunoStatus === 'TEXT' || sunoStatus === 'FIRST') {
      status = 'processing'
    }

    // Map songs from Suno response format - songs are in response.sunoData
    const sunoData = result.response?.sunoData || result.songs || result.data || []
    const songs = sunoData.map((song: Record<string, unknown>) => ({
      id: song.id || song.songId,
      title: song.title || song.name || 'Untitled',
      audioUrl: song.audioUrl || song.audio_url || song.sourceAudioUrl,
      streamUrl: song.streamAudioUrl || song.streamUrl || song.stream_url || song.sourceStreamAudioUrl,
      imageUrl: song.imageUrl || song.image_url || song.sourceImageUrl,
      duration: song.duration,
    }))

    return NextResponse.json({
      success: true,
      taskId,
      status,
      songs,
      errorMessage: result.errorMessage || result.error_message,
    })

  } catch (error) {
    console.error('Suno status error:', error)
    return NextResponse.json(
      { error: 'Failed to check status' },
      { status: 500 }
    )
  }
}
