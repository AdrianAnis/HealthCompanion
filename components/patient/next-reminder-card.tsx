import Link from "next/link"
import { CheckCircle2, Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ReminderView } from "@/features/reminder/selectors"
import { routes } from "@/lib/routes"

type NextReminderCardProps = {
  reminder: ReminderView | undefined
  total: number
  onToggle: (key: string) => void
}

export function NextReminderCard({ reminder, total, onToggle }: NextReminderCardProps) {
  if (!reminder) {
    return (
      <section className="rounded-3xl border bg-card p-6 shadow-sm md:p-8">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-success/10 text-success">
          <CheckCircle2 className="size-6" />
        </span>
        <h2 className="mt-4 text-xl font-bold">
          {total === 0 ? "Tidak ada jadwal hari ini" : "Semua jadwal hari ini sudah kamu tandai"}
        </h2>
        <p className="mt-1 text-muted-foreground">
          {total === 0
            ? "Jadwal akan muncul di sini sesuai care plan aktif dari dokter."
            : "Terima kasih sudah menjalankan care plan. Sampai jumpa besok."}
        </p>
      </section>
    )
  }

  const isOverdue = reminder.status === "overdue"

  return (
    <section className="rounded-3xl border bg-card p-6 shadow-sm md:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={isOverdue ? "destructive" : "default"}>{isOverdue ? "Terlewat" : "Berikutnya"}</Badge>
        <span className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
          <Clock className="size-4" />
          {reminder.time ?? "Kapan saja hari ini"}
        </span>
      </div>
      <h2 className="mt-3 text-2xl font-bold md:text-3xl">{reminder.title}</h2>
      <p className="mt-1 text-muted-foreground">{reminder.detail}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="h-12 flex-1 text-base" onClick={() => onToggle(reminder.key)}>
          <CheckCircle2 />
          Tandai selesai
        </Button>
        <Button asChild size="lg" variant="outline" className="h-12 text-base">
          <Link href={routes.patient.carePlanItem(reminder.itemId)}>Lihat detail</Link>
        </Button>
      </div>
    </section>
  )
}
