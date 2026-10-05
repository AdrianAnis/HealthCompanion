"use client"

import Link from "next/link"
import { ChevronLeft, FileQuestion, MessageCircleHeart } from "lucide-react"

import { EmptyState } from "@/components/patient/empty-state"
import { PageSkeleton } from "@/components/patient/page-skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getItemDetailRows, getItemTitle } from "@/features/care-plan/describe"
import { CARE_PLAN_ITEM_KIND_LABEL } from "@/features/care-plan/labels"
import { selectPlanItem } from "@/features/care-plan/selectors"
import { usePatientContext } from "@/features/patient/use-patient-context"
import { routes } from "@/lib/routes"

type CarePlanItemViewProps = {
  itemId: string
}

export function CarePlanItemView({ itemId }: CarePlanItemViewProps) {
  const { isHydrated, patient, activePlan } = usePatientContext()

  if (!isHydrated || !patient) return <PageSkeleton />

  const item = selectPlanItem(activePlan, itemId)

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href={routes.patient.carePlan} className="inline-flex items-center gap-1 font-semibold text-primary">
        <ChevronLeft className="size-5" />
        Care plan saya
      </Link>

      {!activePlan || !item ? (
        <EmptyState
          icon={FileQuestion}
          title="Instruksi tidak ditemukan"
          description="Instruksi ini tidak ada di care plan aktif kamu. Mungkin dokter sudah memperbaruinya."
        />
      ) : (
        <>
          <header className="space-y-2">
            <Badge variant="secondary">{CARE_PLAN_ITEM_KIND_LABEL[item.kind]}</Badge>
            <h1 className="type-title">{getItemTitle(item)}</h1>
          </header>

          <dl className="divide-y rounded-3xl border bg-card px-6 shadow-sm">
            {getItemDetailRows(item).map((row) => (
              <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-3">
                <dt className="font-medium text-muted-foreground">{row.label}</dt>
                <dd className="font-medium sm:col-span-2">{row.value}</dd>
              </div>
            ))}
          </dl>

          <section className="rounded-3xl border bg-card p-6 shadow-sm">
            <h2 className="type-subheading">Catatan asli dokter</h2>
            <p className="mt-2 text-muted-foreground">{activePlan.sourceText}</p>
          </section>

          <Button asChild size="lg" className="h-12 w-full text-base">
            <Link href={routes.patient.companion}>
              <MessageCircleHeart />
              Tanya Companion soal ini
            </Link>
          </Button>
        </>
      )}
    </div>
  )
}
