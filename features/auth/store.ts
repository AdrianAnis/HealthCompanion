import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { DEMO_OTP, mockDoctors, mockPatients } from "@/mocks/patients"

export const AUTH_STORAGE_KEY = "hc-auth"

export type Surface = "doctor" | "patient"

export type DoctorSession = {
  doctorId: string
  signedInAt: string
}

export type PatientSession = {
  patientId: string
  signedInAt: string
}

type AuthState = {
  doctor: DoctorSession | null
  patient: PatientSession | null
  pendingPhone: string | null
  loginDoctor: (email: string) => boolean
  requestOtp: (phone: string) => boolean
  verifyOtp: (otp: string) => boolean
  logout: (surface: Surface) => void
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "").replace(/^62/, "0")
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      doctor: null,
      patient: null,
      pendingPhone: null,
      loginDoctor: (email) => {
        const doctor = mockDoctors.find((item) => item.email.toLowerCase() === email.trim().toLowerCase())
        if (!doctor) return false
        set({ doctor: { doctorId: doctor.id, signedInAt: new Date().toISOString() } })
        return true
      },
      requestOtp: (phone) => {
        const normalized = normalizePhone(phone)
        const exists = mockPatients.some((patient) => patient.phone === normalized)
        set({ pendingPhone: exists ? normalized : null })
        return exists
      },
      verifyOtp: (otp) => {
        const phone = get().pendingPhone
        const patient = mockPatients.find((item) => item.phone === phone)
        if (!patient || otp !== DEMO_OTP) return false
        set({
          patient: { patientId: patient.id, signedInAt: new Date().toISOString() },
          pendingPhone: null,
        })
        return true
      },
      logout: (surface) => set(surface === "doctor" ? { doctor: null } : { patient: null, pendingPhone: null }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ doctor: state.doctor, patient: state.patient, pendingPhone: state.pendingPhone }),
      skipHydration: true,
    },
  ),
)
