'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { doc, onSnapshot, deleteDoc } from 'firebase/firestore'
import { firebaseAuth, firestore } from '@/lib/firebase/client'
import { createCodeChallenge, randomString } from '@/lib/spotify/pkce'
import { getSpotifyRedirectUri, spotifyConfig, spotifyScope, validateSpotifyConfig } from '@/lib/spotify/config'

type Connection = { accountId: string; displayName?: string; email?: string; connectedAt?: string; scopes?: string[] }
type SpotifyContextValue = { connection: Connection | null; isConnected: boolean; isLoading: boolean; connectSpotify: () => Promise<void>; disconnectSpotify: () => Promise<void> }
const SpotifyContext = createContext<SpotifyContextValue | null>(null)

export function SpotifyProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [connection, setConnection] = useState<Connection | null>(null)
  const [isLoading, setLoading] = useState(true)
  useEffect(() => { if (!firebaseAuth) { setLoading(false); return } return onAuthStateChanged(firebaseAuth, setUser) }, [])
  useEffect(() => {
    if (!user || !firestore) { setConnection(null); setLoading(false); return }
    return onSnapshot(doc(firestore, 'users', user.uid, 'integrations', 'spotify'), (snap) => { setConnection(snap.exists() ? snap.data() as Connection : null); setLoading(false) }, () => setLoading(false))
  }, [user])
  const value = useMemo(() => ({ connection, isConnected: Boolean(connection), isLoading,
    connectSpotify: async () => { validateSpotifyConfig(); if (!user?.emailVerified) throw new Error('Verify your Axify email before connecting Spotify.'); const verifier = randomString(); const state = randomString(32); const redirectUri = getSpotifyRedirectUri(); sessionStorage.setItem('axify_spotify_oauth', JSON.stringify({ verifier, state, redirectUri, createdAt: Date.now() })); const challenge = await createCodeChallenge(verifier); const params = new URLSearchParams({ response_type: 'code', client_id: spotifyConfig.clientId, scope: spotifyScope, redirect_uri: redirectUri, state, code_challenge_method: 'S256', code_challenge: challenge }); window.location.assign(`${spotifyConfig.authorizeUrl}?${params}`) },
    disconnectSpotify: async () => { await fetch('/api/spotify/disconnect', { method: 'POST' }).catch(() => undefined); if (user && firestore) await deleteDoc(doc(firestore, 'users', user.uid, 'integrations', 'spotify')) }
  }), [connection, isLoading, user])
  return <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
}
export function useSpotifyConnection() { const value = useContext(SpotifyContext); if (!value) throw new Error('useSpotifyConnection must be used within SpotifyProvider'); return value }
