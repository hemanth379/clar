import { format, isToday, isTomorrow, isPast, formatDistanceToNow, parseISO } from 'date-fns'

export function formatDueDate(date: string): string {
  const d = parseISO(date)
  if (isToday(d)) return 'Today'
  if (isTomorrow(d)) return 'Tomorrow'
  if (isPast(d)) return 'Overdue'
  return format(d, 'MMM d')
}

export function isOverdue(date: string): boolean {
  const d = parseISO(date)
  return isPast(d) && !isToday(d)
}

export function getRelativeTime(date: string): string {
  return formatDistanceToNow(parseISO(date), { addSuffix: true })
}

export { isToday, isTomorrow } from 'date-fns'