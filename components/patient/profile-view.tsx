"use client"

import { LogOut, RotateCcw } from "lucide-react"

import { PageSkeleton } from "@/components/patient/page-skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CARE_PLAN_STATUS_LABEL } from "@/features/care-plan/labels"
import { selectPlanHistory } from "@/features/care-plan/selectors"
import { useCarePlanStore } from "@/features/care-plan/store"
import { selectDoctorById, selectPatientAge } from "@/features/patient/selectors"
import { usePatientStore } from "@/features/patient/store"
import { usePatientActions } from "@/features/patient/use-patient-actions"
import { usePatientContext } from "@/features/patient/use-patient-context"
import { formatDate } from "@/lib/date"
import { useNow } from "@/lib/use-now"

export function ProfileView() {
  const { isHydrated, patient } = usePatientContext()
  const doctors = usePatientStore((state) => state.doctors)
  const plans = useCarePlanStore((state) => state.plans)
  const { logout, resetDemo } = usePatientActions()
  const now = useNow()

  if (!isHydrated || !patient) return <PageSkeleton />

  const doctor = selectDoctorById(doctors, patient.assignedDoctorId)
  const planHistory = selectPlanHistory(plans, patient.id)

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Profil</h1>
        <p className="text-muted-foreground">Data dasar dan rumah sakit yang terhubung.</p>
      </header>

      <section className="rounded-3xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-bold">{patient.name}</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <ProfileFact label="Usia" value={`${selectPatientAge(patient, now)} tahun`} />
          <ProfileFact label="Nomor rekam medis" value={patient.mrn} />
          <ProfileFact label="Nomor HP" value={patient.phone} />
          <ProfileFact label="Alergi" value={patient.allergies.length > 0 ? patient.allergies.join(", ") : "Tidak ada"} />
          <ProfileFact label="Rumah sakit" value={doctor?.hospital ?? "-"} />
          <ProfileFact label="Dokter penanggung jawab" value={doctor?.name ?? "-"} />
        </dl>
      </section>

      <section className="rounded-3xl border bg-card p-6 shadow-sm">
        <h2 className="font-bold">Riwayat versi care plan</h2>
        <ul className="mt-4 divide-y">
          {planHistory.map((plan) => (
            <li key={plan.id} className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="font-semibold">Versi {plan.version}</p>
                <p className="text-sm text-muted-foreground">
                  {plan.confirmedAt ? `Dikonfirmasi ${formatDate(plan.confirmedAt)}` : "Belum dikonfirmasi"}
                </p>
              </div>
              <Badge variant={plan.status === "active" ? "default" : "outline"}>{CARE_PLAN_STATUS_LABEL[plan.status]}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" size="lg" className="h-12 flex-1 text-base" onClick={resetDemo}>
          <RotateCcw />
          Reset demo
        </Button>
        <Button variant="destructive" size="lg" className="h-12 flex-1 text-base" onClick={logout}>
          <LogOut />
          Keluar
        </Button>
      </div>
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
      <dt className="text-xs font-bold tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-1 font-semibold">{value}</dd>
    </div>
  )
}
