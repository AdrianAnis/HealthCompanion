export type ReminderCompletion = {
  key: string
  completedAt: string
}

export type FeedbackKind = "symptom" | "side-effect" | "mood" | "note"

export type FeedbackSeverity = "low" | "medium" | "high"

export type FeedbackEntry = {
  id: string
  patientId: string
  planId: string | null
  kind: FeedbackKind
  severity: FeedbackSeverity
  message: string
  createdAt: string
}
