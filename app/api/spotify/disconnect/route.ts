import { NextResponse } from 'next/server'
import { clearSpotifyTokens } from '@/lib/spotify/server'

export async function POST() { await clearSpotifyTokens(); return NextResponse.json({ ok: true }) }
