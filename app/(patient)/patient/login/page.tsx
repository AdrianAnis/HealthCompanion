import type { Metadata } from "next"
import Link from "next/link"

import { MobilePageHeader, MobileShell } from "@/components/patient/mobile-shell"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = { title: "Masuk" }

export default function PatientLoginPage() {
  return (
    <MobileShell withNav={false}>
      <MobilePageHeader title="Masuk" subtitle="Masukkan nomor HP yang terdaftar di rumah sakit." />
      <div className="flex flex-1 flex-col px-5">
        <p className="rounded-2xl border border-dashed bg-card p-5 text-muted-foreground">
          TODO: input nomor HP → kirim OTP (mock) → input 6 digit OTP via useAuthStore().requestOtp / verifyOtp. Demo: 081234567801, OTP 123456.
        </p>
        <Button asChild size="lg" className="mt-auto mb-10 h-14 w-full text-base">
          <Link href="/patient/today">Lanjut (demo)</Link>
        </Button>
      </div>
    </MobileShell>
  )
}
