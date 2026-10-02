import type { Metadata } from "next"

import { PageHeader } from "@/components/hospital/page-header"

export const metadata: Metadata = { title: "Monitoring" }

export default async function MonitoringPage({ params }: PageProps<"/hospital/patients/[id]/monitoring">) {
  const { id } = await params

  return (
    <>
      <PageHeader title="Monitoring" description={`Kepatuhan dan laporan pasien ${id}.`} />
      <div className="p-6">
        <p className="rounded-lg border border-dashed bg-card p-6 text-sm text-muted-foreground">
          TODO: grafik kepatuhan (Recharts), laporan gejala/efek samping, dan eskalasi dari Companion.
        </p>
      </div>
    </>
  )
}
