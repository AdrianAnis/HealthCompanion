import type { Metadata } from "next"

import { PageHeader } from "@/components/hospital/page-header"

export const metadata: Metadata = { title: "Dashboard" }

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="Ringkasan pasien dan rencana perawatan hari ini." />
      <div className="p-6">
        <p className="rounded-lg border border-dashed bg-card p-6 text-sm text-muted-foreground">
          TODO: kartu ringkasan (pasien aktif, draft menunggu konfirmasi, eskalasi), daftar tugas, dan grafik kepatuhan.
        </p>
      </div>
    </>
  )
}
