import Link from "next/link"
import { Activity, ArrowRight, ClipboardCheck, LineChart, ShieldCheck, Smartphone, Stethoscope } from "lucide-react"

import { Button } from "@/components/ui/button"
import { routes } from "@/lib/routes"

const FEATURES = [
  {
    icon: ClipboardCheck,
    title: "Care plan builder",
    text: "Tulis instruksi seperti biasa. Draft terstruktur untuk obat, makanan, aktivitas, dan kontrol tersusun otomatis.",
  },
  {
    icon: ShieldCheck,
    title: "Dokter tetap berwenang",
    text: "Draft AI hanya usulan. Tidak ada instruksi yang sampai ke pasien sebelum Anda mengonfirmasinya.",
  },
  {
    icon: LineChart,
    title: "Monitoring perilaku pasien",
    text: "Lihat jadwal yang dijalankan, keluhan yang dilaporkan, dan pertanyaan yang perlu ditinjau.",
  },
]

const WORKFLOW = [
  { icon: Stethoscope, title: "Dokter menyusun", text: "Tulis instruksi, tinjau draft, lalu konfirmasi." },
  { icon: Smartphone, title: "Pasien menjalankan", text: "Jadwal dan panduan pasien ter-update seketika." },
  { icon: LineChart, title: "Dokter memantau", text: "Keluhan dan eskalasi muncul di dashboard Anda." },
]

export function LandingContent() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href={routes.hospital.landing} className="flex items-center gap-2 font-semibold">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Activity className="size-4" />
            </span>
            Health Companion <span className="font-normal text-muted-foreground">for Clinicians</span>
          </Link>
          <Button asChild size="sm">
            <Link href={routes.hospital.login}>Masuk</Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="text-sm font-medium text-primary">Untuk rumah sakit dan klinik</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Care plan yang benar-benar dijalankan pasien di rumah.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Konfirmasi care plan sekali. Pasien langsung menerima pengingat dan pendamping yang berpegang pada instruksi Anda.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href={routes.hospital.login}>
              Masuk sebagai dokter
              <ArrowRight />
            </Link>
          </Button>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-lg border bg-card p-5">
                <Icon className="size-5 text-primary" />
                <h2 className="mt-3 font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t bg-card">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
            <h2 className="text-2xl font-semibold tracking-tight">Alur dari dokter ke pasien</h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {WORKFLOW.map(({ icon: Icon, title, text }, index) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">Langkah {index + 1}</p>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </div>
  )
}
