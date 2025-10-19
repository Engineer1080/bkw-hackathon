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
          {/* Skyscraper */}
          <rect x="8" y="3" width="8" height="18" fill="#FF8C00" rx="1" />
          {/* Windows */}
          <rect x="9" y="5" width="1.5" height="2" fill="white" rx="0.3" />
          <rect x="11" y="5" width="1.5" height="2" fill="white" rx="0.3" />
          <rect x="13.5" y="5" width="1.5" height="2" fill="white" rx="0.3" />
          
          <rect x="9" y="8" width="1.5" height="2" fill="white" rx="0.3" />
          <rect x="11" y="8" width="1.5" height="2" fill="white" rx="0.3" />
          <rect x="13.5" y="8" width="1.5" height="2" fill="white" rx="0.3" />
          
          <rect x="9" y="11" width="1.5" height="2" fill="white" rx="0.3" />
          <rect x="11" y="11" width="1.5" height="2" fill="white" rx="0.3" />
          <rect x="13.5" y="11" width="1.5" height="2" fill="white" rx="0.3" />
          
          <rect x="9" y="14" width="1.5" height="2" fill="white" rx="0.3" />
          <rect x="11" y="14" width="1.5" height="2" fill="white" rx="0.3" />
          <rect x="13.5" y="14" width="1.5" height="2" fill="white" rx="0.3" />
          
          <rect x="9" y="17" width="1.5" height="2" fill="white" rx="0.3" />
          <rect x="11" y="17" width="1.5" height="2" fill="white" rx="0.3" />
          <rect x="13.5" y="17" width="1.5" height="2" fill="white" rx="0.3" />
          
          {/* Entrance */}
          <rect x="10.5" y="19.5" width="3" height="1.5" fill="white" rx="0.3" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}

