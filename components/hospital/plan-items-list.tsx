import { getItemSummary, getItemTitle } from "@/features/care-plan/describe"
import { CARE_PLAN_ITEM_KIND_LABEL, CARE_PLAN_KIND_ORDER } from "@/features/care-plan/labels"
import { selectItemsByKind } from "@/features/care-plan/selectors"
import type { CarePlan } from "@/features/care-plan/types"

type PlanItemsListProps = {
  plan: CarePlan
}

export function PlanItemsList({ plan }: PlanItemsListProps) {
  return (
    <div className="space-y-4">
      {CARE_PLAN_KIND_ORDER.map((kind) => {
        const items = selectItemsByKind(plan, kind)
        if (items.length === 0) return null
        return (
          <section key={kind}>
            <h3 className="mb-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {CARE_PLAN_ITEM_KIND_LABEL[kind]}
            </h3>
            <ul className="divide-y rounded-md border">
              {items.map((item) => (
                <li key={item.id} className="px-3 py-2">
                  <p className="text-sm font-medium">{getItemTitle(item)}</p>
                  <p className="text-sm text-muted-foreground">{getItemSummary(item)}</p>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
