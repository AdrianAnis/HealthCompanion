import type { Metadata } from "next"

import { DraftConfirmCard } from "@/components/hospital/draft-confirm-card"
import { PageHeader } from "@/components/hospital/page-header"

export const metadata: Metadata = { title: "Rencana perawatan baru" }

export default async function NewCarePlanPage({ params }: PageProps<"/hospital/patients/[id]/care-plan/new">) {
  const { id } = await params

  return (
    <>
      <PageHeader
        title="Rencana perawatan baru"
        description="Susun item, minta draft AI, tinjau, lalu konfirmasi untuk dikirim ke pasien."
      />
      <div className="grid gap-4 p-6 xl:grid-cols-[1fr_380px]">
        <p className="rounded-lg border border-dashed bg-card p-6 text-sm text-muted-foreground">
          TODO: builder (obat, diet, aktivitas, kontrol) → draft AI → review diff → konfirmasi.
        </p>
        <DraftConfirmCard patientId={id} />
      </div>
    </>
  )
}
