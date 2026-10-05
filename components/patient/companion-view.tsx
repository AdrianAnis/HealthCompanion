"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircleHeart, Send } from "lucide-react"

import { ChatBubble } from "@/components/patient/chat-bubble"
import { PageSkeleton } from "@/components/patient/page-skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { selectThread } from "@/features/companion/selectors"
import { SUGGESTED_QUESTIONS } from "@/features/companion/scenarios"
import { useCompanionStore } from "@/features/companion/store"
import { usePatientStore } from "@/features/patient/store"
import { usePatientContext } from "@/features/patient/use-patient-context"

const TYPING_DELAY_MS = 800

export function CompanionView() {
  const { isHydrated, patient, activePlan } = usePatientContext()
  const doctors = usePatientStore((state) => state.doctors)
  const threads = useCompanionStore((state) => state.threads)
  const askQuestion = useCompanionStore((state) => state.askQuestion)
  const reportMessage = useCompanionStore((state) => state.reportMessage)
  const [draft, setDraft] = useState("")
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null)
  const timerRef = useRef<number | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const thread = patient ? selectThread(threads, patient.id) : []

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [thread.length, pendingQuestion])

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    },
    [],
  )

  if (!isHydrated || !patient) return <PageSkeleton />

  function sendQuestion(question: string): void {
    const trimmed = question.trim()
    if (!patient || !trimmed || pendingQuestion) return
    setDraft("")
    setPendingQuestion(trimmed)
    timerRef.current = window.setTimeout(() => {
      askQuestion(patient.id, trimmed, activePlan)
      setPendingQuestion(null)
    }, TYPING_DELAY_MS)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    sendQuestion(draft)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <header className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <MessageCircleHeart className="size-6" />
        </span>
        <div>
          <h1 className="type-title">Companion</h1>
          <p className="type-caption">Menjawab berdasarkan care plan aktif dari dokter kamu</p>
        </div>
      </header>

      <section aria-live="polite" className="h-96 space-y-4 overflow-y-auto rounded-3xl border bg-card p-4 shadow-sm md:h-128">
        {thread.length === 0 && !pendingQuestion ? (
          <p className="rounded-2xl bg-muted p-4 text-muted-foreground">
            Halo {patient.name.split(" ")[0]}, aku bisa bantu menjelaskan obat, makanan, aktivitas, dan jadwal kontrol di care plan kamu.
          </p>
        ) : null}
        {thread.map((message) => (
          <ChatBubble key={message.id} message={message} doctors={doctors} onReport={(messageId) => reportMessage(patient.id, messageId)} />
        ))}
        {pendingQuestion ? (
          <>
            <div className="flex justify-end">
              <div className="max-w-xs sm:max-w-md rounded-2xl rounded-br-md bg-primary px-4 py-3 text-primary-foreground">{pendingQuestion}</div>
            </div>
            <p className="type-caption">Companion sedang mengetik...</p>
          </>
        ) : null}
        <div ref={bottomRef} />
      </section>

      <div className="flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.map((question) => (
          <Button key={question} variant="outline" className="h-auto min-h-11 rounded-full py-2 whitespace-normal" disabled={pendingQuestion !== null} onClick={() => sendQuestion(question)}>
            {question}
          </Button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex-1 space-y-1">
          <Label htmlFor="companion-question" className="sr-only">
            Pertanyaan untuk Companion
          </Label>
          <Input
            id="companion-question"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Tanya soal care plan kamu..."
            className="h-12 rounded-2xl bg-card px-4 text-base"
          />
        </div>
        <Button type="submit" size="icon" className="size-12 rounded-2xl" aria-label="Kirim pertanyaan" disabled={pendingQuestion !== null}>
          <Send />
        </Button>
      </form>
    </div>
  )
}
