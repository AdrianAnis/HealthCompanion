import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { CarePlan } from "@/features/care-plan/types"
import { answerQuestion } from "@/features/companion/scenarios"
import type { ChatMessage } from "@/features/companion/types"

export const COMPANION_STORAGE_KEY = "hc-companion"

type CompanionState = {
  threads: Record<string, ChatMessage[]>
  ask: (patientId: string, question: string, activePlan: CarePlan | undefined) => ChatMessage
  clearThread: (patientId: string) => void
}

export const useCompanionStore = create<CompanionState>()(
  persist(
    (set) => ({
      threads: {},
      ask: (patientId, question, activePlan) => {
        const now = Date.now()
        const answer = answerQuestion(question, activePlan)
        const patientMessage: ChatMessage = {
          id: `msg-${now}-q`,
          role: "patient",
          content: question.trim(),
          createdAt: new Date(now).toISOString(),
          scope: answer.scope,
        }
        const reply: ChatMessage = {
          id: `msg-${now}-a`,
          role: "companion",
          content: answer.content,
          createdAt: new Date(now).toISOString(),
          scope: answer.scope,
          topic: answer.topic,
          escalated: answer.escalated,
        }
        set((state) => ({
          threads: {
            ...state.threads,
            [patientId]: [...(state.threads[patientId] ?? []), patientMessage, reply],
          },
        }))
        return reply
      },
      clearThread: (patientId) =>
        set((state) => ({ threads: { ...state.threads, [patientId]: [] } })),
    }),
    {
      name: COMPANION_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ threads: state.threads }),
      skipHydration: true,
    },
  ),
)

export function getEscalations(threads: Record<string, ChatMessage[]>, patientId: string): ChatMessage[] {
  return (threads[patientId] ?? []).filter((message) => message.role === "companion" && message.escalated)
}
