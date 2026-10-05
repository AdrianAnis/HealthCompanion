"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { LogOut, RotateCcw } from "lucide-react"

import { ActivitySection } from "@/components/patient/activity-section"
import { PageSkeleton } from "@/components/patient/page-skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CARE_PLAN_STATUS_LABEL } from "@/features/care-plan/labels"
import { selectPlanHistory } from "@/features/care-plan/selectors"
import { useCarePlanStore } from "@/features/care-plan/store"
import { selectDoctorById, selectPatientAge } from "@/features/patient/selectors"
import { usePatientStore } from "@/features/patient/store"
import { usePatientActions } from "@/features/patient/use-patient-actions"
import { usePatientContext } from "@/features/patient/use-patient-context"
import { formatDate } from "@/lib/date"
import { useNow } from "@/lib/use-now"

const PROFILE_TABS = [
  { value: "data", label: "Data diri" },
  { value: "aktivitas", label: "Aktivitas" },
  { value: "riwayat", label: "Riwayat care plan" },
]

const DEFAULT_TAB = "data"

export function ProfileView() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isHydrated, patient, activePlan } = usePatientContext()
  const doctors = usePatientStore((state) => state.doctors)
  const plans = useCarePlanStore((state) => state.plans)
  const { logout, resetDemo } = usePatientActions()
  const now = useNow()

  if (!isHydrated || !patient) return <PageSkeleton />

  const requestedTab = searchParams.get("tab")
  const activeTab = PROFILE_TABS.some((tab) => tab.value === requestedTab) ? (requestedTab ?? DEFAULT_TAB) : DEFAULT_TAB
  const doctor = selectDoctorById(doctors, patient.assignedDoctorId)
  const planHistory = selectPlanHistory(plans, patient.id)

  function handleTabChange(value: string): void {
    router.replace(`${pathname}?tab=${value}`, { scroll: false })
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="space-y-1">
        <h1 className="type-title">Profil</h1>
        <p className="type-caption">Data diri, aktivitas, dan riwayat care plan kamu.</p>
      </header>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="gap-6">
        <TabsList className="h-auto w-full justify-start overflow-x-auto sm:w-fit">
          {PROFILE_TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="min-h-10 px-4">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="data" className="space-y-6">
          <section className="rounded-3xl border bg-card p-6 shadow-sm">
            <h2 className="type-heading">{patient.name}</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <ProfileFact label="Usia" value={`${selectPatientAge(patient, now)} tahun`} />
              <ProfileFact label="Nomor rekam medis" value={patient.mrn} />
              <ProfileFact label="Nomor HP" value={patient.phone} />
              <ProfileFact label="Alergi" value={patient.allergies.length > 0 ? patient.allergies.join(", ") : "Tidak ada"} />
              <ProfileFact label="Rumah sakit" value={doctor?.hospital ?? "-"} />
              <ProfileFact label="Dokter penanggung jawab" value={doctor?.name ?? "-"} />
            </dl>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" size="lg" className="h-12 flex-1" onClick={resetDemo}>
              <RotateCcw />
              Reset demo
            </Button>
            <Button variant="destructive" size="lg" className="h-12 flex-1" onClick={logout}>
              <LogOut />
              Keluar
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="aktivitas">
          <ActivitySection patientId={patient.id} activePlan={activePlan} />
        </TabsContent>

        <TabsContent value="riwayat">
          <section className="rounded-3xl border bg-card p-6 shadow-sm">
            <h2 className="type-heading">Riwayat versi care plan</h2>
            <ul className="mt-4 divide-y">
              {planHistory.map((plan) => (
                <li key={plan.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-medium">Versi {plan.version}</p>
                    <p className="type-caption">{plan.confirmedAt ? `Dikonfirmasi ${formatDate(plan.confirmedAt)}` : "Belum dikonfirmasi"}</p>
                  </div>
                  <Badge variant={plan.status === "active" ? "default" : "outline"}>{CARE_PLAN_STATUS_LABEL[plan.status]}</Badge>
                </li>
              ))}
            </ul>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}

type ProfileFactProps = {
  label: string
  value: string
}

function ProfileFact({ label, value }: ProfileFactProps) {
  return (
    <div>
      <dt className="type-overline">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  )
}
