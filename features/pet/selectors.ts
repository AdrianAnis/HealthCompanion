import type { Achievement, ConsistencyLevel, DayPart, PetMood } from "@/features/pet/types"
import type { AdherenceDay } from "@/features/reminder/selectors"
import { selectAdherenceRatio } from "@/features/reminder/selectors"

const SLEEPY_HOUR = 21
const MORNING_END_HOUR = 11
const NIGHT_START_HOUR = 18
const STREAK_TARGET_DAYS = 3
const STEADY_WEEK_RATIO = 0.8

const CONSISTENCY_THRESHOLDS: { minRatio: number; level: ConsistencyLevel }[] = [
  { minRatio: 0.85, level: 4 },
  { minRatio: 0.65, level: 3 },
  { minRatio: 0.4, level: 2 },
]

function isCompleteDay(day: AdherenceDay): boolean {
  return day.total > 0 && day.done === day.total
}

export function selectPetMood(todayProgress: { done: number; total: number }, now: Date): PetMood {
  if (todayProgress.total > 0 && todayProgress.done === todayProgress.total) return "happy"
  return now.getHours() >= SLEEPY_HOUR ? "sleepy" : "neutral"
}

export function selectConsistencyLevel(days: AdherenceDay[]): ConsistencyLevel {
  const ratio = selectAdherenceRatio(days)
  if (ratio === null) return 1
  return CONSISTENCY_THRESHOLDS.find((threshold) => ratio >= threshold.minRatio)?.level ?? 1
}

export function selectCompleteDayStreak(days: AdherenceDay[]): number {
  const today = days[days.length - 1]
  const settledDays = today && !isCompleteDay(today) ? days.slice(0, -1) : days
  let streak = 0
  for (let index = settledDays.length - 1; index >= 0; index -= 1) {
    const day = settledDays[index]
    if (!day || !isCompleteDay(day)) break
    streak += 1
  }
  return streak
}

export function selectAchievements(days: AdherenceDay[]): Achievement[] {
  const ratio = selectAdherenceRatio(days)
  return [
    { id: "first-complete-day", isUnlocked: days.some(isCompleteDay) },
    { id: "three-day-streak", isUnlocked: selectCompleteDayStreak(days) >= STREAK_TARGET_DAYS },
    { id: "steady-week", isUnlocked: ratio !== null && ratio >= STEADY_WEEK_RATIO },
  ]
}

export function selectDayPart(now: Date): DayPart {
  const hour = now.getHours()
  if (hour < MORNING_END_HOUR) return "morning"
  return hour >= NIGHT_START_HOUR ? "night" : "day"
}
