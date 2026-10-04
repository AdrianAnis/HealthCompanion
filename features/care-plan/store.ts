import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { CarePlan } from "@/features/care-plan/types"
import { mockCarePlans } from "@/mocks/care-plans"

export const CARE_PLAN_STORAGE_KEY = "hc:care-plan"

type CarePlanState = {
  plans: CarePlan[]
  confirmPlan: (planId: string) => void
  resetDemo: () => void
}

export function confirmPlanInList(plans: CarePlan[], planId: string, confirmedAt: string): CarePlan[] {
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
    (set) => ({
      plans: mockCarePlans,
      confirmPlan: (planId) =>
        set((state) => ({ plans: confirmPlanInList(state.plans, planId, new Date().toISOString()) })),
      resetDemo: () => set({ plans: mockCarePlans }),
    }),
    {
      name: CARE_PLAN_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ plans: state.plans }),
      skipHydration: true,
    },
  ),
)
