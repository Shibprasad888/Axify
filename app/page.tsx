'use client'

import { useState } from 'react'
import { FirebaseAuthModal } from '@/components/auth/auth-modal'
import { Footer } from '@/components/layout/Footer'
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Headphones,
  Heart,
  Menu,
  Pause,
  Play,
  Search,
  SkipBack,
  SkipForward,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'

const tracks = [
  { title: 'The Night We Met', artist: 'Lord Huron', tone: 'amber' },
  { title: 'Somebody Else', artist: 'The 1975', tone: 'ice' },
  { title: 'I Was Never There', artist: 'The Weeknd', tone: 'plum' },
  { title: 'Anti-Hero', artist: 'Taylor Swift', tone: 'rose' },
]

function Cover({ tone = 'amber', className = '' }: { tone?: string; className?: string }) {
  return <div className={`cover cover-${tone} ${className}`} aria-hidden="true"><span /></div>
}

function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close dialog"><X size={18} /></button>
        <div className="auth-mark"><Headphones size={19} /></div>
        <p className="eyebrow">AXIFY / YOUR MUSIC, REIMAGINED</p>
        <h2 id="auth-title">{mode === 'signup' ? 'Make room for more.' : 'Welcome back.'}</h2>
        <p className="muted">{mode === 'signup' ? 'A more personal music experience starts here.' : 'Pick up where you left off.'}</p>
        {submitted ? (
          <div className="success-state"><div className="success-icon"><Check size={24} /></div><h3>You&apos;re on the list.</h3><p className="muted">Connect your Spotify library to make Axify yours.</p><button className="primary-button" onClick={onClose}>Continue exploring <ArrowRight size={16} /></button></div>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
            {mode === 'signup' && <label>Name<input required placeholder="Shivam" /></label>}
            <label>Email<input required type="email" placeholder="you@example.com" /></label>
            <label>Password<div className="password-wrap"><input required minLength={8} type={showPassword ? 'text' : 'password'} placeholder="••••••••" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>
            <button className="primary-button" type="submit">{mode === 'signup' ? 'Create account' : 'Sign in'} <ArrowRight size={16} /></button>
            <div className="or"><span>or continue with</span></div>
            <div className="socials"><button type="button">G</button><button type="button">●</button><button type="button">◉</button></div>
            <p className="auth-switch">{mode === 'signup' ? 'Already have an account?' : 'New to Axify?'} <button type="button" onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}>{mode === 'signup' ? 'Sign in' : 'Create account'}</button></p>
          </form>
        )}
      </section>
    </div>
  )
}

export default function Page() {
  const [authOpen, setAuthOpen] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [liked, setLiked] = useState(false)

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="ambient ambient-three" />
      <nav className="nav glass-panel"><a href="#top" className="brand">Axify<span>.</span></a><div className="nav-links"><a className="active" href="#top">Home</a><a href="#features">Features</a><a href="#about">About</a></div><div className="nav-actions"><a className="nav-login" href="/login">Login</a><button className="nav-cta" onClick={() => setAuthOpen(true)}>Get started <ArrowRight size={15} /></button></div><button className="menu-button icon-button" aria-label="Open menu"><Menu size={19} /></button></nav>

      <section id="top" className="hero section-wrap">
        <div className="hero-copy"><div className="pill"><Sparkles size={13} /> Your music, reimagined</div><h1>Music feels<br /><em>better here.</em></h1><p>A beautiful, personal, and seamless way<br className="desktop-only" /> to experience the music you love.</p><div className="hero-actions"><button className="primary-button" onClick={() => setAuthOpen(true)}>Get started <ArrowRight size={16} /></button><a className="ghost-button" href="#features">Learn more</a></div><div className="scroll-hint"><span className="scroll-dot" /> Scroll to explore</div></div>
        <div className="hero-art"><div className="orbit-ring" /><div className="floating-card back-card"><span className="script">More<br />than<br />Music.</span></div><div className="floating-card music-card"><Cover /><div className="track-title">The Night We Met</div><div className="track-artist">Lord Huron</div><div className="progress"><span /></div><div className="time"><span>1:12</span><span>3:28</span></div><div className="player-controls"><SkipBack size={15} /><button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'}>{playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}</button><SkipForward size={15} /></div><div className="playing-badge"><span /> Playing on Axify</div></div><div className="quote">“Music gives a soul to the universe.”<small>— Plato</small></div></div>
      </section>

      <section id="features" className="feature-section section-wrap"><div className="section-heading"><p className="eyebrow">THE AXIFY DIFFERENCE</p><h2>Made for the way<br /><em>you listen.</em></h2><p className="muted">Less noise. More of the songs that stay with you.</p></div><div className="feature-grid"><article className="feature-card glass-panel"><div className="feature-icon"><Sparkles size={20} /></div><h3>Find your feeling</h3><p>Curated mixes that understand the mood, not just the genre.</p><div className="mini-wave"><i /><i /><i /><i /><i /><i /><i /></div></article><article className="feature-card glass-panel feature-highlight"><div className="feature-icon"><Zap size={20} /></div><h3>Everything in sync</h3><p>Your library, your playlists, your world. Always within reach.</p><div className="sync-orbit"><span /><span /><span /></div></article><article className="feature-card glass-panel"><div className="feature-icon"><Heart size={20} /></div><h3>Keep what matters</h3><p>Save the songs you love and let Axify build from there.</p><div className="save-row"><Cover tone="rose" /><Cover tone="ice" /><Cover tone="plum" /><span>+ 245 songs</span></div></article></div></section>

      <section id="about" className="listen-section section-wrap"><div className="listen-copy"><p className="eyebrow">THE LISTENING ROOM</p><h2>Your next favorite<br /><em>is already waiting.</em></h2><p className="muted">A quiet space for the songs you haven&apos;t met yet. Let your library become a little more you.</p><button className="text-link" onClick={() => setAuthOpen(true)}>Explore Axify <ArrowRight size={15} /></button></div><div className="player-window glass-panel"><div className="window-top"><span>NOW PLAYING</span><span>•••</span></div><div className="player-body"><Cover className="large-cover" /><div><p className="eyebrow">CURATED FOR YOU</p><h3>The Night We Met</h3><p className="muted">Lord Huron</p></div></div><div className="progress"><span /></div><div className="player-footer"><span>1:12</span><div className="player-controls"><SkipBack size={16} /><button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'}>{playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}</button><SkipForward size={16} /></div><span>3:28</span></div></div></section>

      <section className="tracks-section section-wrap"><div className="section-heading row-heading"><div><p className="eyebrow">RECENTLY PLAYED</p><h2>Sounds like <em>you.</em></h2></div><div className="search-box"><Search size={15} /><span>Search your library</span></div></div><div className="track-list">{tracks.map((track, index) => <button className="track-row" key={track.title} onClick={() => setPlaying(true)}><span className="track-number">0{index + 1}</span><Cover tone={track.tone} /><span className="track-info"><strong>{track.title}</strong><small>{track.artist}</small></span><span className="track-duration">{['3:28', '4:41', '4:01', '3:20'][index]}</span><Play size={15} /></button>)}</div></section>
      <Footer />
      {authOpen && <FirebaseAuthModal onClose={() => setAuthOpen(false)} />}
    </main>
  )
}
