import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots { const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://axify.iamshiv.dev'; return { rules: { userAgent: '*', allow: '/', disallow: ['/app', '/api', '/spotify/callback', '/now-playing'] }, sitemap: `${base}/sitemap.xml` } }
