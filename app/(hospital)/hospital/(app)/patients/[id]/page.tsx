import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "@/components/hospital/page-header"
import { Button } from "@/components/ui/button"
import { mockPatients } from "@/mocks/patients"

export const metadata: Metadata = { title: "Detail pasien" }

export default async function PatientDetailPage({ params }: PageProps<"/hospital/patients/[id]">) {
  const { id } = await params
  const patient = mockPatients.find((item) => item.id === id)

  return (
    <>
      <PageHeader
        title={patient?.name ?? "Detail pasien"}
        description={patient ? `${patient.mrn} · ${patient.primaryDiagnosis}` : `ID ${id}`}
        actions={
          <>
            <Button asChild variant="outline" size="sm">
              <Link href={`/hospital/patients/${id}/monitoring`}>Monitoring</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/hospital/patients/${id}/care-plan/history`}>Riwayat rencana</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={`/hospital/patients/${id}/care-plan/new`}>Buat rencana</Link>
            </Button>
          </>
        }
      />
      <div className="p-6">
        <p className="rounded-lg border border-dashed bg-card p-6 text-sm text-muted-foreground">
          TODO: profil pasien, riwayat kesehatan (timeline), dan rencana perawatan aktif.
        </p>
      </div>
    </>
  )
}
