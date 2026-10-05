"use client"

import Link from "next/link"
import { FilePenLine, LineChart, UserX } from "lucide-react"

import { HospitalPageSkeleton } from "@/components/hospital/hospital-page-skeleton"
import { PageHeader } from "@/components/hospital/page-header"
import { PatientHistoryTimeline } from "@/components/hospital/patient-history-timeline"
import { PlanItemsList } from "@/components/hospital/plan-items-list"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useFeedbackStore } from "@/features/feedback/store"
import { selectPatientAge } from "@/features/patient/selectors"
import { usePatientRecord } from "@/features/patient/use-patient-record"
import { selectAdherenceByDay, selectAdherenceRatio } from "@/features/reminder/selectors"
import { formatDate } from "@/lib/date"
import { routes } from "@/lib/routes"
import { useNow } from "@/lib/use-now"

type PatientDetailViewProps = {
  patientId: string
}

export function PatientDetailView({ patientId }: PatientDetailViewProps) {
  const { isHydrated, patient, doctor, activePlan, draftPlan, healthHistory } = usePatientRecord(patientId)
  const completions = useFeedbackStore((state) => state.completions)
  const now = useNow()

  if (!isHydrated) return <HospitalPageSkeleton />

  if (!patient) {
    return (
      <>
        <PageHeader title="Pasien tidak ditemukan" />
        <div className="flex flex-col items-center gap-3 p-10 text-center text-muted-foreground">
          <UserX className="size-8" />
          <p>Pasien dengan ID ini tidak ada di daftar Anda.</p>
          <Button asChild variant="outline">
            <Link href={routes.hospital.patientList}>Kembali ke daftar pasien</Link>
          </Button>
        </div>
      </>
    )
  }

  const adherenceRatio = selectAdherenceRatio(selectAdherenceByDay(activePlan, completions, now))

  return (
    <>
      <PageHeader
        title={patient.name}
        description={`${patient.mrn} · ${patient.primaryDiagnosis}`}
        actions={
          <>
            <Button asChild variant="outline" size="sm">
              <Link href={routes.hospital.monitoring(patient.id)}>
                <LineChart />
                Monitoring
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={routes.hospital.carePlanHistory(patient.id)}>Riwayat versi</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={routes.hospital.carePlanNew(patient.id)}>
                <FilePenLine />
                {draftPlan ? "Tinjau draft" : "Revisi care plan"}
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 p-4 md:p-6 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Identitas</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <Fact label="Usia" value={`${selectPatientAge(patient, now)} tahun`} />
                <Fact label="Jenis kelamin" value={patient.gender === "male" ? "Laki-laki" : "Perempuan"} />
                <Fact label="Nomor HP" value={patient.phone} />
                <Fact label="Dokter" value={doctor?.name ?? "-"} />
                <Fact label="Kondisi" value={patient.conditions.join(", ")} />
                <Fact label="Alergi" value={patient.allergies.length > 0 ? patient.allergies.join(", ") : "Tidak ada"} />
              </dl>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Riwayat kesehatan</CardTitle>
            </CardHeader>
            <CardContent>
              <PatientHistoryTimeline entries={healthHistory} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 xl:col-span-2">
          {draftPlan ? (
            <Card className="border-warning/50 bg-warning/10">
              <CardHeader>
                <CardTitle>Draft v{draftPlan.version} menunggu konfirmasi</CardTitle>
                <CardDescription>
                  Dibuat {formatDate(draftPlan.createdAt)}. Pasien belum menerima perubahan ini.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild size="sm">
                  <Link href={routes.hospital.carePlanNew(patient.id)}>Tinjau dan konfirmasi</Link>
                </Button>
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Care plan aktif
                {activePlan ? <Badge>v{activePlan.version}</Badge> : null}
              </CardTitle>
              <CardDescription>
                {activePlan?.confirmedAt ? `Dikonfirmasi ${formatDate(activePlan.confirmedAt)}` : "Belum ada care plan aktif."}
              </CardDescription>
            </CardHeader>
            <CardContent>{activePlan ? <PlanItemsList plan={activePlan} /> : null}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Jadwal yang ditandai pasien (7 hari)</CardTitle>
              <CardDescription>Data perilaku, bukan indikator kesembuhan.</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">
              {adherenceRatio === null ? "-" : `${Math.round(adherenceRatio * 100)}%`}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

type FactProps = {
  label: string
  value: string
}

function Fact({ label, value }: FactProps) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}
