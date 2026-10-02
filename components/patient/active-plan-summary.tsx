"use client"

import { BellRing, ClipboardCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/features/auth/store"
import { getActivePlan } from "@/features/care-plan/selectors"
import { useCarePlanStore } from "@/features/care-plan/store"
import { getTodayReminders } from "@/features/reminder/selectors"
import { formatDateTime } from "@/lib/date"
import { useStoresHydrated } from "@/lib/storage-sync"
import { DEMO_PATIENT_ID } from "@/mocks/patients"

export function ActivePlanSummary() {
  const hydrated = useStoresHydrated()
  const patientId = useAuthStore((state) => state.patient?.patientId ?? DEMO_PATIENT_ID)
  const plans = useCarePlanStore((state) => state.plans)
  const active = getActivePlan(plans, patientId)

  if (!hydrated) return <Card className="h-36 animate-pulse" />

  if (!active) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Belum ada rencana aktif</CardTitle>
          <CardDescription>Rencana akan muncul di sini setelah dokter mengonfirmasinya.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const reminders = getTodayReminders(active, new Date())

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ClipboardCheck className="size-5 text-primary" />
          Rencana perawatan
          <Badge className="ml-auto">Versi {active.version}</Badge>
        </CardTitle>
        <CardDescription>
          {active.confirmedAt ? `Diperbarui dokter ${formatDateTime(active.confirmedAt)}` : null}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-2 text-sm">
        <BellRing className="size-4 text-primary" />
        {reminders.length} pengingat hari ini · {active.items.length} item rencana
      </CardContent>
    </Card>
  )
}
