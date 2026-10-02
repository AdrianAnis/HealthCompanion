export type CarePlanStatus = "draft" | "active" | "superseded"

export type DietType = "avoid" | "limit" | "recommend"

export type ActivityFrequency = "daily" | "3x-weekly" | "weekly"

export type MedicationItem = {
  id: string
  kind: "medication"
  drug: string
  dose: string
  frequency: string
  times: string[]
  durationDays: number
  instructions?: string
}

export type DietItem = {
  id: string
  kind: "diet"
  category: string
  type: DietType
  notes: string
}

export type ActivityItem = {
  id: string
  kind: "activity"
  activity: string
  frequency: ActivityFrequency
  durationMinutes: number
  time: string
  restriction?: string
}

export type FollowUpItem = {
  id: string
  kind: "followUp"
  date: string
  notes: string
}

export type CarePlanItem = MedicationItem | DietItem | ActivityItem | FollowUpItem

export type CarePlanItemKind = CarePlanItem["kind"]

export type CarePlanItemOf<K extends CarePlanItemKind> = Extract<CarePlanItem, { kind: K }>

export type CarePlan = {
  id: string
  patientId: string
  version: number
  status: CarePlanStatus
  createdBy: string
  createdAt: string
  confirmedAt: string | null
  summary?: string
  items: CarePlanItem[]
}
