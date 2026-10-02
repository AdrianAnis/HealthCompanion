import type { Metadata } from "next"

import { MobilePageHeader } from "@/components/patient/mobile-shell"

export const metadata: Metadata = { title: "Profil" }

export default function ProfilePage() {
  return (
    <>
      <MobilePageHeader title="Profil" subtitle="Data diri dan pengaturan akun." />
      <div className="space-y-4 px-5">
        <p className="rounded-2xl border border-dashed bg-card p-5 text-muted-foreground">
          TODO: data pasien, alergi, dokter penanggung jawab, dan tombol keluar.
        </p>
      </div>
    </>
  )
}
