import type { PatientPlanStatus } from "@/features/care-plan/selectors"
import type { CarePlanItemKind, CarePlanStatus, DietItem } from "@/features/care-plan/types"

export const CARE_PLAN_STATUS_LABEL: Record<CarePlanStatus, string> = {
  draft: "Draft",
  active: "Aktif",
  superseded: "Digantikan",
}

export const CARE_PLAN_ITEM_KIND_LABEL: Record<CarePlanItemKind, string> = {
  medication: "Obat",
  diet: "Makanan",
  activity: "Aktivitas",
  restriction: "Pembatasan",
  followUp: "Kontrol",
}

export const DIET_RULE_LABEL: Record<DietItem["rule"], string> = {
  avoid: "Hindari",
  limit: "Batasi",
  recommend: "Dianjurkan",
}

export const CARE_PLAN_KIND_ORDER: CarePlanItemKind[] = ["medication", "diet", "activity", "restriction", "followUp"]

export const PATIENT_PLAN_STATUS_LABEL: Record<PatientPlanStatus, string> = {
  "draft-pending": "Draft menunggu konfirmasi",
  active: "Care plan aktif",
  none: "Belum ada care plan",
}
