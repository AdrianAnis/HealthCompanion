import type { ChatMessage } from "@/features/companion/types"

export type EscalatedQuestion = {
  question: ChatMessage
  answer: ChatMessage
}

export function selectThread(threads: Record<string, ChatMessage[]>, patientId: string): ChatMessage[] {
  return threads[patientId] ?? []
}

export function selectEscalatedQuestions(thread: ChatMessage[]): EscalatedQuestion[] {
  return thread.flatMap((message, index) => {
    const question = thread[index - 1]
    const isEscalatedAnswer = message.role === "companion" && message.scope !== "in-scope" && message.scope !== null
    return isEscalatedAnswer && question ? [{ question, answer: message }] : []
  })
}
