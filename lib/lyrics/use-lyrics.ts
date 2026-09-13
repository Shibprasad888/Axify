'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Lyrics, LyricsStatus, LyricsTrack } from '@/types/lyrics'
import { currentLineIndex } from '@/types/lyrics'

export function useLyrics(track: LyricsTrack | null, positionMs: number) {
  const [lyrics, setLyrics] = useState<Lyrics | null>(null)
  const [status, setStatus] = useState<LyricsStatus>(track ? 'loading' : 'idle')
  const [error, setError] = useState<string | null>(null)
  const [retryKey, setRetryKey] = useState(0)
  const requestId = useRef(0)
  const retry = useCallback(() => setRetryKey((value) => value + 1), [])

  useEffect(() => {
    const id = ++requestId.current
    const controller = new AbortController()
    if (!track) { setLyrics(null); setStatus('idle'); setError(null); return () => controller.abort() }
    setLyrics(null); setStatus('loading'); setError(null)
    fetch('/api/lyrics', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(track), signal: controller.signal })
      .then(async (response) => { const data = await response.json(); if (!response.ok && data.status !== 'error') throw new Error(data.message ?? 'Couldn\'t load lyrics.'); return data })
      .then((data) => { if (id !== requestId.current) return; setLyrics(data.lyrics); setStatus(data.status); setError(data.message ?? null) })
      .catch((reason) => { if (reason.name === 'AbortError' || id !== requestId.current) return; setStatus('error'); setError('Lyrics are temporarily unavailable.') })
    return () => controller.abort()
  }, [track?.id, retryKey])

  const currentIndex = useMemo(() => currentLineIndex(lyrics?.syncedLines, positionMs), [lyrics?.syncedLines, positionMs])
  return { lyrics, status, error, currentLineIndex: currentIndex, retry }
}
