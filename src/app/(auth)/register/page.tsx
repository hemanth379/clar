'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase/client'
import { Loader2, Mail } from 'lucide-react'

const schema = z.object({
  full_name: z.string().min(1, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})
type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [sentEmail, setSentEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const handleGoogle = async () => {
    setGoogleLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { full_name: data.full_name } },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSentEmail(data.email)
      setSent(true)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    fontSize: 14,
    fontFamily: 'inherit',
    color: '#111',
    background: '#fafafa',
    border: '1px solid #e8e8e8',
    borderRadius: 9,
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    fontSize: 13,
    fontWeight: 500,
    color: '#444',
    display: 'block',
    marginBottom: 6,
  }

  // Email sent state
  if (sent) {
    return (
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{
          background: 'white', border: '1px solid #e8e8e8',
          borderRadius: 18, padding: '48px 40px',
          boxShadow: '0 2px 24px rgba(0,0,0,0.04)',
          textAlign: 'center',
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: '#eef2ff', border: '1px solid #e0e7ff',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 20px',
          }}>
            <Mail size={22} color="#4f46e5" />
          </div>
          <h2 style={{
            fontSize: 20, fontWeight: 600,
            letterSpacing: '-0.4px', color: '#0a0a0a', marginBottom: 10,
          }}>
            Check your inbox
          </h2>
          <p style={{ fontSize: 14, color: '#888', lineHeight: 1.65, marginBottom: 24 }}>
            We sent a verification link to{' '}
            <strong style={{ color: '#111' }}>{sentEmail}</strong>.
            Click it to activate your account.
          </p>
          <Link href="/login" style={{
            fontSize: 13, color: '#4f46e5',
            textDecoration: 'none', fontWeight: 600,
          }}>
            Back to sign in →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      <div style={{
        background: 'white', border: '1px solid #e8e8e8',
        borderRadius: 18, padding: '40px 40px',
        boxShadow: '0 2px 24px rgba(0,0,0,0.04)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 12,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: '#4f46e5', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 13, color: 'white',
            }}>✦</div>
            Clar
          </div>
          <h1 style={{
            fontSize: 22, fontWeight: 600,
            letterSpacing: '-0.5px', color: '#0a0a0a', marginBottom: 6,
          }}>Create your account</h1>
          <p style={{ fontSize: 14, color: '#888', fontWeight: 400 }}>
            Free forever. Start in seconds.
          </p>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={googleLoading}
          style={{
            width: '100%', padding: '11px 16px',
            fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
            color: '#111', background: 'white',
            border: '1px solid #e8e8e8', borderRadius: 10,
            cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            gap: 10, marginBottom: 24,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          {googleLoading ? (
            <span style={{ fontSize: 13, color: '#888' }}>Connecting…</span>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 12, marginBottom: 24,
        }}>
          <div style={{ flex: 1, height: 1, background: '#f0f0f0' }} />
          <span style={{ fontSize: 12, color: '#bbb', fontWeight: 500 }}>or</span>
          <div style={{ flex: 1, height: 1, background: '#f0f0f0' }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Full name</label>
            <input
              {...register('full_name')}
              type="text"
              placeholder="Your name"
              style={inputStyle}
            />
            {errors.full_name && (
              <p style={{ fontSize: 12, color: '#ef4444', marginTop: 5 }}>
                {errors.full_name.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Email address</label>
            <input
              {...register('email')}
              type="email"
              placeholder="you@example.com"
              style={inputStyle}
            />
            {errors.email && (
              <p style={{ fontSize: 12, color: '#ef4444', marginTop: 5 }}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: 8 }}>
            <label style={labelStyle}>Password</label>
            <input
              {...register('password')}
              type="password"
              placeholder="Min. 8 characters"
              style={inputStyle}
            />
            {errors.password && (
              <p style={{ fontSize: 12, color: '#ef4444', marginTop: 5 }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <div style={{
              fontSize: 13, color: '#ef4444',
              background: '#fef2f2', border: '1px solid #fecaca',
              borderRadius: 8, padding: '10px 14px', marginTop: 8,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '11px 16px',
              fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
              color: 'white', background: '#4f46e5',
              border: 'none', borderRadius: 10,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginTop: 16,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8,
            }}
          >
            {loading ? (
              <>
                <Loader2 size={15} />
                Creating account…
              </>
            ) : 'Create account →'}
          </button>

          <p style={{ fontSize: 11.5, color: '#bbb', textAlign: 'center', marginTop: 14, lineHeight: 1.6 }}>
            By signing up you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#888', marginTop: 20 }}>
          Already have an account?{' '}
          <Link href="/login" style={{
            color: '#4f46e5', textDecoration: 'none', fontWeight: 600,
          }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
