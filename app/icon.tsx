import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 32,
  height: 32,
}
 
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#FF6B00',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '20%',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Building */}
          <rect x="8" y="6" width="8" height="12" fill="white" />
          {/* Windows */}
          <rect x="9" y="8" width="2" height="2" fill="#FF6B00" />
          <rect x="13" y="8" width="2" height="2" fill="#FF6B00" />
          <rect x="9" y="11" width="2" height="2" fill="#FF6B00" />
          <rect x="13" y="11" width="2" height="2" fill="#FF6B00" />
          {/* Door */}
          <rect x="11" y="15" width="2" height="3" fill="#003DA5" />
          {/* Roof */}
          <path d="M 7 6 L 12 3 L 17 6 Z" fill="white" />
          {/* AI Sparkle */}
          <path
            d="M 18 16 L 18.5 17.5 L 20 18 L 18.5 18.5 L 18 20 L 17.5 18.5 L 16 18 L 17.5 17.5 Z"
            fill="white"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}

