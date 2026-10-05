export type QuestionScope = "in-scope" | "out-of-scope" | "urgent"

export type CompanionTopic =
  | "medication-today"
  | "medication-detail"
  | "diet"
  | "activity"
  | "follow-up"
  | "explain-plan"
  | "missed-dose"
  | "none"

export type MessageSource = {
  planId: string
  version: number
  doctorId: string
  confirmedAt: string
}

export type ChatMessage = {
  id: string
  role: "patient" | "companion"
  content: string
  createdAt: string
  scope: QuestionScope | null
  source: MessageSource | null
  isReported: boolean
}

export type QuestionClassification = {
  scope: QuestionScope
  topic: CompanionTopic
  matchedItemIds: string[]
}
