"use client"

import { AlertTriangle, FileClock, MessageSquareWarning, Users } from "lucide-react"

import { DashboardAdherenceCard, type AdherenceRow } from "@/components/hospital/dashboard-adherence-card"
import { DashboardAttentionCard } from "@/components/hospital/dashboard-attention-card"
import { DashboardFollowUpsCard, type FollowUpRow } from "@/components/hospital/dashboard-followups-card"
import { DashboardHero } from "@/components/hospital/dashboard-hero"
import { DashboardRecentCard } from "@/components/hospital/dashboard-recent-card"
import { DashboardStatCard } from "@/components/hospital/dashboard-stat-card"
import { HospitalPageSkeleton } from "@/components/hospital/hospital-page-skeleton"
import { useDoctorContext } from "@/features/auth/use-doctor-context"
import {
  selectActivePlan,
  selectNextFollowUp,
  selectPatientPlans,
  selectRecentlyConfirmedPlans,
} from "@/features/care-plan/selectors"
import { useCarePlanStore } from "@/features/care-plan/store"
import { useCompanionStore } from "@/features/companion/store"
import { selectAttentionItems } from "@/features/dashboard/selectors"
import { useFeedbackStore } from "@/features/feedback/store"
import { usePatientStore } from "@/features/patient/store"
import { selectAdherenceByDay, selectAdherenceRatio } from "@/features/reminder/selectors"
import { toDateKey } from "@/lib/date"
import { routes } from "@/lib/routes"
import { useHydrated } from "@/lib/use-hydrated"
import { useNow } from "@/lib/use-now"

const RECENT_PLAN_LIMIT = 5
const FOLLOW_UP_LIMIT = 4

export function DashboardView() {
  const isHydrated = useHydrated()
  const { doctor } = useDoctorContext()
  const patients = usePatientStore((state) => state.patients)
  const plans = useCarePlanStore((state) => state.plans)
  const feedbackEntries = useFeedbackStore((state) => state.entries)
  const completions = useFeedbackStore((state) => state.completions)
  const threads = useCompanionStore((state) => state.threads)
  const now = useNow()

  if (!isHydrated) return <HospitalPageSkeleton />

  const patientNames = Object.fromEntries(patients.map((patient) => [patient.id, patient.name]))
  const attentionItems = selectAttentionItems({ plans, feedbackEntries, threads })
  const countByKind = (kind: string): number => attentionItems.filter((item) => item.kind === kind).length
  const firstDraft = attentionItems.find((item) => item.kind === "draft")

  const adherenceRows = patients.map<AdherenceRow>((patient) => ({
    patientId: patient.id,
    name: patient.name,
    ratio: selectAdherenceRatio(selectAdherenceByDay(selectPatientPlans(plans, patient.id), completions, now)),
  }))

  const followUpRows = patients
    .flatMap<FollowUpRow>((patient) => {
      const followUp = selectNextFollowUp(selectActivePlan(plans, patient.id), toDateKey(now))
      return followUp ? [{ patientId: patient.id, name: patient.name, date: followUp.date, instruction: followUp.instruction }] : []
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, FOLLOW_UP_LIMIT)

  const heroAction = firstDraft
    ? { href: routes.hospital.carePlanNew(firstDraft.patientId), label: `Tinjau draft ${patientNames[firstDraft.patientId] ?? ""}`.trim() }
    : { href: routes.hospital.patientList, label: "Lihat daftar pasien" }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <DashboardHero doctorName={doctor?.name ?? "Dokter"} now={now} pendingCount={attentionItems.length} action={heroAction} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard icon={Users} label="Pasien" value={patients.length} />
        <DashboardStatCard icon={FileClock} label="Draft menunggu konfirmasi" value={countByKind("draft")} />
        <DashboardStatCard icon={AlertTriangle} label="Laporan pasien terbuka" value={countByKind("feedback")} />
        <DashboardStatCard icon={MessageSquareWarning} label="Pertanyaan dieskalasi" value={countByKind("escalation")} />
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <DashboardAttentionCard items={attentionItems} patientNames={patientNames} />
          <DashboardAdherenceCard rows={adherenceRows} />
        </div>
        <div className="space-y-6">
          <DashboardFollowUpsCard rows={followUpRows} />
          <DashboardRecentCard plans={selectRecentlyConfirmedPlans(plans, RECENT_PLAN_LIMIT)} patientNames={patientNames} />
        </div>
      </div>
    </div>
  )
}
