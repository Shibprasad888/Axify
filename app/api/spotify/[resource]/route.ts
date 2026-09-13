import { NextResponse } from 'next/server'
import { spotifyFetch } from '@/lib/spotify/server'
import type { SpotifySearchResult, SpotifyPage, SpotifyPlaylist, SpotifyRecentlyPlayed, SpotifyTrack } from '@/lib/spotify/types'

export async function GET(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  try {
    const { resource } = await params
    const url = new URL(request.url)
    const requestedLimit = Number(url.searchParams.get('limit') ?? 20); const requestedOffset = Number(url.searchParams.get('offset') ?? 0); const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(Math.floor(requestedLimit), 1), 50) : 20
    const offset = Number.isFinite(requestedOffset) ? Math.max(Math.floor(requestedOffset), 0) : 0
    let data: unknown
    if (resource === 'me') data = await spotifyFetch('/me')
    else if (resource === 'recently-played') data = await spotifyFetch<SpotifyPage<SpotifyRecentlyPlayed>>(`/me/player/recently-played?limit=${limit}`)
    else if (resource === 'liked') data = await spotifyFetch<SpotifyPage<{ track: SpotifyTrack }>>(`/me/tracks?limit=${limit}&offset=${offset}`)
    else if (resource === 'playlists') data = await spotifyFetch<SpotifyPage<SpotifyPlaylist>>(`/me/playlists?limit=${limit}&offset=${offset}`)
    else if (resource === 'search') { const query = url.searchParams.get('q')?.trim(); if (!query) return NextResponse.json({ error: 'Search query is required.' }, { status: 400 }); data = await spotifyFetch<SpotifySearchResult>(`/search?${new URLSearchParams({ q: query, type: 'track,artist,album,playlist', limit: String(limit), offset: String(offset) })}`) }
    else return NextResponse.json({ error: 'Unknown Spotify resource.' }, { status: 404 })
    return NextResponse.json(data)
  } catch (error) { const message = error instanceof Error ? error.message : 'Spotify data is unavailable.'; return NextResponse.json({ error: message }, { status: message.includes('not connected') ? 401 : 502 }) }
}
