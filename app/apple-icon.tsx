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
          {/* Skyscraper */}
          <rect x="40" y="15" width="40" height="90" fill="#FF8C00" rx="2" />
          
          {/* Windows Grid (4 columns x 15 rows) */}
          {/* Row 1 */}
          <rect x="44" y="20" width="4" height="5" fill="white" rx="0.5" />
          <rect x="51" y="20" width="4" height="5" fill="white" rx="0.5" />
          <rect x="58" y="20" width="4" height="5" fill="white" rx="0.5" />
          <rect x="65" y="20" width="4" height="5" fill="white" rx="0.5" />
          
          {/* Row 2 */}
          <rect x="44" y="27" width="4" height="5" fill="white" rx="0.5" />
          <rect x="51" y="27" width="4" height="5" fill="white" rx="0.5" />
          <rect x="58" y="27" width="4" height="5" fill="white" rx="0.5" />
          <rect x="65" y="27" width="4" height="5" fill="white" rx="0.5" />
          
          {/* Row 3 */}
          <rect x="44" y="34" width="4" height="5" fill="white" rx="0.5" />
          <rect x="51" y="34" width="4" height="5" fill="white" rx="0.5" />
          <rect x="58" y="34" width="4" height="5" fill="white" rx="0.5" />
          <rect x="65" y="34" width="4" height="5" fill="white" rx="0.5" />
          
          {/* Row 4 */}
          <rect x="44" y="41" width="4" height="5" fill="white" rx="0.5" />
          <rect x="51" y="41" width="4" height="5" fill="white" rx="0.5" />
          <rect x="58" y="41" width="4" height="5" fill="white" rx="0.5" />
          <rect x="65" y="41" width="4" height="5" fill="white" rx="0.5" />
          
          {/* Row 5 */}
          <rect x="44" y="48" width="4" height="5" fill="white" rx="0.5" />
          <rect x="51" y="48" width="4" height="5" fill="white" rx="0.5" />
          <rect x="58" y="48" width="4" height="5" fill="white" rx="0.5" />
          <rect x="65" y="48" width="4" height="5" fill="white" rx="0.5" />
          
          {/* Row 6 */}
          <rect x="44" y="55" width="4" height="5" fill="white" rx="0.5" />
          <rect x="51" y="55" width="4" height="5" fill="white" rx="0.5" />
          <rect x="58" y="55" width="4" height="5" fill="white" rx="0.5" />
          <rect x="65" y="55" width="4" height="5" fill="white" rx="0.5" />
          
          {/* Row 7 */}
          <rect x="44" y="62" width="4" height="5" fill="white" rx="0.5" />
          <rect x="51" y="62" width="4" height="5" fill="white" rx="0.5" />
          <rect x="58" y="62" width="4" height="5" fill="white" rx="0.5" />
          <rect x="65" y="62" width="4" height="5" fill="white" rx="0.5" />
          
          {/* Row 8 */}
          <rect x="44" y="69" width="4" height="5" fill="white" rx="0.5" />
          <rect x="51" y="69" width="4" height="5" fill="white" rx="0.5" />
          <rect x="58" y="69" width="4" height="5" fill="white" rx="0.5" />
          <rect x="65" y="69" width="4" height="5" fill="white" rx="0.5" />
          
          {/* Row 9 */}
          <rect x="44" y="76" width="4" height="5" fill="white" rx="0.5" />
          <rect x="51" y="76" width="4" height="5" fill="white" rx="0.5" />
          <rect x="58" y="76" width="4" height="5" fill="white" rx="0.5" />
          <rect x="65" y="76" width="4" height="5" fill="white" rx="0.5" />
          
          {/* Row 10 */}
          <rect x="44" y="83" width="4" height="5" fill="white" rx="0.5" />
          <rect x="51" y="83" width="4" height="5" fill="white" rx="0.5" />
          <rect x="58" y="83" width="4" height="5" fill="white" rx="0.5" />
          <rect x="65" y="83" width="4" height="5" fill="white" rx="0.5" />
          
          {/* Row 11 */}
          <rect x="44" y="90" width="4" height="5" fill="white" rx="0.5" />
          <rect x="51" y="90" width="4" height="5" fill="white" rx="0.5" />
          <rect x="58" y="90" width="4" height="5" fill="white" rx="0.5" />
          <rect x="65" y="90" width="4" height="5" fill="white" rx="0.5" />
          
          {/* Row 12 */}
          <rect x="44" y="97" width="4" height="5" fill="white" rx="0.5" />
          <rect x="51" y="97" width="4" height="5" fill="white" rx="0.5" />
          <rect x="58" y="97" width="4" height="5" fill="white" rx="0.5" />
          <rect x="65" y="97" width="4" height="5" fill="white" rx="0.5" />
          
          {/* Entrance/Lobby */}
          <rect x="54" y="100" width="12" height="5" fill="white" rx="1" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}

