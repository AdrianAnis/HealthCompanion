"use client"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"

import { HospitalPageSkeleton } from "@/components/hospital/hospital-page-skeleton"
import { PageHeader } from "@/components/hospital/page-header"
import { PlanStatusBadge } from "@/components/hospital/plan-status-badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PATIENT_PLAN_STATUS_LABEL } from "@/features/care-plan/labels"
import { selectActivePlan, selectPatientPlanStatus, type PatientPlanStatus } from "@/features/care-plan/selectors"
import { useCarePlanStore } from "@/features/care-plan/store"
import { useFeedbackStore } from "@/features/feedback/store"
import { selectPatientAge } from "@/features/patient/selectors"
import { usePatientStore } from "@/features/patient/store"
import { selectAdherenceByDay, selectAdherenceRatio } from "@/features/reminder/selectors"
import { routes } from "@/lib/routes"
import { useHydrated } from "@/lib/use-hydrated"
import { useNow } from "@/lib/use-now"

type StatusFilter = PatientPlanStatus | "all"

const FILTER_OPTIONS = Object.entries(PATIENT_PLAN_STATUS_LABEL) as [PatientPlanStatus, string][]

export function PatientListView() {
  const isHydrated = useHydrated()
  const patients = usePatientStore((state) => state.patients)
  const plans = useCarePlanStore((state) => state.plans)
  const completions = useFeedbackStore((state) => state.completions)
  const now = useNow()
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

  if (!isHydrated) return <HospitalPageSkeleton />

  const normalizedQuery = query.trim().toLowerCase()
  const visiblePatients = patients.filter((patient) => {
    const matchesQuery = patient.name.toLowerCase().includes(normalizedQuery) || patient.mrn.toLowerCase().includes(normalizedQuery)
    const matchesStatus = statusFilter === "all" || selectPatientPlanStatus(plans, patient.id) === statusFilter
    return matchesQuery && matchesStatus
  })

  return (
    <>
      <PageHeader title="Pasien" description="Daftar pasien yang Anda tangani." />
      <div className="space-y-4 p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Label htmlFor="patient-search" className="sr-only">
              Cari pasien
            </Label>
            <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
            <Input id="patient-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama atau nomor rekam medis" className="pl-9" />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
            <SelectTrigger aria-label="Filter status care plan" className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua status</SelectItem>
              {FILTER_OPTIONS.map(([status, label]) => (
                <SelectItem key={status} value={status}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pasien</TableHead>
                <TableHead className="hidden md:table-cell">Diagnosis</TableHead>
                <TableHead>Status care plan</TableHead>
                <TableHead className="hidden sm:table-cell">Jadwal ditandai (7 hari)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visiblePatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    Tidak ada pasien yang cocok.
                  </TableCell>
                </TableRow>
              ) : (
                visiblePatients.map((patient) => {
                  const ratio = selectAdherenceRatio(selectAdherenceByDay(selectActivePlan(plans, patient.id), completions, now))
                  return (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <Link href={routes.hospital.patientDetail(patient.id)} className="font-medium text-primary hover:underline">
                          {patient.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {patient.mrn} · {selectPatientAge(patient, now)} th
                        </p>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{patient.primaryDiagnosis}</TableCell>
                      <TableCell>
                        <PlanStatusBadge status={selectPatientPlanStatus(plans, patient.id)} />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{ratio === null ? "-" : `${Math.round(ratio * 100)}%`}</TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
