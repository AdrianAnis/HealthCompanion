import Link from "next/link"
import { BellRing, HeartHandshake, MessageCircleHeart, Salad } from "lucide-react"

import { MobileShell } from "@/components/patient/mobile-shell"
import { Button } from "@/components/ui/button"

const HIGHLIGHTS = [
  { icon: BellRing, text: "Pengingat obat dan aktivitas sesuai jadwal dari dokter" },
  { icon: Salad, text: "Anjuran makanan yang mudah dipahami" },
  { icon: MessageCircleHeart, text: "Teman tanya-jawab seputar rencana perawatan Anda" },
]

export default function PatientLandingPage() {
  return (
    <MobileShell withNav={false} className="px-6 py-10">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
        <HeartHandshake className="size-7" />
      </div>
      <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight">
        Pulih lebih tenang, ditemani setiap hari.
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Health Companion membantu Anda menjalankan rencana perawatan dari dokter, langsung dari ponsel.
      </p>

      <ul className="mt-8 space-y-3">
        {HIGHLIGHTS.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-xs">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Icon className="size-5" />
            </span>
            {text}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-10">
        <Button asChild size="lg" className="h-14 w-full text-base">
          <Link href="/patient/login">Mulai</Link>
        </Button>
        <p className="mt-4 text-center text-sm text-muted-foreground">TODO: onboarding singkat sebelum masuk.</p>
      </div>
    </MobileShell>
  )
}
