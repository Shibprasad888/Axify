'use client'

import { useEffect, useRef, useState } from 'react'
import { X, RotateCcw, LocateFixed } from 'lucide-react'
import { useSpotifyPlayer } from '@/components/spotify/player-context'
import { useLyrics } from '@/lib/lyrics/use-lyrics'
import type { LyricsTrack } from '@/types/lyrics'

export function LyricsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { currentTrack, position } = useSpotifyPlayer()
  const track: LyricsTrack | null = currentTrack ? { id: currentTrack.id, title: currentTrack.name, artist: currentTrack.artist, album: currentTrack.album, durationMs: currentTrack.duration } : null
  const { lyrics, status, error, currentLineIndex, retry } = useLyrics(track, position)
  const activeLine = useRef<HTMLDivElement>(null)
  const [manualScroll, setManualScroll] = useState(false)
  useEffect(() => { if (!open) return; document.body.style.overflow = 'hidden'; const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }; document.addEventListener('keydown', handleKeyDown); return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', handleKeyDown) } }, [open, onClose])
  useEffect(() => { if (open && !manualScroll) activeLine.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }, [currentLineIndex, open, manualScroll])
  if (!open) return null
  const message = !track ? 'Play something to see lyrics.' : status === 'loading' ? 'Finding lyrics...' : status === 'error' ? (error ?? 'Couldn\'t load lyrics.') : status === 'unavailable' ? (error ?? "Lyrics aren't available for this track.") : null
  return <div className="lyrics-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="lyrics-panel" role="dialog" aria-modal="true" aria-labelledby="lyrics-title"><button className="lyrics-close" aria-label="Close lyrics" onClick={onClose}><X size={18} /></button><div className="lyrics-panel-head"><div className="lyrics-artwork" style={currentTrack?.artwork ? { backgroundImage: `url(${currentTrack.artwork})` } : undefined} /><div><p className="eyebrow">NOW PLAYING</p><h2 id="lyrics-title">{currentTrack?.name ?? 'Lyrics'}</h2><p className="muted">{currentTrack?.artist ?? 'Axify'}</p></div></div>{message ? <div className="lyrics-empty"><p>{message}</p>{track && status !== 'loading' && <button className="quiet-button" onClick={retry}><RotateCcw size={14} /> Try again</button>}</div> : <div className="lyrics-scroll" onScroll={() => setManualScroll(true)}>{lyrics?.syncedLines?.length ? lyrics.syncedLines.map((line, index) => <div ref={index === currentLineIndex ? activeLine : undefined} className={index === currentLineIndex ? 'lyrics-line current' : 'lyrics-line'} key={`${line.startMs}-${index}`}>{line.text}</div>) : <div className="lyrics-plain">{lyrics?.plainLyrics?.split('\n').map((line, index) => <p key={`${line}-${index}`}>{line || '\u00a0'}</p>)}</div>}</div>}{lyrics?.syncedLines?.length && manualScroll && <button className="jump-current" onClick={() => { setManualScroll(false); activeLine.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }}><LocateFixed size={14} /> Jump to current line</button>}</section></div>
}
