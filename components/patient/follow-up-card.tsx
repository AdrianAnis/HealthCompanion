import { CalendarCheck } from "lucide-react"

import type { FollowUpItem } from "@/features/care-plan/types"
import type { Doctor } from "@/features/patient/types"
import { formatDate } from "@/lib/date"

type FollowUpCardProps = {
  followUp: FollowUpItem | undefined
  doctor: Doctor | undefined
}

export function FollowUpCard({ followUp, doctor }: FollowUpCardProps) {
  return (
    <section className="rounded-3xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CalendarCheck className="size-5" />
        </span>
        <h2 className="font-bold">Kontrol berikutnya</h2>
      </div>
      {followUp ? (
        <div className="mt-4 space-y-1">
          <p className="text-lg font-extrabold">{formatDate(followUp.date, "EEEE, d MMMM yyyy")}</p>
          <p className="text-muted-foreground">{followUp.instruction}</p>
          {doctor ? (
            <p className="pt-1 text-sm font-semibold">
              {doctor.name} · {doctor.hospital}
            </p>
          ) : null}
        </div>
      ) : (
        <p className="mt-4 text-muted-foreground">Belum ada jadwal kontrol di care plan kamu.</p>
      )}
    </section>
  )
}
