'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useSpotifyPlayer } from '@/components/spotify/player-context'
import { LyricsPanel } from '@/components/lyrics/lyrics-panel'

export default function NowPlayingPage() {
  const { currentTrack, isPlaying, togglePlay } = useSpotifyPlayer()
  const [lyricsOpen, setLyricsOpen] = useState(true)
  return <main className="now-playing-page"><a className="now-playing-back" href="/app"><ArrowLeft size={16} /> Back to Axify</a><section className="now-playing-card glass"><p className="eyebrow">NOW PLAYING</p><div className="now-playing-art" style={currentTrack?.artwork ? { backgroundImage: `url(${currentTrack.artwork})` } : undefined} /><h1>{currentTrack?.name ?? 'Play something to begin'}</h1><p className="muted">{currentTrack?.artist ?? 'Your current Spotify track will appear here.'}</p><button className="primary-button" onClick={() => togglePlay()} disabled={!currentTrack}>{isPlaying ? 'Pause' : 'Play'}</button><button className="quiet-button now-playing-lyrics-button" onClick={() => setLyricsOpen(true)}>Open lyrics</button></section><LyricsPanel open={lyricsOpen} onClose={() => setLyricsOpen(false)} /></main>
}
