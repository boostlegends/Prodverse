import { NextRequest, NextResponse } from 'next/server'

// This webhook receives callbacks from Suno API when generation is complete
// You can store results in a database here

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    console.log('Suno webhook received:', JSON.stringify(payload, null, 2))

    const { taskId, status, songs } = payload

    // TODO: Store in database
    // For now, just log and acknowledge
    console.log(`Task ${taskId} status: ${status}`)

    if (songs && songs.length > 0) {
      console.log(`Generated ${songs.length} songs:`)
      songs.forEach((song: { title: string; audioUrl: string }, index: number) => {
        console.log(`  ${index + 1}. ${song.title}: ${song.audioUrl}`)
      })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
