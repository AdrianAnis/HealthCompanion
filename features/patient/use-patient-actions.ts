"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { useAuthStore } from "@/features/auth/store"
import { resetAllStores } from "@/lib/reset-demo"
import { routes } from "@/lib/routes"

export type PatientActions = {
  logout: () => void
  resetDemo: () => void
}

export function usePatientActions(): PatientActions {
  const router = useRouter()
  const logoutPatient = useAuthStore((state) => state.logout)

  function logout(): void {
    logoutPatient("patient")
    router.replace(routes.patient.landing)
  }

  function resetDemo(): void {
    resetAllStores()
    toast.success("Data demo dikembalikan ke kondisi awal")
  }

  return { logout, resetDemo }
}
