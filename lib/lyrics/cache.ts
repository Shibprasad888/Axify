import type { Lyrics, LyricsTrack } from '@/types/lyrics'

// Intentionally no-op until the selected licensed provider permits caching.
export interface LyricsCache {
  get(track: LyricsTrack): Promise<Lyrics | null>
  set(track: LyricsTrack, lyrics: Lyrics): Promise<void>
  clear(): Promise<void>
}

export const lyricsCache: LyricsCache = {
  async get() { return null },
  async set() {},
  async clear() {},
}
