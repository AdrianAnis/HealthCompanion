import Link from "next/link"
import { Activity, ArrowRight, ClipboardCheck, LineChart, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

const FEATURES = [
  { icon: ClipboardCheck, title: "Care plan builder", text: "Susun rencana obat, diet, aktivitas, dan kontrol dalam satu tempat." },
  { icon: ShieldCheck, title: "Dokter tetap memegang kendali", text: "Draft AI hanya usulan. Tidak ada yang sampai ke pasien tanpa konfirmasi Anda." },
  { icon: LineChart, title: "Monitoring kepatuhan", text: "Pantau kepatuhan minum obat dan eskalasi pertanyaan pasien." },
]

export default function HospitalLandingPage() {
  return (
    <div className="min-h-dvh">
      <header className="border-b bg-card">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Activity className="size-4" />
            </span>
            Health Companion <span className="font-normal text-muted-foreground">for Clinicians</span>
          </div>
          <Button asChild size="sm">
            <Link href="/hospital/login">Masuk</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-medium text-primary">Untuk rumah sakit & klinik</p>
        <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight">
          Rencana perawatan yang benar-benar dijalankan pasien di rumah.
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Konfirmasi rencana perawatan sekali, pasien langsung menerima pengingat dan pendamping yang berpegang pada instruksi Anda.
        </p>
        <Button asChild className="mt-8">
          <Link href="/hospital/login">
            Masuk sebagai dokter
            <ArrowRight />
          </Link>
        </Button>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-lg border bg-card p-5">
              <Icon className="size-5 text-primary" />
              <h2 className="mt-3 font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted-foreground">TODO: landing page lengkap (alur kerja, testimoni, kontak).</p>
      </main>
    </div>
  )
}
