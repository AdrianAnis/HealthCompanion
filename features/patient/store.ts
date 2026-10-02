import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { HealthHistoryEntry, Patient } from "@/features/patient/types"
import { mockHistory } from "@/mocks/history"
import { mockPatients } from "@/mocks/patients"

export const PATIENT_STORAGE_KEY = "hc-patients"

type PatientState = {
  patients: Patient[]
  history: HealthHistoryEntry[]
  addHistoryEntry: (entry: Omit<HealthHistoryEntry, "id">) => void
  reset: () => void
}

export const usePatientStore = create<PatientState>()(
  persist(
    (set) => ({
      patients: mockPatients,
      history: mockHistory,
      addHistoryEntry: (entry) =>
        set((state) => ({
          history: [...state.history, { ...entry, id: `h-${entry.patientId}-${Date.now()}` }],
        })),
      reset: () => set({ patients: mockPatients, history: mockHistory }),
    }),
    {
      name: PATIENT_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ patients: state.patients, history: state.history }),
      skipHydration: true,
    },
  ),
)

export function selectPatient(patientId: string) {
  return (state: PatientState) => state.patients.find((patient) => patient.id === patientId)
}

export function getPatientHistory(history: HealthHistoryEntry[], patientId: string): HealthHistoryEntry[] {
  return history
    .filter((entry) => entry.patientId === patientId)
    .sort((a, b) => b.date.localeCompare(a.date))
}
