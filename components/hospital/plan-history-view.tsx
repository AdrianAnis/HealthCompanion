"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { HospitalPageSkeleton } from "@/components/hospital/hospital-page-skeleton"
import { PageHeader } from "@/components/hospital/page-header"
import { PlanItemsList } from "@/components/hospital/plan-items-list"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CARE_PLAN_STATUS_LABEL } from "@/features/care-plan/labels"
import type { CarePlan } from "@/features/care-plan/types"
import { selectDoctorById } from "@/features/patient/selectors"
import { usePatientStore } from "@/features/patient/store"
import { usePatientRecord } from "@/features/patient/use-patient-record"
import { formatDateTime } from "@/lib/date"
import { routes } from "@/lib/routes"

type PlanHistoryViewProps = {
  patientId: string
}

export function PlanHistoryView({ patientId }: PlanHistoryViewProps) {
  const { isHydrated, patient, planHistory } = usePatientRecord(patientId)
  const doctors = usePatientStore((state) => state.doctors)
  const [viewedPlan, setViewedPlan] = useState<CarePlan | null>(null)

  if (!isHydrated) return <HospitalPageSkeleton />

  return (
    <>
      <PageHeader
        title="Riwayat care plan"
        description={patient ? `Semua versi untuk ${patient.name}. Versi lama hanya bisa dibaca.` : "Pasien tidak ditemukan."}
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href={routes.hospital.patientDetail(patientId)}>
              <ChevronLeft />
              Kembali ke pasien
            </Link>
          </Button>
        }
      />
      <div className="p-4 md:p-6">
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Versi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Dibuat oleh</TableHead>
                <TableHead>Dikonfirmasi</TableHead>
                <TableHead className="text-right">Isi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planHistory.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">v{plan.version}</TableCell>
                  <TableCell>
                    <Badge variant={plan.status === "active" ? "default" : "outline"}>{CARE_PLAN_STATUS_LABEL[plan.status]}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{selectDoctorById(doctors, plan.createdBy)?.name ?? plan.createdBy}</TableCell>
                  <TableCell>{plan.confirmedAt ? formatDateTime(plan.confirmedAt) : "-"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => setViewedPlan(plan)}>
                      Lihat
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={viewedPlan !== null} onOpenChange={(isOpen) => (isOpen ? undefined : setViewedPlan(null))}>
        <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Care plan v{viewedPlan?.version}</DialogTitle>
            <DialogDescription>{viewedPlan?.sourceText}</DialogDescription>
          </DialogHeader>
          {viewedPlan ? <PlanItemsList plan={viewedPlan} /> : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
