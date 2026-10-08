"use client"

import { CompanionChoice } from "@/components/patient/companion-choice"
import { usePetStore } from "@/features/pet/store"

export function ProfileCompanionPanel() {
  const kind = usePetStore((state) => state.kind)
  const setKind = usePetStore((state) => state.setKind)

  return (
    <div className="space-y-6">
      <p className="type-caption">Pilih teman yang menemani jadwalmu. Perubahan langsung tampil di halaman Hari Ini.</p>
      <div className="max-w-md">
        <CompanionChoice value={kind} onChange={setKind} />
      </div>
    </div>
  )
}
