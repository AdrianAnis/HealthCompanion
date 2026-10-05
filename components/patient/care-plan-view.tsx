"use client"

import Link from "next/link"
import { ChevronRight, ClipboardX } from "lucide-react"

import { EmptyState } from "@/components/patient/empty-state"
import { PageSkeleton } from "@/components/patient/page-skeleton"
import { PlanUpdateBanner } from "@/components/patient/plan-update-banner"
import { getItemSummary, getItemTitle } from "@/features/care-plan/describe"
import { CARE_PLAN_ITEM_KIND_LABEL, CARE_PLAN_KIND_ORDER } from "@/features/care-plan/labels"
import { selectItemsByKind } from "@/features/care-plan/selectors"
import { usePatientContext } from "@/features/patient/use-patient-context"
import { formatDate, formatDateTime } from "@/lib/date"
import { routes } from "@/lib/routes"

export function CarePlanView() {
  const { isHydrated, patient, activePlan, activeDoctor } = usePatientContext()

  if (!isHydrated || !patient) return <PageSkeleton />

  if (!activePlan) {
    return (
      <EmptyState
        icon={ClipboardX}
        title="Belum ada care plan aktif"
        description="Care plan akan muncul di sini setelah dokter mengonfirmasinya."
      />
    )
  }

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Care plan saya</h1>
        <p className="text-muted-foreground">Instruksi aktif dari dokter kamu, dikelompokkan per kategori.</p>
      </header>
      <PlanUpdateBanner />

      <section className="grid gap-4 rounded-3xl border bg-card p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        <PlanFact label="Dokter" value={activeDoctor?.name ?? "-"} />
        <PlanFact label="Versi" value={`Versi ${activePlan.version}`} />
        <PlanFact label="Berlaku sejak" value={activePlan.confirmedAt ? formatDate(activePlan.confirmedAt) : "-"} />
        <PlanFact label="Terakhir diperbarui" value={activePlan.confirmedAt ? formatDateTime(activePlan.confirmedAt) : "-"} />
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {CARE_PLAN_KIND_ORDER.map((kind) => {
          const items = selectItemsByKind(activePlan, kind)
          if (items.length === 0) return null
          return (
            <section key={kind} className="space-y-3">
              <h2 className="text-lg font-bold">{CARE_PLAN_ITEM_KIND_LABEL[kind]}</h2>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={routes.patient.carePlanItem(item.id)}
                      className="flex items-center gap-3 rounded-2xl border bg-card p-4 transition-colors hover:bg-muted"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-bold">{getItemTitle(item)}</p>
                        <p className="text-sm text-muted-foreground">{getItemSummary(item)}</p>
                      </div>
                      <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}

type PlanFactProps = {
  label: string
  value: string
}

function PlanFact({ label, value }: PlanFactProps) {
  return (
    <div>
      <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  )
}
