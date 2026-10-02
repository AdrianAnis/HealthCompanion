import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { getNextVersion } from "@/features/care-plan/selectors"
import type { CarePlan, CarePlanItem } from "@/features/care-plan/types"
import { mockCarePlans } from "@/mocks/care-plans"

export const CARE_PLAN_STORAGE_KEY = "hc-care-plans"

type CreateDraftInput = {
  patientId: string
  createdBy: string
  items: CarePlanItem[]
  summary?: string
}

type CarePlanState = {
  plans: CarePlan[]
  createDraft: (input: CreateDraftInput) => string
  updateDraft: (planId: string, changes: Pick<CarePlan, "items"> & Partial<Pick<CarePlan, "summary">>) => void
  discardDraft: (planId: string) => void
  confirmPlan: (planId: string) => void
  reset: () => void
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
    (set, get) => ({
      plans: mockCarePlans,
      createDraft: ({ patientId, createdBy, items, summary }) => {
        const existing = get().plans.find((plan) => plan.patientId === patientId && plan.status === "draft")
        if (existing) {
          get().updateDraft(existing.id, { items, summary })
          return existing.id
        }

        const version = getNextVersion(get().plans, patientId)
        const draft: CarePlan = {
          id: `cp-${patientId}-v${version}-${Date.now()}`,
          patientId,
          version,
          status: "draft",
          createdBy,
          createdAt: new Date().toISOString(),
          confirmedAt: null,
          summary,
          items,
        }
        set((state) => ({ plans: [...state.plans, draft] }))
        return draft.id
      },
      updateDraft: (planId, changes) =>
        set((state) => ({
          plans: state.plans.map((plan) =>
            plan.id === planId && plan.status === "draft" ? { ...plan, ...changes } : plan,
          ),
        })),
      discardDraft: (planId) =>
        set((state) => ({
          plans: state.plans.filter((plan) => !(plan.id === planId && plan.status === "draft")),
        })),
      confirmPlan: (planId) =>
        set((state) => ({ plans: confirmPlanInList(state.plans, planId, new Date().toISOString()) })),
      reset: () => set({ plans: mockCarePlans }),
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
