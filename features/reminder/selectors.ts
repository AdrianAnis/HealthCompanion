import { getDay } from "date-fns"

import { getItemsByKind } from "@/features/care-plan/selectors"
import type { ActivityItem, CarePlan, MedicationItem } from "@/features/care-plan/types"
import type { ReminderCompletion } from "@/features/feedback/types"
import { daysBetween, toDate, toDateKey, type DateInput } from "@/lib/date"

export type Reminder = {
  key: string
  itemId: string
  kind: "medication" | "activity"
  date: string
  time: string
  title: string
  detail: string
}

export type ReminderWithStatus = Reminder & {
  completed: boolean
  completedAt: string | null
}

const THREE_TIMES_WEEKLY_DAYS = [1, 3, 5]

export function reminderKey(itemId: string, date: string, time: string): string {
  return `${itemId}:${date}:${time}`
}

function isMedicationDue(item: MedicationItem, plan: CarePlan, date: Date): boolean {
  if (!plan.confirmedAt) return false
  const elapsed = daysBetween(plan.confirmedAt, date)
  return elapsed >= 0 && elapsed < item.durationDays
}

function isActivityDue(item: ActivityItem, plan: CarePlan, date: Date): boolean {
  if (!plan.confirmedAt || daysBetween(plan.confirmedAt, date) < 0) return false
  if (item.frequency === "daily") return true
  if (item.frequency === "3x-weekly") return THREE_TIMES_WEEKLY_DAYS.includes(getDay(date))
  return getDay(date) === getDay(toDate(plan.confirmedAt))
}

export function getTodayReminders(activePlan: CarePlan | undefined, date: DateInput): Reminder[] {
  if (!activePlan || activePlan.status !== "active") return []

  const day = toDate(date)
  const dateKey = toDateKey(day)

  const medication = getItemsByKind(activePlan, "medication")
    .filter((item) => isMedicationDue(item, activePlan, day))
    .flatMap((item) =>
      item.times.map<Reminder>((time) => ({
        key: reminderKey(item.id, dateKey, time),
        itemId: item.id,
        kind: "medication",
        date: dateKey,
        time,
        title: `${item.drug} ${item.dose}`,
        detail: item.instructions ?? item.frequency,
      })),
    )

  const activity = getItemsByKind(activePlan, "activity")
    .filter((item) => isActivityDue(item, activePlan, day))
    .map<Reminder>((item) => ({
      key: reminderKey(item.id, dateKey, item.time),
      itemId: item.id,
      kind: "activity",
      date: dateKey,
      time: item.time,
      title: item.activity,
      detail: `${item.durationMinutes} menit`,
    }))

  return [...medication, ...activity].sort((a, b) => a.time.localeCompare(b.time) || a.title.localeCompare(b.title))
}

export function withCompletion(
  reminders: Reminder[],
  completions: Record<string, ReminderCompletion>,
): ReminderWithStatus[] {
  return reminders.map((reminder) => ({
    ...reminder,
    completed: Boolean(completions[reminder.key]),
    completedAt: completions[reminder.key]?.completedAt ?? null,
  }))
}

export function getAdherence(reminders: ReminderWithStatus[]): { done: number; total: number; ratio: number } {
  const done = reminders.filter((reminder) => reminder.completed).length
  const total = reminders.length
  return { done, total, ratio: total === 0 ? 0 : done / total }
}

export function getNextReminder(reminders: ReminderWithStatus[], nowTime: string): ReminderWithStatus | undefined {
  return reminders.find((reminder) => !reminder.completed && reminder.time >= nowTime)
}
