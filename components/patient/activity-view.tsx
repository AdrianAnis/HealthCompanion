"use client"

import { AdherenceChart } from "@/components/adherence-chart"
import { FeedbackForm } from "@/components/patient/feedback-form"
import { PageSkeleton } from "@/components/patient/page-skeleton"
import { Badge } from "@/components/ui/badge"
import { FEEDBACK_CATEGORY_LABEL, FEEDBACK_STATUS_LABEL } from "@/features/feedback/labels"
import { selectPatientFeedback } from "@/features/feedback/selectors"
import { useFeedbackStore } from "@/features/feedback/store"
import { usePatientContext } from "@/features/patient/use-patient-context"
import { selectAdherenceByDay } from "@/features/reminder/selectors"
import { formatDate } from "@/lib/date"
import { useNow } from "@/lib/use-now"

export function ActivityView() {
  const { isHydrated, patient, activePlan } = usePatientContext()
  const completions = useFeedbackStore((state) => state.completions)
  const entries = useFeedbackStore((state) => state.entries)
  const addFeedback = useFeedbackStore((state) => state.addFeedback)
  const now = useNow()

  if (!isHydrated || !patient) return <PageSkeleton />

  const days = selectAdherenceByDay(activePlan, completions, now)
  const feedback = selectPatientFeedback(entries, patient.id)

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Aktivitas</h1>
        <p className="text-muted-foreground">Catatan jadwal yang kamu tandai selesai dan laporan kamu ke dokter.</p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border bg-card p-6 shadow-sm">
          <h2 className="font-bold">7 hari terakhir</h2>
          <p className="mb-4 text-sm text-muted-foreground">Jumlah jadwal obat dan aktivitas yang kamu tandai selesai.</p>
          <AdherenceChart days={days} />
        </section>

        <section className="rounded-3xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-bold">Lapor kendala atau keluhan</h2>
          <FeedbackForm onSubmit={(values) => addFeedback({ patientId: patient.id, ...values })} />
        </section>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Laporan saya</h2>
        {feedback.length === 0 ? (
          <p className="rounded-2xl bg-muted p-4 text-muted-foreground">Kamu belum mengirim laporan apa pun.</p>
        ) : (
          <ul className="space-y-3">
            {feedback.map((entry) => (
              <li key={entry.id} className="rounded-3xl border bg-card p-4 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{FEEDBACK_CATEGORY_LABEL[entry.category]}</Badge>
                  <Badge variant="outline">{FEEDBACK_STATUS_LABEL[entry.status]}</Badge>
                  <span className="text-sm text-muted-foreground">{formatDate(entry.createdAt, "d MMM yyyy")}</span>
                </div>
                <p className="mt-2">{entry.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
