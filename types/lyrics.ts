export type SyncedLyricsLine = {
  startMs: number
  endMs?: number
  text: string
}

export type Lyrics = {
  trackId: string
  title: string
  artist: string
  album?: string
  plainLyrics?: string
  syncedLines?: SyncedLyricsLine[]
  source: string
  fetchedAt: string
}

export type LyricsStatus = 'idle' | 'loading' | 'available' | 'unavailable' | 'error'

export type LyricsTrack = {
  id: string
  title: string
  artist: string
  album?: string
  durationMs?: number
}

export type LyricsResponse = {
  lyrics: Lyrics | null
  status: Exclude<LyricsStatus, 'loading' | 'idle'>
  message?: string
}

export type LyricsProvider = {
  name: string
  supportsSyncedLyrics: boolean
  searchTrack(track: LyricsTrack, signal?: AbortSignal): Promise<unknown | null>
  getLyrics(match: unknown, signal?: AbortSignal): Promise<Lyrics | null>
}

export function currentLineIndex(lines: SyncedLyricsLine[] | undefined, positionMs: number) {
  if (!lines?.length) return -1
  return lines.findIndex((line, index) => {
    const end = line.endMs ?? lines[index + 1]?.startMs
    return line.startMs <= positionMs && (end === undefined || positionMs < end)
  })
}
