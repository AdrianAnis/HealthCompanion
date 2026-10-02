import type { Metadata } from "next"

import { PageHeader } from "@/components/hospital/page-header"

export const metadata: Metadata = { title: "Riwayat rencana perawatan" }

export default async function CarePlanHistoryPage({ params }: PageProps<"/hospital/patients/[id]/care-plan/history">) {
  const { id } = await params

  return (
    <>
      <PageHeader title="Riwayat rencana perawatan" description={`Semua versi rencana untuk pasien ${id}.`} />
      <div className="p-6">
        <p className="rounded-lg border border-dashed bg-card p-6 text-sm text-muted-foreground">
          TODO: daftar versi (aktif & superseded) dengan perbandingan antar versi.
        </p>
      </div>
    </>
  )
}
