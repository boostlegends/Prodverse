import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Prodverse - AI-Powered Music Creation Platform'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0F160C',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #1A261B 0%, #0F160C 70%)',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(rgba(127, 209, 73, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(127, 209, 73, 0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(127, 209, 73, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Logo circle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7FD149 0%, #76C449 50%, #00ff02 100%)',
            marginBottom: '30px',
            boxShadow: '0 0 60px rgba(127, 209, 73, 0.5)',
          }}
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: '#0F160C' }}
          >
            <path
              d="M9 18V5l12-2v13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="6" cy="18" r="3" fill="currentColor" />
            <circle cx="18" cy="16" r="3" fill="currentColor" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #7FD149 0%, #76C449 50%, #00ff02 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '20px',
          }}
        >
          Prodverse
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: '#e7e9ea',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          AI-Powered Music Creation Platform
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: '40px',
          }}
        >
          {['AI Music Generation', 'Collaboration', 'Music Videos'].map((feature) => (
            <div
              key={feature}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#7FD149',
                fontSize: 20,
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#7FD149',
                }}
              />
              {feature}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
