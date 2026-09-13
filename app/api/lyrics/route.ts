import { NextResponse } from 'next/server'
import { resolveLyrics } from '@/lib/lyrics/resolver'
import type { LyricsTrack } from '@/types/lyrics'

export async function POST(request: Request) {
  try {
    const track = (await request.json()) as Partial<LyricsTrack>
    if (!track.id || !track.title || !track.artist) return NextResponse.json({ status: 'unavailable', lyrics: null, message: 'A complete track is required.' }, { status: 400 })
    const lyrics = await resolveLyrics({ id: track.id, title: track.title, artist: track.artist, album: track.album, durationMs: track.durationMs })
    return NextResponse.json({ status: lyrics ? 'available' : 'unavailable', lyrics, message: lyrics ? undefined : process.env.LYRICS_API_BASE_URL ? "Lyrics aren't available for this track." : 'Lyrics provider not configured.' })
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') return NextResponse.json({ status: 'unavailable', lyrics: null }, { status: 499 })
    return NextResponse.json({ status: 'error', lyrics: null, message: 'Lyrics are temporarily unavailable.' }, { status: 502 })
  }
}
