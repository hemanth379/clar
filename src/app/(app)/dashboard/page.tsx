'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { format } from 'date-fns'
import { Plus, Trash2, X } from 'lucide-react'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

const PRIORITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 }
const PRIORITY_COLOR: Record<string, string> = { high: '#ef4444', medium: '#f59e0b', low: '#d1d5db' }
const PRIORITY_BG: Record<string, string> = { high: '#fef2f2', medium: '#fffbeb', low: '#f9fafb' }
const PRIORITY_TEXT: Record<string, string> = { high: '#b91c1c', medium: '#92400e', low: '#6b7280' }

function formatTime(time: string) {
  if (!time) return ''
  const [h, m] = time.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')}${ampm}`
}

function Checkbox({ done }: { done: boolean }) {
  if (done) {
    return (
      <div style={{
        width: 18, height: 18, borderRadius: '50%',
        background: '#4f46e5', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }
  return (
    <div style={{
      width: 18, height: 18, borderRadius: '50%',
      border: '1.5px solid #d1d5db', flexShrink: 0,
    }} />
  )
}

function EditDrawer({ task, projects, onSave, onClose }: {
  task: any
  projects: any[]
  onSave: (updated: any) => void
  onClose: () => void
}) {
  const [title, setTitle] = useState(task.title)
  const [priority, setPriority] = useState(task.priority)
  const [dueDate, setDueDate] = useState(task.due_date || '')
  const [dueTime, setDueTime] = useState(task.due_time || '')
  const [projectId, setProjectId] = useState(task.project_id)
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    const { data } = await supabase.from('tasks').update({
      title, priority,
      due_date: dueDate || null,
      due_time: dueTime || null,
      project_id: projectId,
    }).eq('id', task.id).select().single()
    if (data) onSave(data)
    setSaving(false)
    onClose()
  }

  const inputStyle = {
    width: '100%', padding: '9px 12px', fontSize: 13.5,
    fontFamily: 'inherit', color: '#111', background: '#fafafa',
    border: '1px solid #e8e8e8', borderRadius: 8, outline: 'none',
    boxSizing: 'border-box' as const,
  }

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.12)', zIndex: 40 }} />
      <div style={{
        position: 'fixed', right: 0, top: 0, bottom: 0, width: 380,
        background: 'white', borderLeft: '1px solid #f0f0f0',
        zIndex: 50, padding: '28px', overflowY: 'auto',
        fontFamily: "'Manrope', -apple-system, sans-serif",
        boxShadow: '-8px 0 32px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Edit task</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6 }}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 8 }}>Priority</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {['low', 'medium', 'high'].map(p => (
                <button key={p} onClick={() => setPriority(p)} style={{
                  flex: 1, padding: '7px 0', fontSize: 12, fontWeight: 600,
                  fontFamily: 'inherit', textTransform: 'capitalize' as const,
                  color: priority === p ? PRIORITY_TEXT[p] : '#aaa',
                  background: priority === p ? PRIORITY_BG[p] : 'white',
                  border: priority === p ? `1px solid ${PRIORITY_COLOR[p]}40` : '1px solid #f0f0f0',
                  borderRadius: 8, cursor: 'pointer',
                }}>{p}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6 }}>Due date</label>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6 }}>Due time</label>
            <input type="time" value={dueTime} onChange={e => setDueTime(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6 }}>Project</label>
            <select value={projectId} onChange={e => setProjectId(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <button onClick={save} disabled={saving || !title.trim()} style={{
            width: '100%', padding: '11px', fontSize: 14, fontWeight: 600,
            fontFamily: 'inherit', color: 'white', background: '#4f46e5',
            border: 'none', borderRadius: 9, cursor: 'pointer', marginTop: 4,
          }}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </>
  )
}

