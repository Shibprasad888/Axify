import type { LyricsProvider, LyricsTrack } from '@/types/lyrics'

const baseUrl = process.env.LYRICS_API_BASE_URL
const apiKey = process.env.LYRICS_API_KEY

export const configuredLyricsProvider: LyricsProvider | null = baseUrl && apiKey ? {
  name: 'Configured licensed provider',
  supportsSyncedLyrics: false,
  async searchTrack(track: LyricsTrack, signal) {
    const response = await fetch(`${baseUrl}/search`, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` }, body: JSON.stringify(track), signal })
    if (!response.ok) throw new Error(`Lyrics provider returned ${response.status}`)
    return response.json()
  },
  async getLyrics(match, signal) {
    const response = await fetch(`${baseUrl}/lyrics`, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` }, body: JSON.stringify({ match }), signal })
    if (!response.ok) throw new Error(`Lyrics provider returned ${response.status}`)
    return response.json()
  },
} : null
