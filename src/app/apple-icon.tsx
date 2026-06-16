import { ImageResponse } from 'next/og'

// Apple touch icon, generated at build time. Mirrors the Logo "mark" — a blue
// badge with the AC (white) + heating (ember) "M" monogram.
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#155c93', // brand-600 — Miles Mechanical blue (matches logo badge)
      }}
    >
      <svg width="120" height="120" viewBox="0 0 96 96" fill="none">
        <polyline
          points="28 68 28 30 48 53"
          fill="none"
          stroke="#ffffff"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="48 53 68 30 68 68"
          fill="none"
          stroke="#f0641f"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    { ...size }
  )
}
