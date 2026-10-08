"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { BrandLogo } from "@/components/brand-logo"
import { CompanionChoice } from "@/components/patient/companion-choice"
import { PatientSessionGate } from "@/components/patient/patient-session-gate"
import { Button } from "@/components/ui/button"
import { usePetStore } from "@/features/pet/store"
import { routes } from "@/lib/routes"

export function ChooseCompanionView() {
  const router = useRouter()
  const savedKind = usePetStore((state) => state.kind)
  const setKind = usePetStore((state) => state.setKind)
  const [selectedKind, setSelectedKind] = useState(savedKind)

  function handleContinue(): void {
    setKind(selectedKind)
    router.replace(routes.patient.today)
  }

  function handleSkip(): void {
    router.replace(routes.patient.today)
  }

  return (
    <PatientSessionGate>
      <div className="flex min-h-dvh flex-col items-center bg-card px-6 py-8">
        <BrandLogo />
        <div className="flex w-full max-w-md flex-1 flex-col justify-center gap-8 py-8">
          <div className="space-y-2 text-center">
            <h1 className="type-title">Pilih temanmu</h1>
            <p className="type-caption">Dia akan menemani jadwal pemulihanmu setiap hari. Bisa diganti kapan saja di Profil.</p>
          </div>
          <CompanionChoice value={selectedKind} onChange={setSelectedKind} />
          <div className="flex flex-col gap-2">
            <Button className="h-14 w-full rounded-full type-heading shadow-xl shadow-primary/25" onClick={handleContinue}>
              Lanjut
            </Button>
            <Button variant="ghost" className="h-12 w-full rounded-full text-muted-foreground" onClick={handleSkip}>
              Pilih nanti
            </Button>
          </div>
        </div>
      </div>
    </PatientSessionGate>
  )
}
