import { addDays, differenceInCalendarDays, format, parseISO, startOfDay } from "date-fns"
import { id } from "date-fns/locale"

export type DateInput = Date | string

export function toDate(value: DateInput): Date {
  return typeof value === "string" ? parseISO(value) : value
}

export function toDateKey(value: DateInput): string {
  return format(toDate(value), "yyyy-MM-dd")
}

export function todayKey(): string {
  return toDateKey(new Date())
}

export function daysFromToday(days: number, time = "08:00"): string {
  const [hours, minutes] = time.split(":").map(Number)
  const date = addDays(startOfDay(new Date()), days)
  date.setHours(hours, minutes, 0, 0)
  return date.toISOString()
}

export function daysBetween(from: DateInput, to: DateInput): number {
  return differenceInCalendarDays(toDate(to), toDate(from))
}

export function formatDate(value: DateInput, pattern = "d MMM yyyy"): string {
  return format(toDate(value), pattern, { locale: id })
}

export function formatDateTime(value: DateInput): string {
  return format(toDate(value), "d MMM yyyy, HH:mm", { locale: id })
}

export function compareTime(a: string, b: string): number {
  return a.localeCompare(b)
}
