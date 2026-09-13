export type Track = { title: string; artist: string; tone: 'amber' | 'ice' | 'plum' | 'rose' | 'blue'; duration: string; album?: string }

export const tracks: Track[] = [
  { title: 'The Night We Met', artist: 'Lord Huron', tone: 'amber', duration: '3:28', album: 'Strange Trails' },
  { title: 'Somebody Else', artist: 'The 1975', tone: 'ice', duration: '4:41', album: 'I like it when you sleep...' },
  { title: 'I Was Never There', artist: 'The Weeknd', tone: 'plum', duration: '4:01', album: 'My Dear Melancholy,' },
  { title: 'Anti-Hero', artist: 'Taylor Swift', tone: 'rose', duration: '3:20', album: 'Midnights' },
  { title: 'Die For You', artist: 'The Weeknd', tone: 'blue', duration: '4:20', album: 'Starboy' },
  { title: 'A Sky Full of Stars', artist: 'Coldplay', tone: 'ice', duration: '4:27', album: 'Ghost Stories' },
]

export const playlists = [
  { title: 'Liked Songs', subtitle: '245 songs', tone: 'blue' as const },
  { title: 'Chill Mix', subtitle: 'Made for you', tone: 'ice' as const },
  { title: 'Daily Mix 1', subtitle: 'Made for you', tone: 'plum' as const },
  { title: 'Discover Weekly', subtitle: 'Made for you', tone: 'rose' as const },
  { title: 'The Weeknd', subtitle: 'Artist', tone: 'amber' as const },
  { title: 'Indian Lo-Fi', subtitle: 'Playlist', tone: 'blue' as const },
]

export const navItems = [
  { label: 'Home', href: '/app' }, { label: 'Search', href: '/app/search' }, { label: 'Your Library', href: '/app/library' },
  { label: 'Liked Songs', href: '/app/liked' }, { label: 'Playlists', href: '/app/playlists' }, { label: 'Albums', href: '/app/albums' }, { label: 'Artists', href: '/app/artists' }, { label: 'Queue', href: '/app/queue' },
]

export const toneClass = (tone: string) => `cover cover-${tone}`
