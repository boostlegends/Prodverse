import { NextRequest, NextResponse } from 'next/server'

const SUNO_API_URL = 'https://api.sunoapi.org/api/v1/generate'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const apiKey = process.env.SUNO_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'SUNO_API_KEY not configured' },
        { status: 500 }
      )
    }

    const { prompt, title, style, customMode, instrumental, model, vocalGender } = body

    // Validate required fields
    if (!customMode && !prompt) {
      return NextResponse.json(
        { error: 'Prompt is required in simple mode' },
        { status: 400 }
      )
    }

    if (customMode && (!title || !style)) {
      return NextResponse.json(
        { error: 'Title and style are required in custom mode' },
        { status: 400 }
      )
    }

    // Callback URL is REQUIRED by Suno API
    // For local development, the callback won't work but the API still needs it
    // For production, set SUNO_CALLBACK_URL or NEXT_PUBLIC_APP_URL
    let callbackUrl = process.env.SUNO_CALLBACK_URL
    if (!callbackUrl) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://prodverse.co')
      callbackUrl = `${appUrl}/api/suno/webhook`
    }

    // Build request payload
    const payload: Record<string, unknown> = {
      customMode: customMode ?? false,
      instrumental: instrumental ?? false,
      model: model ?? 'V5',
      callBackUrl: callbackUrl, // Required by Suno API
    }

    if (customMode) {
      payload.title = title
      payload.style = style
      if (prompt) payload.prompt = prompt // lyrics in custom mode
    } else {
      payload.prompt = prompt
    }

    if (vocalGender) {
      payload.vocalGender = vocalGender
    }

    // Call Suno API
    const response = await fetch(SUNO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (data.code !== 200) {
      return NextResponse.json(
        { error: data.msg || 'Suno API error', code: data.code },
        { status: data.code === 401 ? 401 : 400 }
      )
    }

    return NextResponse.json({
      success: true,
      taskId: data.data.taskId,
      message: 'Music generation started. Poll /api/suno/status/{taskId} for results.',
    })

  } catch (error) {
    console.error('Suno generate error:', error)
    return NextResponse.json(
      { error: 'Failed to generate music' },
      { status: 500 }
    )
  }
}
