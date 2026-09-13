import { NextResponse } from 'next/server'
import { isAllowedSpotifyRedirectUri, spotifyConfig, validateSpotifyConfig, spotifyScope, getSpotifyRedirectUri } from '@/lib/spotify/config'
import { setSpotifyTokens } from '@/lib/spotify/server'

export async function GET() { const { getSpotifyAccessToken } = await import('@/lib/spotify/server'); const accessToken = await getSpotifyAccessToken(); return accessToken ? NextResponse.json({ accessToken }) : NextResponse.json({ error: 'Spotify is not connected.' }, { status: 401 }) }

export async function POST(request: Request) {
  try {
    validateSpotifyConfig()
    const { code, verifier, redirectUri } = await request.json()
    const resolvedRedirectUri = typeof redirectUri === 'string' ? redirectUri : getSpotifyRedirectUri()
    if (!isAllowedSpotifyRedirectUri(resolvedRedirectUri)) return NextResponse.json({ error: 'Spotify callback configuration is not allowed.' }, { status: 400 })
    if (!code || !verifier) return NextResponse.json({ error: 'Missing authorization data.' }, { status: 400 })
    const response = await fetch(spotifyConfig.tokenUrl, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: resolvedRedirectUri, client_id: spotifyConfig.clientId, code_verifier: verifier }) })
    const data = await response.json()
    if (!response.ok || !data.access_token) return NextResponse.json({ error: 'Spotify authorization could not be completed.' }, { status: 400 })
    const profileResponse = await fetch('https://api.spotify.com/v1/me', { headers: { Authorization: `Bearer ${data.access_token}` } })
    const profile = await profileResponse.json()
    if (!profileResponse.ok || !profile.id) return NextResponse.json({ error: 'Spotify account details could not be loaded.' }, { status: 400 })
    await setSpotifyTokens(data.access_token, data.refresh_token, data.expires_in ?? 3600)
    return NextResponse.json({ connection: { accountId: profile.id, displayName: profile.display_name ?? 'Spotify listener', email: profile.email ?? undefined, connectedAt: new Date().toISOString(), scopes: spotifyScope.split(' ') } })
  } catch { return NextResponse.json({ error: 'Spotify is not configured or unavailable.' }, { status: 500 }) }
}
