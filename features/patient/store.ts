import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { Doctor, HealthHistoryEntry, Patient } from "@/features/patient/types"
import { mockHistory } from "@/mocks/history"
import { mockDoctors, mockPatients } from "@/mocks/patients"

const PATIENT_STORAGE_KEY = "hc:patient"

type PatientState = {
  doctors: Doctor[]
  patients: Patient[]
  history: HealthHistoryEntry[]
  resetDemo: () => void
}

export const usePatientStore = create<PatientState>()(
  persist(
    (set) => ({
      doctors: mockDoctors,
      patients: mockPatients,
      history: mockHistory,
      resetDemo: () => set({ doctors: mockDoctors, patients: mockPatients, history: mockHistory }),
    }),
    {
      name: PATIENT_STORAGE_KEY,
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ doctors: state.doctors, patients: state.patients, history: state.history }),
      skipHydration: true,
    },
  ),
)
