import { selectDraftPlans } from "@/features/care-plan/selectors"
import type { CarePlan } from "@/features/care-plan/types"
import { selectEscalatedQuestions } from "@/features/companion/selectors"
import type { ChatMessage } from "@/features/companion/types"
import { selectOpenFeedback } from "@/features/feedback/selectors"
import type { FeedbackEntry } from "@/features/feedback/types"

export type AttentionKind = "draft" | "feedback" | "escalation"

export type AttentionItem = {
  id: string
  kind: AttentionKind
  patientId: string
  detail: string
  occurredAt: string
}

type AttentionSources = {
  plans: CarePlan[]
  feedbackEntries: FeedbackEntry[]
  threads: Record<string, ChatMessage[]>
}

export const ATTENTION_KIND_LABEL: Record<AttentionKind, string> = {
  draft: "Draft menunggu konfirmasi",
  feedback: "Laporan pasien",
  escalation: "Pertanyaan dieskalasi",
}

export function selectAttentionItems({ plans, feedbackEntries, threads }: AttentionSources): AttentionItem[] {
  const drafts = selectDraftPlans(plans).map<AttentionItem>((plan) => ({
    id: plan.id,
    kind: "draft",
    patientId: plan.patientId,
    detail: `Draft v${plan.version} siap ditinjau`,
    occurredAt: plan.createdAt,
  }))

  const feedback = selectOpenFeedback(feedbackEntries).map<AttentionItem>((entry) => ({
    id: entry.id,
    kind: "feedback",
    patientId: entry.patientId,
    detail: entry.message,
    occurredAt: entry.createdAt,
  }))

  const escalations = Object.entries(threads).flatMap(([patientId, thread]) =>
    selectEscalatedQuestions(thread).map<AttentionItem>(({ question }) => ({
      id: question.id,
      kind: "escalation",
      patientId,
      detail: question.content,
      occurredAt: question.createdAt,
    })),
  )

  return [...drafts, ...feedback, ...escalations].sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
}
