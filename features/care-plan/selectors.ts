import type { CarePlan, CarePlanItem, CarePlanItemKind, CarePlanItemOf } from "@/features/care-plan/types"

export function getPatientPlans(plans: CarePlan[], patientId: string): CarePlan[] {
  return plans.filter((plan) => plan.patientId === patientId)
}

export function getActivePlan(plans: CarePlan[], patientId: string): CarePlan | undefined {
  return plans.find((plan) => plan.patientId === patientId && plan.status === "active")
}

export function getDraftPlan(plans: CarePlan[], patientId: string): CarePlan | undefined {
  return plans.find((plan) => plan.patientId === patientId && plan.status === "draft")
}

export function getPlanHistory(plans: CarePlan[], patientId: string): CarePlan[] {
  return getPatientPlans(plans, patientId)
    .filter((plan) => plan.status !== "draft")
    .sort((a, b) => b.version - a.version)
}

export function getNextVersion(plans: CarePlan[], patientId: string): number {
  return getPatientPlans(plans, patientId).reduce((max, plan) => Math.max(max, plan.version), 0) + 1
}

export function getItemsByKind<K extends CarePlanItemKind>(
  plan: CarePlan | undefined,
  kind: K,
): CarePlanItemOf<K>[] {
  if (!plan) return []
  return plan.items.filter((item): item is CarePlanItemOf<K> => item.kind === kind)
}

export function findPlanItem(plan: CarePlan | undefined, itemId: string): CarePlanItem | undefined {
  return plan?.items.find((item) => item.id === itemId)
}

export function getNextFollowUp(plan: CarePlan | undefined, todayKey: string) {
  return getItemsByKind(plan, "followUp")
    .filter((item) => item.date >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date))[0]
}
