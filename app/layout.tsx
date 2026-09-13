import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/auth/auth-context'
import { SpotifyProvider } from '@/components/spotify/spotify-context'
import { SpotifyPlayerProvider } from '@/components/spotify/player-context'
import { SpotifyQueueProvider } from '@/components/spotify/queue-context'

export const metadata: Metadata = {
  title: { default: 'Axify — A better way to experience your Spotify library.', template: '%s · Axify' },
  description: 'Axify — A better way to experience your Spotify library.',
  applicationName: 'Axify',
  generator: 'Next.js',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://axify.iamshiv.dev'),
  openGraph: { title: 'Axify — A better way to experience your Spotify library.', description: 'A calm, personal interface for your Spotify library.', type: 'website', siteName: 'Axify' },
  twitter: { card: 'summary_large_image', title: 'Axify — A better way to experience your Spotify library.', description: 'A calm, personal interface for your Spotify library.' },
  icons: { icon: '/Axify.png', apple: '/Axify.png' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#08111d',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background" data-scroll-behavior="smooth"><body className="antialiased"><AuthProvider><SpotifyProvider><SpotifyQueueProvider><SpotifyPlayerProvider>{children}</SpotifyPlayerProvider></SpotifyQueueProvider></SpotifyProvider></AuthProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
