import { Badge } from "@/components/ui/badge"
import { CARE_PLAN_STATUS_LABEL } from "@/features/care-plan/labels"
import type { CarePlan } from "@/features/care-plan/types"
import { formatDate } from "@/lib/date"

type ProfileHistoryPanelProps = {
  plans: CarePlan[]
}

export function ProfileHistoryPanel({ plans }: ProfileHistoryPanelProps) {
  if (plans.length === 0) return <p className="type-caption">Belum ada riwayat care plan.</p>

  return (
    <ul className="divide-y">
      {plans.map((plan) => (
        <li key={plan.id} className="flex items-center justify-between gap-3 py-4 first:pt-0">
          <div>
            <p className="font-medium">Versi {plan.version}</p>
            <p className="type-caption">{plan.confirmedAt ? `Dikonfirmasi ${formatDate(plan.confirmedAt)}` : "Belum dikonfirmasi"}</p>
          </div>
          <Badge variant={plan.status === "active" ? "default" : "outline"}>{CARE_PLAN_STATUS_LABEL[plan.status]}</Badge>
        </li>
      ))}
    </ul>
  )
}
