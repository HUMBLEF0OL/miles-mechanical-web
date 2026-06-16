import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config'

// Default branded social card (Open Graph / Twitter), generated at build time.
// Per-page dynamic OG images are an easy follow-up (see the seo skill).
export const alt = siteConfig.name
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px',
        background: 'linear-gradient(135deg, #4f46e5 0%, #0a0a0a 100%)',
        color: '#ffffff',
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 700 }}>{siteConfig.name}</div>
      <div style={{ fontSize: 32, marginTop: 24, opacity: 0.85, maxWidth: 900 }}>
        {siteConfig.description}
      </div>
    </div>,
    { ...size }
  )
}
