import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() { return <main className="auth-gate"><section className="glass account-card error-card"><p className="eyebrow">AXIFY / 404</p><h1>That page drifted away.</h1><p className="muted">The link may be old, or the page may not be part of Axify.</p><Link className="primary-button" href="/"><ArrowLeft size={15} /> Back to Axify</Link></section></main> }
