import type { Metadata } from "next"

import { ActivePlanSummary } from "@/components/patient/active-plan-summary"
import { MobilePageHeader } from "@/components/patient/mobile-shell"

export const metadata: Metadata = { title: "Rencana Perawatan" }

export default function CarePlanPage() {
  return (
    <>
      <MobilePageHeader title="Rencana Perawatan" subtitle="Instruksi terbaru dari dokter Anda." />
      <div className="space-y-4 px-5">
        <ActivePlanSummary />
        <p className="rounded-2xl border border-dashed bg-card p-5 text-muted-foreground">
          TODO: kelompok item rencana aktif: obat, makanan, aktivitas, dan kontrol.
        </p>
      </div>
    </>
  )
}
