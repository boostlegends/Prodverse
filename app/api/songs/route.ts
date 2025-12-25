import { NextRequest, NextResponse } from 'next/server'
import { supabase, downloadFile, uploadAudioFile, uploadImageFile } from '@/lib/supabase'

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

// POST - Save a new song (downloads and stores files in Supabase Storage)
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

    // Use sunoId for file naming, fallback to taskId if not available
    const fileId = sunoId || taskId

    // Download and upload audio file to Supabase Storage
    let permanentAudioUrl = audioUrl
    let permanentStreamUrl = streamUrl || audioUrl

    // Try to use sourceAudioUrl (direct Suno CDN) for downloading
    const downloadUrl = audioUrl.includes('cdn1.suno.ai') || audioUrl.includes('cdn2.suno.ai')
      ? audioUrl
      : streamUrl || audioUrl

    console.log(`Downloading audio for ${title} from: ${downloadUrl}`)
    const audioBuffer = await downloadFile(downloadUrl)

    if (audioBuffer) {
      console.log(`Uploading audio (${(audioBuffer.byteLength / 1024 / 1024).toFixed(2)}MB) to Supabase Storage...`)
      const uploadedAudioUrl = await uploadAudioFile(fileId, audioBuffer)
      if (uploadedAudioUrl) {
        permanentAudioUrl = uploadedAudioUrl
        permanentStreamUrl = uploadedAudioUrl
        console.log(`Audio uploaded successfully: ${uploadedAudioUrl}`)
      } else {
        console.warn('Audio upload failed, using original Suno URL as fallback')
      }
    } else {
      console.warn('Audio download failed, using original Suno URL as fallback')
    }

    // Download and upload image file to Supabase Storage
    let permanentImageUrl = imageUrl

    if (imageUrl) {
      console.log(`Downloading image from: ${imageUrl}`)
      const imageBuffer = await downloadFile(imageUrl)

      if (imageBuffer) {
        console.log(`Uploading image to Supabase Storage...`)
        const uploadedImageUrl = await uploadImageFile(fileId, imageBuffer)
        if (uploadedImageUrl) {
          permanentImageUrl = uploadedImageUrl
          console.log(`Image uploaded successfully: ${uploadedImageUrl}`)
        } else {
          console.warn('Image upload failed, using original Suno URL as fallback')
        }
      } else {
        console.warn('Image download failed, using original Suno URL as fallback')
      }
    }

    // Save to database with permanent URLs
    const { data, error } = await supabase
      .from('songs')
      .insert({
        title,
        audio_url: permanentAudioUrl,
        stream_url: permanentStreamUrl,
        image_url: permanentImageUrl,
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
