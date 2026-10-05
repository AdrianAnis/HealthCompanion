"use client"

import { AdherenceChart } from "@/components/adherence-chart"
import { FeedbackForm } from "@/components/patient/feedback-form"
import { Badge } from "@/components/ui/badge"
import type { CarePlan } from "@/features/care-plan/types"
import { FEEDBACK_CATEGORY_LABEL, FEEDBACK_STATUS_LABEL } from "@/features/feedback/labels"
import { selectPatientFeedback } from "@/features/feedback/selectors"
import { useFeedbackStore } from "@/features/feedback/store"
import { selectAdherenceByDay } from "@/features/reminder/selectors"
import { formatDate } from "@/lib/date"
import { useNow } from "@/lib/use-now"

type ActivitySectionProps = {
  patientId: string
  activePlan: CarePlan | undefined
}

export function ActivitySection({ patientId, activePlan }: ActivitySectionProps) {
  const completions = useFeedbackStore((state) => state.completions)
  const entries = useFeedbackStore((state) => state.entries)
  const addFeedback = useFeedbackStore((state) => state.addFeedback)
  const now = useNow()

  const days = selectAdherenceByDay(activePlan, completions, now)
  const feedback = selectPatientFeedback(entries, patientId)

  return (
    <section id="aktivitas" className="scroll-mt-24 space-y-4">
      <p className="type-caption">Jadwal yang kamu tandai selesai dan laporan kamu ke dokter.</p>

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-card p-6 shadow-sm">
          <h3 className="type-subheading">7 hari terakhir</h3>
          <p className="mb-4 type-caption">Jumlah jadwal obat dan aktivitas yang kamu tandai selesai.</p>
          <AdherenceChart days={days} />
        </div>

        <div id="lapor-keluhan" className="scroll-mt-24 rounded-3xl border bg-card p-6 shadow-sm">
          <h3 className="mb-4 type-subheading">Lapor kendala atau keluhan</h3>
          <FeedbackForm onSubmit={(values) => addFeedback({ patientId, ...values })} />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="type-subheading">Laporan saya</h3>
        {feedback.length === 0 ? (
          <p className="rounded-2xl bg-muted p-4 type-caption">Kamu belum mengirim laporan apa pun.</p>
        ) : (
          <ul className="space-y-3">
            {feedback.map((entry) => (
              <li key={entry.id} className="rounded-3xl border bg-card p-4 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{FEEDBACK_CATEGORY_LABEL[entry.category]}</Badge>
                  <Badge variant="outline">{FEEDBACK_STATUS_LABEL[entry.status]}</Badge>
                  <span className="type-caption">{formatDate(entry.createdAt, "d MMM yyyy")}</span>
                </div>
                <p className="mt-2">{entry.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
