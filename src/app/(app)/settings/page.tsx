'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

// ── APPEARANCE TAB ────────────────────────────────────────────────────────────
function AppearanceTab() {
    const [defaultView, setDefaultView] = useState(() =>
      typeof window !== 'undefined' ? localStorage.getItem('clar-view') || 'List' : 'List'
    )
    const [weekStart, setWeekStart] = useState(() =>
      typeof window !== 'undefined' ? localStorage.getItem('clar-week') || 'Sunday' : 'Sunday'
    )
  
    const labelStyle = {
      fontSize: 13, fontWeight: 500 as const,
      color: '#444', display: 'block' as const, marginBottom: 12,
    }
  
    return (
      <div style={{
        background: 'white', border: '1px solid #f0f0f0',
        borderRadius: 14, padding: '24px',
        display: 'flex', flexDirection: 'column' as const, gap: 24,
      }}>
        <div>
          <label style={labelStyle}>Default task view</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['List', 'Board'].map(v => (
              <button key={v} onClick={() => {
                setDefaultView(v)
                localStorage.setItem('clar-view', v)
              }} style={{
                padding: '8px 18px', fontSize: 13, fontWeight: 500,
                fontFamily: 'inherit', cursor: 'pointer', borderRadius: 8,
                color: defaultView === v ? '#4f46e5' : '#888',
                background: defaultView === v ? '#eef2ff' : 'white',
                border: defaultView === v ? '1px solid #c7d2fe' : '1px solid #e8e8e8',
              }}>{v}</button>
            ))}
          </div>
        </div>
        <div>
          <label style={labelStyle}>Week starts on</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Sunday', 'Monday'].map(d => (
              <button key={d} onClick={() => {
                setWeekStart(d)
                localStorage.setItem('clar-week', d)
              }} style={{
                padding: '8px 18px', fontSize: 13, fontWeight: 500,
                fontFamily: 'inherit', cursor: 'pointer', borderRadius: 8,
                color: weekStart === d ? '#4f46e5' : '#888',
                background: weekStart === d ? '#eef2ff' : 'white',
                border: weekStart === d ? '1px solid #c7d2fe' : '1px solid #e8e8e8',
              }}>{d}</button>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 12, color: '#10b981', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px' }}>
          Preferences saved automatically
        </div>
      </div>
    )
  }

// ── NOTIFICATIONS TAB ─────────────────────────────────────────────────────────
function NotificationsTab({ userId }: { userId: string }) {
  const [prefs, setPrefs] = useState({
    notif_email_reminders: true,
    notif_push: false,
    notif_weekly_digest: true,
    notif_daily_summary: false,
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!userId) return
    supabase
      .from('profiles')
      .select('notif_email_reminders, notif_push, notif_weekly_digest, notif_daily_summary')
      .eq('id', userId)
      .single()
      .then(({ data }) => { if (data) setPrefs(data) })
  }, [userId])

  const toggle = async (key: keyof typeof prefs) => {
    const updated = { ...prefs, [key]: !prefs[key] }
    setPrefs(updated)
    await supabase.from('profiles').update(updated).eq('id', userId)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const items = [
    { key: 'notif_email_reminders' as const, label: 'Email reminders for due tasks', desc: 'Get an email when a task is due today.' },
    { key: 'notif_push' as const, label: 'Browser push notifications', desc: 'Get a nudge in your browser when tasks are due.' },
    { key: 'notif_weekly_digest' as const, label: 'Weekly digest email', desc: 'A Monday morning summary of last week and top tasks ahead.' },
    { key: 'notif_daily_summary' as const, label: 'Daily morning summary', desc: "A quick email with today's tasks. Sent at 8am." },
  ]

  return (
    <div style={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: 14, overflow: 'hidden' }}>
      {items.map((item, i) => (
        <div key={item.key} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 24px',
          borderBottom: i < items.length - 1 ? '1px solid #f5f5f5' : 'none',
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#111', marginBottom: 3 }}>{item.label}</div>
            <div style={{ fontSize: 12.5, color: '#aaa' }}>{item.desc}</div>
          </div>
          <button
            onClick={() => toggle(item.key)}
            style={{
              width: 44, height: 24, borderRadius: 12,
              background: prefs[item.key] ? '#4f46e5' : '#e5e7eb',
              border: 'none', cursor: 'pointer',
              position: 'relative' as const,
              transition: 'background 0.2s', flexShrink: 0,
            }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: '50%',
              background: 'white', position: 'absolute' as const,
              top: 3, left: prefs[item.key] ? 23 : 3,
              transition: 'left 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            }} />
          </button>
        </div>
      ))}
      {saved && (
        <div style={{ padding: '10px 24px', fontSize: 12, color: '#10b981', background: '#f0fdf4', borderTop: '1px solid #bbf7d0' }}>
          Preferences saved ✓
        </div>
      )}
    </div>
  )
}

