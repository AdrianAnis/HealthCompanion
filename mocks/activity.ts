import { selectActivePlan } from "@/features/care-plan/selectors"
import type { FeedbackEntry, ReminderCompletion } from "@/features/feedback/types"
import { getTodayReminders } from "@/features/reminder/selectors"
import { combineDateAndTime, daysFromToday, getRecentDays } from "@/lib/date"
import { mockCarePlans } from "@/mocks/care-plans"

const SEEDED_PAST_DAYS = 6

const COMPLETION_RATIOS_BY_PATIENT: Record<string, number[]> = {
  "p-001": [1, 1, 1, 0.9, 1, 1],
  "p-002": [1, 1, 0.8, 0.6, 0.4, 0.3],
  "p-003": [1, 1, 0.8, 0.8, 0.8, 0.8],
}

function buildCompletions(): Record<string, ReminderCompletion> {
  const pastDays = getRecentDays(SEEDED_PAST_DAYS + 1, new Date()).slice(0, SEEDED_PAST_DAYS)

  return Object.entries(COMPLETION_RATIOS_BY_PATIENT)
    .flatMap(([patientId, ratios]) => {
      const plan = selectActivePlan(mockCarePlans, patientId)
      return pastDays.flatMap((day, index) => {
        const reminders = getTodayReminders(plan, day)
        const completedCount = Math.ceil(reminders.length * (ratios[index] ?? 0))
        return reminders.slice(0, completedCount).map<ReminderCompletion>((reminder) => ({
          key: reminder.key,
          completedAt: combineDateAndTime(reminder.date, reminder.time),
        }))
      })
    })
    .reduce<Record<string, ReminderCompletion>>((accumulator, completion) => ({ ...accumulator, [completion.key]: completion }), {})
}

export const mockCompletions: Record<string, ReminderCompletion> = buildCompletions()

export const mockFeedbackEntries: FeedbackEntry[] = [
  {
    id: "fb-p-002-1",
    patientId: "p-002",
    category: "side-effect",
    message: "Sering mual dan perut perih setelah minum metformin pagi, jadi kadang saya tunda minumnya.",
    status: "open",
    createdAt: daysFromToday(-1, "08:15"),
  },
]
