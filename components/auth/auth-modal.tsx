'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Check, Eye, EyeOff, Headphones, X } from 'lucide-react'
import { useAuth } from './auth-context'

type Mode = 'signin' | 'signup' | 'forgot'

export function FirebaseAuthModal({ onClose, initialMode = 'signup' }: { onClose: () => void; initialMode?: Mode }) {
  const router = useRouter()
  const { signIn, signUp, resetPassword, error, clearError, user } = useAuth()
  const [mode, setMode] = useState<Mode>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    clearError()
    setBusy(true)
    try {
      if (mode === 'forgot') {
        await resetPassword(email)
        setSubmitted(true)
      } else if (mode === 'signin') {
        await signIn(email, password)
        router.replace('/app')
      } else {
        await signUp(name, email, password)
        router.replace(`/login?registered=1&email=${encodeURIComponent(email)}`)
      }
    } catch {
      // AuthContext exposes a friendly message for the form.
    } finally {
      setBusy(false)
    }
  }

  const title = mode === 'forgot' ? 'Reset your password.' : mode === 'signin' ? 'Welcome back.' : 'Make room for more.'

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="firebase-auth-title">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close dialog"><X size={18} /></button>
        <div className="auth-mark"><Headphones size={19} /></div>
        <p className="eyebrow">AXIFY / YOUR MUSIC, REIMAGINED</p>
        <h2 id="firebase-auth-title">{title}</h2>
        <p className="muted">{mode === 'forgot' ? 'We will send a reset link to your inbox.' : mode === 'signin' ? 'Pick up where you left off.' : 'A more personal music experience starts here.'}</p>
        {submitted ? (
          <div className="success-state"><div className="success-icon"><Check size={24} /></div><h3>{mode === 'forgot' ? 'Check your inbox.' : 'Verify your email.'}</h3><p className="muted">{mode === 'forgot' ? 'Use the link in your email to choose a new password.' : `We sent a verification link to ${user?.email ?? email}.`}</p><button className="primary-button" onClick={onClose}>Continue exploring <ArrowRight size={16} /></button></div>
        ) : (
          <form onSubmit={submit}>
            {mode === 'signup' && <label>Name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Shivam" /></label>}
            <label>Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
            {mode !== 'forgot' && <label>Password<div className="password-wrap"><input required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} placeholder="••••••••" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>}
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-button" type="submit" disabled={busy}>{busy ? 'Please wait…' : mode === 'forgot' ? 'Send reset link' : mode === 'signup' ? 'Create account' : 'Sign in'} <ArrowRight size={16} /></button>
            {mode === 'signin' && <button className="text-link auth-secondary" type="button" onClick={() => { clearError(); setMode('forgot') }}>Forgot password?</button>}
            <p className="auth-switch">{mode === 'forgot' ? 'Remembered your password?' : mode === 'signup' ? 'Already have an account?' : 'New to Axify?'} <button type="button" onClick={() => { clearError(); setMode(mode === 'signup' ? 'signin' : 'signup') }}>{mode === 'forgot' ? 'Sign in' : mode === 'signup' ? 'Sign in' : 'Create account'}</button></p>
          </form>
        )}
      </section>
    </div>
  )
}
