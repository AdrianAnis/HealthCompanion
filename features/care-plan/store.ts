import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { selectDraftPlan, selectPatientPlans } from "@/features/care-plan/selectors"
import type { CarePlan, CarePlanDraftInput } from "@/features/care-plan/types"
import { mockAcknowledgedPlanIds, mockCarePlans } from "@/mocks/care-plans"

const CARE_PLAN_STORAGE_KEY = "hc:care-plan"

type CarePlanState = {
  plans: CarePlan[]
  acknowledgedPlanIds: Record<string, string>
  saveDraft: (input: CarePlanDraftInput) => string
  confirmPlan: (planId: string) => void
  acknowledgePlan: (patientId: string, planId: string) => void
  resetDemo: () => void
}

function confirmPlanInList(plans: CarePlan[], planId: string, confirmedAt: string): CarePlan[] {
  const target = plans.find((plan) => plan.id === planId)
  if (!target || target.status !== "draft") return plans

  return plans.map((plan) => {
    if (plan.id === planId) return { ...plan, status: "active", confirmedAt }
    if (plan.patientId === target.patientId && plan.status === "active") return { ...plan, status: "superseded" }
    return plan
  })
}

export const useCarePlanStore = create<CarePlanState>()(
  persist(
    (set, get) => ({
      plans: mockCarePlans,
      acknowledgedPlanIds: mockAcknowledgedPlanIds,
      saveDraft: (input) => {
        const existingDraft = selectDraftPlan(get().plans, input.patientId)
        if (existingDraft) {
          const updatedDraft: CarePlan = { ...existingDraft, ...input }
          set((state) => ({ plans: state.plans.map((plan) => (plan.id === existingDraft.id ? updatedDraft : plan)) }))
          return existingDraft.id
        }
        const latestVersion = Math.max(0, ...selectPatientPlans(get().plans, input.patientId).map((plan) => plan.version))
        const newDraft: CarePlan = {
          ...input,
          id: `cp-${input.patientId}-v${latestVersion + 1}`,
          version: latestVersion + 1,
          status: "draft",
          createdAt: new Date().toISOString(),
          confirmedAt: null,
        }
        set((state) => ({ plans: [...state.plans, newDraft] }))
        return newDraft.id
      },
      confirmPlan: (planId) =>
        set((state) => ({ plans: confirmPlanInList(state.plans, planId, new Date().toISOString()) })),
      acknowledgePlan: (patientId, planId) =>
        set((state) => ({ acknowledgedPlanIds: { ...state.acknowledgedPlanIds, [patientId]: planId } })),
      resetDemo: () => set({ plans: mockCarePlans, acknowledgedPlanIds: mockAcknowledgedPlanIds }),
    }),
    {
      name: CARE_PLAN_STORAGE_KEY,
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ plans: state.plans, acknowledgedPlanIds: state.acknowledgedPlanIds }),
      skipHydration: true,
    },
  ),
)
