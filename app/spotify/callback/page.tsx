import { Suspense } from 'react'
import SpotifyCallbackClient from './spotify-callback-client'

export default function SpotifyCallbackPage() {
  return <Suspense fallback={<main className="auth-gate"><section className="glass account-card callback-card"><p className="eyebrow">Axify · Spotify</p><h1>Connecting Spotify.</h1><p className="muted">Bringing your music into Axify.</p></section></main>}><SpotifyCallbackClient /></Suspense>
}
