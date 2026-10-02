import type { Metadata } from "next"

import { MobilePageHeader } from "@/components/patient/mobile-shell"

export const metadata: Metadata = { title: "Aktivitas" }

export default function ActivityPage() {
  return (
    <>
      <MobilePageHeader title="Aktivitas" subtitle="Riwayat kepatuhan dan laporan Anda." />
      <div className="space-y-4 px-5">
        <p className="rounded-2xl border border-dashed bg-card p-5 text-muted-foreground">
          TODO: grafik kepatuhan mingguan (Recharts) dan form laporan gejala atau efek samping.
        </p>
      </div>
    </>
  )
}
