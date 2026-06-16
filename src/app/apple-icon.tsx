import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config'

// Apple touch icon, generated at build time.
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
        color: '#ffffff',
        fontSize: 110,
        fontWeight: 700,
      }}
    >
      {siteConfig.name.charAt(0).toUpperCase()}
    </div>,
    { ...size }
  )
}
