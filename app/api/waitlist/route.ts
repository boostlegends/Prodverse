import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const googleScriptUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    if (!googleScriptUrl) {
      console.error('GOOGLE_SHEETS_WEBHOOK_URL not configured')
      // Still return success to user, but log error
      return NextResponse.json({ success: true })
    }

    // Send to Google Sheets via Apps Script
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
        source: 'prodverse-waitlist'
      }),
    })

    if (!response.ok) {
      console.error('Google Sheets error:', await response.text())
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    )
  }
}
