'use client'

import { useRouter } from 'next/navigation'
import { FirebaseAuthModal } from './auth-modal'

export function AuthRoute({ mode }: { mode: 'signin' | 'signup' | 'forgot' }) { const router = useRouter(); return <FirebaseAuthModal initialMode={mode} onClose={() => router.push('/')} /> }
