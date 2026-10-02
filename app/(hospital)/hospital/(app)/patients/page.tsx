import type { Metadata } from "next"

import { PageHeader } from "@/components/hospital/page-header"

export const metadata: Metadata = { title: "Pasien" }

export default function PatientsPage() {
  return (
    <>
      <PageHeader title="Pasien" description="Daftar pasien yang Anda tangani." />
      <div className="p-6">
        <p className="rounded-lg border border-dashed bg-card p-6 text-sm text-muted-foreground">
          TODO: tabel pasien dengan pencarian, filter diagnosis, dan status rencana perawatan.
        </p>
      </div>
    </>
  )
}
