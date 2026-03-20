export type TaskStatus = 'todo' | 'in_progress' | 'complete' | 'archived'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  google_access_token: string | null
  google_refresh_token: string | null
  google_calendar_connected: boolean
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  name: string
  color: string
  icon: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  project_id: string
  user_id: string
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  due_date: string | null
  position: number
  google_event_id: string | null
  created_at: string
  updated_at: string
  subtasks?: Subtask[]
  labels?: Label[]
}

export interface Subtask {
  id: string
  task_id: string
  title: string
  is_complete: boolean
  created_at: string
}

export interface Label {
  id: string
  user_id: string
  name: string
  color: string
}

export interface Notification {
  id: string
  user_id: string
  message: string
  type: string
  is_read: boolean
  task_id: string | null
  created_at: string
}