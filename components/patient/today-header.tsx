import { CalendarDays } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatDate, getGreeting } from "@/lib/date"

type TodayHeaderProps = {
  now: Date
  honorific: string
  firstName: string
  done: number
  total: number
}

export function TodayHeader({ now, honorific, firstName, done, total }: TodayHeaderProps) {
  return (
    <header className="space-y-3">
      <p className="flex items-center gap-2 type-overline">
        <CalendarDays className="size-4" />
        {formatDate(now, "EEEE, d MMMM yyyy")}
      </p>
      <h1 className="type-title">
        {getGreeting(now)}, {honorific} {firstName}
      </h1>
      {total > 0 ? (
        <div className="flex items-center gap-3">
          <div className="flex gap-1" aria-hidden="true">
            {Array.from({ length: total }, (_, index) => (
              <span key={index} className={cn("size-3 rounded-full", index < done ? "bg-success" : "bg-border")} />
            ))}
          </div>
          <p className="type-caption">
            <strong className="text-foreground">
              {done} dari {total} jadwal
            </strong>{" "}
            hari ini sudah kamu tandai
          </p>
        </div>
      ) : null}
    </header>
  )
}
