export type SpotifyImage = { url: string; width: number | null; height: number | null }
export type SpotifyArtist = { id: string; name: string; images?: SpotifyImage[] }
export type SpotifyAlbum = { id: string; name: string; images: SpotifyImage[]; artists: SpotifyArtist[] }
export type SpotifyTrack = { id: string; name: string; duration_ms: number; artists: SpotifyArtist[]; album: SpotifyAlbum; uri: string }
export type SpotifyPage<T> = { items: T[]; limit: number; offset: number; total: number; next: string | null }
export type SpotifyPlaylist = { id: string; name: string; description: string | null; images: SpotifyImage[]; tracks: { total: number }; owner: { display_name?: string } }
export type SpotifyRecentlyPlayed = { track: SpotifyTrack; played_at: string }
export type SpotifySearchResult = { tracks?: SpotifyPage<SpotifyTrack>; artists?: SpotifyPage<SpotifyArtist>; albums?: SpotifyPage<SpotifyAlbum>; playlists?: SpotifyPage<SpotifyPlaylist> }
export function spotifyImage(images: SpotifyImage[] | undefined) { return images?.[0]?.url ?? '' }
export function spotifyArtistNames(artists: SpotifyArtist[]) { return artists.map((artist) => artist.name).join(', ') }
export function formatDuration(milliseconds: number) { const seconds = Math.floor(milliseconds / 1000); return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}` }
