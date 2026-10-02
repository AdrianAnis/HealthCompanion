"use client"

import { CheckCircle2, RotateCcw } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getActivePlan, getDraftPlan } from "@/features/care-plan/selectors"
import { useCarePlanStore } from "@/features/care-plan/store"
import { formatDateTime } from "@/lib/date"
import { useStoresHydrated } from "@/lib/storage-sync"

export function DraftConfirmCard({ patientId }: { patientId: string }) {
  const hydrated = useStoresHydrated()
  const plans = useCarePlanStore((state) => state.plans)
  const confirmPlan = useCarePlanStore((state) => state.confirmPlan)
  const reset = useCarePlanStore((state) => state.reset)
  const active = getActivePlan(plans, patientId)
  const draft = getDraftPlan(plans, patientId)

  if (!hydrated) return <Card className="h-40 animate-pulse" />

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Status rencana perawatan
          {draft ? <Badge variant="outline">Draft v{draft.version}</Badge> : null}
          {active ? <Badge>Aktif v{active.version}</Badge> : null}
        </CardTitle>
        <CardDescription>
          {draft
            ? `${draft.items.length} item menunggu konfirmasi. ${draft.summary ?? ""}`
            : active?.confirmedAt
              ? `Tidak ada draft. Rencana aktif dikonfirmasi ${formatDateTime(active.confirmedAt)}.`
              : "Belum ada rencana perawatan."}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        TODO: builder item, draft AI, dan tampilan review perbandingan dengan rencana aktif.
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          disabled={!draft}
          onClick={() => {
            if (!draft) return
            confirmPlan(draft.id)
            toast.success(`Rencana v${draft.version} dikonfirmasi dan dikirim ke pasien`)
          }}
        >
          <CheckCircle2 />
          Konfirmasi draft
        </Button>
        <Button variant="ghost" onClick={() => reset()}>
          <RotateCcw />
          Reset data demo
        </Button>
      </CardFooter>
    </Card>
  )
}
