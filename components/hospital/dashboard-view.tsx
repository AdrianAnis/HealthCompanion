"use client"

import Link from "next/link"
import { AlertTriangle, FileClock, MessageSquareWarning, Users, type LucideIcon } from "lucide-react"

import { HospitalPageSkeleton } from "@/components/hospital/hospital-page-skeleton"
import { PageHeader } from "@/components/hospital/page-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { selectDraftPlans, selectRecentlyConfirmedPlans } from "@/features/care-plan/selectors"
import { useCarePlanStore } from "@/features/care-plan/store"
import { FEEDBACK_CATEGORY_LABEL } from "@/features/feedback/labels"
import { selectOpenFeedback } from "@/features/feedback/selectors"
import { useFeedbackStore } from "@/features/feedback/store"
import { selectEscalatedQuestions } from "@/features/companion/selectors"
import { useCompanionStore } from "@/features/companion/store"
import { selectPatientById } from "@/features/patient/selectors"
import { usePatientStore } from "@/features/patient/store"
import { formatDateTime } from "@/lib/date"
import { routes } from "@/lib/routes"
import { useHydrated } from "@/lib/use-hydrated"

const RECENT_PLAN_LIMIT = 5

type StatCardProps = {
  icon: LucideIcon
  label: string
  value: number
}

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4">
        <span className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <Icon className="size-5" />
        </span>
        <div>
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardView() {
  const isHydrated = useHydrated()
  const patients = usePatientStore((state) => state.patients)
  const plans = useCarePlanStore((state) => state.plans)
  const feedbackEntries = useFeedbackStore((state) => state.entries)
  const threads = useCompanionStore((state) => state.threads)

  if (!isHydrated) return <HospitalPageSkeleton />

  const drafts = selectDraftPlans(plans)
  const openFeedback = selectOpenFeedback(feedbackEntries)
  const escalations = Object.entries(threads).flatMap(([patientId, thread]) =>
    selectEscalatedQuestions(thread).map((escalation) => ({ patientId, ...escalation })),
  )
  const recentPlans = selectRecentlyConfirmedPlans(plans, RECENT_PLAN_LIMIT)
  const patientName = (patientId: string): string => selectPatientById(patients, patientId)?.name ?? patientId

  return (
    <>
      <PageHeader title="Dashboard" description="Ringkasan hal yang perlu Anda tinjau hari ini." />
      <div className="space-y-4 p-4 md:p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Users} label="Pasien" value={patients.length} />
          <StatCard icon={FileClock} label="Draft menunggu konfirmasi" value={drafts.length} />
          <StatCard icon={AlertTriangle} label="Laporan pasien terbuka" value={openFeedback.length} />
          <StatCard icon={MessageSquareWarning} label="Pertanyaan dieskalasi" value={escalations.length} />
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Perlu ditinjau</CardTitle>
              <CardDescription>Draft, laporan, dan eskalasi yang menunggu Anda.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {drafts.map((plan) => (
                  <li key={plan.id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="text-sm font-medium">{patientName(plan.patientId)}</p>
                      <p className="text-sm text-muted-foreground">Draft v{plan.version} menunggu konfirmasi</p>
                    </div>
                    <Link href={routes.hospital.carePlanNew(plan.patientId)} className="text-sm font-medium text-primary hover:underline">
                      Tinjau draft
                    </Link>
                  </li>
                ))}
                {openFeedback.map((entry) => (
                  <li key={entry.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{patientName(entry.patientId)}</p>
                      <p className="truncate text-sm text-muted-foreground">
                        {FEEDBACK_CATEGORY_LABEL[entry.category]}: {entry.message}
                      </p>
                    </div>
                    <Link href={routes.hospital.monitoring(entry.patientId)} className="shrink-0 text-sm font-medium text-primary hover:underline">
                      Lihat
                    </Link>
                  </li>
                ))}
                {escalations.map(({ patientId, question }) => (
                  <li key={question.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{patientName(patientId)}</p>
                      <p className="truncate text-sm text-muted-foreground">Bertanya: {question.content}</p>
                    </div>
                    <Link href={routes.hospital.monitoring(patientId)} className="shrink-0 text-sm font-medium text-primary hover:underline">
                      Lihat
                    </Link>
                  </li>
                ))}
                {drafts.length + openFeedback.length + escalations.length === 0 ? (
                  <li className="py-6 text-center text-sm text-muted-foreground">Tidak ada yang perlu ditinjau.</li>
                ) : null}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perubahan care plan terbaru</CardTitle>
              <CardDescription>Versi yang baru dikonfirmasi.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {recentPlans.map((plan) => (
                  <li key={plan.id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="text-sm font-medium">{patientName(plan.patientId)}</p>
                      <p className="text-sm text-muted-foreground">{plan.confirmedAt ? formatDateTime(plan.confirmedAt) : ""}</p>
                    </div>
                    <Badge variant={plan.status === "active" ? "default" : "outline"}>v{plan.version}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
