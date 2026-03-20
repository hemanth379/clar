'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const TYPE_ICON: Record<string, string> = {
  due_today: '📅',
  overdue: '⚠️',
  due_tomorrow: '🔔',
  completed: '✅',
  ai_suggestion: '✦',
  calendar_synced: '📅',
  weekly_digest: '📊',
  welcome: '👋',
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
    setNotifications(data || [])
    setLoading(false)
  }

  const markAllRead = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user!.id)
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
  }

  const markRead = async (id: string) => {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id)
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
  }

  const dismiss = async (id: string) => {
    await supabase.from('notifications').delete().eq('id', id)
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getRelativeTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (mins < 60) return `${mins}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days === 1) return 'Yesterday'
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const filtered = filter === 'unread'
    ? notifications.filter(n => !n.is_read)
    : notifications

  const unreadCount = notifications.filter(n => !n.is_read).length

  return (
    <div style={{
      maxWidth: 600,
      fontFamily: "'Manrope', -apple-system, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: 24,
      }}>
        <div>
          <h1 style={{
            fontSize: 22, fontWeight: 600,
            letterSpacing: '-0.5px', color: '#0a0a0a', marginBottom: 4,
          }}>Notifications</h1>
          <p style={{ fontSize: 14, color: '#aaa' }}>
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{
            fontSize: 13, fontWeight: 600, color: '#4f46e5',
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'inherit',
          }}>
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div style={{
        display: 'flex', gap: 6, marginBottom: 20,
      }}>
        {(['all', 'unread'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '6px 14px', fontSize: 13, fontWeight: 500,
            fontFamily: 'inherit',
            color: filter === f ? '#4f46e5' : '#888',
            background: filter === f ? '#eef2ff' : 'white',
            border: filter === f ? '1px solid #c7d2fe' : '1px solid #e8e8e8',
            borderRadius: 20, cursor: 'pointer',
            textTransform: 'capitalize' as const,
          }}>
            {f}
            {f === 'unread' && unreadCount > 0 && (
              <span style={{
                marginLeft: 6, fontSize: 11, fontWeight: 700,
                color: 'white', background: '#4f46e5',
                padding: '1px 6px', borderRadius: 10,
              }}>{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      {loading ? (
        <div style={{ fontSize: 14, color: '#aaa', padding: '32px 0' }}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 24px',
          background: 'white', border: '1px solid #f0f0f0',
          borderRadius: 14,
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔔</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 6 }}>
            {filter === 'unread' ? 'No unread notifications' : "You're all caught up."}
          </div>
          <div style={{ fontSize: 13, color: '#bbb' }}>
            We'll let you know when something needs your attention.
          </div>
        </div>
      ) : (
        <div style={{
          background: 'white', border: '1px solid #f0f0f0',
          borderRadius: 14, overflow: 'hidden',
        }}>
          {filtered.map((n, i) => (
            <div
              key={n.id}
              onClick={() => !n.is_read && markRead(n.id)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '16px 20px',
                borderBottom: i < filtered.length - 1 ? '1px solid #f5f5f5' : 'none',
                background: n.is_read ? 'white' : '#fafbff',
                cursor: n.is_read ? 'default' : 'pointer',
                position: 'relative' as const,
              }}
            >
              {/* Unread dot */}
              {!n.is_read && (
                <div style={{
                  position: 'absolute', left: 6, top: '50%',
                  transform: 'translateY(-50%)',
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#4f46e5',
                }} />
              )}

              {/* Icon */}
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: '#f5f5f5', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 16, flexShrink: 0,
              }}>
                {TYPE_ICON[n.type] || '🔔'}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13.5,
                  fontWeight: n.is_read ? 400 : 500,
                  color: n.is_read ? '#666' : '#111',
                  lineHeight: 1.5, marginBottom: 4,
                }}>
                  {n.message}
                </div>
                <div style={{ fontSize: 12, color: '#bbb' }}>
                  {getRelativeTime(n.created_at)}
                </div>
              </div>

              {/* Dismiss */}
              <button
                onClick={e => { e.stopPropagation(); dismiss(n.id) }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 16, color: '#ddd', padding: '0 4px',
                  flexShrink: 0, lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
