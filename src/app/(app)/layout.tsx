'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

function MiniCalendar({ tasks }: { tasks: any[] }) {
    const [current, setCurrent] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
  
    const year = current.getFullYear()
    const month = current.getMonth()
    const today = new Date()
  
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
  
    const taskDates = new Set(
      tasks
        .filter(t => t.due_date && t.status !== 'complete')
        .map(t => t.due_date)
    )
  
    const cells: (number | null)[] = [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ]
  
    const pad = (n: number) => String(n).padStart(2, '0')
  
    const years = Array.from({ length: 5 }, (_, i) => today.getFullYear() - 1 + i)
  
    return (
      <div style={{ marginBottom: 20 }}>
        {/* Month nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, paddingLeft: 2, paddingRight: 2 }}>
          <button
            onClick={() => setCurrent(new Date(year, month - 1))}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', display: 'flex', padding: '2px 4px', borderRadius: 4 }}>
            <ChevronLeft size={13} />
          </button>
  
          {/* Clickable month/year */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowPicker(!showPicker)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 600, color: '#444',
                fontFamily: 'inherit', padding: '2px 6px', borderRadius: 4,
                display: 'flex', alignItems: 'center', gap: 3,
              }}>
              {monthNames[month]} {year}
              <ChevronRight size={10} style={{ transform: showPicker ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.15s' }} />
            </button>
  
            {showPicker && (
              <div style={{
                position: 'absolute', top: '100%', left: '50%',
                transform: 'translateX(-50%)',
                background: 'white', border: '1px solid #f0f0f0',
                borderRadius: 10, padding: 12, zIndex: 100,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                width: 160,
              }}>
                {/* Month picker */}
                <div style={{ fontSize: 10, fontWeight: 700, color: '#bbb', letterSpacing: '0.5px', marginBottom: 6 }}>MONTH</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, marginBottom: 10 }}>
                  {monthNames.map((m, i) => (
                    <button key={m} onClick={() => { setCurrent(new Date(year, i)); setShowPicker(false) }}
                      style={{
                        padding: '4px 2px', fontSize: 10, fontWeight: 500,
                        fontFamily: 'inherit', border: 'none', borderRadius: 5, cursor: 'pointer',
                        background: i === month ? '#4f46e5' : 'transparent',
                        color: i === month ? 'white' : '#666',
                      }}>
                      {m.slice(0, 3)}
                    </button>
                  ))}
                </div>
                {/* Year picker */}
                <div style={{ fontSize: 10, fontWeight: 700, color: '#bbb', letterSpacing: '0.5px', marginBottom: 6 }}>YEAR</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' as const }}>
                  {years.map(y => (
                    <button key={y} onClick={() => { setCurrent(new Date(y, month)); setShowPicker(false) }}
                      style={{
                        padding: '4px 6px', fontSize: 10, fontWeight: 500,
                        fontFamily: 'inherit', border: 'none', borderRadius: 5, cursor: 'pointer',
                        background: y === year ? '#4f46e5' : 'transparent',
                        color: y === year ? 'white' : '#666',
                      }}>
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
  
          <button
            onClick={() => setCurrent(new Date(year, month + 1))}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', display: 'flex', padding: '2px 4px', borderRadius: 4 }}>
            <ChevronRight size={13} />
          </button>
        </div>
  
        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <div key={i} style={{ textAlign: 'center', fontSize: 9, fontWeight: 700, color: '#ccc', padding: '2px 0' }}>
              {d}
            </div>
          ))}
        </div>
  
        {/* Day cells */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
          {cells.map((day, i) => {
            if (!day) return <div key={i} />
            const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
            const hasTask = taskDates.has(dateStr)
            return (
              <div key={i} style={{
                textAlign: 'center', padding: '3px 0',
                fontSize: 10.5, borderRadius: 5,
                background: isToday ? '#4f46e5' : 'transparent',
                color: isToday ? 'white' : '#666',
                fontWeight: isToday ? 700 : 400,
                position: 'relative' as const,
              }}>
                {day}
                {hasTask && !isToday && (
                  <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#4f46e5', margin: '0 auto' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
    loadTasks()
    const channel = supabase
      .channel('sidebar-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => loadProjects())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => loadTasks())
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  async function loadProjects() {
    const { data } = await supabase.from('projects').select('*').order('created_at')
    setProjects(data || [])
  }

  async function loadTasks() {
    const { data } = await supabase.from('tasks').select('due_date, status').not('due_date', 'is', null)
    setTasks(data || [])
  }

  const deleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!confirm('Delete this project and all its tasks?')) return
    await supabase.from('tasks').delete().eq('project_id', id)
    await supabase.from('projects').delete().eq('id', id)
    loadProjects()
    router.push('/dashboard')
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside style={{
      width: '240px', flexShrink: 0,
      background: 'white', borderRight: '1px solid #f0f0f0',
      display: 'flex', flexDirection: 'column',
      padding: '20px 12px',
      height: '100vh', position: 'sticky', top: 0,
      fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowY: 'auto',
    }}>

      {/* Logo + tagline */}
      <Link href="/dashboard" style={{ textDecoration: 'none', marginBottom: 24, paddingLeft: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 8,
          background: '#4f46e5', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: 12, color: 'white', fontWeight: 700,
        }}>✦</div>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#111', letterSpacing: '-0.3px' }}>
        Clar
        </span>
      </div>
      <p style={{ fontSize: 11, color: '#bbb', margin: 0,  fontStyle: 'italic', }}>
         Your calm clarity
      </p>
      </Link>

      {/* Divider */}
      <div style={{ height: 1, background: '#f5f5f5', marginBottom: 16, marginLeft: 6, marginRight: 6 }} />

      {/* Mini Calendar */}
      <MiniCalendar tasks={tasks} />

      {/* Divider */}
      <div style={{ height: 1, background: '#f5f5f5', marginBottom: 16, marginLeft: 6, marginRight: 6 }} />

      {/* Projects label */}
      <div style={{
        fontSize: 10, fontWeight: 700, color: '#bbb',
        letterSpacing: '0.8px', textTransform: 'uppercase',
        marginBottom: 6, paddingLeft: 8,
      }}>
        Projects
      </div>

      {/* Project list */}
      <div style={{ flex: 1 }}>
        {projects.map(p => (
          <div
            key={p.id}
            onClick={() => router.push(`/dashboard?project=${p.id}`)}
            onMouseEnter={() => setHoveredProject(p.id)}
            onMouseLeave={() => setHoveredProject(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '7px 8px', borderRadius: 8, marginBottom: 1,
              cursor: 'pointer',
              background: hoveredProject === p.id ? '#f5f5f5' : 'transparent',
            }}
          >
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: p.color || '#6366f1', flexShrink: 0,
            }} />
            <span style={{
              flex: 1, fontSize: 13, color: '#555',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {p.name}
            </span>
            {hoveredProject === p.id && p.name !== 'Inbox' && (
              <button
                onClick={(e) => deleteProject(p.id, e)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ddd', padding: 0, display: 'flex' }}
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Bottom links */}
      <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: 10, marginTop: 8 }}>
        {[
          { href: '/settings', label: 'Settings' },
          { href: '/notifications', label: 'Notifications' },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{
            display: 'flex', alignItems: 'center',
            padding: '7px 8px', borderRadius: 8, marginBottom: 1,
            fontSize: 13, textDecoration: 'none',
            color: pathname === item.href ? '#4f46e5' : '#888',
            background: pathname === item.href ? '#eef2ff' : 'transparent',
          }}>
            {item.label}
          </Link>
        ))}
        <button onClick={signOut} style={{
          width: '100%', padding: '7px 8px', borderRadius: 8,
          fontSize: 13, color: '#bbb', background: 'none',
          border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          textAlign: 'left' as const,
        }}>
          Sign out
        </button>
      </div>
    </aside>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{
        display: 'flex', minHeight: '100vh', background: '#fafafa',
        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
        WebkitFontSmoothing: 'antialiased',
      }}>
        <Sidebar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '40px 48px' }}>
          {children}
        </main>
      </div>
    </QueryClientProvider>
  )
}