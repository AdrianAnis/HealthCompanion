import type { CarePlan } from "@/features/care-plan/types"
import { formatDateTime } from "@/lib/date"

type DashboardRecentCardProps = {
  plans: CarePlan[]
  patientNames: Record<string, string>
}

export function DashboardRecentCard({ plans, patientNames }: DashboardRecentCardProps) {
  return (
    <section className="rounded-2xl border bg-card">
      <header className="border-b px-5 py-4">
        <h2 className="type-subheading">Perubahan care plan terbaru</h2>
        <p className="type-caption">Versi yang baru dikonfirmasi.</p>
      </header>
      <ol className="space-y-5 px-5 py-5">
        {plans.map((plan) => (
          <li key={plan.id} className="relative pl-5">
            <span className="absolute top-1.5 left-0 size-2 rounded-full bg-primary" aria-hidden="true" />
            <p className="text-sm font-medium">
              {patientNames[plan.patientId] ?? plan.patientId} <span className="font-normal text-muted-foreground">· Versi {plan.version}</span>
            </p>
            <p className="type-caption">{plan.confirmedAt ? formatDateTime(plan.confirmedAt) : ""}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
