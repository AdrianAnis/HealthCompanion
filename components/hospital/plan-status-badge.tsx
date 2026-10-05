import { Badge } from "@/components/ui/badge"
import { PATIENT_PLAN_STATUS_LABEL } from "@/features/care-plan/labels"
import type { PatientPlanStatus } from "@/features/care-plan/selectors"

type PlanStatusBadgeProps = {
  status: PatientPlanStatus
}

const BADGE_VARIANT: Record<PatientPlanStatus, "default" | "secondary" | "outline"> = {
  "draft-pending": "secondary",
  active: "default",
  none: "outline",
}

export function PlanStatusBadge({ status }: PlanStatusBadgeProps) {
  return <Badge variant={BADGE_VARIANT[status]}>{PATIENT_PLAN_STATUS_LABEL[status]}</Badge>
}
