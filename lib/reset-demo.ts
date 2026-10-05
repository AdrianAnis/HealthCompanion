import { useCarePlanStore } from "@/features/care-plan/store"
import { useCompanionStore } from "@/features/companion/store"
import { useFeedbackStore } from "@/features/feedback/store"
import { usePatientStore } from "@/features/patient/store"

export function resetAllStores(): void {
  useCarePlanStore.getState().resetDemo()
  usePatientStore.getState().resetDemo()
  useFeedbackStore.getState().resetDemo()
  useCompanionStore.getState().resetDemo()
}
