import { CheckCircle2, Clock } from "lucide-react"

import { RingOrnament } from "@/components/ring-ornament"
import { Button } from "@/components/ui/button"
import type { ReminderView } from "@/features/reminder/selectors"

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
        <h2 className="mt-4 type-heading">
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
    <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground md:p-8">
      <RingOrnament />
      <div className="relative flex flex-wrap items-center gap-3 text-sm font-medium">
        <span className="rounded-full bg-primary-foreground px-3 py-0.5 text-xs font-semibold text-primary">
          {isOverdue ? "Terlewat" : "Berikutnya"}
        </span>
        <span className="flex items-center gap-1 text-primary-foreground/80">
          <Clock className="size-4" />
          {reminder.time ?? "Kapan saja hari ini"}
        </span>
      </div>
      <h2 className="relative mt-3 type-title text-primary-foreground">{reminder.title}</h2>
      <p className="relative mt-1 text-primary-foreground/80">{reminder.detail}</p>
      <Button
        size="lg"
        className="relative mt-6 h-12 w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 sm:w-auto sm:min-w-56"
        onClick={() => onToggle(reminder.key)}
      >
        <CheckCircle2 />
        Tandai selesai
      </Button>
    </section>
  )
}
