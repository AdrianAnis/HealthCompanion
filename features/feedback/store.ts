import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { FeedbackEntry, ReminderCompletion } from "@/features/feedback/types"

export const FEEDBACK_STORAGE_KEY = "hc-feedback"

type FeedbackState = {
  completions: Record<string, ReminderCompletion>
  entries: FeedbackEntry[]
  toggleCompletion: (key: string) => void
  addEntry: (entry: Omit<FeedbackEntry, "id" | "createdAt">) => void
  reset: () => void
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set) => ({
      completions: {},
      entries: [],
      toggleCompletion: (key) =>
        set((state) => {
          const completions = { ...state.completions }
          if (completions[key]) delete completions[key]
          else completions[key] = { key, completedAt: new Date().toISOString() }
          return { completions }
        }),
      addEntry: (entry) =>
        set((state) => ({
          entries: [
            ...state.entries,
            { ...entry, id: `fb-${entry.patientId}-${Date.now()}`, createdAt: new Date().toISOString() },
          ],
        })),
      reset: () => set({ completions: {}, entries: [] }),
    }),
    {
      name: FEEDBACK_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ completions: state.completions, entries: state.entries }),
      skipHydration: true,
    },
  ),
)
