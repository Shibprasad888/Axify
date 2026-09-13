'use client'

import Link from 'next/link'

export function Footer({ dashboard = false }: { dashboard?: boolean }) {
  return <footer className={`site-footer section-wrap ${dashboard ? 'dashboard-footer' : ''}`}><div className="footer-brand"><Link href="/" className="brand">Axify<span>.</span></Link><p>Your music, your atmosphere.</p><small>Axify — A product of AxiLab by <a href="https://iamshiv.dev" target="_blank" rel="noopener noreferrer">Shiv</a></small></div><div className="footer-links"><div><strong>Product</strong><Link href={dashboard ? '/app' : '/'}>Home</Link><Link href="/app/search">Search</Link><Link href="/app/library">Library</Link><Link href="/app/playlists">Playlists</Link></div><div><strong>Company</strong><a href="mailto:hello@iamshiv.dev?subject=Support%20-%20Axify">Contact Us</a></div><div><strong>Legal</strong><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Axify. All rights reserved.</span><span>Build v1.126 - 21st Sept 2026</span><span>Made for the songs that stay with you.</span></div></footer>
}
