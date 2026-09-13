'use client'

import { createContext, useContext, useMemo, useState } from 'react'

export type QueueTrack = { id: string; uri: string; name: string; artist: string; album: string; artwork?: string; duration: number }
type QueueState = { items: QueueTrack[]; add: (track: QueueTrack) => void; remove: (id: string) => void; clear: () => void; move: (from: number, to: number) => void; playNext: (track: QueueTrack) => void }
const QueueContext = createContext<QueueState | null>(null)
export function SpotifyQueueProvider({ children }: { children: React.ReactNode }) { const [items, setItems] = useState<QueueTrack[]>([]); const value = useMemo(() => ({ items, add: (track: QueueTrack) => setItems((current) => current.some((item) => item.id === track.id) ? current : [...current, track]), remove: (id: string) => setItems((current) => current.filter((item) => item.id !== id)), clear: () => setItems([]), move: (from: number, to: number) => setItems((current) => { if (to < 0 || to >= current.length || from === to) return current; const next = [...current]; const [item] = next.splice(from, 1); next.splice(to, 0, item); return next }), playNext: (track: QueueTrack) => setItems((current) => [track, ...current.filter((item) => item.id !== track.id)]) }), [items]); return <QueueContext.Provider value={value}>{children}</QueueContext.Provider> }
export function useSpotifyQueue() { const value = useContext(QueueContext); if (!value) throw new Error('useSpotifyQueue must be used inside SpotifyQueueProvider'); return value }