// ── MAIN SETTINGS PAGE ────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [fullName, setFullName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      const { data } = await supabase
        .from('profiles').select('*').eq('id', user?.id).single()
      setFullName(data?.full_name || user?.user_metadata?.full_name || '')
    }
    load()
  }, [])

  const saveProfile = async () => {
    setSaving(true)
    await supabase.from('profiles').update({ full_name: fullName }).eq('id', user?.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'appearance', label: 'Appearance' },
  ]

  const inputStyle = {
    width: '100%', padding: '10px 14px', fontSize: 14,
    fontFamily: 'inherit', color: '#111', background: '#fafafa',
    border: '1px solid #e8e8e8', borderRadius: 9, outline: 'none',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    fontSize: 13, fontWeight: 500 as const,
    color: '#444', display: 'block' as const, marginBottom: 6,
  }

  return (
    <div style={{ maxWidth: 900, fontFamily: "'Manrope', -apple-system, sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.5px', color: '#0a0a0a', marginBottom: 4 }}>
          Settings
        </h1>
        <p style={{ fontSize: 14, color: '#aaa' }}>Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid #f0f0f0', marginBottom: 32 }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '9px 16px', fontSize: 13.5,
            fontWeight: activeTab === tab.id ? 600 : 400,
            color: activeTab === tab.id ? '#4f46e5' : '#888',
            background: 'none', border: 'none',
            borderBottom: activeTab === tab.id ? '2px solid #4f46e5' : '2px solid transparent',
            cursor: 'pointer', fontFamily: 'inherit', marginBottom: '-1px',
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

    {/* Left column */}
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
      {/* Avatar card */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', background: 'white', border: '1px solid #f0f0f0', borderRadius: 14 }}>
        {user?.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt="avatar"
            referrerPolicy="no-referrer"
            style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' as const }}
          />
        ) : (
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: 'white', fontWeight: 700 }}>
            {fullName?.[0]?.toUpperCase() || '?'}
          </div>
        )}
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>{fullName || 'Your name'}</div>
          <div style={{ fontSize: 13, color: '#aaa', marginTop: 2 }}>{user?.email}</div>
          {user?.app_metadata?.provider === 'google' && (
            <div style={{ fontSize: 11, fontWeight: 600, color: '#4f46e5', background: '#eef2ff', padding: '2px 8px', borderRadius: 4, display: 'inline-block', marginTop: 6 }}>
              Connected with Google
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div style={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: 14, padding: '24px' }}>
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Full name</label>
          <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your name" style={inputStyle} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Email address</label>
          <input value={user?.email || ''} disabled style={{ ...inputStyle, color: '#aaa', cursor: 'not-allowed' }} />
          {user?.app_metadata?.provider === 'google' && (
            <p style={{ fontSize: 12, color: '#bbb', marginTop: 5 }}>Signed in with Google — email cannot be changed.</p>
          )}
        </div>
        <button onClick={saveProfile} disabled={saving} style={{
          padding: '10px 20px', fontSize: 13.5, fontWeight: 600,
          fontFamily: 'inherit', color: 'white',
          background: saved ? '#10b981' : '#4f46e5',
          border: 'none', borderRadius: 9, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 7,
          transition: 'background 0.2s',
        }}>
          {saving ? <><Loader2 size={14} /> Saving…</> : saved ? '✓ Saved!' : 'Save changes'}
        </button>
      </div>
    </div>

    {/* Right column */}
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
      {/* Account info */}
      <div style={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: 14, padding: '24px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16 }}>Account details</div>
        {[
          { label: 'Account type', value: 'Free' },
          { label: 'Member since', value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—' },
          { label: 'Sign in method', value: user?.app_metadata?.provider === 'google' ? 'Google OAuth' : 'Email & Password' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>
            <span style={{ fontSize: 13, color: '#888' }}>{item.label}</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#111' }}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Danger zone */}
      <div style={{ background: 'white', border: '1px solid #fecaca', borderRadius: 14, padding: '24px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', marginBottom: 8 }}>Danger zone</div>
        <p style={{ fontSize: 13, color: '#aaa', marginBottom: 14, lineHeight: 1.6 }}>
          Permanently delete your account and all your tasks. This cannot be undone.
        </p>
        <button style={{ padding: '9px 18px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', color: '#ef4444', background: 'white', border: '1px solid #fecaca', borderRadius: 9, cursor: 'pointer' }}>
          Delete account
        </button>
      </div>
    </div>
  </div>
)}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
         <div style={{ maxWidth: 560 }}>
            <NotificationsTab userId={user?.id} />
         </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div style={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: 14, padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f0f4ff', border: '1px solid #e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                📅
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 3 }}>Google Calendar</div>
                <div style={{ fontSize: 12.5, color: '#aaa' }}>Sync tasks with due dates to your calendar.</div>
              </div>
            </div>
            <button style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', color: '#4f46e5', background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 8, cursor: 'pointer' }}>
              Connect →
            </button>
          </div>
        </div>
      )}

      {/* Appearance Tab */}
      {activeTab === 'appearance' && (
         <div style={{ maxWidth: 560 }}>
          <AppearanceTab />
         </div>
      )}

    </div>
  )
}