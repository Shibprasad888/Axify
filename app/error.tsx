'use client'

import { useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { document.title = 'Something went wrong · Axify' }, [])
  return <main className="auth-gate"><section className="glass account-card error-card"><p className="eyebrow">AXIFY / TEMPORARY PAUSE</p><h1>Something went wrong.</h1><p className="muted">The page could not finish loading. Your account and Spotify connection are unchanged.</p><button className="primary-button" onClick={() => reset()}><RefreshCw size={15} /> Try again</button></section></main>
}
