"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { AdherenceChart } from "@/components/adherence-chart"
import { HospitalPageSkeleton } from "@/components/hospital/hospital-page-skeleton"
import { PageHeader } from "@/components/hospital/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FEEDBACK_CATEGORY_LABEL, FEEDBACK_STATUS_LABEL } from "@/features/feedback/labels"
import { selectPatientFeedback } from "@/features/feedback/selectors"
import { useFeedbackStore } from "@/features/feedback/store"
import { selectEscalatedQuestions, selectThread } from "@/features/companion/selectors"
import { useCompanionStore } from "@/features/companion/store"
import { usePatientRecord } from "@/features/patient/use-patient-record"
import { selectAdherenceByDay, selectAdherenceRatio } from "@/features/reminder/selectors"
import { formatDateTime } from "@/lib/date"
import { routes } from "@/lib/routes"
import { useNow } from "@/lib/use-now"

type MonitoringViewProps = {
  patientId: string
}

export function MonitoringView({ patientId }: MonitoringViewProps) {
  const { isHydrated, patient, activePlan } = usePatientRecord(patientId)
  const completions = useFeedbackStore((state) => state.completions)
  const entries = useFeedbackStore((state) => state.entries)
  const resolveFeedback = useFeedbackStore((state) => state.resolveFeedback)
  const threads = useCompanionStore((state) => state.threads)
  const now = useNow()

  if (!isHydrated) return <HospitalPageSkeleton />

  const days = selectAdherenceByDay(activePlan, completions, now)
  const ratio = selectAdherenceRatio(days)
  const feedback = selectPatientFeedback(entries, patientId)
  const escalations = selectEscalatedQuestions(selectThread(threads, patientId))

  return (
    <>
      <PageHeader
        title="Monitoring"
        description={patient ? `Perilaku dan laporan ${patient.name}.` : "Pasien tidak ditemukan."}
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href={routes.hospital.patientDetail(patientId)}>
              <ChevronLeft />
              Kembali ke pasien
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4 p-4 md:p-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Jadwal yang ditandai pasien</CardTitle>
            <CardDescription>
              7 hari terakhir{ratio === null ? "" : ` · ${Math.round(ratio * 100)}% jadwal ditandai`}. Data perilaku, bukan indikator kesembuhan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdherenceChart days={days} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pertanyaan dieskalasi</CardTitle>
            <CardDescription>Pertanyaan yang tidak dijawab Companion.</CardDescription>
          </CardHeader>
          <CardContent>
            {escalations.length === 0 ? (
              <p className="text-sm text-muted-foreground">Tidak ada pertanyaan yang dieskalasi.</p>
            ) : (
              <ul className="space-y-3">
                {escalations.map(({ question, answer }) => (
                  <li key={question.id} className="rounded-md border p-3 text-sm">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <Badge variant={answer.scope === "urgent" ? "destructive" : "secondary"}>
                        {answer.scope === "urgent" ? "Darurat" : "Di luar care plan"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatDateTime(question.createdAt)}</span>
                    </div>
                    <p>{question.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Laporan pasien</CardTitle>
          </CardHeader>
          <CardContent>
            {feedback.length === 0 ? (
              <p className="text-sm text-muted-foreground">Belum ada laporan dari pasien.</p>
            ) : (
              <ul className="divide-y">
                {feedback.map((entry) => (
                  <li key={entry.id} className="flex flex-wrap items-start justify-between gap-3 py-3">
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{FEEDBACK_CATEGORY_LABEL[entry.category]}</Badge>
                        <Badge variant={entry.status === "open" ? "default" : "outline"}>{FEEDBACK_STATUS_LABEL[entry.status]}</Badge>
                        <span className="text-xs text-muted-foreground">{formatDateTime(entry.createdAt)}</span>
                      </div>
                      <p className="text-sm">{entry.message}</p>
                    </div>
                    {entry.status === "open" ? (
                      <Button variant="outline" size="sm" onClick={() => resolveFeedback(entry.id)}>
                        Tandai sudah ditinjau
                      </Button>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
