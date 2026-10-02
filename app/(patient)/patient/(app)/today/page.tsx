import type { Metadata } from "next"

import { ActivePlanSummary } from "@/components/patient/active-plan-summary"
import { MobilePageHeader } from "@/components/patient/mobile-shell"

export const metadata: Metadata = { title: "Hari Ini" }

export default function TodayPage() {
  return (
    <>
      <MobilePageHeader title="Hari Ini" subtitle="Jadwal obat dan aktivitas Anda hari ini." />
      <div className="space-y-4 px-5">
        <ActivePlanSummary />
        <p className="rounded-2xl border border-dashed bg-card p-5 text-muted-foreground">
          TODO: daftar pengingat dari getTodayReminders + checklist selesai, dan kontrol berikutnya.
        </p>
      </div>
    </>
  )
}
