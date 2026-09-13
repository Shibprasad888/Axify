const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? ''
const configuredRedirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI ?? ''
export const spotifyCallbackPath = '/spotify/callback'
export function getSpotifyRedirectUri() {
  if (!configuredRedirectUri) throw new Error('Spotify callback configuration is missing.')
  return configuredRedirectUri
}

export function isAllowedSpotifyRedirectUri(uri: string) {
  if (!configuredRedirectUri || uri !== configuredRedirectUri) return false
  try { const parsed = new URL(uri); return parsed.protocol === 'https:' && parsed.pathname === spotifyCallbackPath && !parsed.search && !parsed.hash && !parsed.username && !parsed.password }
  catch { return false }
}

export const spotifyConfig = {
  clientId,
  redirectUri: configuredRedirectUri,
  authorizeUrl: 'https://accounts.spotify.com/authorize',
  tokenUrl: 'https://accounts.spotify.com/api/token',
  scopes: ['user-read-private', 'user-read-email', 'user-read-recently-played', 'user-library-read', 'playlist-read-private', 'playlist-read-collaborative'],
}

export function validateSpotifyConfig() {
  if (!clientId) throw new Error('Spotify connection is unavailable because the public client configuration is missing.')
  if (!configuredRedirectUri && typeof window === 'undefined') throw new Error('Spotify connection is unavailable because the callback configuration is missing.')
}
export const spotifyScope = spotifyConfig.scopes.join(' ')