function AIPreviewCard({ preview, projects, onConfirm, onCancel }: {
  preview: any
  projects: any[]
  onConfirm: (data: any) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(preview.title)
  const [priority, setPriority] = useState(preview.priority)
  const [dueDate, setDueDate] = useState(preview.due_date || '')
  const [dueTime, setDueTime] = useState(preview.due_time || '')
  const [projectId, setProjectId] = useState(projects[0]?.id || '')

  const inputStyle = {
    padding: '7px 10px', fontSize: 12.5, fontFamily: 'inherit',
    color: '#111', background: 'white', border: '1px solid #ddd6fe',
    borderRadius: 7, outline: 'none', width: '100%',
    boxSizing: 'border-box' as const,
  }

  return (
    <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 12, padding: '16px 18px', marginTop: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed', letterSpacing: '0.5px', textTransform: 'uppercase' as const, marginBottom: 12 }}>
        AI parsed — edit before saving
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#8b5cf6', display: 'block', marginBottom: 4 }}>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#8b5cf6', display: 'block', marginBottom: 4 }}>Date</label>
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#8b5cf6', display: 'block', marginBottom: 4 }}>Time</label>
          <input type="time" value={dueTime} onChange={e => setDueTime(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#8b5cf6', display: 'block', marginBottom: 4 }}>Priority</label>
          <select value={priority} onChange={e => setPriority(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#8b5cf6', display: 'block', marginBottom: 4 }}>Project</label>
          <select value={projectId} onChange={e => setProjectId(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => onConfirm({ title, priority, due_date: dueDate || null, due_time: dueTime || null, project_id: projectId })}
          style={{ flex: 1, padding: '9px', fontSize: 13, fontWeight: 600, color: 'white', background: '#4f46e5', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' }}>
          Add task →
        </button>
        <button onClick={onCancel} style={{ padding: '9px 16px', fontSize: 13, fontWeight: 600, color: '#666', background: 'white', border: '1px solid #e8e8e8', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiPreview, setAiPreview] = useState<any>(null)
  const [view, setView] = useState<'list' | 'kanban'>(() => {
    if (typeof window === 'undefined') return 'list'
    const saved = localStorage.getItem('clar-view')
    return saved === 'Board' ? 'kanban' : 'list'
  })
  const [showNewProject, setShowNewProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [editingTask, setEditingTask] = useState<any>(null)

  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const projectFromUrl = searchParams?.get('project')

  useEffect(() => { load() }, [])

  useEffect(() => {
    if (projectFromUrl && projects.length > 0) {
      const exists = projects.find(p => p.id === projectFromUrl)
      if (exists) setActiveProject(projectFromUrl)
    }
  }, [projectFromUrl, projects])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    const { data: p } = await supabase.from('projects').select('*').order('created_at')
    setProjects(p || [])
    const urlProject = new URLSearchParams(window.location.search).get('project')
    const startProject = urlProject && p?.find((pr: any) => pr.id === urlProject) ? urlProject : p?.[0]?.id || null
    setActiveProject(startProject)
    const { data: t } = await supabase.from('tasks').select('*').order('position')
    setTasks(t || [])
    setLoading(false)
  }

  const today = new Date().toISOString().split('T')[0]
  const todayTasks = tasks.filter(t => t.due_date === today && t.status !== 'complete')
  const overdueTasks = tasks.filter(t => t.due_date && t.due_date < today && t.status !== 'complete')
  const doneTasks = tasks.filter(t => t.status === 'complete')

  // List view — active tasks sorted by priority
  const projectTasks = tasks
    .filter(t => t.project_id === activeProject && t.status !== 'complete')
    .sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1))

  const completedProjectTasks = tasks
    .filter(t => t.project_id === activeProject && t.status === 'complete')

  // Kanban view — ALL tasks for the project (all statuses)
  const kanbanTasks = tasks
    .filter(t => t.project_id === activeProject)
    .sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1))

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there'

  const toggleTask = async (id: string, status: string) => {
    const newStatus = status === 'complete' ? 'todo' : 'complete'
    await supabase.from('tasks').update({ status: newStatus }).eq('id', id)
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))
  }

  const parseWithAI = async () => {
    if (!newTitle.trim()) return
    setAiLoading(true)
    setAiPreview(null)
    try {
      const res = await fetch('/api/ai/parse-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: newTitle }),
      })
      const data = await res.json()
      if (data.title) setAiPreview(data)
    } catch (e) { console.error(e) }
    setAiLoading(false)
  }

  const addTask = async (taskData: any) => {
    if (!taskData.title?.trim()) return
    const { data: { user } } = await supabase.auth.getUser()
    const projectId = taskData.project_id || activeProject
    const { data } = await supabase.from('tasks').insert({
      title: taskData.title.trim(),
      project_id: projectId,
      user_id: user!.id,
      status: 'todo',
      priority: taskData.priority || 'medium',
      due_date: taskData.due_date || null,
      due_time: taskData.due_time || null,
      position: (tasks[tasks.length - 1]?.position || 0) + 1000,
    }).select().single()
    if (data) {
      setTasks(prev => [...prev, data])
      setNewTitle('')
      setAiPreview(null)
      if (projectId !== activeProject) setActiveProject(projectId)
    }
  }

  const quickAdd = async () => {
    if (!newTitle.trim() || !activeProject) return
    await addTask({ title: newTitle, priority: 'medium', project_id: activeProject })
  }

  const deleteTask = async (id: string) => {
    await supabase.from('tasks').delete().eq('id', id)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const updateTask = (updated: any) => {
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t))
  }

  const updateTaskStatus = async (id: string, status: string) => {
    await supabase.from('tasks').update({ status }).eq('id', id)
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  }

  const createProject = async () => {
    if (!newProjectName.trim()) return
    const { data: { user } } = await supabase.auth.getUser()
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f43f5e', '#0ea5e9']
    const { data } = await supabase.from('projects').insert({
      user_id: user!.id,
      name: newProjectName.trim(),
      color: colors[Math.floor(Math.random() * colors.length)],
      icon: '●',
    }).select().single()
    if (data) {
      setProjects(prev => [...prev, data])
      setActiveProject(data.id)
      setNewProjectName('')
      setShowNewProject(false)
    }
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div style={{ fontSize: 14, color: '#aaa' }}>Loading…</div>
    </div>
  )

  return (
    <div style={{ fontFamily: "'Manrope', -apple-system, sans-serif", width: '100%' }}>

      {editingTask && (
        <EditDrawer task={editingTask} projects={projects} onSave={updateTask} onClose={() => setEditingTask(null)} />
      )}

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.5px', color: '#0a0a0a', marginBottom: 4 }}>
          {getGreeting()}, {firstName}.
        </h1>
        <p style={{ fontSize: 13.5, color: '#aaa' }}>{format(new Date(), 'EEEE, d MMMM yyyy')}</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: "Today's tasks", value: todayTasks.length, color: '#4f46e5' },
          { label: 'Completed', value: doneTasks.length, color: '#10b981' },
          { label: 'Overdue', value: overdueTasks.length, color: '#ef4444' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.color, marginBottom: 3 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#aaa' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* AI Add */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={newTitle}
            onChange={e => { setNewTitle(e.target.value); setAiPreview(null) }}
            onKeyDown={e => { if (e.key === 'Enter' && !aiPreview) parseWithAI() }}
            placeholder="Try: 'submit report Friday at 9am' or 'call dentist tomorrow'"
            style={{
              flex: 1, padding: '10px 14px', fontSize: 13.5, fontFamily: 'inherit',
              color: '#111', background: 'white', border: '1px solid #e8e8e8',
              borderRadius: 9, outline: 'none',
            }}
          />
          <button onClick={parseWithAI} disabled={aiLoading || !newTitle.trim()} style={{
            padding: '10px 16px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
            color: 'white', background: aiLoading ? '#a5b4fc' : '#4f46e5',
            border: 'none', borderRadius: 9, cursor: 'pointer',
            whiteSpace: 'nowrap' as const, opacity: !newTitle.trim() ? 0.5 : 1,
          }}>
            {aiLoading ? 'Parsing…' : 'AI Add'}
          </button>
          <button onClick={quickAdd} disabled={!newTitle.trim()} style={{
            padding: '10px 14px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
            color: '#666', background: 'white', border: '1px solid #e8e8e8',
            borderRadius: 9, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
            whiteSpace: 'nowrap' as const, opacity: !newTitle.trim() ? 0.4 : 1,
          }}>
            <Plus size={14} /> Quick add
          </button>
        </div>
        {!aiPreview && !aiLoading && (
          <p style={{ fontSize: 11.5, color: '#ccc', marginTop: 6 }}>
            AI Add detects date, time & priority · Quick add saves instantly
          </p>
        )}
        {aiPreview && (
          <AIPreviewCard
            preview={aiPreview}
            projects={projects}
            onConfirm={(data) => addTask(data)}
            onCancel={() => setAiPreview(null)}
          />
        )}
      </div>

      {/* Project tabs + view toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, flex: 1 }}>
          {projects.map(p => (
            <button key={p.id} onClick={() => setActiveProject(p.id)} style={{
              padding: '6px 14px', fontSize: 13,
              fontWeight: activeProject === p.id ? 600 : 400,
              fontFamily: 'inherit',
              color: activeProject === p.id ? '#4f46e5' : '#888',
              background: activeProject === p.id ? '#eef2ff' : 'white',
              border: activeProject === p.id ? '1px solid #c7d2fe' : '1px solid #e8e8e8',
              borderRadius: 20, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: p.color || '#6366f1', flexShrink: 0 }} />
              {p.name}
              <span style={{ fontSize: 11, color: '#bbb', background: '#f5f5f5', padding: '1px 5px', borderRadius: 8 }}>
                {tasks.filter(t => t.project_id === p.id && t.status !== 'complete').length}
              </span>
            </button>
          ))}
          {showNewProject ? (
            <div style={{ display: 'flex', gap: 6 }}>
              <input autoFocus value={newProjectName}
                onChange={e => setNewProjectName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') createProject(); if (e.key === 'Escape') setShowNewProject(false) }}
                placeholder="Project name…"
                style={{ padding: '6px 12px', fontSize: 13, fontFamily: 'inherit', border: '1px solid #c7d2fe', borderRadius: 20, outline: 'none', width: 140 }}
              />
              <button onClick={createProject} style={{ padding: '6px 12px', fontSize: 12, fontWeight: 600, color: 'white', background: '#4f46e5', border: 'none', borderRadius: 20, cursor: 'pointer', fontFamily: 'inherit' }}>Create</button>
              <button onClick={() => setShowNewProject(false)} style={{ padding: '6px 12px', fontSize: 12, color: '#888', background: 'white', border: '1px solid #e8e8e8', borderRadius: 20, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setShowNewProject(true)} style={{ padding: '6px 14px', fontSize: 13, color: '#bbb', background: 'white', border: '1px dashed #e8e8e8', borderRadius: 20, cursor: 'pointer', fontFamily: 'inherit' }}>
              + New project
            </button>
          )}
        </div>
        <div style={{ display: 'flex', background: 'white', border: '1px solid #e8e8e8', borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
          {(['list', 'kanban'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '7px 12px', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              background: view === v ? '#4f46e5' : 'white',
              color: view === v ? 'white' : '#aaa', fontSize: 11, fontWeight: 600,
            }}>{v === 'list' ? 'List' : 'Board'}</button>
          ))}
        </div>
      </div>

      {/* Overdue */}
      {overdueTasks.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', letterSpacing: '0.8px', textTransform: 'uppercase' as const, marginBottom: 10 }}>
            Overdue
          </div>
          <TaskList tasks={overdueTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={setEditingTask} />
        </section>
      )}

      {/* LIST VIEW */}
      {view === 'list' && (
        <section>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#bbb', letterSpacing: '0.8px', textTransform: 'uppercase' as const, marginBottom: 10 }}>
            {projects.find(p => p.id === activeProject)?.name || 'Tasks'} · sorted by priority
          </div>
          {projectTasks.length === 0 && completedProjectTasks.length === 0 ? <EmptyState /> : (
            <>
              <TaskList tasks={projectTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={setEditingTask} />
              {completedProjectTasks.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#bbb', letterSpacing: '0.8px', textTransform: 'uppercase' as const, marginBottom: 10 }}>
                    Completed · {completedProjectTasks.length}
                  </div>
                  <TaskList tasks={completedProjectTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={setEditingTask} />
                </div>
              )}
            </>
          )}
        </section>
      )}

      {/* KANBAN VIEW — uses kanbanTasks which includes ALL statuses */}
      {view === 'kanban' && (
        <section>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { status: 'todo', label: 'To Do', color: '#6366f1' },
              { status: 'in_progress', label: 'In Progress', color: '#f59e0b' },
              { status: 'complete', label: 'Done', color: '#10b981' },
            ].map(col => {
              const colTasks = kanbanTasks.filter(t => t.status === col.status)
              return (
                <div key={col.status} style={{ background: '#f8f8f8', borderRadius: 12, padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: col.color }}>{col.label}</span>
                    <span style={{ fontSize: 11, color: '#bbb', background: 'white', padding: '1px 7px', borderRadius: 10 }}>{colTasks.length}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {colTasks.map(t => (
                      <div key={t.id}
                        onClick={() => setEditingTask(t)}
                        style={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: 9, padding: '12px 13px', cursor: 'pointer' }}>
                        <div style={{
                          fontSize: 13, fontWeight: 500, marginBottom: 8, lineHeight: 1.4,
                          color: t.status === 'complete' ? '#bbb' : '#111',
                          textDecoration: t.status === 'complete' ? 'line-through' : 'none',
                        }}>
                          {t.title}
                        </div>
                        {t.due_date && (
                          <div style={{ fontSize: 11, color: '#bbb', marginBottom: 8 }}>
                            {t.due_date}{t.due_time ? ` · ${formatTime(t.due_time)}` : ''}
                          </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{
                            fontSize: 10, fontWeight: 700, textTransform: 'capitalize' as const,
                            color: PRIORITY_TEXT[t.priority] || '#888',
                            background: PRIORITY_BG[t.priority] || '#f5f5f5',
                            padding: '2px 7px', borderRadius: 4,
                          }}>{t.priority}</span>
                          <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
                            {col.status === 'todo' && (
                              <button
                                onClick={e => { e.stopPropagation(); updateTaskStatus(t.id, 'in_progress') }}
                                style={{ fontSize: 10, color: '#f59e0b', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                                → Progress
                              </button>
                            )}
                            {col.status !== 'complete' && (
                              <button
                                onClick={e => { e.stopPropagation(); updateTaskStatus(t.id, 'complete') }}
                                style={{ fontSize: 10, fontWeight: 600, color: '#10b981', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 4, padding: '2px 7px', cursor: 'pointer', fontFamily: 'inherit' }}>
                                ✓ Done
                              </button>
                            )}
                            {col.status !== 'todo' && (
                              <button
                                onClick={e => { e.stopPropagation(); updateTaskStatus(t.id, 'todo') }}
                                style={{ fontSize: 10, color: '#aaa', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                                Undo
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {colTasks.length === 0 && (
                      <div style={{ fontSize: 12, color: '#ccc', textAlign: 'center' as const, padding: '16px 0', border: '1px dashed #eee', borderRadius: 8 }}>
                        No tasks
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

function TaskList({ tasks, onToggle, onDelete, onEdit }: {
  tasks: any[]
  onToggle: (id: string, status: string) => void
  onDelete: (id: string) => void
  onEdit: (task: any) => void
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {tasks.map(t => (
        <div key={t.id}
          onMouseEnter={() => setHoveredId(t.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '11px 16px', background: 'white',
            border: `1px solid ${hoveredId === t.id ? '#e0e7ff' : '#f0f0f0'}`,
            borderRadius: 10, transition: 'border-color 0.15s',
          }}>
          <button
            onClick={() => onToggle(t.id, t.status)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexShrink: 0 }}>
            <Checkbox done={t.status === 'complete'} />
          </button>
          <span onClick={() => onEdit(t)} style={{
            flex: 1, fontSize: 13.5, cursor: 'pointer',
            color: t.status === 'complete' ? '#ccc' : '#111',
            textDecoration: t.status === 'complete' ? 'line-through' : 'none',
          }}>
            {t.title}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {t.due_date && (
              <span style={{ fontSize: 11.5, color: t.due_date < new Date().toISOString().split('T')[0] ? '#ef4444' : '#bbb' }}>
                {t.due_date}{t.due_time ? ` · ${formatTime(t.due_time)}` : ''}
              </span>
            )}
            <span style={{
              fontSize: 10, fontWeight: 700, textTransform: 'capitalize' as const,
              color: PRIORITY_TEXT[t.priority] || '#888',
              background: PRIORITY_BG[t.priority] || '#f5f5f5',
              padding: '2px 7px', borderRadius: 4,
            }}>{t.priority}</span>
            {hoveredId === t.id && (
              <button onClick={() => onDelete(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#ddd', display: 'flex' }}>
                <Trash2 size={13} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 24px', background: 'white', border: '1px solid #f0f0f0', borderRadius: 12 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 6 }}>No tasks yet</div>
      <div style={{ fontSize: 13, color: '#bbb' }}>Add your first task above</div>
    </div>
  )
}