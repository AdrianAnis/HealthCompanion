export type QuestionScope = "in-scope" | "out-of-scope" | "urgent"

export type CompanionTopic = "medication" | "missed-dose" | "diet" | "activity" | "follow-up" | "general"

export type ChatRole = "patient" | "companion"

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  createdAt: string
  scope?: QuestionScope
  topic?: CompanionTopic
  escalated?: boolean
}

export type CompanionAnswer = {
  scope: QuestionScope
  topic: CompanionTopic
  content: string
  escalated: boolean
}
