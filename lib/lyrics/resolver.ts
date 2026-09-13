import type { Lyrics, LyricsTrack } from '@/types/lyrics'
import { configuredLyricsProvider } from './provider'

export async function resolveLyrics(track: LyricsTrack, signal?: AbortSignal): Promise<Lyrics | null> {
  if (!configuredLyricsProvider) return null
  const match = await configuredLyricsProvider.searchTrack(track, signal)
  if (!match) return null
  const lyrics = await configuredLyricsProvider.getLyrics(match, signal)
  if (!lyrics || lyrics.trackId !== track.id || lyrics.title.trim().toLowerCase() !== track.title.trim().toLowerCase()) return null
  return lyrics
}
