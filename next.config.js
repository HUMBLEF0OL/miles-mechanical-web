import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Content-Security-Policy — uncomment and tighten for production.
          // Start permissive, then lock down based on your actual asset sources.
          // { key: 'Content-Security-Policy', value: [
          //   "default-src 'self'",
          //   "script-src 'self' 'unsafe-inline'",   // remove unsafe-inline once you have a nonce setup
          //   "style-src 'self' 'unsafe-inline'",
          //   "img-src 'self' data: blob:",
          //   "font-src 'self'",
          //   "connect-src 'self'",
          //   "frame-ancestors 'none'",
          // ].join('; ') },
        ],
      },
    ]
  },

  // Image domains — add external image hosts here
  images: {
    remotePatterns: [
      // Example:
      // { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // Logging in development
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },

  // Experimental features (review on each Next.js major update)
  experimental: {
    // typedRoutes: true, // enable if you want typed Link hrefs
  },
}

export default withNextIntl(nextConfig)
