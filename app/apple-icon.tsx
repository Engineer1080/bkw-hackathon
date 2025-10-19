import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 180,
  height: 180,
}
 
export const contentType = 'image/png'
 
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          borderRadius: '22%',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Building */}
          <rect x="35" y="30" width="50" height="70" fill="white" opacity="0.95" rx="2" />
          
          {/* Windows Grid */}
          <rect x="42" y="38" width="10" height="10" fill="#FF6B00" rx="1" />
          <rect x="55" y="38" width="10" height="10" fill="#FF6B00" rx="1" />
          <rect x="68" y="38" width="10" height="10" fill="#FF6B00" rx="1" />
          
          <rect x="42" y="52" width="10" height="10" fill="#FF6B00" rx="1" />
          <rect x="55" y="52" width="10" height="10" fill="#FF6B00" rx="1" />
          <rect x="68" y="52" width="10" height="10" fill="#FF6B00" rx="1" />
          
          <rect x="42" y="66" width="10" height="10" fill="#FF6B00" rx="1" />
          <rect x="55" y="66" width="10" height="10" fill="#FF6B00" rx="1" />
          <rect x="68" y="66" width="10" height="10" fill="#FF6B00" rx="1" />
          
          {/* Door */}
          <rect x="52" y="85" width="16" height="15" fill="#003DA5" rx="1" />
          
          {/* Roof */}
          <path d="M 30 30 L 60 10 L 90 30 Z" fill="white" opacity="0.95" />
          
          {/* AI Neural Network */}
          <circle cx="15" cy="25" r="4" fill="white" opacity="0.8" />
          <circle cx="105" cy="25" r="4" fill="white" opacity="0.8" />
          <circle cx="15" cy="95" r="4" fill="white" opacity="0.8" />
          <circle cx="105" cy="95" r="4" fill="white" opacity="0.8" />
          <circle cx="60" cy="10" r="5" fill="#003DA5" opacity="0.9" />
          
          {/* Connection Lines */}
          <line x1="15" y1="25" x2="60" y2="10" stroke="white" strokeWidth="2" opacity="0.5" />
          <line x1="105" y1="25" x2="60" y2="10" stroke="white" strokeWidth="2" opacity="0.5" />
          
          {/* AI Sparkles */}
          <g transform="translate(95, 85)">
            <path
              d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z"
              fill="white"
              opacity="0.9"
            />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}

