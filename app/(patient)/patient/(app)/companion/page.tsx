import type { Metadata } from "next"

import { MobilePageHeader } from "@/components/patient/mobile-shell"

export const metadata: Metadata = { title: "Teman Sehat" }

export default function CompanionPage() {
  return (
    <>
      <MobilePageHeader title="Teman Sehat" subtitle="Tanya seputar rencana perawatan Anda." />
      <div className="space-y-4 px-5">
        <p className="rounded-2xl border border-dashed bg-card p-5 text-muted-foreground">
          TODO: chat dengan useCompanionStore().ask, saran pertanyaan, dan pesan eskalasi untuk keluhan darurat.
        </p>
      </div>
    </>
  )
}
