export type PetKind = "cat" | "dog"

export type PetMood = "happy" | "neutral" | "sleepy"

export type DayPart = "morning" | "day" | "night"

export type ConsistencyLevel = 1 | 2 | 3 | 4

export type AchievementId = "first-complete-day" | "three-day-streak" | "steady-week"

export type Achievement = {
  id: AchievementId
  isUnlocked: boolean
}
